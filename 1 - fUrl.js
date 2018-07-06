// Recommend abbreviation `;fUrl`.
// This snippet will ultimately return the url of the queried tab.
var textExpander = Application('TextExpander');
var app = Application.currentApplication();
app.includeStandardAdditions = true;

var savedClipboard = app.theClipboard();
app.setTheClipboardTo([savedClipboard, ';fUrl']);

var doExpand = textExpander.expand({abbreviation:';_queryTheUrl'});