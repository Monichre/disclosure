import { AI } from '../../lib/openAI';

export const trainTheModel = async (fileId: string) => {
  const fineTune = await AI.createFineTune({
    training_file: fileId,
  })
  console.log('fineTune: ', fineTune)

  return fineTune
}
