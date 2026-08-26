import { z } from "zod";

type Manager<
  TClientState extends object,
  TGameEvent extends object,
  TJoinableGame extends object,
  TCreateGameError extends string,
  TGetClientStateAndClearEventsError extends string,
  TGetEventsAndClearAcknowledgedError extends string,
  TJoinGameError extends string,
  TLeaveGameError extends string,
  TSendChatError extends string,
  TStartGameError extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TGameplayActions extends Record<string, (...args: any[]) => any>,
> = {
  readonly createGame: (
    userId: string,
    username: string,
  ) =>
    | {
        readonly success: true;
        readonly gameId: string;
        readonly playerId: string;
      }
    | { readonly success: false; readonly error: TCreateGameError };

  readonly getClientStateAndClearEvents: (
    gameId: string,
    playerId: string,
  ) =>
    | { readonly success: true; readonly state: TClientState }
    | {
        readonly success: false;
        readonly error: TGetClientStateAndClearEventsError;
      };

  readonly getEventsAndClearAcknowledged: (
    gameId: string,
    playerId: string,
    lastReadId: string | null,
  ) =>
    | { readonly success: true; readonly events: readonly TGameEvent[] }
    | {
        readonly success: false;
        readonly error: TGetEventsAndClearAcknowledgedError;
      };

  readonly getJoinableGames: () => { readonly games: readonly TJoinableGame[] };

  readonly joinGame: (
    gameId: string,
    userId: string,
    username: string,
  ) =>
    | { readonly success: true; readonly playerId: string }
    | { readonly success: false; readonly error: TJoinGameError };

  readonly leaveGame: (
    gameId: string,
    playerId: string,
  ) =>
    | { readonly success: true }
    | { readonly success: false; readonly error: TLeaveGameError };

  readonly sendChat: (
    gameId: string,
    playerId: string,
    text: string,
  ) =>
    | { readonly success: true }
    | { readonly success: false; readonly error: TSendChatError };

  readonly startGame: (
    gameId: string,
    playerId: string,
  ) =>
    | { readonly success: true }
    | { readonly success: false; readonly error: TStartGameError };

  readonly gameplayActions: TGameplayActions &
    ConstrainGameActions<TGameplayActions>;
};

export function createServerFactory<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TArgs extends any[],
  TClientState extends object,
  TGameEvent extends object,
  TJoinableGame extends object,
  TCreateGameError extends string,
  TGetClientStateAndClearEventsError extends string,
  TGetEventsAndClearAcknowledgedError extends string,
  TJoinGameError extends string,
  TLeaveGameError extends string,
  TSendChatError extends string,
  TStartGameError extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TGameplayActions extends Record<string, (...args: any[]) => any>,
  TManager extends object,
