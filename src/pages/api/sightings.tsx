import { getAllSightings } from '@/services/ufos'

export default async function handler(req: any, res: any) {
  const totalSightings = await getAllSightings()
  console.log('totalSightings: ', totalSightings)

  res.status(200).json({ totalSightings })
}
