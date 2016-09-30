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
      // fill in your schema
    ]
  },

  create: function(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function isGlobalScope(node) {
      return context.getScope().type === 'global';
    }

    function isModuleScope(node) {
      return context.getScope().type === 'module';
    }

    function isTopLevelScope(node) {
      return isGlobalScope(node) || isModuleScope(node);
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      VariableDeclaration(node) {
        var scopeType  = context.getScope().type;
        if (node.kind === 'var') {
          context.report({
            message: 'prefer `let` over `var` to declare value bindings',
            node
          });
        } else if (node.kind !== 'let' && !isTopLevelScope(node)) {
          console.log(context.getScope().type);
          context.report({
            message: '`const` declaration outside top-level scope',
            node
          });
        }
      }
    };
  }
};
