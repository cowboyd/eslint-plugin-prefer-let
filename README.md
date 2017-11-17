# eslint-plugin-prefer-let

[![npm version](https://badge.fury.io/js/eslint-plugin-prefer-let.svg)](https://badge.fury.io/js/eslint-plugin-prefer-let)
[![Build Status](https://travis-ci.org/cowboyd/eslint-plugin-prefer-let.svg?branch=master)](https://travis-ci.org/cowboyd/eslint-plugin-prefer-let)

An eslint plugin to encourage semantic of usage of `let` and `const`.

Things being basically equal, code should speak to humans first, and
computers second. As such, JavaScript codebases should follow the
long-standing conventions set forth by both formal symbolic logic and
the practice of functional programming.

Usage of the `const` keyword to bind an _intermediate_ value of a
computation places emphasis on the compiler and and its role in
ensuring that a _reference_ never changes. By contrast using `let` in
the same situation reads, in plain English, the programmer's intent to
declare a name value binding.

It is this plugin's opinion that preventing reassignment of `let`
bindings is better accomplished as a linting rule.

`const` bindings _are_ allowed at the top-level of a module's scope so
that it can represent a value that is a true, dependency-free constant
such as `π`, `ℯ`, etc...


Good:

``` javascript
const PI = 3.14;

function area(radius) {
  let r2 = radius * radius;
  return PI * r2;
}

```

Bad:

``` javascript
function volume(radius) {
  const a = area(radius);
  return a * radius / 2
}

```

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-prefer-let`:

```
$ npm install eslint-plugin-prefer-let --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-prefer-let` globally.

## Usage

Add `prefer-let` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "prefer-let"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "prefer-let/prefer-let": 2
    }
}
```
