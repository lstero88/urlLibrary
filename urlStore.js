const externals = require('./externals')
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
let urlArray = [];
//const dirPath = 'libraries/library1';
const jsonFileName = 'store.json';
//const filePath = dirPath + '/' + jsonFileName;
let jsonArray;


//let data = fs.readFileSync(dirPath + '/list1.txt', "utf8");

//const splitData = data.split('\r\n');
//for(const item in splitData) {
//	if(splitData[item].length > 0 && splitData[item].toString() !== ' ') {
//		urlArray.push(splitData[item]);
//	}
//}
const getDate = () => {
	let currentDate = new Date();
	let dd = currentDate.getDate();
	let mm = currentDate.getMonth() + 1;
	let yyyy = currentDate.getFullYear();
	if(dd < 10) {
		dd = '0' + dd;
	}
	if(mm < 10) {
		mm = '0' + mm;
	}
	currentDate = mm + '/' + dd + '/' + yyyy;
	return currentDate;
}
class urlStore {
	constructor(dirPath, jsonFileName, filePath )
	{
		
			this.dirPath = dirPath;
			this.jsonFileName = jsonFileName;
			this.filePath = filePath;
			
 
		
	}
	getLastID() {
		let lastID;
		try
		{
			if(fs.existsSync(this.filePath)) {
				const data = fs.readFileSync(this.filePath, "utf8");
				const data1 = JSON.parse(data);
				if(data1.length > 0) {
					lastID = data1[data1.length - 1].id;
				} else {
					lastID = 0;
				}
				lastID = lastID + 1;
				return lastID;
			} else {
				return 0;
			}
		}
		catch {
			return -1;
		}
	}
	getURL(adr, callback) {
		let q = url.parse(adr, true);
		let getURL;
		let jsonWrite = [];
		switch(q.host) {
			case "www.youtube.com":
				getURL = externals.youtubeTitleRequest(adr,  (returnedData) => {
					let lastID = this.getLastID();
					jsonArray = {
						'id': lastID,
						'query_date': getDate(),
						'url': adr,
						title: returnedData.title
					};
					try {
						
						let fPath = this.filePath;
						
						if(fs.existsSync(this.filePath)) {
							fs.readFile(this.filePath, function(err, data) {
								let json = JSON.parse(data);
								json.push(jsonArray);
								//console.log(json);
								
								fs.writeFile(fPath, JSON.stringify(json), function(err) {
									if(err) throw err;
									console.log('Writing completed!');
									callback(jsonArray);
								});
							})
						} else {
							jsonWrite.push(jsonArray);
							fs.writeFile(this.filePath, JSON.stringify(jsonWrite), function(err) {
								if(err) throw err;
								console.log('Writing completed!');
								callback(jsonArray);
							});
						}
					} catch(err) {
						console.log(err);
					}
				},                    (urlError) => {
					console.log("An error occurred for URL " + urlError);
					jsonArray = {
						error: 'An error occurred for URL ' + urlError
					};
					callback(jsonArray);
				}        );
				break;
			default:
				getURL = externals.urlRequest(adr, (urlError) => {
					console.log("An error occurred for URL " + urlError);
					jsonArray = {
						error: 'An error occurred for URL ' + urlError
					};
					callback(jsonArray);
				}, (returnedData) => {
					let lastID = this.getLastID();
 
					//console.log(lastID);
					//console.log(returnedData.title);
					
					if(lastID == -1) {
						lastID = 0;
						

						jsonWrite.push(jsonArray);
						fs.writeFile(this.filePath, JSON.stringify(jsonWrite), function(err) {
							if(err) throw err;
							console.log('Writing completed!');
							callback(jsonArray);
						});		
						
						
					}
					
					jsonArray = {
						'id': lastID,
						'query_date': getDate(),
						'url': adr,
						body: returnedData.body,
						title: returnedData.title,
						images: returnedData.images
					};
					try {
						
							
 
									//console.log(this.filePath);				
						let fPath = this.filePath;
						
						if(fs.existsSync(this.filePath)) {
							

							console.log(this.filePath);
							
							let fPath = this.filePath;
							
							fs.readFile(this.filePath, function(err, data) {
								try {
									let json = JSON.parse(data);
									json.push(jsonArray);
									
 				
							
									fs.writeFile(fPath, JSON.stringify(json), function(err) {
										if(err) {
											console.log("an error occurred.");
										}
										console.log('Writing completed!');
										callback(jsonArray);
									});
								} catch(e) {}
							})
						} else {
							jsonWrite.push(jsonArray);
							
 
							
							fs.writeFile(this.filePath.replace(/ /g, ''), JSON.stringify(jsonWrite), function(err) {
								if(err) throw err;
								console.log('Writing completed!');
								callback(jsonArray);
							});
						}
					} catch(err) {
						console.log(err);
					}
				});
		}
	}
}
//let urlParse = new urlParser();
//for(const item in urlArray) {
//console.log(urlArray[item]);
//       urlParse.getURL(urlArray[item]);
//}
// console.log("final URL Array");
// console.log(urlArray);
//urlParse.getURL('https://www.youtube.com/watch?v=n5Qpg-iZPT8');
//urlParse.getURL('http://www.msn.com', (returnData) => {
//});
exports.urlStore = urlStore;