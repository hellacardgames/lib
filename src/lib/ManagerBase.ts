type Game = {
  readonly id: string;
  readonly expiresAt: number;
};

export abstract class ManagerBase<TGame extends Game> {
  protected readonly maxGames: number;
  protected readonly games: Map<string, TGame>;
  private readonly watchdog: Watchdog<Game>;

  constructor(logKey: string, maxGames: number, watchdogIntervalMs: number) {
    this.maxGames = maxGames;
    this.games = new Map<string, TGame>();
    this.watchdog = new Watchdog(logKey, watchdogIntervalMs, this.games);
    this.watchdog.start();
  }
}

class Watchdog<TGame extends Game> {
  private readonly logKey: string;
  private readonly intervalMs: number;
  private readonly games: Map<string, TGame>;

  constructor(logKey: string, intervalMs: number, games: Map<string, TGame>) {
    this.logKey = logKey;
    this.intervalMs = intervalMs;
    this.games = games;
  }

  start() {
    console.log(`watchdog start at ${Date.now()} (${this.logKey})`);
    setInterval(() => this.wakeUp(), this.intervalMs);
  }

  private wakeUp() {
    const now = Date.now();
    // console.log(`watchdog wakeUp at ${now} (${this.gameKey})`);
    for (const game of this.games.values()) {
      if (game.expiresAt <= now) {
        this.games.delete(game.id);
        console.log(`watchdog purged ${game.id} (${this.logKey})`);
      }
    }
  }
}
