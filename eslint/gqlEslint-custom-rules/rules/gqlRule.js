module.exports = {
  meta: {
      type: "suggestion",
      docs: {
          description: "Description of the rule",
      },
      fixable: "code",
      schema: [] // no options
  },
  create(context) {
    return {
        OperationDefinition(node) {
            if (!node.name?.value) {
                context.report({
                    node,
                    message: 'Oops, name is required!'
                })
            }
        },
        ObjectTypeDefinition(node) {
          console.log(node.name.value)
        }
    }
}
};