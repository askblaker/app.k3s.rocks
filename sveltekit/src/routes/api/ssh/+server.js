import { NodeSSH } from 'node-ssh';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	const ssh = new NodeSSH();
	const body = await request.json();
	let options = {
		host: body.host,
		username: body.username,
		port: body.port,
		readyTimeout: 2000,
		password: undefined,
		privateKey: undefined
	};

	if (body.useKey) {
		options.privateKey = body.sshKey.replace(/\\n/g, '\n').trim();
	} else {
		options.password = body.password;
	}

	try {
		await ssh.connect(options);
	} catch (e) {
		console.log(`SSH Connection error: ${e}`);
		return json({ err: `SSH Connection error: ${e}` }, { status: 400 });
	}
	try {
		const readable = new ReadableStream({
			start: async (controller) => {
				await ssh.exec(body.command, [], {
					onStdout(chunk) {
						//console.log('stdoutChunk', chunk.toString('utf8'));
						controller.enqueue(chunk.toString('utf8'));
					},
					onStderr(chunk) {
						//console.log('stderrChunk', chunk.toString('utf8'));
						controller.enqueue(chunk.toString('utf8'));
					},
					stream: 'both',
					stdin: options.password ? options.password + '\n' : undefined
				});
				controller.close();
			}
		});
		return new Response(readable);
	} catch (e) {
		console.log('error catched:', e);
		return json({ error: e }, { status: 500 });
	}
}
