import { tryGetPlayer } from "./tryGetPlayer.js";

type GetPlayerResult<TGame extends Game> = {
  readonly player: Player<TGame>;
  readonly index: number;
};

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function getPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): GetPlayerResult<TGame> {
  const { player, index } = tryGetPlayer(game, playerId);

  if (!player) {
    throw new Error(`Player ${playerId} does not exist in game.`);
  }

  return {
    player,
    index,
  };
}
