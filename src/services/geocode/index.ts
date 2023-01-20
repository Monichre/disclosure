import { geoCoder } from '@/lib/google-maps';

export const getPlaceDataForLocation = async (location: any) => {
  const {
    data: { results },
  } = await geoCoder.textSearch({
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      query: location,
    },
  })

  return results[0]
}

export const fetchGeolocationData = async ({ address, placeId }) => {
  const res = await geoCoder.geocode({
    params: {
      key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
      address,
    },
  })
  console.log('res: ', res)
  return res
}

/**
 * An example use of this function.
 *
 * ```javascript
 * import { Client } from '@googlemaps/google-maps-services-js';
 * 
 * const args = {
 *   params: {
 *     key: '<your-api-key>',
 *     address: 'Perth 4WD & Commercial Centre',
 *   }
 * };
 * const client = new Client();
 * client.geocode(args).then(gcResponse => {
 *   const str = JSON.stringify(gcResponse.data.results[0]);
 *   console.log(`First result is: ${str}`);)
 * });
 * ```
 * 
geocode(request: GeocodeRequest): Promise<GeocodeResponse> {
  return geocode(request, this.axiosInstance);
}

reverseGeocode(
  request: ReverseGeocodeRequest
): Promise<ReverseGeocodeResponse> {
  return reverseGeocode(request, this.axiosInstance);
}

placeAutocomplete(
  request: PlaceAutocompleteRequest
): Promise<PlaceAutocompleteResponse> {
  return placeAutocomplete(request, this.axiosInstance);
}

placeDetails(request: PlaceDetailsRequest): Promise<PlaceDetailsResponse> {
  return placeDetails(request, this.axiosInstance);
}

findPlaceFromText(
  request: FindPlaceFromTextRequest
): Promise<FindPlaceFromTextResponse> {
  return findPlaceFromText(request, this.axiosInstance);
}
 */