>(
  createManager: (
    ...args: TArgs
  ) => Manager<
    TClientState,
    TGameEvent,
    TJoinableGame,
    TCreateGameError,
    TGetClientStateAndClearEventsError,
    TGetEventsAndClearAcknowledgedError,
    TJoinGameError,
    TLeaveGameError,
    TSendChatError,
    TStartGameError,
    TGameplayActions
  > &
    TManager,
  zodSchemas: {
    [K in keyof TGameplayActions]: z.ZodType<Parameters<TGameplayActions[K]>>;
  },
) {
  return (...args: TArgs) => {
    const manager = createManager(...args);

    function createGame(userId: string, username: string) {
      return manager.createGame(userId, username);
    }

    const getClientStateAndClearEventsInputSchema = z
      .object({
        gameId: z.string(),
        playerId: z.string(),
      })
      .transform(({ gameId, playerId }) => [gameId, playerId] as const);

    function getClientStateAndClearEvents(input: unknown) {
      const parseResult =
        getClientStateAndClearEventsInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.getClientStateAndClearEvents(...parseResult.data);
    }

    const getEventsAndClearAcknowledgedInputSchema = z
      .object({
        gameId: z.string(),
        playerId: z.string(),
        lastReadId: z.string().nullable(),
      })
      .transform(
        ({ gameId, playerId, lastReadId }) =>
          [gameId, playerId, lastReadId] as const,
      );

    function getEventsAndClearAcknowledged(input: unknown) {
      const parseResult =
        getEventsAndClearAcknowledgedInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.getEventsAndClearAcknowledged(...parseResult.data);
    }

    function getJoinableGames() {
      return manager.getJoinableGames();
    }

    const joinGameInputSchema = z
      .object({
        gameId: z.string(),
      })
      .transform(({ gameId }) => [gameId] as const);

    function joinGame(input: unknown, userId: string, username: string) {
      const parseResult = joinGameInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.joinGame(...parseResult.data, userId, username);
    }

    const leaveGameInputSchema = z
      .object({
        gameId: z.string(),
        playerId: z.string(),
      })
      .transform(({ gameId, playerId }) => [gameId, playerId] as const);

    function leaveGame(input: unknown) {
      const parseResult = leaveGameInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.leaveGame(...parseResult.data);
    }

    const sendChatInputSchema = z
      .object({
        gameId: z.string(),
        playerId: z.string(),
        text: z.string(),
      })
      .transform(
        ({ gameId, playerId, text }) => [gameId, playerId, text] as const,
      );

    function sendChat(input: unknown) {
      const parseResult = sendChatInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.sendChat(...parseResult.data);
    }

    const startGameInputSchema = z
      .object({
        gameId: z.string(),
        playerId: z.string(),
      })
      .transform(({ gameId, playerId }) => [gameId, playerId] as const);

    function startGame(input: unknown) {
      const parseResult = startGameInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.startGame(...parseResult.data);
    }

    return {
      routes: [
        { path: "/createGame", action: createGame },
        {
          path: "/getClientStateAndClearEvents",
          action: getClientStateAndClearEvents,
        },
        {
          path: "/getEventsAndClearAcknowledged",
          action: getEventsAndClearAcknowledged,
        },
        { path: "/getJoinableGames", action: getJoinableGames },
        { path: "/joinGame", action: joinGame },
        { path: "/leaveGame", action: leaveGame },
        { path: "/sendChat", action: sendChat },
        { path: "/startGame", action: startGame },
        ...toRoutes(wrapActions(manager.gameplayActions, zodSchemas)),
      ],
    } as const;
  };
}

function wrapActions<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TActions extends Record<string, (...args: any[]) => any>,
>(
  actions: TActions & ConstrainGameActions<TActions>,
  zodSchemas: {
    [K in keyof TActions]: z.ZodType<Parameters<TActions[K]>>;
  },
): Readonly<WrappedActions<TActions>> {
  const wrapped = {} as WrappedActions<TActions>;
  for (const key of Object.keys(actions) as Array<keyof TActions>) {
    wrapped[key] = wrapAction(
      actions[key] as never,
      zodSchemas[key],
    ) as WrappedActions<TActions>[typeof key];
  }
  return wrapped;
}

function wrapAction<TArgs extends unknown[], TError extends string>(
  action: (
    ...args: TArgs
  ) => { success: true } | { success: false; error: TError },
  zodSchema: z.ZodType<TArgs>,
) {
  return (input: unknown) => {
    const parseResult = zodSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    return action(...parseResult.data);
  };
}

type ConstrainGameActions<TActions> = {
  [K in keyof TActions]: TActions[K] extends (
    ...args: never[]
  ) => GameActionResult
    ? TActions[K]
    : never;
};

type GameActionResult =
  | { readonly success: true }
  | { readonly success: false; readonly error: string };

type WrappedActions<TActions> = {
  [K in keyof TActions]: WrappedAction<TActions[K]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WrappedAction<TAction> = TAction extends (...args: any[]) => infer TResult
  ? (input: unknown) =>
      | { readonly success: true }
      | {
          readonly success: false;
          readonly error: "invalidInput" | ActionError<TResult>;
        }
  : never;

type ActionError<TResult> = TResult extends {
  success: false;
  error: infer TError extends string;
}
  ? TError
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toRoutes<const T extends Record<string, (...args: any[]) => unknown>>(
  actions: T,
): Routes<T> {
  return Object.entries(actions).map(([key, action]) => ({
    path: `/${key}`,
    action,
  })) as Routes<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Routes<T extends Record<string, (...args: any[]) => unknown>> = {
  [K in keyof T]: {
    readonly path: `/${K & string}`;
    readonly action: T[K];
  };
}[keyof T][];
