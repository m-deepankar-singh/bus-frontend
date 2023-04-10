import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { slice } from './slice';
import { fetchBusLines } from './actions';
import './App.css';
import Navbar from './Navbar';
import image from './sbab.png'

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
    <div>
     <Navbar />
    <div className="App">
      <h1>Top 10 BusLines and its BusStops</h1>
      <div className="cards">
        {busLines.map((line, index) => (
          <div key={index} className="card" data-testid="card">
            
            <h3>Bus Line Number : {line.busLineName}</h3>

            <ul>
              <h4>Bus Stop Names</h4>
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
    <footer className='Footer'>
        <img src = {image} alt='logo' height={30} width={100}/>
        <div className='App2'>
          <p>SBAB Bank AB (publ) Org nr. 556253-7513</p>
        </div>
    </footer>
    </div>
  );
};

export default App;
