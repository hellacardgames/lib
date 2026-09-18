import { tryGetOtherPlayer } from "./tryGetOtherPlayer.js";

type GetOtherPlayerResult<TGame extends Game> = {
  readonly otherPlayer: Player<TGame>;
  readonly index: number;
};

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function getOtherPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): GetOtherPlayerResult<TGame> {
  const { otherPlayer, index } = tryGetOtherPlayer(game, playerId);

  if (!otherPlayer) {
    throw new Error(`Other player not found.`);
  }

  return {
    otherPlayer,
    index,
  };
}
