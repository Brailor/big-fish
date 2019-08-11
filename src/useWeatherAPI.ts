import { useState, useEffect } from 'react';
import { WeatherData, Position } from './types';

const WEATHER_API_KEY ='bd444b596ba090889d3540022567adca';
const IP_API_KEY = '0abad2cb6391374081a6cbdbb44ebaed';

export default function useWeatherAPI() {
    const [ weather, setWeather ] = useState<WeatherData>();
    const [ errors, setErrors ] = useState<Array<string>>([]);
    const [ isLoading, setLoading ] = useState(true);

    useEffect(() => {
        if('geolocation' in navigator) {
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };
            
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            // do the fallback function
            getGeoCoordsFromIP()
                .then(({ latitude, longitude }) => fetchWeatherData(latitude, longitude))
                .catch(handleError);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function fetchWeatherData(lat: number, lon: number) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                setLoading(false);
            })
            .catch(handleError);
    }

    function success(pos: Position) {
        const { coords } = pos;

        return fetchWeatherData(coords.latitude, coords.longitude);
    }

    function error() {
        // fallback if user declined the geolocation API request
        // get geo location from ip
        getGeoCoordsFromIP()
            .then(({ latitude, longitude }) => fetchWeatherData(latitude, longitude))
            .catch(handleError);
    }

    async function getGeoCoordsFromIP() {
        try {
            const response = await fetch(`http://api.ipstack.com/check?access_key=${IP_API_KEY}`);
            const { latitude, longitude } = await response.json();

            return { latitude, longitude };
        } catch (error) {
            throw error;
        }
    }

    // fallback function if everything fails, then just call the weather api
    // with a hardcoded value
    function handleError() {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=Budapest&units=metric&&APPID=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data);
                setLoading(false);
            })
            .catch(error => {
                setErrors(errors => [...errors, error]);
            });
    }

  return {
      data: weather,
      errors,
      isLoading
  }
}

