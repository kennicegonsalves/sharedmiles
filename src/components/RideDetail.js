// import { useContext } from 'react';
// import { ref, set } from 'firebase/database';
// import { realTimeDb } from "../firebase";
// import Context from '../Context';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';

// function RideDetail({ user, isDriver, currentRide }) {
//   const { setCurrentRide, setIsLoading } = useContext(Context);
//   const navigate = useNavigate();

//   /**
//    * Remove ride from localStorage and reset context
//    */
//   const removeRideFromStorageAndContext = () => {
//     // remove localStorage.
//     localStorage.removeItem('currentRide');
//     // remove data from context.
//     setCurrentRide(null);
//   };

//   const updateRide = (ride) => {
//     // show loading indicator.
//     setIsLoading(true);
//     // update data on Firebase.
//     const rideRef = ref(realTimeDb, `rides/${ride.rideUuid}`);
//     set(rideRef, ride)
//       .then(() => {
//         setIsLoading(false);
//         removeRideFromStorageAndContext();
//       })
//       .catch(() => {
//         setIsLoading(false);
//         alert('Failed to update the ride. Please try again.');
//       });
//   };

//   /**
//    * Cancel ride
//    */
//   const cancelRide = () => {
//     const isCancel = window.confirm('Do you want to cancel this ride?');
//     if (isCancel) {
//       // update data on Firebase.
//       currentRide.status = -1;
//       updateRide(currentRide);
//     }
//   };

//   /**
//    * Finish ride
//    */
//   const finishRide = () => {
//     const isFinish = window.confirm('Do you want to finish this ride?');
//     if (isFinish) {
//       // update data on Firebase.
//       currentRide.status = 2;
//       updateRide(currentRide);
//     }
//   };

//   /**
//    * Talk to user
//    */
//   const talkToUser = () => {
//     navigate('/chat');
//   };

//   return (
//     <div className="ride-detail">
//       <div className="ride-detail__user-avatar">
//         <img src={user.avatar} alt={user.email} />
//       </div>
//       <p className="ride-detail__user-info">{user.email} - {user.phone}</p>
//       <div className="ride-detail__actions">
//         <p className="ride-detail__result-label"><span>From: </span>{currentRide.pickup && currentRide.pickup.label ? currentRide.pickup.label : ''}</p>
//         <p className="ride-detail__result-label"><span>To: </span>{currentRide.destination && currentRide.destination.label ? currentRide.destination.label : ''}</p>
//         <button className="ride-detail__btn" onClick={talkToUser}>{isDriver ? 'Talk to User' : 'Talk to Driver'}</button>
//         <button className="ride-detail__btn" onClick={cancelRide}>Cancel the Ride</button>
//         {isDriver && <button className="ride-detail__btn" onClick={finishRide}>Finish the Ride</button>}
//       </div>
//     </div>
//   );
// }

// RideDetail.propTypes = {
//   user: PropTypes.shape({
//     avatar: PropTypes.string,
//     email: PropTypes.string.isRequired,
//     phone: PropTypes.string.isRequired
//   }).isRequired,
//   isDriver: PropTypes.bool.isRequired,
//   currentRide: PropTypes.shape({
//     rideUuid: PropTypes.string.isRequired,
//     pickup: PropTypes.object,
//     destination: PropTypes.object,
//     status: PropTypes.number
//   }).isRequired
// };

// export default RideDetail;





// import { useContext } from 'react';
// import { ref, set } from 'firebase/database';
// import { realTimeDb } from "../firebase";
// import { Context } from "../Context";
// import { useNavigate, useLocation } from 'react-router-dom';

// function RideDetail() { 
//   const { setCurrentRide, setIsLoading } = useContext(Context);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Retrieve currentRide from state
//   const currentRide = location.state?.currentRide;

//   const removeRideFromStorageAndContext = () => {
//     localStorage.removeItem('currentRide');
//     setCurrentRide(null);
//     navigate('/home');
//   }

//   const updateRide = (ride) => { 
//     setIsLoading(true);
//     const rideRef = ref(realTimeDb, `rides/${ride.rideUuid}`);
//     set(rideRef, ride)
//       .then(() => {
//         setIsLoading(false);
//         removeRideFromStorageAndContext();
//       })
//       .catch(() => {
//         setIsLoading(false);
//         alert('Failed to update the ride. Please try again.');
//       });
//   }

//   const cancelRide = () => {
//     const isCancel = window.confirm('Do you want to cancel this ride?');
//     if (isCancel) {
//       currentRide.status = -1;
//       updateRide(currentRide);
//     }
//   };

//   const finishRide = () => {
//     const isFinish = window.confirm('Do you want to finish this ride?');
//     if (isFinish) {
//       currentRide.status = 2;
//       updateRide(currentRide);
//     }
//   };

