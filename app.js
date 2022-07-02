var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
const express = require('express');
const externals = require('./externals');
const urlStore = require('./urlStore')
const path = require('path');
const url = require('url');
const querystring = require('querystring');
//const puppeteer = require("puppeteer");
let backend = require("./backend");
let srcFolderName, srcFolderID;
let txtFileFolderName, txtFilesFolderID;
let csvFileFolderName, csvFilesFolderID;
let graphFileFolderName, graphFilesFolderID;
let appFiles = {
	'app7.html': 'app7.js'
}
let folders = {
	'srcfiles': '1__Tsbwv5KgVt6Ax_Kc5VsRsXq7b_Jmun',
	'txttiles': '1aBOYl4whyoyINeoEq9GoazubTRsTXWcP',
	'csvfiles': '138IvW05lR0v3xLo6exGQkgX4OFhP4RgX',
	'graphfiles': '1BEBmZ_y8BOTP-ykxstsYafjxOQ4QHOy-',
}
let appName = {
	'app7': 'URL Store'
}

function removeComments(string) {
	return string.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '').trim();
}

function initializeFolders() {
	for([index, [key, value]] of Object.entries(Object.entries(folders))) {
		console.log(`${index}: ${key}: ${value}`);
		if(index == 0) {
			srcFolderName = key;
			srcFolderID = value;
		} else if(index == 1) {
			txtFileFolderName = key;
			txtFilesFolderID = value;
		} else if(index == 2) {
			csvFileFolderName = key;
			csvFilesFolderID = value;
		} else if(index == 3) {
			graphFileFolderName = key;
			graphFilesFolderID = value
		}
	}
}
initializeFolders();
let DriveApp = new backend.registerBackend(srcFolderName, srcFolderID, txtFileFolderName, txtFilesFolderID, csvFileFolderName, csvFilesFolderID.graphFileFolderName, graphFilesFolderID);

function loadFile(filePath) {
	let array1 = [];
	require('fs').readFileSync(filePath, 'utf-8').split(/\r?\n/).forEach(function(line) {
		array1.push(line);
	})
	return array1;
}

 
const parentDirectory = path.join(__dirname, 'libraries');

//const dirPath = 'libraries/library33';
let dirPath = '';
const jsonFileName = 'store.json';
let filePath = dirPath + '/' + jsonFileName;


//let urlObj = new urlStore.urlStore(dirPath, jsonFileName, filePath);
let urlObj;

 

function calculateTimeInterval1(fileSize) {
	let mbps = 5;
	let result = (fileSize / mbps) * 1000;
	if(result < 1000) {
		result = 1000;
	}
	return result;
}



function loadSpecifiedPage(pageNumber, resultsPerPage) {
		console.log("here in the loadSpecifiedPage method.");
		
			try
			{
			let jsonArray;
			let data = fs.readFileSync(filePath, "utf8");
		//	documentData = {
		//		returnType: 'allDataLoaded',
		//		data: JSON.parse(data)
		//	};		
		
 
		
		
		let jsonData = JSON.parse(data);
		//console.log(JSON.parse(data));
		
		console.log("THE LENGTH");
		console.log(jsonData.length);
		
		let collectScope = [];
		
		
		//console.log(`here is the length ${jsonData.length}`);
	//	console.log(`pageNumber: ${pageNumber}`);
	//	console.log(`resultsPerPage: ${resultsPerPage}`);
		
		let totalLength =  jsonData.length;
		let determinePageCount = totalLength % resultsPerPage;
		let pageCount;

		if(determinePageCount > 0)
		{
			pageCount = Math. ceil(totalLength / resultsPerPage);
		}
		else	
		{
			pageCount = totalLength / resultsPerPage;
		}

		
		totalLength -= 1;
		startingIndex = totalLength;
		
		let c = 0;
		
		for(let a = 1; a <= pageCount;  a++)
		{
			if(a == pageNumber)
			{
					if(a > 1) 
					{
							startingIndex -= (resultsPerPage*(a-1));
					}
					
 
					let start = startingIndex;
					let end = startingIndex - (resultsPerPage-1);
					
					if(end < 0)
					{
							console.log('negative detection');
							end = 0;		
					}
					
 
					//for(let b = start; b >= end; b--)
					//{
					//	collectScope.push(jsonData[b]);				
					//}



					for(let b = end; b <= start; b++)
					{
						collectScope.push(jsonData[b]);				
					}

//					console.log('here is the collect scope data');
					
					
					//for(let c = 0; c < collectScope.length; c++) 
					
//					{
//						console.log(collectScope[c].id);					
//					}
					
					break;
					
			}
			
		}
		
		
		return [collectScope, pageCount];
 
			}
			
			catch (e){
		//		console.log(e);
				//let data = fs.readFileSync(filePath, "utf8");
				 
				//console.log(data);
				//console.log(data.length);
				return ['', 1]
			}
		
		
		return 1;
}



