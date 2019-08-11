import React from 'react';
import './App.scss';
import useWeatherAPI from './useWeatherAPI';
import WeatherDisplay from './WeatherDisplay'

function App() {
  const { data, errors, isLoading } = useWeatherAPI();

  function renderErrors() {
    return errors.map(err => <h1>{err}</h1>);
  }

  function renderContent() {
    if (isLoading) return <h1> Loading...</h1>;
    if (errors.length > 0) return renderErrors();
    if (data) return <WeatherDisplay {...data} />

    return (
      <h1>Something terribly went wrong...</h1>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        {renderContent()}
      </header>
    </div>
  );
}

export default App;