//   const talkToUser = () => {
//     navigate('/chat');
//   };

//   return (
//     <div className="ride-detail">
//       <div className="ride-detail__user-avatar">
//         <img src={currentRide?.driver?.avatar} alt={currentRide?.driver?.email} />
//       </div>
//       <p className="ride-detail__user-info">{currentRide?.driver?.email} - {currentRide?.driver?.phone}</p>
//       <div className="ride-detail__actions">
//         <p className="ride-detail__result-label"><span>From: </span>{currentRide?.pickup || 'N/A'}</p>
//         <p className="ride-detail__result-label"><span>To: </span>{currentRide?.destination || 'N/A'}</p>
//         <button className="ride-detail__btn" onClick={talkToUser}>Talk to Driver</button>
//         <button className="ride-detail__btn" onClick={cancelRide}>Cancel the Ride</button>
//         <button className="ride-detail__btn" onClick={finishRide}>Finish the Ride</button>
//       </div>
//     </div>
//   );
// }

// export default RideDetail;
























// under progress .........................
import { useEffect, useContext, useState } from 'react';
import { ref, set, get } from 'firebase/database';
import { realTimeDb } from "../firebase";
import { Context } from "../Context"; 
import { useNavigate } from 'react-router-dom';

function RideDetail({ user, isDriver, currentRide }) { 
  const { setCurrentRide, setIsLoading, setSelectedFrom, setSelectedTo } = useContext(Context);
  const navigate = useNavigate();
  const [requestorAvatar, setRequestorAvatar] = useState(null);
  const [requestorEmail, setRequestorEmail] = useState('');
  const [requestorPhone, setRequestorPhone] = useState('');

  useEffect(() => {
    console.log(currentRide);
    // Fetch requestor's details (avatar, email, phone) from Firebase
    if (isDriver){
      if (currentRide?.requestor?.userId) {
        const userRef = ref(realTimeDb, `users/${currentRide.requestor.userId}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setRequestorAvatar(userData.avatar || '');
            setRequestorEmail(userData.email || 'Email not available');
            setRequestorPhone(userData.phone || 'Phone not available');
          } else {
            console.log("User data not found in Firebase.");
          }
        }).catch((error) => {
          console.error("Failed to fetch user data:", error);
        });
      }
    } else {
      if (currentRide?.driver.id) {
        const userRef = ref(realTimeDb, `users/${currentRide.driver.id}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setRequestorAvatar(userData.avatar || '');
            setRequestorEmail(userData.email || 'Email not available');
            setRequestorPhone(userData.phone || 'Phone not available');
          } else {
            console.log("User data not found in Firebase.");
          }
        }).catch((error) => {
          console.error("Failed to fetch user data:", error);
        });
      }
    }
    
  }, [currentRide]);

  const removeRideFromStorageAndContext = () => {
    localStorage.removeItem('currentRide');
    setCurrentRide(null);
    setSelectedFrom(null);
    setSelectedTo(null);
    navigate('/'); 
  };

  const updateRide = (ride) => { 
    setIsLoading(true);
    const rideRef = ref(realTimeDb, `rides/${ride.rideUuid}`);
    set(rideRef, ride)
      .then(() => {
        setIsLoading(false);
        removeRideFromStorageAndContext();
      })
      .catch(() => {
        setIsLoading(false);
        alert('Failed to update the ride. Please try again.');
      });
  };

  const cancelRide = () => {
    if (window.confirm('Do you want to cancel this ride?')) {
      currentRide.status = -1;
      updateRide(currentRide);
    }
  };

  const finishRide = () => {
    if (window.confirm('Do you want to finish this ride?')) {
      currentRide.status = 2;
      updateRide(currentRide);
    }
  };

  const talkToUser = () => {
    window.open("http://localhost:3001", "_blank"); // Opens the URL in a new tab/window
  };  

  return (
    <div className="ride-detail">
      <div className="ride-detail__user-avatar">
        <img src={requestorAvatar || user.avatar} alt={requestorEmail} />
      </div>
      <p className="ride-detail__user-info">{requestorEmail} - {requestorPhone}</p>
      <div className="ride-detail__actions">
        <p className="ride-detail__result-label"><span> <b>From: </b> <br /> </span>{currentRide.pickup || ''}</p>
        <p className="ride-detail__result-label"><span> <b>To: </b> <br /> </span>{currentRide.destination || ''}</p>
        <button className="ride-detail__btn" onClick={talkToUser}>{isDriver ? 'Talk to User' : 'Talk to Driver'}</button>
        <button className="ride-detail__btn" onClick={cancelRide}>Cancel the Ride</button>
        {isDriver && <button className="ride-detail__btn" onClick={finishRide}>Finish the Ride</button>}
      </div>
    </div>
  );
}

export default RideDetail;