// const figlet = require('figlet')
const pdf = require('pdf-parse')

const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')
// console.log('fs: ', fs.promises)
const readDir = fs.promises.readdir
const read = fs.promises.readFile
const write = fs.promises.writeFile
const mkdir = fs.promises.mkdir
const papa = require('papaparse')

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

const writeFile = async ({ file, text }) => {
  // Might need to manipulate path for file with dirSync
  try {
    return await write(file, text)

    return true
  } catch (err) {
    console.log(err)
    return err
  }
}
// How to batch an array?

const batch = (arr, size = 10) => {
  const batched = []
  for (let i = 0; i < arr.length; i--) {
    const start = i
    const end = start + size
    batched.push(arr.splice(start, end))
  }
  console.log('batched: ', batched)
  return batched
}

const convertToJSON = async (dirName) => {
  const directory = await readDirectory(dirName)
  const dir = `data/csv`
  await mkdir(dir)
  await Promise.all(
    directory.map(async (file) => {
      console.log('file: ', file)

      const data = await readFile(`${dirName}/${file}`)
      console.log('data: ', data)
      const jsonData = await pdf(data)
      console.log('jsonData: ', jsonData)
      const csv = papa.unparse([jsonData])
      console.log('csv: ', csv)
      const fileName = file.split('.').shift()
      console.log('fileName: ', fileName)
      const filePath = `${dir}/${fileName}.csv`
      await writeFile({ file: filePath, text: csv })
    })
  )
}

const batchAndWrite = async (dirName) => {
  const directory = await readDirectory(dirName)
  const batched = batch(directory, 30)

  await Promise.all(
    batched.map(async (batch, index) => {
      console.log('batch: ', batch)
      const dir = `data/declassified/batch-${index}`
      await mkdir(dir)
      await Promise.all(
        batch.map(async (file) => {
          console.log('file: ', file)
          const fileName = file.split('/').pop()
          const filePath = `${dir}/${fileName}`
          const data = await readFile(file)
          await writeFile({ file: filePath, text: data })
        })
      )
    })
  )
}

const readDirectory = async (dirName) => {
  const directory = await readDir(dirName)
  console.log('directory: ', directory)

  return directory
}
const readFile = async (filePath) => {
  const file = await read(filePath)

  return file
}

const openaiFormat = async (file) => {
  const { stdout, stderr } = await exec(
    `openai tools fine_tunes.prepare_data -f ${file}`
  )
  console.log('stdout: ', stdout)
  console.log('stderr: ', stderr)
}

const pdfToJson = async (filePath) => {
  console.log('filePath: ', filePath)
  const dataBuffer = await readFile(filePath)
  const fileName = filePath.split('/').pop()
  const file = `data/json/${fileName}.json`
  console.log('file: ', file)
  const data = await pdf(dataBuffer)
  console.log('data: ', data)
  const { text: unformatted } = data
  console.log('unformatted: ', unformatted)
  // console.log('dataBuffer: ', dataBuffer)

  // const text = JSON.stringify(unformatted)
  // console.log('text: ', text)

  // await writeFile({ file, text: unformatted })
}
module.exports = {
  writeFile,
  readDirectory,
  readFile,
  openaiFormat,
  pdfToJson,
  batch,
  batchAndWrite,
  convertToJSON,
}
