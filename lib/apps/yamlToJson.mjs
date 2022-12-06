// extension .mjs to stop next.js from complaining about "type":"module" in package.json
import * as fs from "fs";
import * as yaml from "js-yaml";

let yamls = [];

fs.readdirSync("./lib/apps/").forEach((file) => {
  if (file.endsWith(".yaml") || file.endsWith(".yml")) {
    yamls.push(file);
  }
});

for (let file of yamls) {
  let data = fs.readFileSync("lib/apps/" + file);
  const loaded = yaml.loadAll(data, "utf-8");
  fs.writeFileSync(
    "lib/apps/" + file.split(".")[0] + ".json",
    JSON.stringify(loaded, null, 2)
  );
}
