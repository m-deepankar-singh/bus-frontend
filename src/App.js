import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBusServices } from './store/busServicesReducer';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const busServices = useSelector((state) => state.busServices.busServices);
  const isLoading = useSelector((state) => state.busServices.isLoading);
  const error = useSelector((state) => state.busServices.error);

  const [expandedBusServices, setExpandedBusServices] = useState([]);

  useEffect(() => {
    dispatch(fetchBusServices());
  }, [dispatch]);

  const toggleShowAllStops = (index) => {
    setExpandedBusServices((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !updatedState[index];
      return updatedState;
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1><span className="heading-text">Top 10 BusLines and its BusStops</span></h1>
      <div className="cards">
        {busServices.map((line, index) => (
          <div key={index} className="card" data-testid="card">
            <h3><span className="heading-text">Bus Line Number</span> : {line.busLineName}</h3>

            <ul>
              <h4><span className="heading-text">Bus Stop Names</span></h4>
              {(expandedBusServices[index] ? line.busStopNames : line.busStopNames.slice(0, 10)).map((stop, index) => (
                <li key={index}>{stop}</li>
              ))}
            </ul>
            <button onClick={() => toggleShowAllStops(index)}>
              {expandedBusServices[index] ? 'Show Less' : 'Show More'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;




// import React, { useState, useEffect } from 'react';
// import './App.css';
// import dummyData from './dummyData';



// const App = () => {
//   const [busLines, setBusLines] = useState([]);

//   useEffect(() => {
//    const fetchData = async () => {
//     try {
//       const response = await fetch('http://3.22.116.126:9091/api/v1/bus/services');
//       if (!response.ok) {
//         throw new Error('Failed to fetch API data');
//       }
//       const data = await response.json();
//       setBusLines(data.map(busLine => ({ ...busLine, showAllStops: false })));
//     } catch (error) {
//       console.error('Error fetching API data:', error);
//       setBusLines(dummyData); // Use dummy data when the API fails
//     }
//     };

//     fetchData();

//     const refreshInterval = setTimeout(() => {
//       window.location.reload();
//     }, 5 * 60 * 1000);

//     return () => {
//       clearTimeout(refreshInterval);
//     };
//   }, []);

//   const toggleShowAllStops = (index) => {
//     setBusLines(busLines.map((line, i) => {
//       if (i === index) {
//         return { ...line, showAllStops: !line.showAllStops };
//       }
//       return line;
//     }));
//   };

//   return (
//     <div className="App">
//       <h1><span className="heading-text">Top 10 BusLines and its BusStops</span></h1>
//       <div className="cards">
//         {busLines.map((line, index) => (
//           <div key={index} className="card" data-testid="card">
//             <h3><span className="heading-text">Bus Line Number</span> : {line.busLineName}</h3>
            
//             <ul>
//               <h4><span className="heading-text">Bus Stop Names</span></h4>
//               {(line.showAllStops ? line.busStopNames : line.busStopNames.slice(0, 10)).map((stop, index) => (
//                 <li key={index}>{stop}</li>
//               ))}
//             </ul>
//             <button onClick={() => toggleShowAllStops(index)}>
//               {line.showAllStops ? 'Show Less' : 'Show More'}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
