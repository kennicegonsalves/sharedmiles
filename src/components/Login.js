// // import useRef, useContext, and useNavigate 
// import { useRef, useContext } from "react";
// import { useNavigate } from 'react-router-dom'; // Updated import
// // import Context to get shared data from React context.
// import Context from "../Context";
// // import firebase authentication and real time database.
// import { auth, realTimeDb } from "../firebase";
// // import validator to validate user's credentials.
// import validator from "validator";
// // import custom components.
// import withModal from "./Modal";
// import SignUp from "./SignUp";
// // import logo 
// import logoBlack from '../logo_black.png';
// import { signInWithEmailAndPassword } from "firebase/auth"; // Ensure correct import

// function Login(props) {
//   // get shared data from context.
//   const { setUser, setIsLoading, cometChat } = useContext(Context);
//   // get toggle modal function from withModal - higher order component.
//   const { toggleModal } = props;
//   // create refs to get user's email and user's password.
//   const emailRef = useRef(null);
//   const passwordRef = useRef(null);

//   const navigate = useNavigate(); // Use useNavigate

//   /**
//    * validate user's credentials.
//    * @param {*} email 
//    * @param {*} password 
//    * @returns {boolean}
//    */
//   const isUserCredentialsValid = (email, password) => {
//     return validator.isEmail(email) && password.length > 0;
//   };

//   /**
//    * login
//    */
//   const login = () => {
//     // show loading indicator.
//     setIsLoading(true);
//     // get the user's credentials.
//     const email = emailRef.current.value;
//     const password = passwordRef.current.value;

//     if (isUserCredentialsValid(email, password)) {
//       // if the user's credentials are valid, call Firebase authentication service.
//       signInWithEmailAndPassword(auth, email, password) // Use the correct method
//         .then((userCredential) => {
//           const userEmail = userCredential.user.email;
//           realTimeDb.ref('users').orderByChild('email').equalTo(userEmail).once("value", (snapshot) => {
//             const val = snapshot.val();
//             if (val) {
//               const keys = Object.keys(val);
//               const user = val[keys[0]];
//               // login CometChat.
//               cometChat.login(user.id, process.env.REACT_APP_COMETCHAT_AUTH_KEY).then(
//                 () => {
//                   // User logged in successfully.
//                   // save authenticated user to local storage.
//                   localStorage.setItem('auth', JSON.stringify(user));
//                   // save authenticated user to context.
//                   setUser(user);
//                   // hide loading.
//                   setIsLoading(false);
//                   // redirect to home page.
//                   navigate('/'); // Use navigate instead of history.push
//                 },
//                 error => {
//                   setIsLoading(false);
//                   console.error("CometChat login failed:", error);
//                   alert("Failed to log in to chat service.");
//                 }
//               );
//             } else {
//               setIsLoading(false);
//               alert("User not found in the database.");
//             }
//           });
//         })
//         .catch((error) => {      
//           // hide loading indicator.
//           setIsLoading(false);
//           console.log("Error : " + error);
//           alert("Your username or password is not correct");
//         });
//     } else {
//       // hide loading indicator.
//       setIsLoading(false);
//       alert("Your username or password is not correct");
//     }
//   };

//   return (
//     <div className="login__container">
//       <div className="login__welcome">
//         <div className="login__logo">
//           <img src={logoBlack} alt="Uber Clone" />
//         </div>
//         <p>Get moving with Uber</p>
//       </div>
//       <div className="login__form-container">
//         <div className="login__form">
//           <input
//             type="text"
//             placeholder="Email or phone number"
//             ref={emailRef}
//           />
//           <input type="password" placeholder="Password" ref={passwordRef} />
//           <button className="login__submit-btn" onClick={login}>
//             Login
//           </button>
//           <span className="login__forgot-password">Forgot password?</span>
//           <span className="login__signup" onClick={() => toggleModal(true)}>Create New Account</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withModal(SignUp)(Login);












