import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home'
import Login from './components/Login';
import Loading from './components/Loading';
import Chat from './components/Chat';
import { Context } from './Context';
import { realTimeDb } from './firebase';
import { ref, onValue, off } from 'firebase/database';
import AboutUs from './components/AboutUs.jsx';
import ContactUs from './components/ContactUs.js';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [cometChat, setCometChat] = useState(null);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [rideRequest, setRideRequest] = useState(null);
  const [currentRide, setCurrentRide] = useState(null);
  
  // New state variables for additional ride details
  const [rideDate, setRideDate] = useState(null);
  const [rideTime, setRideTime] = useState(null);
  // const [seatsAvailable, setSeatsAvailable] = useState(null);
  const [cost, setCost] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);

  const lookingDriverMaxTime = 30000;

  useEffect(() => {
    initAuthUser();
    initCometChat();
    initCurrentRide();
  }, []);

  useEffect(() => {
    if (rideRequest) {
      const lookingDriverTimeout = setTimeout(() => {
        setRideRequest(null);
        setIsLoading(false);
      }, lookingDriverMaxTime);

      const createdRideRef = ref(realTimeDb, `rides/${rideRequest.rideUuid}`);
      
      const rideListener = onValue(createdRideRef, (snapshot) => {
        const updatedRide = snapshot.val();
        if (updatedRide && updatedRide.rideUuid === rideRequest.rideUuid && updatedRide.driver) {
          setIsLoading(false);
          clearTimeout(lookingDriverTimeout);
          setRideRequest(null);
          localStorage.setItem('currentRide', JSON.stringify(updatedRide));
          setCurrentRide(() => updatedRide);
        }
      });

      // Cleanup function to remove listener
      return () => {
        off(createdRideRef, 'value', rideListener);
        clearTimeout(lookingDriverTimeout);
      };
    }
  }, [rideRequest]);

  useEffect(() => {
    if (currentRide) {
      const currentRideRef = ref(realTimeDb, `rides/${currentRide.rideUuid}`);
      
      const currentRideListener = onValue(currentRideRef, (snapshot) => {
        const updatedRide = snapshot.val();
        if (updatedRide && updatedRide.rideUuid === currentRide.rideUuid && updatedRide.driver && (updatedRide.status === -1 || updatedRide.status === 2)) {
          localStorage.removeItem('currentRide');
          setCurrentRide(null);
        }
      });

      // Cleanup function to remove listener
      return () => {
        off(currentRideRef, 'value', currentRideListener);
      };
    }
  }, [currentRide]);

  const initCurrentRide = () => {
    const currentRide = localStorage.getItem('currentRide');
    if (currentRide) {
      setCurrentRide(() => JSON.parse(currentRide));
    }
  };

  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };

  const initCometChat = async () => {
    const { CometChat } = await import('@cometchat-pro/chat');
    const appID = `${process.env.REACT_APP_COMETCHAT_APP_ID}`;
    const region = `${process.env.REACT_APP_COMETCHAT_REGION}`;
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    CometChat.init(appID, appSetting).then(
      () => {
        setCometChat(() => CometChat);
      },
      error => {
        console.error("Error initializing CometChat:", error);
      }
    );
  };

  return (
    <Context.Provider value={{ 
      isLoading, setIsLoading, 
      user, setUser, 
      cometChat, 
      selectedFrom, setSelectedFrom, 
      selectedTo, setSelectedTo, 
      rideRequest, setRideRequest, 
      currentRide, setCurrentRide,
      // New context values for ride details
      rideDate, setRideDate,
      rideTime, setRideTime,
      // seatsAvailable, setSeatsAvailable,
      cost, setCost,
      vehicleType, setVehicleType,
    }}>
     <Router>
        <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Display HomePage on initial load */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/about" element={<AboutUs />} /> {/* Add this route */}
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>

{isLoading && <Loading />}
    </Context.Provider>
  );
}

export default App;