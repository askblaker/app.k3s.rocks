import { atom } from "jotai";

export interface myStore {
  clusters: Cluster[];
  selectedCluster: Cluster;
  servers: Server[];
  selectedServer: Server;
}

interface Cluster {
  name: string;
  nodes: Node[];
}

export interface Server {
  id: string;
  name: string;
  ip: string;
  port: string;
  username: string;
  password?: string;
  useSSHKey: boolean;
  sshkeyId?: string;
}

export interface SSHKey {
  id: string;
  name: string;
  key: string;
}

export interface Profile {
  email?: String;
  domain?: String;
}

const clustersBase = atom([]);
const serversBase = atom<Server[]>([]);
const sshkeysBase = atom<SSHKey[]>([]);
const activeServerBase = atom([]);
const profileBase = atom<Profile>({});

export const clusters = atom(
  (get) => get(clustersBase),
  (get, set, newStr) => {
    set(clustersBase, newStr);
    localStorage.setItem("clusters", JSON.stringify(newStr));
  }
);

export const servers = atom(
  (get) => get(serversBase),
  (get, set, newStr) => {
    set(serversBase, newStr);
    localStorage.setItem("servers", JSON.stringify(newStr));
  }
);

export const sshkeys = atom(
  (get) => get(sshkeysBase),
  (get, set, newStr) => {
    set(sshkeysBase, newStr);
    localStorage.setItem("sshkeys", JSON.stringify(newStr));
  }
);

export const activeServerAtom = atom(
  (get) => get(activeServerBase),
  (get, set, newStr) => {
    set(activeServerBase, newStr);
    localStorage.setItem("activeServer", JSON.stringify(newStr));
  }
);

export const profileAtom = atom(
  (get) => get(profileBase),
  (get, set, newStr) => {
    set(profileBase, newStr);
    localStorage.setItem("profile", JSON.stringify(newStr));
  }
);
