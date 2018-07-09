// Recommended abbreviation: `;mLink` for "Markdown Link".
// This snippet will ultimately return a Markdown link that uses the clipboard as the linked text and the url of the queried tab as the href.  
var textExpander = Application('TextExpander');
var app = Application.currentApplication();
app.includeStandardAdditions = true;

var savedClipboard = app.theClipboard();
app.setTheClipboardTo([savedClipboard, ';mLink']);

var doExpand = textExpander.expand({abbreviation:';_queryTheUrl'});