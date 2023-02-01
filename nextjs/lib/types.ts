import { Server } from "./store";

export interface ApiCallBody {
  server: Server;
  command: string;
  sshKey?: string;
}
