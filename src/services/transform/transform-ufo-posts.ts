import { geoCode } from '@/services/geocode/mapbox';
import neatCsv from 'neat-csv';
import papa from 'papaparse';

import { readFile, writeFile } from '../../utils';

export type GeoCodingResponseObject = {
  type: string
  query: []
  features: []
  attribution: string
}

export const transformUfoPosts = async () => {
  const dataBuffer = await readFile('data/ufo-posts-3.csv')
  const csvData = await neatCsv(dataBuffer).then((res) =>
    res
      .filter(
        (item) =>
          item.location && item?.location !== ' ' && item?.location.length > 3
      )
      .map(({ location, date, video, image }) => ({
        location,
        date,
        video,
        image,
      }))
  )

  const withLatLon = await Promise.all(
    csvData.map(async (item) => {
      //
      // const {
      //   geometry: {
      //     location: { lat, lng },
      //   },
      // } = await getPlaceDataForLocation(item.location)
      const locationData = await geoCode(item.location)

      if (locationData && locationData?.features) {
        const { features } = locationData

        if (features?.length) {
          const {
            geometry: { coordinates },
          } = features[0]
          const [longitude, latitude] = coordinates

          return {
            ...item,
            latitude,
            longitude,
          }
        }
      }

      return item
    })
  )

  const csv = papa.unparse(withLatLon, {
    skipEmptyLines: 'greedy', //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
  })

  await writeFile({
    file: 'data/ufo-posts-3__enriched.csv',
    text: csv,
  })
}
