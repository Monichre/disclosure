// const { pdfToJson } = require('./commands/pdf-to-json')

const figlet = require('figlet')

const fs = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

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

const openaiFormat = async (file) => {
  const { stdout, stderr } = await exec(
    `openai tools fine_tunes.prepare_data -f ${file}`
  )
  console.log('stdout: ', stdout)
  console.log('stderr: ', stderr)
}

const pdf = require('pdf-parse')
const { Command } = require('commander') // add this line
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
  const file = `data/json/${fileName}.json`
  console.log('file: ', file)
  const data = await pdf(dataBuffer)
  console.log('data: ', data)
  const { text: unformatted } = data
  console.log('unformatted: ', unformatted)
  // console.log('dataBuffer: ', dataBuffer)

  // const text = JSON.stringify(unformatted)
  // console.log('text: ', text)

  await writeFile({ file, text: unformatted })
}

//add the following line
const program = new Command()
  .version('1.0.0')
  .description(' CLI for managing data file formatting and preparation')
  .argument('<file>', 'File to convert')
  .parse(process.argv)
  .action(async (file: string, options: any) => {
    console.log('options: ', options)
    await openaiFormat(file)
    console.log('file: ', file)
    // await pdfToJson(file)
  })

program.parse()
// .option("--csv <value>", "Create a directory")
// .option(" --touch <value>", "Create a file")
