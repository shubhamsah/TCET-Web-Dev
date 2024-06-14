## Variables

Most of the time, a JavaScript application needs to work with information. Here are two examples:

1. An online shop – the information might include goods being sold and a shopping cart.
2. A chat application – the information might include users, messages, and much more.
Variables are used to store this information.

#### A Variable

A variable is a “named storage” for data. We can use variables to store goodies, visitors, and other data.

To create a variable in JavaScript, use the let keyword.

The statement below creates (in other words: declares) a variable with the name “message”:

```js
let message;
```
Now, we can put some data into it by using the assignment operator =:

```js
let message;

message = 'Hello'; // store the string 'Hello' in the variable named message
```

The string is now saved into the memory area associated with the variable. We can access it using the variable name:

```js
let message;
message = 'Hello!';

alert(message); // shows the variable content
```

To be concise, we can combine the variable declaration and assignment into a single line:

```js
let message = 'Hello!'; // define the variable and assign the value

alert(message); // Hello!
```

We can also declare multiple variables in one line:

```js
let user = 'John', age = 25, message = 'Hello';
```
That might seem shorter, but we don’t recommend it. For the sake of better readability, please use a single line per variable.

The multiline variant is a bit longer, but easier to read:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

Some people also define multiple variables in this multiline style:
```js
let user = 'John',
  age = 25,
  message = 'Hello';
```

…Or even in the “comma-first” style:
```js
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Technically, all these variants do the same thing. So, it’s a matter of personal taste and aesthetics.

```js
var instead of let
```
In older scripts, you may also find another keyword: var instead of let:

```js 
var message = 'Hello';
```
The var keyword is almost the same as let. It also declares a variable but in a slightly different, “old-school” way.

There are subtle differences between let and var, but they do not matter to us yet. We’ll cover them in detail in the chapter The old "var".