import { geoCoderService } from '@/lib/mapbox';

export const geoCode = async (location) => {
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

export const batchGeoCode = async (locations) => {
  // 'Paris, France; Boise, Idaho;

  return await geoCoderService
    .forwardGeocode({
      query: locations,
      limit: 2,
      mode: 'mapbox.places-permanent',
    })
    .send()
    .then((response) => {
      console.log('response: ', response)
      const match = response.body
      return match
    })
}
