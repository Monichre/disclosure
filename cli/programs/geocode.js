const mapbox = require('@mapbox/mapbox-sdk')
const geoCoder = require('@mapbox/mapbox-sdk/services/geocoding')

const papa = require('papaparse')

const { readFile, writeFile } = require('./main')

const mapboxClient = mapbox({
  accessToken:
    'pk.eyJ1IjoiZWxsaXNsaWFtIiwiYSI6ImNsNm10eGhrMDBwZG8zYnEyZ2QzdDA0ZmUifQ.fn0vBNAu8_371GdJ1Py68w',
})

const geoCoderService = geoCoder(mapboxClient)
const geoCode = async (location) => {
  return await geoCoderService
    .forwardGeocode({
      query: location,
      limit: 1,
    })
    .send()
    .then((response) => {
      const match = response.body
      return match
    })
    .catch((err) => {
      console.log('err: ', err)
    })
}

const reverseGeoCode = async (location) => {
  return await geoCoderService
    .reverseGeocode({
      query: location,
      limit: 1,
    })
    .send()
    .then((response) => {
      const match = response.body
      return match
    })
    .catch((err) => {
      console.log('err: ', err)
    })
}

const readCsvExtractData = async (file) => {
  const neatCsv = await import('neat-csv').then((module) => {
    return module
  })
  const dataBuffer = await readFile(file)
  const csvData = await neatCsv.default(dataBuffer)
  return csvData
}

const writeDataToCSV = async (file, data) => {
  const csv = papa.unparse(data, {
    skipEmptyLines: 'greedy', //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
  })

  const fileName = file.split('.').shift()
  console.log('fileName: ', fileName)
  await writeFile({
    file: `${fileName}_enriched.csv`,
    text: csv,
  })
}

const addCoordinatesFromLocation = async (file) => {
  const data = await readCsvExtractData(file).then((res) =>
    res
      .filter((item) => item.location && item?.location?.trim())
      .map(({ location, date, video, image }) => ({
        location,
        date,
        video,
        image,
      }))
  )

  const enriched = await Promise.all(
    data.map(async (item) => {
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

  return await writeDataToCSV(file, enriched)
}

const addLocationFromCoordinates = async (file) => {
  const data = await readCsvExtractData(file)
  console.log('data: ', data)

  const enriched = await Promise.all(
    data.map(async ({ longitude, latitude, ...rest }) => {
      const location = await reverseGeoCode([
        parseFloat(longitude),
        parseFloat(latitude), // ! IMPORTANT: longitude must preceed latitude according to the mapbox geocoding api docs
      ]).then((res) => (res?.features?.length ? res.features[0] : null))

      console.log('location: ', location)
      if (location) {
        const { text, properties, place_name: place } = location
        console.log('text: ', text)
        console.log('properties: ', properties)
        return {
          longitude,
          latitude,
          ...rest,
          text,
          place,
          ...properties,
        }
      }

      return {
        longitude,
        latitude,
        ...rest,
      }
    })
  )

  return await writeDataToCSV(file, enriched)
}

module.exports = {
  addCoordinatesFromLocation,
  addLocationFromCoordinates,
}
