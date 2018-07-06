// Recommended abbreviation: `;_queryTheUrl`
// This file parses copies and parses the two preceding words, parses any found queries, and tries to store a url from a tab that matches that query. 
var textExpander = Application('TextExpander');
var safari = Application("Safari");
safari.includeStandardAdditions = true;
var app = Application.currentApplication();
app.includeStandardAdditions = true;

const AT_START = "error at start";
if(typeof app.theClipboard().list !== "undefined" && app.theClipboard().list.length == 2) {
	var savedClipboard = app.theClipboard().list;
	textExpander.expansionEnabled = false;

	var systemEvents = Application("System Events");
	systemEvents.includeStandardAdditions = true;

	var queryCharacter, queryParameter;
	var queryCharacters = ['<','>','+','-','?','/'];
	try {
		systemEvents.keyCode(123, {using:["shift down", "option down"]});
		systemEvents.keyCode(123, {using:["shift down"]});
		systemEvents.keystroke('c',{using:["command down"]});
		delay(.2);
		var fullQuery = app.theClipboard();
		queryCharacter = fullQuery.charAt(0);
		queryParameter =  fullQuery.slice(1);
	} catch (e) {
		queryCharacter = AT_START;
	}
	if(queryCharacters.indexOf(queryCharacter) >= 0) {
		systemEvents.keyCode(51); 
		delay(.2);
		var urlToReturn = '';
		switch(queryCharacter) {
			case "+":
				urlToReturn = getTabByAbsoluteIndex(parseInt(queryParameter, 10));
				break;
			case "-":
				urlToReturn = getTabByAbsoluteIndex(parseInt(queryParameter, 10)*-1);
				break;
			case ">":
				urlToReturn = getTabByRelativeIndex(parseInt(queryParameter, 10));
				break;
			case "<":
				urlToReturn = getTabByRelativeIndex(parseInt(queryParameter, 10)*-1);
				break;
			case "/":
				urlToReturn = getTabsWithUrlsThatContain(queryParameter);
				break;
			case "?":
				urlToReturn = getTabsWithTitlesThatContain(queryParameter);
				break;
		}
	} else {
		if (queryCharacter !== AT_START) {
			systemEvents.keyCode(124);
			systemEvents.keyCode(124);
		}
		delay(.2);
		urlToReturn = safari.windows[0].currentTab().url();
	}

	savedClipboard.push(urlToReturn);
	app.setTheClipboardTo(savedClipboard);

	var expansionEnabled = textExpander.expansionEnabled = true;
	var doExpand = textExpander.expand({abbreviation:';_returnTheUrl'});
} 

function getTabByAbsoluteIndex(query) {
	var index;
	
	if (query > safari.windows[0].tabs.length) {
		query = query % safari.windows[0].tabs.length;
	}
	if ( query < 0 ) {
		index = safari.windows[0].tabs().length + query;
	} else {
		index = query - 1;
	}
	return safari.windows[0].tabs[index].url();
}

function getTabByRelativeIndex(query) {
	var currentTab = safari.windows[0].currentTab();
	var relativeTabIndex = currentTab.index()-1 + query;
	if (relativeTabIndex >= safari.windows[0].tabs().length) {
		relativeTabIndex = relativeTabIndex - safari.windows[0].tabs().length;
	}
	return safari.windows[0].tabs[relativeTabIndex].url();
}

function getTabsWithUrlsThatContain(query) {
	var urls = [];
	var tabs = safari.windows[0].tabs.whose({ url:{ _contains: query }});
	tabs().forEach(function(tab) {
		urls.push(tab.url());
	});
	return urls[0];
}

function getTabsWithTitlesThatContain(query) {
	var titles = [];
	var tabs = safari.windows[0].tabs.whose({ name:{ _contains: query }});
	tabs().forEach(function(tab) {
		titles.push(tab.url());
	});
	return titles[0];
}
