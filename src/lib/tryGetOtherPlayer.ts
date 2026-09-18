import { requirePlayer } from "./requirePlayer.js";

type TryGetOtherPlayerResult<TGame extends Game> = {
  readonly otherPlayer: Player<TGame> | undefined;
  readonly index: number;
};

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function tryGetOtherPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): TryGetOtherPlayerResult<TGame> {
  if (game.players.length > 2) {
    throw new Error("Game has more than two players.");
  }

  const { player } = requirePlayer(game, playerId);
  const index = game.players.findIndex((p) => p.id !== player.id);

  return {
    otherPlayer: game.players[index],
    index,
  };
}
