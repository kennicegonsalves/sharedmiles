import { useContext, useState, useEffect, useRef } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import withModal from './Modal';
import RequestRide from './RequestRide';
import { Context } from "../Context"; // Correct path to Context

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

function AddressPicker(props) {
  const [isFrom, setIsFrom] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const { selectedFrom, setSelectedFrom, selectedTo, setSelectedTo, 
          setRideDate, setRideTime, 
          // setSeatsAvailable, 
          setCost, 
          setVehicleType
         } = useContext(Context);
  const provider = useRef();
  const searchRef = useRef();

  const { toggleModal } = props;

  useEffect(() => {
    initProvider();
  }, []);

  const onInputChanged = debounce((e) => { 
    const input = e.target.value;
    if (input) {
      searchLocations(input);
    } else {
      setSearchResults([]);
    }
  }, 300);

  const searchLocations = async (input) => {
    try {
      const results = await provider.current.search({ query: input });
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results: ", error);
      setSearchResults([]);
    }
  };

  const initProvider = () => {
    provider.current = new OpenStreetMapProvider({
      params: {
        'accept-language': 'en',
        countrycodes: "in"
      }
    });
  };

  const onLocationSelected = (selectedLocation) => {
    if (selectedLocation && selectedLocation.label && selectedLocation.x && selectedLocation.y) {
      if (isFrom) {
        setSelectedFrom(selectedLocation);
        setIsFrom(false);
      } else {
        setSelectedTo(selectedLocation);
        setIsFrom(true);
      }
      setSearchResults([]);
      searchRef.current.value = '';
    }
  };

  const handleConfirm = () => {
    if (selectedFrom && selectedTo) {
      // Set the additional ride details in the context
      toggleModal(true, { 
        selectedFrom, 
        selectedTo 
      });
    } else {
      alert('Please select both pickup and destination locations.');
    }
  };

  return (
    <div className="address" aria-live="polite">
      <div className="address__title">
        <div className="address__title-container">
          <p className="address__title-from" onClick={() => setIsFrom(true)}>{selectedFrom?.label || 'Pickup location ?'}</p>
          <p className="address__title-to" onClick={() => setIsFrom(false)}>{selectedTo?.label || 'Destination ?'}</p>
        </div>
      </div>
      <div className="search">
        <input
          className="search__input"
          type="text"
          placeholder={isFrom ? 'Add a pickup location' : 'Enter your destination'}
          onChange={onInputChanged}
          ref={searchRef}
          aria-label={isFrom ? "Pickup location" : "Destination"}
        />
        <div className="additional-details">
          <input 
            type="date" 
            onChange={(e) => setRideDate(e.target.value)} 
            placeholder="Date"
            aria-label="Date"
          />
          
          <input 
            type="time" 
            onChange={(e) => setRideTime(e.target.value)} 
            placeholder="Time"
            aria-label="Time"
          /> 
          {/* <input 
            type="number" 
            onChange={(e) => setSeatsAvailable(e.target.value)} 
            placeholder="Seats Available"
            aria-label="Seats Available"
          /> */}
          <input 
            type="number" 
            onChange={(e) => setCost(e.target.value)} 
            placeholder="Cost"
            aria-label="Cost"
          />
          <input 
            type="text" 
            onChange={(e) => setVehicleType(e.target.value)} 
            placeholder="Vehicle Type"
            aria-label="Vehicle Type"
          />
        </div>
        <div className="search__result">
          {searchResults.length > 0 && searchResults.map((result, index) => (
            <div 
              className="search__result-item" 
              key={index} 
              onClick={() => onLocationSelected(result)} 
              role="button" 
              tabIndex={0}
            >
              <div className="search__result-icon">
                <svg title="LocationMarkerFilled" viewBox="0 0 24 24" className="g2 ec db">
                  <g transform="matrix(1 0 0 1 2.524993896484375 1.0250244140625)">
                    <path fillRule="nonzero" clipRule="nonzero" d="M16.175 2.775C12.475 -0.925 6.475 -0.925 2.775 2.775C-0.925 6.475 -0.925 12.575 2.775 16.275L9.475 22.975L16.175 16.175C19.875 12.575 19.875 6.475 16.175 2.775ZM9.475 11.475C8.375 11.475 7.475 10.575 7.475 9.475C7.475 8.375 8.375 7.475 9.475 7.475C10.575 7.475 11.475 8.375 11.475 9.475C11.475 10.575 10.575 11.475 9.475 11.475Z" opacity="1"></path>
                  </g>
                </svg>
              </div>
              <p className="search__result-label">{result.label}</p>
            </div>  
          ))}
        </div>
      </div>
      <div className="confirm-button">
        <button  onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}

// Wrap AddressPicker with the modal HOC
export default withModal(RequestRide)(AddressPicker);