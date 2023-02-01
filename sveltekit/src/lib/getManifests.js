import * as fs from 'fs';
import yaml from 'js-yaml';

const folder = '/src/lib/manifests';
const cwd = process.cwd();

const list = () => {
	const files = fs.readdirSync(cwd + folder);
	let jsons = [];
	let texts = [];
	files.map((el) => {
		const filename = cwd + folder + '/' + el;
		const content = fs.readFileSync(filename, 'utf-8');
		texts.push(content);
		const json = yaml.loadAll(content);
		jsons.push(json);
	});
	let res = [];
	for (let i = 0; i < files.length; i++) {
		const name = files[i].replace('.yaml', '');
		const json = jsons[i];
		const text = texts[i];
		res.push({ name, json, text });
	}
	return res;
};

export const manifests = list();
