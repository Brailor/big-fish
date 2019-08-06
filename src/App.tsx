import React from 'react';
import './App.css';
import useWeatherAPI from './useWeatherAPI'

const App: React.FC = () => {
  const { data, errors } = useWeatherAPI();

  function renderErrors() {
    return errors.map(err => <h1>{err}</h1>);
  }

  return (
    <div className="App">
      <header className="App-header">
        {errors.length && renderErrors()}

      </header>
    </div>
  );
}

export default App;
