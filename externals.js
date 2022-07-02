const cheerio = require('cheerio');
const request = require('request');
const getTitleAtUrl = require('get-title-at-url');
const usetube = require('usetube');
const youtubeTitleRequest = (youtubeVideoID, returnData, error) => {
	try {
		getTitleAtUrl(youtubeVideoID, (title) => {
			returnData({
				'title': title
			});
		});
	} catch {
		error(youtubeVideoID);
	}
}
const urlRequest = (strURL, error, returnData) => {
	request({
		method: 'GET',
		url: strURL
	}, (err, res, body) => {
		if(err) {
			error(strURL);
			return;
		}
		const $ = cheerio.load(body);
		$('script').remove();
		$('style').remove();
		// Get truncated body text
		let documentBody = $('body').text().toString().replace(/\n/g, '\n');
		documentBody = documentBody.replace(/\s\s+/g, '\n');
		let a = documentBody.substring(0);
		a = a.split(' ');
		let b = parseInt(a.length / 2);
		let truncatedBody = documentBody.substring(0, documentBody.substring(0).indexOf(a[b]));
		let imageCollect = [];
		let images = $('img').map(function() {
			if($(this).attr('src') !== undefined) {
				imageCollect.push($(this).attr('src'));
			}
		});
		let title = $('title');
		returnData({
			'body': documentBody,
			'title': title.text(),
			'images': imageCollect
		});
	});
};
exports.urlRequest = urlRequest;
exports.youtubeTitleRequest = youtubeTitleRequest;