// const { pdfToJson } = require('./commands/pdf-to-json')

// const figlet = require('figlet')
// const pdf = require('pdf-parse')
const program = require('commander')

const util = require('util')
const exec = util.promisify(require('child_process').exec)

const fsPromise = util.promisify(require('fs').exec)

const { pdfToJson, readDirectory } = require('./programs/main')

//add the following line
module.export = () => {
  program
    .command('convert')
    .description(' CLI for managing data file formatting and preparation')
    .argument('<file>', 'File to convert')
    .action(async (file, options) => {
      console.log('options: ', options)
      await pdfToJson(file)
      // await pdfToJson(file)
    })

  program
    .command('batch')
    .argument('<directory>', 'Directory to batch')
    .action(async (directory, options) => {
      console.log('directory: ', directory)
      await readDirectory(directory)
      // await pdfToJson(file)
    })

  program.parse(process.argv)
  // .option("--csv <value>", "Create a directory")
  // .option(" --touch <value>", "Create a file")
}
