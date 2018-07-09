// Recommended abbreviation: `;_returnTheUrl`
// This returns the url as the expansion formatted in the way specified in step 1.

var app = Application.currentApplication();
app.includeStandardAdditions = true;

var clipboard = app.theClipboard().list;

var originalClipboard = clipboard[0];
var originalSnippet = clipboard[1];
var urlToReturn = clipboard[2];
app.setTheClipboardTo(originalClipboard);

switch (originalSnippet) {
    case ';mLink':
        urlToReturn = '[' + originalClipboard + '](' + urlToReturn + ')';
        break;
}

urlToReturn;