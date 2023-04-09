import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [busLines, setBusLines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://3.22.116.126:9091/api/v1/bus/services');
      const data = await response.json();
      setBusLines(data.map(busLine => ({ ...busLine, showAllStops: false })));
    };

    fetchData();

    const refreshInterval = setTimeout(() => {
      window.location.reload();
    }, 5 * 60 * 1000);

    return () => {
      clearTimeout(refreshInterval);
    };
  }, []);

  const toggleShowAllStops = (index) => {
    setBusLines(busLines.map((line, i) => {
      if (i === index) {
        return { ...line, showAllStops: !line.showAllStops };
      }
      return line;
    }));
  };

  return (
    <div className="App">
      <h1><span className="heading-text">Top 10 BusLines and its BusStops</span></h1>
      <div className="cards">
        {busLines.map((line, index) => (
          <div key={index} className="card">
            <h3><span className="heading-text">Bus Line Number</span> : {line.busLineName}</h3>
            
            <ul>
              <h4><span className="heading-text">Bus Stop Names</span></h4>
              {(line.showAllStops ? line.busStopNames : line.busStopNames.slice(0, 10)).map((stop, index) => (
                <li key={index}>{stop}</li>
              ))}
            </ul>
            <button onClick={() => toggleShowAllStops(index)}>
              {line.showAllStops ? 'Show Less' : 'Show More'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
