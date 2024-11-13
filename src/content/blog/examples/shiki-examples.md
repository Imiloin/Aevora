---
title: Code Block Examples
description: Examples of code blocks with syntax highlighting.
pubDate: 'Nov 13, 2024'
heroImage: '/examples/shiki-examples.jpg'
---

## JavaScript

```js
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet('World');
```

## Python

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

## HTML

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

## CSS

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

## Code diff

```python
def validate_user(username, password):
    if username == "admin" and password == "password123": # [!code --]
        return True # [!code --]
    # Check if the user exists in the database # [!code ++]
    user = get_user_from_db(username) # [!code ++]
    # If user not found, return False # [!code ++]
    if user is None: # [!code ++]
        return False # [!code ++]
    # Validate password # [!code ++]
    if user.password == password: # [!code ++]
        return True # [!code ++]
    return False
 
def get_user_from_db(username):
    # Simulate a user database # [!code --]
    users = { # [!code --]
        "admin": "password123", # [!code --]
    } # [!code --]
    """Simulate a database lookup for the user.""" # [!code ++]
    users = { # [!code ++]
        "admin": User("admin", "password123"), # [!code ++]
        "guest": User("guest", "guest123"), # [!code ++]
    } # [!code ++]
    return users.get(username, None)


if __name__ == "__main__":
    user_name = input("Enter username: ")
    pass_word = input("Enter password: ")
    if validate_user(user_name, pass_word):
        print("Access granted.")
    else:
        print("Access denied.") # [!code --]
        print("Access denied. Please try again.") # [!code ++]
```

## Code highlight

```ts
function complexCalculation(a: number, b: number): number {
    if (a < 0 || b < 0) {
        throw new Error('Negative numbers are not allowed'); // [!code highlight]
    }
    return a * b + (a / b);
}

console.log(complexCalculation(10, 5));
console.log(complexCalculation(-1, 5)); // This will throw an error // [!code highlight]
```
