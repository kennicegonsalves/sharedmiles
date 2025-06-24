// Latest code (19:36  3-11-24)
import { ref, set } from 'firebase/database';
import { useContext } from 'react';
import { realTimeDb } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../Context"; // Correct
import Cross from './assets/cross.png'

function RequestRide({ toggleModal }) {
  // const { user, selectedFrom, selectedTo, setRideRequest, setIsLoading } = useContext(Context);
  const { user, selectedFrom, selectedTo, rideDate, rideTime, cost, vehicleType, setRideRequest, setIsLoading } = useContext(Context);

  // Correct code 4th november, 2024
  // const requestRide = () => {
  //   console.log("requestRide function called");
  //   if (user && selectedFrom && selectedTo) {
  //     console.log("Requesting Ride with details:");
  //     console.log("User:", user);
  //     console.log("Selected From:", selectedFrom);
  //     console.log("Selected To:", selectedTo);
      
  //     toggleModal(false);
  //     setIsLoading(true);
  
  //     const rideUuid = uuidv4();
  //     const ride = {
  //       "rideUuid": rideUuid,
  //       "requestor": {
  //         "name": user.displayName || "Anonymous",
  //         "userId": user.id || "Unknown"
  //       },
  //       "pickup": selectedFrom.label,
  //       "destination": selectedTo.label,
  //       "status": 0
  //     };
  
  //     const rideRef = ref(realTimeDb, `rides/${rideUuid}`);
  //     set(rideRef, ride)
  //       .then(() => {
  //         setRideRequest(ride);
  //         setIsLoading(false);
  //         console.log("Ride successfully requested:", ride);
  //       })
  //       .catch((error) => {
  //         console.error('Failed to request ride:', error);
  //         setIsLoading(false);
  //       });
  //   } else {
  //     alert('Ensure that you have selected valid locations and are logged in.');
  //   }
  // };


  const requestRide = () => {
    console.log("requestRide function called");
    if (user && selectedFrom && selectedTo) {
      console.log("Requesting Ride with details:");
      console.log("User:", user);
      console.log("Selected From:", selectedFrom);
      console.log("Selected To:", selectedTo);
      
      toggleModal(false);
      setIsLoading(true);
  
      const rideUuid = uuidv4();
      const ride = {
        "rideUuid": rideUuid,
        "requestor": {
          "name": user.displayName || "Anonymous",
          "userId": user.id || "Unknown"
        },
        "pickup": selectedFrom.label,
        "destination": selectedTo.label,
        "date": rideDate,
        "time": rideTime, 
        // "seatsAvailable": seatsAvailable, 
        "cost": cost,                    
        "vehicleType": vehicleType, 
        "status": 0
      };
  
      const rideRef = ref(realTimeDb, `rides/${rideUuid}`);
      set(rideRef, ride)
        .then(() => {
          setRideRequest(ride);
          setIsLoading(false);
          console.log("Ride successfully requested:", ride);
        })
        .catch((error) => {
          console.error('Failed to request ride:', error);
          setIsLoading(false);
        });
    } else {
      alert('Ensure that you have selected valid locations and are logged in.');
    }
  };
  
  

  return (
    <div className="request-ride">
      <div className="request-ride__content">
        <div className="request-ride__container">
          <div className="request-ride__title">Requesting a Ride</div>
          <div className="request-ride__close">
            <img
              alt="close"
              onClick={() => toggleModal(false)}
              src={Cross}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </div>
        </div>
        <div className="request-ride__subtitle"></div>
        <div className="request-ride__form">
          <p>
            You entered the pickup location successfully. Do you want to request a ride now?
          </p>
          <button className="request-ride__btn request-ride__change-btn" onClick={() => toggleModal(false)}>
            Change
          </button>
          <button className="request-ride__btn" onClick={requestRide}>
            Requesting a ride now
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestRide;







// Under Progress...................
// import { ref, set } from 'firebase/database';
// import { useContext } from 'react';
// import { realTimeDb } from "../firebase";
// import { v4 as uuidv4 } from "uuid";
// import { Context } from "../Context"; // Correct

// function RequestRide({ toggleModal }) {
//   const {
//     user,
//     selectedFrom,
//     selectedTo,
//     // rideDate,
//     // rideTime,
//     // seatsAvailable,
//     // cost,
//     // vehicleType,
//     setRideRequest,
//     setIsLoading
//   } = useContext(Context); // Include new context values

//   const requestRide = () => {
//     console.log("requestRide function called");
//     if (selectedFrom && selectedTo) { // Only check locations here
//     //if (selectedFrom && selectedTo && rideDate && rideTime && seatsAvailable && cost && vehicleType) { // Only check locations here
//     // if (selectedFrom && selectedTo && seatsAvailable && cost && vehicleType) { // Only check locations here
    
//       setIsLoading(true);
//       toggleModal(false);

//       const rideUuid = uuidv4();
//       const ride = {
//         "rideUuid": rideUuid,
//         "requestor": {
//           "name": user?.displayName || "Anonymous", // Default to "Anonymous"
//           "userId": user?.id || "Unknown"          // Default to "Unknown"
//         },
//         "pickup": selectedFrom.label,
//         "destination": selectedTo.label,
//         // "date": rideDate,                // New field for date
//         // "time": rideTime,                // New field for time
//         // "seatsAvailable": seatsAvailable, // New field for seats available
//         // "cost": cost,                    // New field for cost
//         // "vehicleType": vehicleType,      // New field for vehicle type
//         // "status": 0
//       };

//       console.log("Ride details:", ride);
//       console.log("User email:", user.id);
      

//       const rideRef = ref(realTimeDb, `rides/${rideUuid}`);
//       set(rideRef, ride)
//         .then(() => {
//           setRideRequest(ride);
//           setIsLoading(false);
//           console.log("Ride successfully requested:", ride);
//         })
//         .catch((error) => {
//           console.error('Failed to request ride:', error);
//           setIsLoading(false);
//           alert('Failed to request the ride. Please try again.');
//         });
//     } else {
//       alert('Ensure that you have selected valid locations.');
//     }
//   };

//   return (
//     <div className="request-ride">
//       <div className="request-ride__content">
//         <div className="request-ride__container">
//           <div className="request-ride__title">Requesting a Ride</div>
//           <div className="request-ride__close">
//             <img
//               alt="close"
//               onClick={() => toggleModal(false)}
//               src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
//             />
//           </div>
//         </div>
//         <div className="request-ride__form">
//           <p>
//             You entered the pickup location successfully. Do you want to request a ride now?
//           </p>
//           <button className="request-ride__btn request-ride__change-btn" onClick={() => toggleModal(false)}>
//             Change
//           </button>
//           <button className="request-ride__btn" onClick={requestRide}>
//             Requesting a ride now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RequestRide;


































// latest code
// import { ref, set } from 'firebase/database';
// import { useContext } from 'react';
// import { realTimeDb } from "../firebase";
// import { v4 as uuidv4 } from "uuid";
// import { Context } from "../Context";

// function RequestRide({ toggleModal }) {
//   const { user, selectedFrom, selectedTo, setRideRequest, setIsLoading } = useContext(Context);

//   const requestRide = () => {
//     if (user && selectedFrom && selectedTo) {
//       toggleModal(false);
//       // setIsLoading(true);

//       const rideUuid = uuidv4();
//       const ride = {
//         "rideUuid": rideUuid,
//         "requestor": {
//           "name": user.displayName || "Anonymous",
//           "userId": user.uid || "Unknown"
//         },
//         "pickup": selectedFrom.label, // Save location label only
//         "destination": selectedTo.label,
//         "status": 0
//       };

//       const rideRef = ref(realTimeDb, `rides/${rideUuid}`);
//       set(rideRef, ride)
//         .then(() => {
//           setRideRequest(ride);
//           setIsLoading(false);
//           console.log("Ride successfully requested:", ride);
//           // Here you can also add logic to show the route on the map
//         })
//         .catch((error) => {
//           console.error('Failed to request ride:', error);
//           setIsLoading(false);
//           alert('Cannot find your driver, please re-enter your pickup location and try again.'); // Alerting the user
//         });
//     } else {
//       alert('Ensure that you have selected valid locations and are logged in.');
//     }
//   };

//   return (
//     <div className="request-ride">
//       <div className="request-ride__content">
//         <div className="request-ride__container">
//           <div className="request-ride__title">Requesting a Ride</div>
//           <div className="request-ride__close">
//             <img
//               alt="close"
//               onClick={() => toggleModal(false)}
//               src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
//             />
//           </div>
//         </div>
//         <div className="request-ride__form">
//           <p>
//             You entered the pickup location successfully. Do you want to request a ride now?
//           </p>
//           <button className="request-ride__btn request-ride__change-btn" onClick={() => toggleModal(false)}>
//             Change
//           </button>
//           <button
//             className="request-ride__btn"
//             onClick={requestRide}
//             // disabled={setIsLoading} // Disable button when loading
//           >
//             Requesting a ride now
//             {/* {setIsLoading ? 'Requesting...' : 'Requesting a ride now'} */}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RequestRide;






















// import { ref, set } from 'firebase/database';
// import { useContext } from 'react';
// import { realTimeDb } from "../firebase";
// import { v4 as uuidv4 } from "uuid";
// import { Context } from "../Context";

// function RequestRide({ toggleModal }) {
//   const { user, selectedFrom, selectedTo, setRideRequest, setIsLoading } = useContext(Context);

//   const requestRide = () => {
//     if (user && selectedFrom && selectedTo) {
//       toggleModal(false);
//       setIsLoading(true);

//       const rideUuid = uuidv4();
//       const ride = {
//         "rideUuid": rideUuid,
//         "requestor": {
//           "name": user.displayName || "Anonymous",
//           "userId": user.uid || "Unknown"
//         },
//         "pickup": selectedFrom.label, // Save location label only
//         "destination": selectedTo.label,
//         "status": 0
//       };

//       const rideRef = ref(realTimeDb, `rides/${rideUuid}`);
//       set(rideRef, ride)
//         .then(() => {
//           setRideRequest(ride);
//           setIsLoading(false);
//           console.log("Ride successfully requested:", ride);
//         })
//         .catch((error) => {
//           console.error('Failed to request ride:', error);
//           setIsLoading(false);
//         });
//     } else {
//       alert('Ensure that you have selected valid locations and are logged in.');
//     }
//   };

//   return (
//     <div className="request-ride">
//       <div className="request-ride__content">
//         <div className="request-ride__container">
//           <div className="request-ride__title">Requesting a Ride</div>
//           <div className="request-ride__close">
//             <img
//               alt="close"
//               onClick={() => toggleModal(false)}
//               src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
//             />
//           </div>
//         </div>
//         <div className="request-ride__form">
//           <p>
//             You entered the pickup location successfully. Do you want to request a ride now?
//           </p>
//           <button className="request-ride__btn request-ride__change-btn" onClick={() => toggleModal(false)}>
//             Change
//           </button>
//           <button className="request-ride__btn" onClick={requestRide}>
//             Requesting a ride now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RequestRide;
