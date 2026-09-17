import { requirePlayer } from "./requirePlayer.js";

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function getOtherPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): Player<TGame> | undefined {
  const { player } = requirePlayer(game, playerId);
  const otherPlayer = game.players.find((p) => p.id !== player.id);

  return otherPlayer;
}
