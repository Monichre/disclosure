const componentTemplate = require('./templates/component/index')
const pageTemplate = require('./templates/page/index')

module.exports = function (plop) {
  plop.load('plop-helper-list')
  plop.setGenerator('component', componentTemplate)
  plop.setGenerator('page', pageTemplate)
}
