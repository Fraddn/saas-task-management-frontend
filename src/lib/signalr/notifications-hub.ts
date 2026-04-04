import * as signalR from "@microsoft/signalr";
import { getToken } from "@/lib/auth/token-storage";

let connection: signalR.HubConnection | null = null;
let starting: Promise<void> | null = null;

export function getNotificationsConnection(): signalR.HubConnection {
  if (connection) return connection;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${apiBaseUrl}/hubs/notifications`, {
      accessTokenFactory: () => getToken() ?? "",
    })
    .configureLogging(signalR.LogLevel.None)
    .build();

  // Reset singleton so the next attempt creates a fresh connection
  connection.onclose(() => {
    connection = null;
    starting = null;
  });

  return connection;
}

export async function startConnection(): Promise<void> {
  const token = getToken();
  if (!token) return; // Don't attempt connection without a token

  const conn = getNotificationsConnection();
  if (conn.state === signalR.HubConnectionState.Disconnected) {
    if (!starting) {
      starting = conn.start().finally(() => {
        starting = null;
      });
    }
    await starting;
  } else if (starting) {
    await starting;
  }
}

export async function stopConnection(): Promise<void> {
  if (connection && connection.state !== signalR.HubConnectionState.Disconnected) {
    await connection.stop();
  }
  connection = null;
  starting = null;
}
