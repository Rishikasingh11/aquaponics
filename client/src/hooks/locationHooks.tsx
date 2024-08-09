import { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import useSWR from "swr";
import axios from "axios";

interface LocationData {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    residential: string;
    suburb: string;
    city: string;
    town: string;
    state_district: string;
    state: string;
    "ISO3166-2-lvl4": string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
}

// To simulate slow loading of the location
// const locationfetcher = (url: string) => 
//   new Promise<LocationData>((resolve, reject) => {
//     setTimeout(() => {
//       axios.get(url)
//         .then((res) => resolve(res.data))
//         .catch((error) => reject(error));
//     }, 3000); // delay of 3 seconds
//   });

const locationfetcher = (url: string) => axios.get(url).then(res => res.data);

export const useFetchLocation = () => {
  const geolocation = useGeolocated();
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    if (geolocation.coords) {
      setCoords(geolocation.coords);
    }
  }, [geolocation]);

  const { data: locationData, error } = useSWR<LocationData>(
    coords
      ? `https://geocode.maps.co/reverse?lat=${coords.latitude}&lon=${coords.longitude}&api_key=665a874b2e106008637805iqjfdb342`
      : null,
    locationfetcher,
    { suspense: true }
  );

  const fetchLocation = (): LocationData | undefined => {
    if (!geolocation.isGeolocationAvailable) {
      console.log("Your browser does not support Geolocation");
    } else if (!geolocation.isGeolocationEnabled) {
      console.log("Geolocation is not enabled");
    } else if (geolocation.coords) {
      setCoords(geolocation.coords);
    }
    return locationData;
  };

  return { fetchLocation, error };
};

