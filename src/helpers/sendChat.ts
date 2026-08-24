import { addItemToCollection } from "../lib/addItemToCollection.js";
import { emitEvent } from "../lib/emitEvent.js";
import type { ChatMessage } from "../types/ChatMessage.js";

type Game = {
  readonly players: readonly {
    readonly id: string;
    readonly username: string;
    readonly events: readonly {
      readonly id: string;
    }[];
  }[];
  readonly chatMessages: readonly ChatMessage[];
};

export function sendChat<TGame extends Game>(
  game: TGame,
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

  game = emitEvent(game, { type: "chat", message });

  return { success: true, game } as const;
}
