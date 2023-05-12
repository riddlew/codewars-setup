const scraper = require('./src/scraper');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { slugify, createDir, createFiles } = require('./src/fs');

const run = async () => {
	const argv = yargs(hideBin(process.argv)).argv;

	if (argv._.length !== 1) {
		console.error("Usage: pnpm run codewars CODEWARS_URL");
		process.exit();
	}
	const url = argv._[0];
	console.log(url);

	const [kyu, title] = await scraper.scrape(url);
	const kyuSlug = slugify(kyu, { spaces: '' });
	const titleSlug = slugify(title, { spaces: '-' });

	console.log(`kyu = ${kyuSlug}`)
	console.log(`title = ${titleSlug}`)
	const p = createDir('leetcode/leetcode-js/codewars', kyuSlug, titleSlug);
	if (p) {
		createFiles(p);
	}
};

run();
