const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
	scrape: async function(url) {
		try {
			const html = await axios(url);
			const $ = cheerio.load(html.data);
			const kyu =  $('#shell_content > div.px-0.w-full > div > div > div.flex.items-center > div > div > span').text()
			const kataName =  $('#shell_content > div.px-0.w-full > div > div > div.flex.items-center > h4').text()

			return [kyu, kataName]
		} catch (err) {
			console.error('Unable to scrape: ' + err);
		}
	}
};
