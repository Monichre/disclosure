#!/usr/bin/env ts-node
const fs = require('fs')
const fsPromises = require('fs').promises

// import type { Arguments, CommandBuilder } from 'yargs';
// type Options = {
//   name: string;
//   upper: boolean | undefined;
// };

// export const command: string = 'greet <name>';
// export const desc: string = 'Greet <name> with Hello';

// export const builder: CommandBuilder<Options, Options> = (yargs) =>
//   yargs
//     .options({
//       upper: { type: 'boolean' },
//     })
//     .positional('name', { type: 'string', demandOption: true });

// export const handler = (argv: Arguments<Options>): void => {
//   const { name, upper } = argv;
//   const greeting = `Hello, ${name}!`;
//   process.stdout.write(upper ? greeting.toUpperCase() : greeting);
//   process.exit(0);
// };

const pdf = require('pdf-parse')

const writeFile = async ({ file, text }) => {
  // Might need to manipulate path for file with dirSync
  try {
    return await fsPromises.writeFile(file, text)

    return true
  } catch (err) {
    console.log(err)
    return err
  }
}
const readFile = async (filePath) => {
  const file = await fs.promises.readFile(filePath)
  console.log('file: ', file)

  return file
}
const pdfToJson = async (filePath: string) => {
  const dataBuffer = await readFile(filePath)
  const fileName = filePath.split('/').pop()
  const file = `../../data/${fileName}.json`
  console.log('file: ', file)
  const data = await pdf(dataBuffer)
  console.log('data: ', data)
  const { text: unformatted } = data
  console.log('dataBuffer: ', dataBuffer)

  const text = JSON.stringify(unformatted)
  console.log('text: ', text)

  await writeFile({ file, text })
}

module.exports = { pdfToJson }
