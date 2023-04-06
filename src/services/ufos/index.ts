import { prisma } from '@/lib/prisma';

console.log('prisma: ', prisma)


export const getAllSightings = async () => {
  let index = 0
  let batch = 1000
  const total: any = await prisma.ufo_sightings.count()
  console.log('total: ', total)
  let totalSightings: any = []

  while (totalSightings.length < total) {
    const [sightings] = await prisma.$transaction([
      prisma.ufo_sightings.findMany({
        take: batch,
        skip: batch * index,
        where: {
          country: 'us',
        },
      }),
    ])

    totalSightings = totalSightings.concat([], ...sightings)
    index += 1
  }

  return totalSightings
}
