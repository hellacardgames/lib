type Params<
  TGame extends Game,
  TClientState extends object,
  TGameEvent extends object,
  TGetClientStateAndClearEventsError extends string,
  TGetEventsAndClearAcknowledgedError extends string,
  TJoinGameError extends string,
  TLeaveGameError extends string,
  TSendChatError extends string,
  TStartGameError extends string,
  TGameplayActions extends Record<string, unknown>,
> = {
  readonly maxPlayers: number;
  readonly createGame: (
    userId: string,
    username: string,
  ) => { game: TGame; playerId: string };

  readonly getClientStateAndClearEvents: (
    game: TGame,
    playerId: string,
  ) =>
    | { success: true; game: TGame; state: TClientState }
    | { success: false; error: TGetClientStateAndClearEventsError };

  readonly getEventsAndClearAcknowledged: (
    game: TGame,
    playerId: string,
    lastReadId: string | null,
  ) =>
    | { success: true; game: TGame; events: readonly TGameEvent[] }
    | { success: false; error: TGetEventsAndClearAcknowledgedError };

  readonly joinGame: (
    game: TGame,
    userId: string,
    username: string,
  ) =>
    | { success: true; game: TGame; playerId: string }
    | { success: false; error: TJoinGameError };

  readonly leaveGame: (
    game: TGame,
    playerId: string,
  ) =>
    { success: true; game: TGame } | { success: false; error: TLeaveGameError };

  readonly sendChat: (
    game: TGame,
    playerId: string,
    text: string,
  ) =>
    { success: true; game: TGame } | { success: false; error: TSendChatError };

  readonly startGame: (
    game: TGame,
    playerId: string,
  ) =>
    { success: true; game: TGame } | { success: false; error: TStartGameError };

  readonly gameplayActions: TGameplayActions &
    ConstrainGameActions<TGame, TGameplayActions>;
};

type Game = {
  status: "created" | "started" | "forfeited" | "completed";
  id: string;
  expiresAt: number;
  players: readonly object[];
};

export function createManagerFactory<
  TGame extends Game,
  TClientState extends object,
  TGameEvent extends object,
  TGetClientStateAndClearEventsError extends string,
  TGetEventsAndClearAcknowledgedError extends string,
  TJoinGameError extends string,
  TLeaveGameError extends string,
  TSendChatError extends string,
  TStartGameError extends string,
  TGameplayActions extends Record<string, unknown>,
>(
  params: Params<
    TGame,
    TClientState,
    TGameEvent,
    TGetClientStateAndClearEventsError,
    TGetEventsAndClearAcknowledgedError,
    TJoinGameError,
    TLeaveGameError,
    TSendChatError,
    TStartGameError,
    TGameplayActions
  >,
) {
  return (logKey: string, maxGames: number, watchdogIntervalMs: number) => {
    const games = new Map<string, TGame>();

    const watchdog = new Watchdog(logKey, watchdogIntervalMs, games);
    watchdog.start();

    function createGame(userId: string, username: string) {
      if (games.size === maxGames) {
        return { success: false, error: "maxGamesReached" } as const;
      }
      const result = params.createGame(userId, username);
      games.set(result.game.id, result.game);
      return {
        success: true,
        gameId: result.game.id,
        playerId: result.playerId,
      } as const;
    }

    function getClientStateAndClearEvents(gameId: string, playerId: string) {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = params.getClientStateAndClearEvents(game, playerId);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true, state: result.state } as const;
    }

    function getEventsAndClearAcknowledged(
      gameId: string,
      playerId: string,
      lastReadId: string | null,
    ) {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = params.getEventsAndClearAcknowledged(
        game,
        playerId,
        lastReadId,
      );
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true, events: result.events } as const;
    }

    function getJoinableGames() {
      return {
        games: [
          ...Array.from(games.values())
            .filter(
              (g) =>
                g.status === "created" && g.players.length < params.maxPlayers,
            )
            .map(
              (g) =>
                ({
                  id: g.id,
                  numPlayers: g.players.length,
                }) as const,
            ),
        ] as const,
      } as const;
    }

    function joinGame(gameId: string, userId: string, username: string) {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = params.joinGame(game, userId, username);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true, playerId: result.playerId } as const;
    }

    function leaveGame(gameId: string, playerId: string) {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = params.leaveGame(game, playerId);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      if (result.game.players.length > 0) {
        games.set(gameId, result.game);
      } else {
        games.delete(gameId);
      }
      return { success: true } as const;
    }

    const gameplayActions = wrapActions(params.gameplayActions, games);

    return {
      createGame,
      getClientStateAndClearEvents,
      getEventsAndClearAcknowledged,
      getJoinableGames,
      joinGame,
      leaveGame,
      sendChat: wrapAction(params.sendChat, games),
      startGame: wrapAction(params.startGame, games),
      ...gameplayActions,
      gameplayActions,
    } as const;
  };
}

class Watchdog<TGame extends Game> {
  private readonly logKey: string;
  private readonly intervalMs: number;
  private readonly games: Map<string, TGame>;

  constructor(logKey: string, intervalMs: number, games: Map<string, TGame>) {
    this.logKey = logKey;
    this.intervalMs = intervalMs;
    this.games = games;
  }

  start() {
    console.log(`watchdog start at ${Date.now()} (${this.logKey})`);
    setInterval(() => this.wakeUp(), this.intervalMs);
  }

  private wakeUp() {
    const now = Date.now();
    // console.log(`watchdog wakeUp at ${now} (${this.gameKey})`);
    for (const game of this.games.values()) {
      if (game.expiresAt <= now) {
        this.games.delete(game.id);
        console.log(`watchdog purged ${game.id} (${this.logKey})`);
      }
    }
  }
}

function wrapActions<TGame, TActions extends Record<string, unknown>>(
  actions: TActions & ConstrainGameActions<TGame, TActions>,
  games: Map<string, TGame>,
): Readonly<WrappedActions<TGame, TActions>> {
  const wrapped = {} as WrappedActions<TGame, TActions>;
  for (const key of Object.keys(actions) as Array<keyof TActions>) {
    wrapped[key] = wrapAction(actions[key] as never, games) as WrappedActions<
      TGame,
      TActions
    >[typeof key];
  }
  return wrapped;
}

function wrapAction<TGame, TArgs extends unknown[], TError extends string>(
  action: (
    game: TGame,
    ...args: TArgs
  ) => { success: true; game: TGame } | { success: false; error: TError },
  games: Map<string, TGame>,
) {
  return (gameId: string, ...args: TArgs) => {
    const game = games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" } as const;
    }
    const result = action(game, ...args);
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    games.set(gameId, result.game);
    return { success: true } as const;
  };
}

type ConstrainGameActions<TGame, TActions> = {
  [K in keyof TActions]: TActions[K] extends (
    game: TGame,
    ...args: never[]
  ) => GameActionResult<TGame>
    ? TActions[K]
    : never;
};

type GameActionResult<TGame> =
  | { readonly success: true; readonly game: TGame }
  | { readonly success: false; readonly error: string };

type WrappedActions<TGame, TActions> = {
  [K in keyof TActions]: WrappedAction<TGame, TActions[K]>;
};

type WrappedAction<TGame, TAction> = TAction extends (
  game: TGame,
  ...args: infer TArgs
) => infer TResult
  ? (
      gameId: string,
      ...args: TArgs
    ) =>
      | { readonly success: true }
      | {
          readonly success: false;
          readonly error: "gameNotFound" | ActionError<TResult>;
        }
  : never;

type ActionError<TResult> = TResult extends {
  success: false;
  error: infer TError extends string;
}
  ? TError
  : never;
