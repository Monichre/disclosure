// /*
// {"prompt": "<prompt text>", "completion": "<ideal generated text>"}
// {"prompt": "<prompt text>", "completion": "<ideal generated text>"}
// {"prompt": "<prompt text>", "completion": "<ideal generated text>"}
// ...
// */

// export const formatUfoData = async (filePath) => {
//   const dataBuffer = await readFile(filePath)
//   const fileName = filePath.split('/').pop()
//   const file = `../../data/${fileName}.json`
//   console.log('file: ', file)
//   const data = await pdf(dataBuffer)
//   console.log('data: ', data)
//   const { text } = data
//   console.log('dataBuffer: ', dataBuffer)

//   await writeFile({ file, text })
// }
