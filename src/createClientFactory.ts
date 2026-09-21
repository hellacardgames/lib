import type { createServerFactory } from "./createServerFactory.js";

type ServerResult<
  TServer extends {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routes: readonly { path: string; action: (...args: any[]) => any }[];
  },
  TPath extends TServer["routes"][number]["path"],
> = ReturnType<Extract<TServer["routes"][number], { path: TPath }>["action"]>;

type ServerSuccess<
  TServer extends {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routes: readonly { path: string; action: (...args: any[]) => any }[];
  },
  TPath extends TServer["routes"][number]["path"],
> = Extract<
  ReturnType<Extract<TServer["routes"][number], { path: TPath }>["action"]>,
  { success: true }
>;

type ServerError<
  TServer extends {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    routes: readonly { path: string; action: (...args: any[]) => any }[];
  },
  TPath extends TServer["routes"][number]["path"],
> = Extract<
  ReturnType<Extract<TServer["routes"][number], { path: TPath }>["action"]>,
  { success: false }
>["error"];

type GameplayActionNames<
  TServer extends ReturnType<ReturnType<typeof createServerFactory>>,
> = Exclude<AllActionNames<TServer>, StandardActionNames>;

type AllActionNames<
  TServer extends ReturnType<ReturnType<typeof createServerFactory>>,
> = TServer["routes"][number]["path"] extends `/${infer Name}` ? Name : never;

type StandardActionNames =
  | "createGame"
  | "getClientStateAndClearEvents"
  | "getEventsAndClearAcknowledged"
  | "getJoinableGames"
  | "joinGame"
  | "leaveGame"
  | "sendChat"
  | "startGame";

export function createClientFactory<
  TServer extends ReturnType<ReturnType<typeof createServerFactory>>,
  TManager extends {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [N in GameplayActionNames<TServer>]: (...args: any[]) => any;
  },
>(gameplayActionArgsToRequestBodyMappers: {
  [N in GameplayActionNames<TServer>]: (
    ...args: Parameters<TManager[N]>
  ) => object;
}) {
  function createClient(baseUrl: string) {
    async function createGame(accessToken: string) {
      const response = await fetch(`${baseUrl}/createGame`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return (await response.json()) as
        | ServerSuccess<TServer, "/createGame">
        | {
            readonly success: false;
            readonly error: ServerError<TServer, "/createGame">;
          };
    }

    async function getClientStateAndClearEvents(
      gameId: string,
      playerId: string,
    ) {
      const response = await fetch(`${baseUrl}/getClientStateAndClearEvents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId, playerId }),
      });
      return (await response.json()) as
        | ServerSuccess<TServer, "/getClientStateAndClearEvents">
        | {
            readonly success: false;
            readonly error: ServerError<
              TServer,
              "/getClientStateAndClearEvents"
            >;
          };
    }

    async function getEventsAndClearAcknowledged(
      gameId: string,
      playerId: string,
      lastReadId: string | null,
    ) {
      const response = await fetch(`${baseUrl}/getEventsAndClearAcknowledged`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId, playerId, lastReadId }),
      });
      return (await response.json()) as
        | ServerSuccess<TServer, "/getEventsAndClearAcknowledged">
        | {
            readonly success: false;
            readonly error: ServerError<
              TServer,
              "/getEventsAndClearAcknowledged"
            >;
          };
    }

    async function getJoinableGames() {
      const response = await fetch(`${baseUrl}/getJoinableGames`, {
        method: "POST",
      });
      return (await response.json()) as ServerResult<
        TServer,
        "/getJoinableGames"
      >;
    }

    async function joinGame(gameId: string, accessToken: string) {
      const response = await fetch(`${baseUrl}/joinGame`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId }),
      });
      return (await response.json()) as
        | ServerSuccess<TServer, "/joinGame">
        | {
            readonly success: false;
            readonly error: ServerError<TServer, "/joinGame">;
          };
    }

    async function leaveGame(gameId: string, playerId: string) {
      const response = await fetch(`${baseUrl}/leaveGame`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId, playerId }),
      });
      return (await response.json()) as
        | ServerSuccess<TServer, "/leaveGame">
        | {
            readonly success: false;
            readonly error: ServerError<TServer, "/leaveGame">;
          };
    }

    async function sendChat(gameId: string, playerId: string, text: string) {
      const response = await fetch(`${baseUrl}/sendChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId, playerId, text }),
      });
      return (await response.json()) as
        | ServerSuccess<TServer, "/sendChat">
        | {
            readonly success: false;
            readonly error: ServerError<TServer, "/sendChat">;
          };
    }

    async function startGame(gameId: string, playerId: string) {
      const response = await fetch(`${baseUrl}/startGame`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId, playerId }),
      });
      return (await response.json()) as
        | ServerSuccess<TServer, "/startGame">
        | {
            readonly success: false;
            readonly error: ServerError<TServer, "/startGame">;
          };
    }

    return {
      createGame,
      getClientStateAndClearEvents,
      getEventsAndClearAcknowledged,
      getJoinableGames,
      joinGame,
      leaveGame,
      sendChat,
      startGame,
      ...createGameplayActions(gameplayActionArgsToRequestBodyMappers, baseUrl),
    } as const;
  }

  return createClient;
}

function createGameplayActions<
  TServer extends ReturnType<ReturnType<typeof createServerFactory>>,
  TManager extends {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [N in GameplayActionNames<TServer>]: (...args: any[]) => any;
  },
>(
  argsToRequestBodyMappers: {
    [N in GameplayActionNames<TServer>]: (
      ...args: Parameters<TManager[N]>
    ) => object;
  },
  baseUrl: string,
): Readonly<ClientGameplayActions<TServer, typeof argsToRequestBodyMappers>> {
  const wrapped = {} as ClientGameplayActions<
    TServer,
    typeof argsToRequestBodyMappers
  >;
  for (const actionName of Object.keys(argsToRequestBodyMappers) as Array<
    keyof typeof argsToRequestBodyMappers
  >) {
    wrapActionForKey(actionName);
  }
  return wrapped;

  function wrapActionForKey<
    TActionName extends keyof typeof argsToRequestBodyMappers,
  >(actionName: TActionName) {
    wrapped[actionName] = createGameplayAction(
      actionName as GameplayActionNames<TServer>,
      baseUrl,
      argsToRequestBodyMappers[actionName],
    ) as unknown as ClientGameplayActions<
      TServer,
      typeof argsToRequestBodyMappers
    >[TActionName];
  }
}

function createGameplayAction<
  TServer extends ReturnType<ReturnType<typeof createServerFactory>>,
  TActionName extends GameplayActionNames<TServer>,
  TArgs extends unknown[],
>(
  actionName: TActionName,
  baseUrl: string,
  createRequestBody: (...args: TArgs) => object,
) {
  return async (...args: TArgs) => {
    const response = await fetch(`${baseUrl}/${actionName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createRequestBody(...args)),
    });
    return (await response.json()) as ServerResult<TServer, `/${TActionName}`>;
  };
}

type ClientGameplayActions<
  TServer extends ReturnType<ReturnType<typeof createServerFactory>>,
  TArgsToRequestBodyMappers,
> = {
  [K in keyof TArgsToRequestBodyMappers]: TArgsToRequestBodyMappers[K] extends (
    ...args: infer TArgs
  ) => object
    ? (
        ...args: TArgs
      ) => Promise<ServerResult<TServer, `/${Extract<K, string>}`>>
    : never;
};
