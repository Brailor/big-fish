
export interface Coord {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface RainOrSnow {
    '1h': number;
    '3h': number;
}

export interface WeatherData {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    wind?: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
    rain?: RainOrSnow;
    snow?: RainOrSnow;
}

export interface FormatDateOptions {
    weekday?: 'long' | 'short' | 'narrow';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
    hour?: 'numeric' | '2-digit';
    minute?: 'numeric' | '2-digit';
}

export interface Position {
    coords: Coordinates;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}