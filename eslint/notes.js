/*
Tutorial on creating a custom eslint rule https://www.youtube.com/watch?v=w0YOKj4NCqw

Important things on eslint and graphql-eslint:

- there are 3 levels:
  - extensions (extending another .eslint file) as-is
  - plugins (importing of a set of new rules and processors)
    - where if you use

      rules: [
        'rule name'
      ]

      you can toggle or configure rules that may not be auto-applied by the plugin

  - overrides

    - it is unclear how overrides differ but, in the gql-eslint rule case, 
    the override is used to provide a new processor and file types it targets
    (.gql and .graphql) and converts the files (processes the files) into an ESlint friendly
    AST so you can write custom rules that target things like ObjectTypeDefinition
    node just like a custom eslint rule.

    https://the-guild.dev/graphql/eslint/docs/custom-rules#getting-started

    So the processor is the key to conversion of a gql AST into eslint AST.

- graphql-eslint plugin/library provides typescript types so you can create your own gql plugin
using the graphql-eslint plugin/library. 

- it is IMPORTANT to know what files are allowed to be process when running
eslint in the command line:

> "lint": "eslint ./ --ext .jsx,.js,.ts,.tsx,.graphql,.gql --rulesdir rules",

^ in the command above, the rules directory is set and also a string of 
included file types to be processed are noted. This is the first filter to
determine what files for eslint to look at. Then under overrides or ignorePatterns
you can specify what subset if not all of the file types or only filetypes under
a certain directory etc, will be omitted or processed (ex. in the case of gql file types
which need a specific processor).

So even in NX, you have lintFilesPattern in the project.json which does the
limiting of what all files for eslint to look over. Then in the .eslintrc.js
there is finer filters to determine how to process what files.

- The custom rule name in these examples is the fileName itself. But when creating
your own plugin, it could be the rule name exported in a map like: 

const customRule = {
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
}

module.exports = {
  [name of rule, ex. pluralization]: customRule
}

*/