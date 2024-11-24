---
title: Code Block Examples
description: Examples of code blocks with syntax highlighting.
pubDate: 'Nov 13, 2024'
heroImage: './expressive-code-examples.jpg'
---

Samples are copied from the [Expressive Code docs](https://expressive-code.com/).

## Syntax Highlighting

### JavaScript

```js
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet('World');
```

### Python

```python
def greet(name):
    if not name:
        raise ValueError("Name is required")
    print(f"Hello, {name}!")

try:
    greet('World')
    greet('')  # This will raise an exception
except ValueError as e:
    print(e)
```

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
        }
        h1 {
            color: #007acc;
        }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a more complex HTML example with inline CSS.</p>
    <script>
        document.querySelector('h1').addEventListener('click', () => {
            alert('Hello, World!');
        });
    </script>
</body>
</html>
```

### CSS

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    color: #333;
    margin: 0;
    padding: 0;
}

h1 {
    color: #007acc;
    text-align: center;
    margin-top: 20px;
}

p {
    font-size: 1.2em;
    line-height: 1.5;
    margin: 20px;
}
```

### Rendering ANSI escape sequences

```ansi
ANSI colors:
- Regular: [31mRed[0m [32mGreen[0m [33mYellow[0m [34mBlue[0m [35mMagenta[0m [36mCyan[0m
- Bold:    [1;31mRed[0m [1;32mGreen[0m [1;33mYellow[0m [1;34mBlue[0m [1;35mMagenta[0m [1;36mCyan[0m
- Dimmed:  [2;31mRed[0m [2;32mGreen[0m [2;33mYellow[0m [2;34mBlue[0m [2;35mMagenta[0m [2;36mCyan[0m

256 colors (showing colors 160-177):
[38;5;160m160 [38;5;161m161 [38;5;162m162 [38;5;163m163 [38;5;164m164 [38;5;165m165[0m
[38;5;166m166 [38;5;167m167 [38;5;168m168 [38;5;169m169 [38;5;170m170 [38;5;171m171[0m
[38;5;172m172 [38;5;173m173 [38;5;174m174 [38;5;175m175 [38;5;176m176 [38;5;177m177[0m

Full RGB colors:
[38;2;34;139;34mForestGreen - RGB(34, 139, 34)[0m

Text formatting: [1mBold[0m [2mDimmed[0m [3mItalic[0m [4mUnderline[0m
```

## Editor & Terminal Frames

### Code editor frames

```js title="my-test-file.js"
console.log('Title attribute example')
```

```html
<!-- src/content/index.html -->
<div>File name comment example</div>
```

### Terminal frames

```bash
echo "This terminal frame has no title"
```

```powershell title="PowerShell terminal example"
Write-Output "This one has a title!"
```

### Overriding frame types

```sh frame="none"
echo "Look ma, no frame!"
```

```ps frame="code" title="PowerShell Profile.ps1"
# Without overriding, this would be a terminal frame
function Watch-Tail { Get-Content -Tail 20 -Wait $args }
New-Alias tail Watch-Tail
```

## Text & Line Markers

### Marking full lines & line ranges

```js {1, 4, 7-8}
// Line 1 - targeted by line number
// Line 2
// Line 3
// Line 4 - targeted by line number
// Line 5
// Line 6
// Line 7 - targeted by range "7-8"
// Line 8 - targeted by range "7-8"
```

### Selecting line marker types (`mark`, `ins`, `del`)

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log('this line is marked as deleted')
  // This line and the next one are marked as inserted
  console.log('this is the second inserted line')

  return 'this line uses the neutral default marker type'
}
```

### Adding labels to line markers

```jsx {"1":5} del={"2":7-8} ins={"3":10-12}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children &&
    !active &&
    (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```

```jsx {"1. Provide the value prop here:":5-6} del={"2. Remove the disabled and active states:":8-10} ins={"3. Add this to render the children inside the button:":12-15}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}

  value={value}
  className={buttonClassName}

  disabled={disabled}
  active={active}
>

  {children &&
    !active &&
    (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```

### Using `diff`-like syntax

```diff
+this line will be marked as inserted
-this line will be marked as deleted
this is a regular line
```

```diff
--- a/README.md
+++ b/README.md
@@ -1,3 +1,4 @@
+this is an actual diff file
-all contents will remain unmodified
 no whitespace will be removed either
```

### Combining syntax highlighting with `diff`-like syntax

```diff lang="js"
  function thisIsJavaScript() {
    // This entire block gets highlighted as JavaScript,
    // and we can still add diff markers to it!
-   console.log('Old code to be removed')
+   console.log('New and shiny code!')
  }
```

### Marking individual text inside lines

#### Plaintext search strings

```js "given text"
function demo() {
  // Mark any given text inside lines
  return 'Multiple matches of the given text are supported';
}
```

#### Regular expressions

```ts /ye[sp]/
console.log('The words yes and yep will be marked.')
```

```sh /\/ho.*\//
echo "Test" > /home/test.txt
```

```sh /ye(s|p)/
The word "yes" will have the letter "s" marked.
This also works for the "p" in "yep".
```

```sh /ye(?:s|p)/
This block uses `/ye(?:s|p)/`, which causes the full
matching words "yes" and "yep" to be marked.
```

## Word Wrap

### Configuring word wrap per block

```js wrap
// Example with wrap
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

```js wrap=false
// Example with wrap=false
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

### Configuring indentation of wrapped lines

```js wrap preserveIndent
// Example with preserveIndent (enabled by default)
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

```js wrap preserveIndent=false
// Example with preserveIndent=false
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

## (Optional) Line Numbers

```js showLineNumbers
// This code block will show line numbers
console.log('Greetings from line 2!')
console.log('I am on line 3')
```

```js showLineNumbers=false
// Line numbers are disabled for this block
console.log('Hello?')
console.log('Sorry, do you know what line I am on?')
```
