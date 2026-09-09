import { requirePlayer } from "./requirePlayer.js";

type RequireOtherPlayerResult<TGame extends Game> = {
  readonly otherPlayer: Player<TGame>;
  readonly index: number;
};

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function requireOtherPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): RequireOtherPlayerResult<TGame> {
  const { player } = requirePlayer(game, playerId);
  const index = game.players.findIndex((p) => p.id !== player.id);

  if (index === -1) {
    throw new Error(`Other player not found.`);
  }

  return {
    otherPlayer: game.players[index]!,
    index,
  };
}
