import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { slice } from './slice';
import { fetchBusLines } from './actions';
import './App.css';

const App = () => {
  const { busLines } = useSelector((state) => state.busLines);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBusLines());
  }, [dispatch]);

  const handleToggleShowAllStops = (index) => {
    dispatch(slice.actions.toggleShowAllStops({ index }));
  };

  return (
    <div className="App">
      <h1><span className="heading-text">Top 10 BusLines and its BusStops</span></h1>
      <div className="cards">
        {busLines.map((line, index) => (
          <div key={index} className="card" data-testid="card">
            
            <h3><span className="heading-text">Bus Line Number</span> : {line.busLineName}</h3>

            <ul>
              <h4><span className="heading-text">Bus Stop Names</span></h4>
              {(line.showAllStops ? line.busStopNames : line.busStopNames.slice(0, 10)).map((stop, index) => (
                <li key={index}>{stop}</li>
              ))}
            </ul>
            <button onClick={() => handleToggleShowAllStops(index)}>
              <span>
              {line.showAllStops ? 'Show Less' : 'Show More'}
              </span>
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
