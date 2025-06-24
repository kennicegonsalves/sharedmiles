import { useEffect, useState, useContext } from 'react';
import { ref, set, query, onValue, off } from 'firebase/database';
import { realTimeDb } from "../firebase";
import { Context } from '../Context';

function RidePostList() {
  const [rideRequests, setRideRequests] = useState([]);
  const { user, setIsLoading, setCurrentRide, setSelectedFrom, setSelectedTo } = useContext(Context);

  useEffect(() => {
    // Reference to 'rides' in Firebase Realtime Database
    const rideRef = ref(realTimeDb, 'rides');
    
    // Listen for value changes in 'rides'
    const listener = onValue(rideRef, (snapshot) => {
      const values = snapshot.val();
      const rides = values ? Object.values(values) : [];

      // Filter rides where the requestor's userId matches the current user's UID
      const userRides = rides.filter(ride => ride.requestor?.userId === user.uid);
      setRideRequests(userRides);
    });

    // Clean up listener on unmount
    return () => off(rideRef, listener);
  }, [user.uid]);

  const acceptRide = (request) => {
    request.driver = user;
    request.status = 1;
    setIsLoading(true);

    const rideRef = ref(realTimeDb, `rides/${request.rideUuid}`);
    set(rideRef, request)
      .then(() => {
        setIsLoading(false);
        localStorage.setItem('currentRide', JSON.stringify(request));
        setCurrentRide(request);
        setSelectedFrom(request.pickup);
        setSelectedTo(request.destination);
      })
      .catch((error) => {
        console.error('Failed to accept ride:', error);
        setIsLoading(false);
      });
  };

  // Helper function to format date from YYYY-MM-DD to DD-MM-YYYY
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const renderRideList = () => {
    if (rideRequests.length === 0) {
      return <h3 className="empty-message">You do not have any requests</h3>;
    }

    return rideRequests.map((request) => (
      <div className="ride-post-list__result-item" key={request.rideUuid}>
        <p>Hello world</p>
        <p><span><b>From:</b> <br /></span>{request.pickup || 'N/A'}</p>
        <p><span><b>To:</b> <br /></span>{request.destination || 'N/A'}</p>
        <p><span><b>Date:</b> </span>{request.date ? formatDate(request.date) : 'N/A'}</p>
        <p><span><b>Time:</b> </span>{request.time || 'N/A'}</p>
        <p><span><b>Cost:</b> </span>{request.cost ? `₹${request.cost}` : 'N/A'}</p>
        <p><span><b>Vehicle Type:</b> </span>{request.vehicleType || 'N/A'}</p>
        <button className="ride-post-list__accept-btn" onClick={() => acceptRide(request)}>Start the ride</button>
      </div>
    ));
  };

  return (
    <div className="ride-post-list">
      <div className="ride-post-list__container">
        <div className="ride-post-list__title">Ride Requests</div>
      </div>
      <div className="ride-post-list__content">
        {renderRideList()}
      </div>  
    </div>
  );
}

export default RidePostList;

