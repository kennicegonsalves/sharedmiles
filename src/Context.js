import React, { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);


  // New states for additional ride details
  const [rideDate, setRideDate] = useState(null);
  const [rideTime, setRideTime] = useState(null);
  // const [seatsAvailable, setSeatsAvailable] = useState(null);
  const [cost, setCost] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);

  return (
    <Context.Provider value={{
      user, setUser, 
      isLoading, setIsLoading, 
      currentRide, setCurrentRide,
      selectedFrom, setSelectedFrom, 
      selectedTo, setSelectedTo,
      rideDate, setRideDate,
      rideTime, setRideTime,
      // seatsAvailable, setSeatsAvailable,
      cost, setCost,
      vehicleType, setVehicleType,
    }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };