import React, { Fragment } from 'react';
import { WeatherData, FormatDateOptions } from './types';
import './WeatherDisplay.scss';

function formatDate(timeStamp: number, options: FormatDateOptions) {
    const date = new Date(timeStamp * 1000);

    return date.toLocaleString('hu-HU', options);
}

function WeatherDisplay(weatherData: WeatherData) {
    const [weather] = weatherData.weather;

    return (
        <div className="weather-content">
            <h1>{weatherData.name} </h1>
            <h4>{formatDate(weatherData.dt, { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</h4>

            <section>
                <div className='weather-block'>
                    <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather description icon" />
                    <span className='main-temperature'><b>{weatherData.main.temp} °C</b></span>
                </div>
            </section>

            <h4>min/max: {weatherData.main.temp_min} / {weatherData.main.temp_max} °C</h4>

            <h4>{weather.description}</h4>

            <section className='weather-section-details'>
                <p>Details</p>

                <div className='details-block'>
                    {weatherData.wind &&
                        <Fragment>
                            <span>
                                <h4>Wind:</h4>
                                <h4>{weatherData.wind.speed} meter/sec</h4>
                            </span>
                            <hr />
                        </Fragment>

                    }

                    {weatherData.rain &&
                        <Fragment>
                            <span>
                                <h4>Rain:</h4>
                                <h4>
                                    1h: {weatherData.rain["1h"]} mm <br />
                                    3h: {weatherData.rain["3h"]} mm
                                 </h4>
                            </span>
                            <hr />
                        </Fragment>

                    }

                    {weatherData.snow &&
                        <Fragment>
                            <span>
                                <h4>Snow:</h4>
                                <h4>
                                    1h: {weatherData.snow["1h"]} mm <br />
                                    3h: {weatherData.snow["3h"]} mm
                                 </h4>
                            </span>
                            <hr />
                        </Fragment>

                    }
                    <span>
                        <h4>Humidity:</h4>
                        <h4>{weatherData.main.humidity} %</h4>
                    </span>
                    <hr />

                    <span>
                        <h4>Cloudiness:</h4>
                        <h4>{weatherData.clouds.all} %</h4>
                    </span>
                    <hr />

                    <span>
                        <h4>Pressure:</h4>
                        <h4>{weatherData.main.pressure} hPa</h4>
                    </span>
                    <hr />

                    <span>
                        <h4>Sunrise:</h4>
                        <h4>{formatDate(weatherData.sys.sunrise, { hour: '2-digit', minute: '2-digit' })}</h4>
                    </span>
                    <hr />

                    <span>
                        <h4>Sunset:</h4>
                        <h4>{formatDate(weatherData.sys.sunset, { hour: '2-digit', minute: '2-digit' })}</h4>
                    </span>

                </div>
            </section>
        </div >
    )
}


export default WeatherDisplay;