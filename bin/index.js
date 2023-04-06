#!/usr/bin/env node

// const figlet = require('figlet')
// const pdf = require('pdf-parse')
const program = require('commander')
const {
  pdfToJson,
  batchAndWrite,
  convertToJSON,
} = require('../cli/programs/main')

const {
  addCoordinatesFromLocation,
  addLocationFromCoordinates,
} = require('../cli/programs/geocode')

//add the following line

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
    await batchAndWrite(directory)
    // await pdfToJson(file)
  })

program
  .command('batch-convert')
  .argument('<directory>', 'Directory to batch')
  .action(async (directory, options) => {
    await convertToJSON(directory)
    // await pdfToJson(file)
  })

program
  .command('geocode')
  .argument('<file>', 'Directory to batch')
  .action(async (file, options) => {
    const data = await addCoordinatesFromLocation(file)
    console.log('data: ', data)
    return data
    // await pdfToJson(file)
  })

program
  .command('reverseGeocode')
  .argument('<file>', 'Directory to batch')
  .action(async (file, options) => {
    const data = await addLocationFromCoordinates(file)
    console.log('data: ', data)
    return data
    // await pdfToJson(file)
  })

program.parse(process.argv)
// .option("--csv <value>", "Create a directory")
// .option(" --touch <value>", "Create a file")
