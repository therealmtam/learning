module.exports = {
  meta: {
      type: "suggestion",
      docs: {
          description: "Description of the rule",
      },
      fixable: "code",
      schema: [] // no options
  },
  create: function(context) {
      return {
          CallExpression(node) {
            console.log('\n')
            console.log('--------->')
            console.log('Call Expression Rule Called on => ', node.callee.name)
            console.log('<---------')
            console.log('\n')
            
            if (node.callee.name === 'getPayments') {
              context.report({
                node: node,
                message: 'get payments is deprecated, use getLatestPayments'
              })
            }
          }
      };
  }
};

console.log('here')