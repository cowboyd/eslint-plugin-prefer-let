/**
 * @fileoverview Use `let` declarations to bind names to values
 * @author Charles Lowell
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/prefer-let");

var RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
});


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("prefer-let", rule, {

  valid: [
    {
      code: "const PI = 3.14;"
    },
    {
      code: "const { foo, bar } = {};"
    },
    {
      code: `export const AlsoObject = Object;`
    },
    {
      parserOptions: {
        sourceType: "script"
      },
      env: {
        node: true
      },
      code: "const PI = 3.14;"
    }
  ],

  invalid: [
    {
      code: "function y() { const x = 'y'; return x; }",
      errors: [{
        message: "`const` declaration outside top-level scope",
        type: "VariableDeclaration"
      }]
    },
    {
      code: "function y() { const {x, y} = {x: 'x', y: 'y'}}",
      errors: [{
        message: "`const` declaration outside top-level scope",
        type: "VariableDeclaration"
      }]
    },
    {
      code: "var x = 'y';",
      errors: [{
        message: "prefer `let` over `var` to declare value bindings",
        type: "VariableDeclaration"
      }]
    },
    {
      code: "function y() { var x = 'y'};",
      errors: [{
        message: "prefer `let` over `var` to declare value bindings",
        type: "VariableDeclaration"
      }]
    },
    {
      code: "function y() { var { x, y } = {}; }",
      errors: [{
        message: "prefer `let` over `var` to declare value bindings",
        type: "VariableDeclaration"
      }]
    },
    {
      parserOptions: {
        sourceType: "script"
      },
      env: {
        node: true
      },
      code: "function y() { const x = 'y'; return x; }",
      errors: [{
        message: "`const` declaration outside top-level scope",
        type: "VariableDeclaration"
      }]
    }
  ]
});