// import useRef, useContext, and useNavigate 
import { useRef, useContext } from "react";
import { useNavigate } from 'react-router-dom';
// import Context to get shared data from React context.
import { Context } from "../Context"; // Correct
// import firebase authentication and real time database.
import { auth, realTimeDb } from "../firebase";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
// import validator to validate user's credentials.
import validator from "validator";
// import custom components.
import withModal from "./Modal";
import SignUp from "./SignUp";
// import logo 
// import logoBlack from '../logo_black.png';
import logo from './assets/1.png';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login(props) {
  // get shared data from context.
  const { setUser, setIsLoading, cometChat } = useContext(Context);
  // get toggle modal function from withModal - higher order component.
  const { toggleModal } = props;
  // create refs to get user's email and user's password.
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  /**
   * validate user's credentials.
   * @param {*} email 
   * @param {*} password 
   * @returns {boolean}
   */
  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password.length > 0;
  };

  /**
   * login
   */
  const login = () => {
    // show loading indicator.
    setIsLoading(true);
    // get the user's credentials.
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (isUserCredentialsValid(email, password)) {
      // if the user's credentials are valid, call Firebase authentication service.
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const userEmail = userCredential.user.email;

          // Updated Firebase query
          const userQuery = query(ref(realTimeDb, 'users'), orderByChild('email'), equalTo(userEmail));
          const snapshot = await get(userQuery);

          if (snapshot.exists()) {
            const val = snapshot.val();
            const keys = Object.keys(val);
            const user = val[keys[0]];

            // login CometChat.
            cometChat.login(user.id, process.env.REACT_APP_COMETCHAT_AUTH_KEY).then(
              () => {
                // User logged in successfully.
                // save authenticated user to local storage.
                localStorage.setItem('auth', JSON.stringify(user));
                // save authenticated user to context.
                setUser(user);
                // hide loading.
                setIsLoading(false);
                // redirect to home page.
                navigate('/home');
              },
              error => {
                setIsLoading(false);
                console.error("CometChat login failed:", error);
                alert("Failed to log in to chat service.");
              }
            );
          } else {
            setIsLoading(false);
            alert("User not found in the database.");
          }
        })
        .catch((error) => {
          // hide loading indicator.
          setIsLoading(false);
          console.error("Error: ", error);
          alert("Your username or password is not correct");
        });
    } else {
      // hide loading indicator.
      setIsLoading(false);
      alert("Your username or password is not correct");
    }
  };

  return (
    <div className="login__container">
      <div className="login__welcome">
        <div className="login__logo" style={{margin:'100px'}}>
          <img src={logo} alt="Shared Miles" />
        </div>
      </div>
      <div className="login__form-container">
        <form className="login__form" onSubmit={(e) => { e.preventDefault(); login(); }}>
          <input
            type="text"
            placeholder="Email or phone number"
            ref={emailRef}
            required
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            required
          />
          <button type="submit" className="login__submit-btn">
            Login
          </button>
          <span className="login__signup" onClick={() => toggleModal(true)}>Create New Account</span>
        </form>
      </div>
    </div>
  );
}  

export default withModal(SignUp)(Login);












// import { useRef, useContext } from "react";
// import Context from "../Context"; 
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth, realTimeDb } from "../firebase"; 
// import validator from "validator"; 
// import withModal from "./Modal"; 
// import SignUp from "./SignUp"; 
// import { useNavigate } from 'react-router-dom'; 
// import logoBlack from '../logo_black.png'; 

// function Login(props) {
//   const { setUser, setIsLoading, cometChat } = useContext(Context); 
//   const { toggleModal } = props; 
//   const emailRef = useRef(null); 
//   const passwordRef = useRef(null); 
//   const navigate = useNavigate(); 

//   const isUserCredentialsValid = (email, password) => {
//     return validator.isEmail(email) && password;
//   };

//   const login = () => {
//     setIsLoading(true); 
//     const email = emailRef.current.value; 
//     const password = passwordRef.current.value; 

