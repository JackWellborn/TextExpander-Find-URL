# TextExpander-Find-URL
## Introduction
The scripts below are [TextExpander](https://textexpander.com/) snippets that, when used in conjunction, returns the url of a tab in the frontmost Safari window based on criteria immediately preceding the snippet. You can read about more about this project and why I created it [here](http://wormsandviruses.com/2018/07/textexpander-snippets-with-variables/). There are currently seven types of queries supported:

1. `+[any number]` will return the url of a tab based on absolute index where "1" is the first tab.
2. `-[any number]` will return the url of a tab based on negative absolute index where "-1" is the last tab.
3. `>[any number]` will return the url of a tab with an index relative to and _greater_ than the currently open tab. If the resulting index exceeds the total number of tabs available, this query will loop around.
4. `<[any number]` will return the url of a tab with an index relative to and _less_ than the currently open tab. If the resulting index is less than 0, this query will loop around.
5. `?[single word]` will return the url of the first tab that has a _title_ containing that word. Currently only `[a-zA-Z0-9]` is supported.
6. `/[single word]` will return the url of the first tab that has a _url_ containing that word. Currently only `[a-zA-Z0-9]` is supported.
7. Anything else will return the url of the current tab open.

## Instructions
1. Copy the contents of the JavaScript files into individual TextExpander snippets.
2. Set the __Content__ of each snippet to __JavaScript__
3. Copy the recommended abbreviations provided at the top of each JavaScript file to their corresponding snippets. 
4. Enable [Web Development Tools in Safari](https://developer.apple.com/safari/tools/).
5. In the __Develop__ menu, check __Allow JavaScript from Apple Events__

## Disclaimer
Be aware that this solution uses automation to control keyboard input, manipulate the clipboard, and access Safari. The scripts involved operate locally and only use these privileges to return Safari URLs as stated above and [here](http://wormsandviruses.com/2018/07/textexpander-snippets-with-variables/), but this authors recommends further scrutiny when any solution has these and similar elevated privileges. Additionally, the author considers this solution a workaround. Bolting together text expansion with automation is somewhat brittle. As such, it only works _most_ of the time. That said, this solution get's the job done for the author until a better one comes along. 