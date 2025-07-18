export class ConfigService {
  // #region general

  // ---------------------------------------------------------------------------
  static getFootballApiUrl(): string {
    return this.getString(
      "EXPO_PUBLIC_FOOTBALL_API_URL",
      process.env.EXPO_PUBLIC_FOOTBALL_API_URL
    );
  }
  static getFootballApiKey(): string {
    return this.getString(
      "EXPO_PUBLIC_FOOTBALL_API_KEY",
      process.env.EXPO_PUBLIC_FOOTBALL_API_KEY
    );
  }

  // #region private methods
  // ---------------------------------------------------------------------------
  private static getString(
    key: string,
    envVariable: string | undefined
  ): string {
    return this.getKey(key, envVariable);
  }

  // ---------------------------------------------------------------------------
  private static getKey(key: string, envVariable: string | undefined): string {
    if (!envVariable || envVariable === undefined || envVariable === null) {
      throw new Error(`Missing environment variable: ${key}`);
    }

    return String(envVariable);
  }
  // #endregion
}
