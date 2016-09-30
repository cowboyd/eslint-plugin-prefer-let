# eslint-plugin-prefer-let

Unblock "constipated" code by preferring `let` when binding names to values.

`let` has deep roots in both symbolic logic and functional programming, whereas
`const` derives from an inherently imperative paradigm.

The `prefer-let` rules encourages thinking about names and values rather than
references. It also reads as English.

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
        "prefer-let/rule-name": 2
    }
}
```
