import mapbox from '@mapbox/mapbox-sdk';
import geoCoder from '@mapbox/mapbox-sdk/services/geocoding';

export const mapboxClient = mapbox({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN,
})

export const geoCoderService = geoCoder(mapboxClient)
