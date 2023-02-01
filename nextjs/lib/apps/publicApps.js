import { default as certmanagerProductionIssuer } from "./certManagerProductionIssuer.json";
import { default as plausibleJson } from "./plausible.json";
import { default as whoamiTls } from "./whoami-tls.json";
import { default as whoamiJson } from "./whoami.json";

export const publicApps = [
  { name: "whoami", json: whoamiJson },
  { name: "whoami-tls", json: whoamiTls },
  { name: "plausible", json: plausibleJson },
  { name: "cert manager production", json: certmanagerProductionIssuer },
];
