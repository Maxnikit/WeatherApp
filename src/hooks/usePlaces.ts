// export function usePlaces(location: string): PlacesData {
//   const { data, error } = useSWR(`/api/places?location=${location}`, fetcher);

//   return {
//     locations: data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// }

function usePlaces(location: string) {}
export default usePlaces;
