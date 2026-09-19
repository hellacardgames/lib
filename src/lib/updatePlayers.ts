import { updatePlayer } from "./updatePlayer.js";

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function updatePlayers<TGame extends Game>(
  game: TGame,
  update: (player: TGame["players"][number]) => TGame["players"][number],
): TGame {
  for (const player of game.players) {
    game = updatePlayer(game, player.id, update);
  }

  return game;
}
