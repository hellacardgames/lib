import { addItemToCollection } from "../lib/addItemToCollection.js";
import { emitEvent } from "../lib/emitEvent.js";
import type { ChatMessage } from "../types/ChatMessage.js";

export function sendChat<TGame extends Game>(
  game: HasChatEvent<TGame>,
  playerId: string,
  text: string,
) {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" } as const;
  }

  const message: ChatMessage = {
    id: crypto.randomUUID(),
    username: player.username,
    text,
  };

  game = {
    ...game,
    chatMessages: addItemToCollection(game.chatMessages, message),
  };

  const event: Omit<ChatEvent, "id"> = { type: "chat", message };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  game = emitEvent(game, event as any);

  return { success: true, game } as const;
}

type Game = {
  readonly players: readonly {
    readonly id: string;
    readonly username: string;
    readonly events: readonly {
      readonly id: string;
      readonly type: string;
    }[];
  }[];
  readonly chatMessages: readonly ChatMessage[];
};

type HasChatEvent<TGame extends Game> =
  Exact<
    Extract<TGame["players"][number]["events"][number], ChatEvent>,
    ChatEvent
  > extends never
    ? never
    : TGame;

type ChatEvent = {
  readonly id: string;
  readonly type: "chat";
  readonly message: ChatMessage;
};

type Exact<T, Expected> = Equal<T, Expected> extends true ? T : never;

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? (<T>() => T extends B ? 1 : 2) extends <T>() => T extends A ? 1 : 2
      ? true
      : false
    : false;
