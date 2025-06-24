import { useEffect, useState, useContext } from 'react';
import { ref, query, orderByChild, equalTo, onValue, off, set } from 'firebase/database';
import { realTimeDb } from "../firebase";
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';

const MAPBOX_API_KEY = process.env.REACT_APP_MAP_BOX_API_KEY;

function RideList() {
  const [rideRequests, setRideRequests] = useState([]);
  const { user, setIsLoading, setCurrentRide } = useContext(Context);
  const { setSelectedFrom, setSelectedTo } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const rideRef = query(ref(realTimeDb, 'rides'), orderByChild('status'), equalTo(0));
    const listener = onValue(rideRef, (snapshot) => {
      const values = snapshot.val();
      const rides = values ? Object.values(values) : [];
      setRideRequests(rides);
    });

    return () => off(rideRef);
  }, []);

  const getCoordinates = async (address) => {
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_API_KEY}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        return {
          x: data.features[0].geometry.coordinates[0], // x for longitude
          y: data.features[0].geometry.coordinates[1], // y for latitude
        };
      } else {
        console.error(`No coordinates found for address: ${address}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const acceptRide = async (request) => {
    request.driver = user;
    request.status = 1;
    setIsLoading(true);

    // Get coordinates for pickup and destination
    const pickupCoordinates = await getCoordinates(request.pickup);
    const destinationCoordinates = await getCoordinates(request.destination);
    console.log("pickupCoordinates:", pickupCoordinates);
    console.log("destinationCoordinates:", destinationCoordinates);

    if (pickupCoordinates && destinationCoordinates) {
      setSelectedFrom(pickupCoordinates);
      setSelectedTo(destinationCoordinates);

      const rideRef = ref(realTimeDb, `rides/${request.rideUuid}`);
      set(rideRef, request)
        .then(() => {
          setIsLoading(false);
          setCurrentRide(request);
          // Optionally navigate to RideDetail with ride data
          // navigate('/ride-detail', { state: { currentRide: request } });
        })
        .catch((error) => {
          console.error('Failed to accept ride:', error);
          setIsLoading(false);
        });
    } else {
      console.error("Failed to get coordinates for pickup or destination");
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const renderRideList = () => {
    if (rideRequests.length === 0) {
      return <h3 className="empty-message">You do not have any requests</h3>;
    }

    return rideRequests.map((request) => (
      <div className="ride-list__result-item" key={request.rideUuid}>
        <p><span><b>From:</b> <br /></span>{request.pickup || 'N/A'}</p>
        <p><span><b>To:</b> <br /></span>{request.destination || 'N/A'}</p>
        <p><span><b>Date:</b> </span>{request.date ? formatDate(request.date) : 'N/A'}</p>
        <p><span><b>Time:</b> </span>{request.time || 'N/A'}</p>
        <p><span><b>Cost:</b> </span>{request.cost ? `₹${Number(request.cost) + 5}` : 'N/A'}</p>
        <p><span><b>Vehicle Type:</b> </span>{request.vehicleType || 'N/A'}</p>
        <button className="ride-list__accept-btn" onClick={() => acceptRide(request)}>Accept</button>
      </div>
    ));
  };

  return (
    <div className="ride-list">
      <div className="ride-list__container">
        <div className="ride-list__title">Ride Requests</div>
      </div>
      <div className="ride-list__content">
        {renderRideList()}
      </div>
    </div>
  );
}

export default RideList;