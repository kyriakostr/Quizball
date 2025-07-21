import { ConfigService } from "./config-service";

// -----------------------------------------------------------------------------
type ApiError = {
  status: number;
  message: string;
  details?: any;
};

class ApiService {
  // ---------------------------------------------------------------------------
  static async getFootballTeams(): Promise<any> {
    return ApiService.get("leagues");
  }
  // ---------------------------------------------------------------------------
  private static async get(endpoint: string): Promise<any> {
    const url = `${ConfigService.getFootballApiUrl()}/${endpoint}`;
    const headers = ApiService.getHeaders();
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    return this.handleResponse(response);
  }

  // ---------------------------------------------------------------------------
  private static async handleResponse(response: Response): Promise<any> {
    const contentType = response.headers.get("Content-Type") || "";
    let data: any;

    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error: ApiError = {
        status: response.status,
        message: data.message || response.statusText || "An error occurred",
        details: data,
      };

      throw error;
    }

    return data;
  }

  // ---------------------------------------------------------------------------
  private static getHeaders() {
    const headers = new Headers();
    headers.append("x-rapidapi-key", `${ConfigService.getFootballApiKey()}`);
    headers.append("x-rapidapi-host", "v3.football.api-sports.io");

    return headers;
  }
}

export default ApiService;
