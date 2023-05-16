const fs = require('fs');
const path = require('path');

const optDefaults = {
	spaces: '',
	other: '',
};

// TODO: Test
module.exports = {
	slugify: (name, opts) => {
		const allOpts = Object.assign({}, optDefaults, opts);
		return name
			.toLowerCase()
			.replaceAll(/[\s]/g, allOpts.spaces)
			.replaceAll(/[\.]/g, allOpts.other);
	},
	createDir: (dir, kyu, name) => {
		try {
			const p = path.join(__dirname, '../../', dir, kyu, name);

			if (fs.existsSync(p)) {
				console.error("Dir already exists: " + p);
				return false;
			}

			fs.mkdirSync(p, { recursive: true })
			console.log("Created path: " + p);
			return p;
		} catch (err) {
			console.error("Could not create dir: " + err);
			return false;
		}
	},
	createFiles: (p, kyu, title) => {
		try {
			const sourceFile = path.join(p, 'solution.js');
			const testFile = path.join(p, 'solution.test.js');

			if (fs.existsSync(sourceFile) || fs.existsSync(testFile)) {
				console.error("Source and test files already exist");
				return false;
			}

			const sourceCode = `export default function NAME() {

			}`;

			const testCode = `import { describe, it } from "mocha";
import { assert } from "chai";
import solution from "./solution.js";

describe("${kyu}/${title}", function() {
});`;

			fs.writeFileSync(sourceFile, sourceCode);
			fs.writeFileSync(testFile, testCode);
			console.log(`\nSolution File: \u001b[33m${sourceFile}\u001b[0m`);
			console.log(`Test File:     \u001b[33m${testFile}\u001b[0m\n`);
			console.log(`Test Command:  \u001b[32mpnpm run test ${p}\u001b[0m`);
			console.log(`Watch Command: \u001b[36mpnpm run test:watch ${p}\u001b[0m`);
			return true;
		} catch (err) {
			console.error("Unable to create files: " + err);
			return false;
		}
	}
}
