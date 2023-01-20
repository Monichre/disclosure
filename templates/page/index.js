module.exports = {
  description: 'Page Generator',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'page name',
    },
  ],
  actions: [
    {
      type: 'add',
      path: 'src/pages/{{properCase name}}/index.tsx',
      templateFile: './templates/page/index.hbs',
    },
    {
      type: 'add',
      path: 'src/pages/{{properCase name}}/{{properCase name}}.tsx',
      templateFile: './templates/page/Page.hbs',
    },

    {
      type: 'add',
      path: 'src/pages/{{properCase name}}/{{properCase name}}.style.tsx',
      templateFile: './templates/page/Page.style.hbs',
    },
  ],
}