//     if (isUserCredentialsValid(email, password)) {
//       signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
//         const userEmail = userCredential.user.email; 
//         realTimeDb.ref().child('users').orderByChild('email').equalTo(userEmail).on("value", function(snapshot) {
//           const val = snapshot.val();
//           if (val) {
//             const keys = Object.keys(val);
//             const user = val[keys[0]]; 
//             cometChat.login(user.id, `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`).then(
//               User => {
//                 localStorage.setItem('auth', JSON.stringify(user)); 
//                 setUser(user); 
//                 setIsLoading(false); 
//                 navigate('/'); 
//               },
//               error => {
//                 setIsLoading(false);
//                 console.error("CometChat login failed", error);
//               }
//             );
//           }
//         });
//       })
//       .catch((error) => {
//         setIsLoading(false);
//         alert(`Your username or password is not correct`);
//       });
//     } else {
//       setIsLoading(false);
//       alert(`Your username or password is not correct`);
//     }
//   };

//   return (
//     <div className="login__container">
//       <div className="login__welcome">
//         <div className="login__logo">
//           <img src={logoBlack} alt="Logo" />
//         </div>
//         <p>Get moving with Ober</p>
//       </div>
//       <div className="login__form-container">
//         <div className="login__form">
//           <input
//             type="text"
//             placeholder="Email or phone number"
//             ref={emailRef}
//           />
//           <input type="password" placeholder="Password" ref={passwordRef} />
//           <button className="login__submit-btn" onClick={login}>
//             Login
//           </button>
//           <span className="login__forgot-password">Forgot password?</span>
//           <span className="login__signup" onClick={() => toggleModal(true)}>Create New Account</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default withModal(SignUp)(Login);








// // Import necessary hooks and modules
// import { useRef, useContext } from "react";
// import Context from "../Context"; // Context for shared data
// import validator from "validator"; // Validator for user credentials
// import withModal from "./Modal"; // Higher-order component for modal
// import SignUp from "./SignUp"; // SignUp component
// import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
// import logoBlack from '../logo_black.png'; // Logo image

// function Login(props) {
//   const { setIsLoading } = useContext(Context); // Context values
//   const { toggleModal } = props; // Function to toggle modal
//   const emailRef = useRef(null); // Ref for email input
//   const passwordRef = useRef(null); // Ref for password input

//   const navigate = useNavigate(); // Use useNavigate instead of useHistory

//   // Validate user credentials
//   const isUserCredentialsValid = (email, password) => {
//     return validator.isEmail(email) && password;
//   };

//   // Placeholder login function for frontend validation
//   const login = () => {
//     setIsLoading(true); // Show loading indicator
//     const email = emailRef.current.value; // Get email
//     const password = passwordRef.current.value; // Get password

//     if (isUserCredentialsValid(email, password)) {
//       // Simulate successful login (for frontend testing only)
//       setIsLoading(false); // Hide loading
//       navigate('/'); // Redirect to home page
//     } else {
//       // Invalid credentials
//       setIsLoading(false);
//       alert(`Your username or password is not correct`);
//     }
//   };

//   return (
    
//     <div className="login__container">
//       <div className="login__welcome">
//         <div className="login__logo">
//           <img src={logoBlack} alt="Logo" />
//         </div>
//         <p>Get moving with Ober</p>
//       </div>
//       <div className="login__form-container">
//         <div className="login__form">
//           <input
//             type="text"
//             placeholder="Email or phone number"
//             ref={emailRef}
//           />
//           <input type="password" placeholder="Password" ref={passwordRef} />
//           <button className="login__submit-btn" onClick={login}>
//             Login
//           </button>
//           <span className="login__forgot-password">Forgot password?</span>
//           <span className="login__signup" onClick={() => toggleModal(true)}>Create New Account</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Wrap Login component with the modal HOC
// export default withModal(SignUp)(Login);
