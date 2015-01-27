var colors = require('colors'),
	copypaste = require('copy-paste'),
	fs = require('fs'),
	path = require('path');
var fileOrder = ['alloyjs','apptss','appjs','xml','tss','js'],
	sourceFiles = [],
	classicPrefix = '{code:title=Resources/FILENAME}',
	alloyPrefix = '{code:title=app/TYPE/FILENAME}',
	suffix = '{code}',
	finalOutput = '';


// grab command arguments
var program = require('commander');
program
  .version(require('./package.json').version)
  .option('-p, --projpath [path]', 'Path to your project (default: current directory)')
  .option('-o, --outpath  [path]', 'Path to where to save the results (default: copy to clipboard')
  .option('-f, --filename [path]', 'File name in which to save the results (default: project_name_JIRA.txt')
  .option('-v, --version', 'Output the version number')
  .parse(process.argv);

var outputPath = (program.outpath) ? path.resolve(program.outpath) : path.resolve(getUserHome()),
	projectPath = (program.projpath) ? path.resolve(program.projpath) : path.resolve('.'),
	fileName = (program.filename) ? program.filename : projectPath.split(path.sep).reverse()[0] + '_JIRA.txt';

if(!projectPath || !fs.existsSync(projectPath)) {
	console.log('Project path not found').red;
	process.exit(1);
}

// determine if we have an Alloy or Classic project
var isAlloy = true === (fs.existsSync(path.join(projectPath, 'app')) && fs.existsSync(path.join(projectPath, 'plugins', 'ti.alloy')));

/*
	Main logic:
		- Determine if Alloy or Classic project
		- Read in the files of the project and create entries in
		- Create entries in sourceFiles array
		- Sort
		- Generate and output the text

*/
if(isAlloy) {
	// get the alloy.js first, if it exists
	if(fs.existsSync(path.join(projectPath, 'app', 'alloy.js'))) {
		sourceFiles.push(createSourceFile('alloy.js', ''));
	}
	// grab the index.xml if it exists
	if(fs.existsSync(path.join(projectPath, 'app', 'views', 'index.xml'))) {
		sourceFiles.push(createSourceFile('index.xml', 'views'));
	}
	// TO-DO: Loop here to grab all the other views

	// controllers, starting with index.js
	if(fs.existsSync(path.join(projectPath, 'app', 'controllers', 'index.js'))) {
		sourceFiles.push(createSourceFile('index.js', 'controllers'));
	}
	// TO-DO: Loop here to grab all the other controllers

	// styles, starting with app.tss and index.tss
	if(fs.existsSync(path.join(projectPath, 'app', 'styles', 'app.tss'))) {
		sourceFiles.push(createSourceFile('app.tss', 'styles'));
	}
	if(fs.existsSync(path.join(projectPath, 'app', 'styles', 'index.tss'))) {
		sourceFiles.push(createSourceFile('index.tss', 'styles'));
	}
	// TO-DO: Loop here to grab all the other style sheets

} else {
	// controllers, starting with app.js
	if(fs.existsSync(path.join(projectPath, 'Resources', 'app.js'))) {
		sourceFiles.push(createSourceFile('app.js'));
	}
	// TO-DO: Loop here to grab all the other controllers
}

sourceFiles.forEach(function(element, index, array) {
	finalOutput += formatOutput(element);
});


if(program.filename || program.outpath) {
	// output to file
	fs.writeFileSync(path.join(outputPath, fileName), finalOutput);
	console.log('Output saved to ' + path.join(outputPath, fileName));
} else {
	copypaste.copy(finalOutput);
	console.log("\n App parsed and copied to clipboard. Paste into your ticket's Description field.");
}

/* -------------------------
	HELPER FUNCTIONS
*/

function createSourceFile(file, type) {
	// read the file
	var filename;
	if(isAlloy) {
		if(typeof type === 'undefined' || type === null) {
			throw 'Unspecified file type';
			process.exit(1);
		}
		filePath = path.join(projectPath, 'app', type, file);
	} else {
		filePath = path.join(projectPath, 'Resources', file);
	}
	return {
		fileName: file,
		fileType: type, //'xml/tss/js/alloyjs/apptss/appjs',
		fileContents: fs.readFileSync(filePath).toString()
	}
}

function formatOutput(fObject) {
	if(isAlloy) {
		return (alloyPrefix.replace('TYPE', fObject.fileType).replace('FILENAME', fObject.fileName)).replace('//', '/') + "\n" + fObject.fileContents + "\n" + suffix + "\n\n";
	} else {
		return classicPrefix.replace('FILENAME', fObject.fileName) + "\n" + fObject.fileContents + "\n" + suffix + "\n\n";
	}
}

function getUserHome() {
	return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