function getTotalPages(resultsPerPage) {
//	let totalLength =  jsonData.length;
//	let determinePageCount = totalLength % resultsPerPage;
//	let pageCount;

//	if(determinePageCount > 0)
//	{
//		pageCount = Math. ceil(totalLength / resultsPerPage);
//	}
//	else	
//	{
//		pageCount = totalLength / resultsPerPage;
//	}


			let jsonArray;
			let data = fs.readFileSync(filePath, "utf8");
			
			
			let jsonData = JSON.parse(data);	
			
			let totalLength =  jsonData.length;
			
			
			
			let determinePageCount = totalLength % resultsPerPage;
			let pageCount;
			
			if(determinePageCount > 0)
			{
				pageCount = Math. ceil(totalLength / resultsPerPage);
				 
			}
			else	
			{
				pageCount = totalLength / resultsPerPage;
			}
		
 
		
			return pageCount;
	
}



	function generateRandomColor() {
		
		let randomNumber = Math.floor(Math.random() * (11 - 0)) + 0;
		let randomHex;
		
		switch(randomNumber) 
		
		{
			
			case 0:
				randomHex = '#990000';
				break;
			case 1:
				randomHex = '#ff0000';
				break;
			case 2:
				randomHex = '#FFA500';
				break;	
			case 3:
				randomHex = '#FBCEB1';
				break;	
			case 4:
				randomHex = '#ADD8E6';
				break;
			case 5:
				randomHex = '#0000FF';
				break;	
			case 6:
				randomHex = '#000080';
				break;	
			case 7:
				randomHex = '#1E5631';
				break;			
			case 8:
				randomHex = '#76BA1B';
				break;		
			case 9:
				randomHex = '#e75480';
				break;			
			case 10:
				randomHex = '#000000';	
				break;					
			case 11:
				randomHex = '#44AEB3';			
				break;					
			default:
				 randomHex = '#000000';
				break;

			
		}
		
		
		return randomHex;
		
	}

 

 function getDirectoryCSVFile(directoryName) {

	settingsJSONFile = directoryName+'/settings.json'
	 
	fs.readFile(parentDirectory+'/'+settingsJSONFile, (err, data) => {
		if (err) throw err;
		let parseData = JSON.parse(data);
		console.log(parseData);
		
		
		return parseData;
		
	});
		 
	 
 
 }
 
 
 function setFilePath(fPath) {
	 
	 	//filePath = fPath.replace(/ /g, '_');
		filePath = fPath.replace(/  +/g, '');
		
	//	filePath = filePath.replace('__', '_');
 
		 
 
 }



 
app.use(express.static('public'));
app.use('/images', express.static('images'));
app.get('/', function(req, res) {
	res.sendFile('app7.html', {
		root: '.'
	});
});

