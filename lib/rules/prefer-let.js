/**
 * @fileoverview Use `let` declarations to bind names to values
 * @author Charles Lowell
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Use `let` declarations to bind names to values",
      category: "Stylistic Issues",
      recommended: false
    },
    fixable: "code",  // or "code" or "whitespace"
    schema: [
      {
        'type': 'object',
        'properties': {
          'ignoreModules': {
            'type': 'boolean',
          },
        },
        'additionalProperties': false
      }
    ]
  },

  create: function(context) {
    let options = context.options[0] || {};
    let ignoreModules = options.ignoreModules;

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function isGlobalScope(node) {
      return context.getScope().type === 'global';
    }

    function isModuleScope(node) {
      return context.getScope().type === 'module';
    }

    function isProgramScope(node) {
      return context.getScope().block.type === 'Program';
    }

    function isTopLevelScope(node) {
      return isGlobalScope(node) || isModuleScope(node) || isProgramScope(node);
    }

    function isRequireStatement(node) {
      // detect multiple declaration:
      // `const x = require('y'), z = 'y';`
      return !node.declarations.filter(declaration => {
        let callee = declaration.init.callee;
        return !(callee && callee.name === 'require');
      }).length;
    }

    function isImportStatement(node) {
      // detect multiple declaration:
      // `const x = await import('y'), z = 'y';`
      return !node.declarations.filter(declaration => {
        let init = declaration.init;
        if (init.type !== 'AwaitExpression') {
          return true;
        }
        let callee = init.argument.callee;
        return !(callee && callee.type === 'Import');
      }).length;
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      VariableDeclaration(node) {
        if (node.kind === 'var') {
          context.report({
            message: 'prefer `let` over `var` to declare value bindings',
            node
          });
        } else if (node.kind !== 'let' && !isTopLevelScope(node) && !(ignoreModules && (isRequireStatement(node) || isImportStatement(node)))) {
          context.report({
            message: '`const` declaration outside top-level scope',
            node
          });
        }
      }
    };
  }
};
