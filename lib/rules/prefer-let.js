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
    let sourceCode = context.getSourceCode();

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
        } else if (node.kind !== 'let' && !isTopLevelScope(node)) {
          let constToken = sourceCode.getFirstToken(node);

          context.report({
            message: '`const` declaration outside top-level scope',
            node,
            fix: function(fixer) {
              return fixer.replaceText(constToken, 'let');
            }
          });
        }
      }
    };
  }
};
