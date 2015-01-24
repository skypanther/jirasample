# Jira Sample Builder

Generates text from your Titanium project to be pasted into a Jira ticket.

## Installation

Not published to NPM. So, install right from GitHub.

```
[sudo] npm install -g git://....
```

## Usage

```
≫ jirasample -h

  Usage: jirasample [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -p, --projpath [path]  Path to your project (default: current directory)
    -o, --outpath  [path]  Path to where to save the results (default: output to console
    -f, --filename [path]  File name in which to save the results (default: project_name_JIRA.txt
    -v, --version          Output the version number
```

## Sample output

```
{code:title=app/alloy.js}
// alloy.js code here
{code}

{code:title=app/views/index.xml}
<Alloy>
    <Window>
    </Window>
</Alloy>

{code}

{code:title=app/controllers/index.js}
var args = arguments[0] || {};

$.index.open();
{code}

{code:title=app/styles/index.tss}
"Window": {
	backgroundColor: '#fff',
	navBarHidden: true,
	exitOnClose: true
}

{code}
```

# Changelog

* 0.0.1 - Initial git push


# License

The MIT License (MIT)

Copyright (c) 2015 Tim Poulsen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