io.on('connection', function(socket) {
	console.log('A user connected');
	socket.emit('connection_accept', '');
	socket.on('client_msg', function(message) {
		let htmlPage;
		let jsData;
		let htmlData;
		let parseJSON = message;
		htmlPage = parseJSON.appHTML;
		console.log("message");
		console.log(message);
		if(parseJSON.command == 'loadApp') {
			for(app in appFiles) {
				if(app == htmlPage) {
					htmlData = loadFile(app);
					jsData = loadFile(srcFolderName + '/' + appFiles[app]);
					break;
				}
			}
			let buildJS = "";
			let buildHTML = "";
			for(var i = 0; i < jsData.length; i++) {
				buildJS += removeComments(jsData[i]);
			}
			for(var i = 0; i < htmlData.length; i++) {
				buildHTML += removeComments(htmlData[i]);
			}
			documentData = {
				returnType: 'loadedAppData',
				javascript: buildJS,
				html: buildHTML
			}
			socket.emit('server_msg', JSON.stringify(documentData));
		}   
		
		else if(parseJSON.command == 'createNewLibrary') {

				
				console.log(parseJSON.libraryName);
				console.log(parseJSON.libraryDescription);
				
				let libraryName = parseJSON.libraryName;
				let libraryDescription = parseJSON.libraryDescription;
				
				
				// Create the directory
				try {
					  if (!fs.existsSync('libraries/'+ libraryName)) {
						fs.mkdirSync('libraries/'+ libraryName);
						console.log('library ' + libraryName + ' created!');
						
						
						let libraryDataJSON = { libraryDescription: libraryDescription, logoColor: generateRandomColor() };
						
						let jsonOutput = JSON.stringify(libraryDataJSON);
						fs.writeFileSync('libraries/'+ libraryName + '/settings.json', jsonOutput);
						
						documentData = {
							returnType: 'libraryCreatedSuccess',
							libraryName: libraryName
						};
						
						socket.emit('server_msg', JSON.stringify(documentData));
												
					  }
					  else
					  {
						  	documentData = {
								returnType: 'libraryCreatedFail',
								libraryName: libraryName
							};
							
							socket.emit('server_msg', JSON.stringify(documentData));
					  }
				} catch (err) {
				  console.error(err);
				}
		}
		
		else if(parseJSON.command == 'deleteLibrary') {
				
				let directory = parseJSON.libraryName;
				
					try
					{
						fs.rmdirSync(parentDirectory+'/'+directory,  { recursive: true, force: true });

						documentData = {
								returnType: 'deleteURLLibrary',
								libraryName: directory
						};

						
			 
						socket.emit('server_msg', JSON.stringify(documentData));


					}
					
					catch(err) {
						console.log(err);
						
					}	
				
		}
		
		else if(parseJSON.command == 'getURLLibraryList') {
			
			
			let directoryArray = [];
			let directories;
			
			directories = fs.readdirSync(parentDirectory);
			
			try
			{
					directories.forEach(function (directory) {
						
							let settingsJSONFile = parentDirectory+'/' + directory+'/settings.json';
							
							try
							{
								const getData = fs.readFileSync(settingsJSONFile).toString();
								const parseData = JSON.parse(getData);
			 
								 
								// Display the file data
								directoryArray.push([directory, parseData.libraryDescription, parseData.logoColor ]);
								

								}
							catch {}
					});
			}
			catch(e) {
				
				console.log(e);
			}
			
			documentData = {
					returnType: 'urlLibraryListRetrieved',
					directoryList: directoryArray
			};

			socket.emit('server_msg', JSON.stringify(documentData));
			
			 

		}

		else if(parseJSON.command == 'loadAllData') {
					let urlArray = [];
					
					let libraryName = parseJSON.libraryName;
					
					dirPath = 'libraries/'+libraryName;
					setFilePath(dirPath + '/' + jsonFileName)		
					
 
 
					if(fs.existsSync(filePath)) {
							
	 
						
							let jsonArray;
							let data = fs.readFileSync(filePath, "utf8");
							documentData = {
								returnType: 'allDataLoaded',
								data: JSON.parse(data)
							};
							socket.emit('server_msg', JSON.stringify(documentData));
					}
				} 
				
				else  if(parseJSON.command == 'loadPage')
				{
					
					let libraryName = parseJSON.libraryName;
					
					dirPath = 'libraries/'+libraryName;
					setFilePath(dirPath + '/' + jsonFileName)	

					let pageNumber = parseJSON.parameters.pageNumber;
					let resultsPerPage = parseJSON.parameters.resultsPerPage;
					
					let specifiedPageInformation = loadSpecifiedPage(pageNumber, resultsPerPage);
					let getResults = specifiedPageInformation[0];
					let totalPages =  specifiedPageInformation[1];
						
					documentData = {
						returnType: 'pageLoaded',
						data: getResults,
						pageNumber: pageNumber,
						resultsPerPage: resultsPerPage,
						totalPages: totalPages
						  
					};
					
					
		 
					
					socket.emit('server_msg', JSON.stringify(documentData));
					
				}
				
				
		else if(parseJSON.command == 'getURLData') {
			
			let resultsPerPage = parseJSON.resultsPerPage;		
		
			dirPath = 'libraries/'+parseJSON.libraryName;
			setFilePath(dirPath + '/' + jsonFileName)	

			
			urlObj = new urlStore.urlStore(dirPath, jsonFileName, filePath);	 

			
			let theURL = parseJSON.parameters;
			
 
			
		//	theURL = theURL.replace(' ', "");
			
			//let urlGrab = new urlParse.urlParser();
			urlObj.getURL(theURL, function(jsonData) {
					console.log('marker a');
				if(typeof(jsonData.error) != 'undefined') {
					console.log('marker b');
					if(typeof(jsonData.data) !== undefined) {
						documentData = {
							returnType: 'urlData',
							returnStatus: 'fail',
							data: jsonData.error
						};
					} else {
						let errorMessage = 'An unknown error occurred.'
						documentData = {
							returnType: 'urlData',
							returnStatus: 'fail',
							data: errorMessage
						};
					}
				} else {
					
 
					documentData = {
						returnType: 'urlData',
						returnStatus: 'success',
						data: jsonData,
						pageCount: getTotalPages(resultsPerPage)
					};
				}

				
				socket.emit('server_msg', JSON.stringify(documentData));
			});
		} 			
				


		
	});
	socket.on('disconnect', function() {
		console.log('A user disconnected');
	});
});
http.listen(process.env.PORT || 3000, function() {
	console.log('listening on *:3000');
});