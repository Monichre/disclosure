import fsExtra from 'fs-extra';

export const writeFile = async ({ file, text }) => {
  // Might need to manipulate path for file with dirSync
  try {
    return await fsExtra.promises.writeFile(file, text)

    return true
  } catch (err) {
    console.log(err)
    return err
  }
}
export const readFile = async (filePath: any) => {
  const file = await fsExtra.promises.readFile(filePath)

  return file
}
