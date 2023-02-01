import { ApiCallBody } from "../../lib/types";
import { NodeSSH } from "node-ssh";

// disable console.log anywhere but development
if (process.env.NODE_ENV !== "development") {
  console.log("Disabling loggin");
  console.log = function () {};
} else {
  console.log(
    `You are running in NODE_ENV='${process.env.NODE_ENV}', logging enabled`
  );
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body: ApiCallBody = JSON.parse(req.body);
    const ssh = new NodeSSH();

    let options: any = {
      host: body.server.ip,
      username: body.server.username,
      port: body.server.port,
    };

    if (body.server.useSSHKey) {
      options.privateKey = body.sshKey.replace(/\\n/g, "\n").trim();
    } else {
      options.password = body.server.password;
    }

    try {
      await ssh.connect(options);
    } catch (e) {
      console.log(`SSH Connection error: ${e}`);
      return res
        .status(500)
        .json({ error: e, detail: `SSH Connection error: ${e}` });
    }
    try {
      res.writeHead(200, {
        "Cache-control": "no-cache",
        charset: "utf-8",
        "Transfer-Encoding": "chunked",
      });
      await ssh.exec(body.command, [], {
        onStdout(chunk) {
          console.log("stdoutChunk", chunk.toString("utf8"));
          res.write(chunk.toString("utf8"));
        },
        onStderr(chunk) {
          console.log("stderrChunk", chunk.toString("utf8"));
          res.write(chunk.toString("utf8"));
        },
        stream: "both",
        stdin: body.server.password ? body.server.password + "\n" : undefined,
      });
      res.write("\n");
      res.write("$");
      res.end();
      console.log("SSH Done!");
    } catch (e) {
      console.log("error catched:", e);
      res.write("ERROR!");
      res.write(JSON.stringify({ error: e }));
      res.write("\n");
      res.write("$");
      res.end();
    }
  }
}
