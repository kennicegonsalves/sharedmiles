// import useRef, useContext
import { useRef, useContext } from "react";
// import Context to get shared data.
import { Context } from "../Context"; // Correct
// import validator to validate user's information.
import validator from "validator";
// import firebase authentication and database methods.
import { auth, realTimeDb } from "../firebase"; // Ensure the correct exports in your firebase.js
import { ref, set } from "firebase/database"; // Ensure these are imported
// import uuid to generate id for users.
import { v4 as uuidv4 } from "uuid";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import the modular auth method
import cross from './assets/cross.png';

function SignUp(props) {
  // get toggleModal function from higher order components.
  const { toggleModal } = props;

  // create refs to get user's email, user's password, user's confirm password.
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const roleRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { cometChat, setIsLoading } = useContext(Context);

  const driverRole = 'driver';
  const userRole = 'user';

  /**
   * Generate random avatar for demo purpose.
   * @returns {string} Random avatar URL.
   */
  const generateAvatar = () => {
    const avatars = [
      'https://data-us.cometchat.io/assets/images/avatars/captainamerica.png',
      'https://data-us.cometchat.io/assets/images/avatars/cyclops.png',
      'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
      'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
      'https://data-us.cometchat.io/assets/images/avatars/wolverine.png'
    ];
    const avatarPosition = Math.floor(Math.random() * avatars.length);
    return avatars[avatarPosition];
  };

  /**
   * Validate user's information.
   * @param {Object} param0 
   * @returns {boolean} Validity of the input.
   */
  const isSignupValid = ({ email, phone, role, password, confirmPassword }) => {
    if (!validator.isEmail(email)) {
      alert("Please input a valid email");
      return false;
    }
    if (!validator.isMobilePhone(phone, ['vi-VN', 'en-US'])) {
      alert("Please input a valid phone number");
      return false;
    }
    if (validator.isEmpty(role)) {
      alert("Please select a role");
      return false;
    }
    if (validator.isEmpty(password) || !validator.isLength(password, { min: 6 })) {
      alert("Your password must have at least 6 characters");
      return false;
    }
    if (validator.isEmpty(confirmPassword)) {
      alert("Please input your confirm password");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Confirm password and password must be the same");
      return false;
    }
    return true;
  };

  /**
   * Sign up the user.
   */
  const signup = async () => {
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const role = roleRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (isSignupValid({ email, phone, role, password, confirmPassword })) {
      setIsLoading(true);
      const userUuid = uuidv4();
      const userAvatar = generateAvatar();

      try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        
        const userRef = ref(realTimeDb, `users/${userUuid}`); // Create a reference
        await set(userRef, {
          id: userUuid,
          email,
          phone,
          role,
          avatar: userAvatar
        });

        alert(`${userCredentials.user.email} was created successfully! Please sign in with your created account`);

        const authKey = `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`;
        const user = new cometChat.User(userUuid);
        user.setName(email);
        user.setAvatar(userAvatar);

        await cometChat.createUser(user, authKey);
        setIsLoading(false);
        toggleModal(false); // Close sign-up dialog
      } catch (error) {
        console.error("Error creating account:", error);
        setIsLoading(false);
        alert(`Cannot create your account, ${email} might already exist, please try again!`);
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup__content">
        <div className="signup__container">
          <div className="signup__title">Sign Up</div>
          <div className="signup__close">
            <img
              alt="close"
              onClick={() => toggleModal(false)}
              src={cross}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
          </div>
        </div>
        <div className="signup__subtitle"></div>
        <div className="signup__form">
          <input type="text" placeholder="Email" ref={emailRef} />
          <input type="text" placeholder="Phone" ref={phoneRef} />
          <select ref={roleRef} defaultValue={userRole}>
            <option value={userRole}>User</option>
            <option value={driverRole}>Driver</option>
          </select>
          <input type="password" placeholder="Password" ref={passwordRef} />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />
          <button className="signup__btn" onClick={signup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;















// // import useRef, useContext
// import { useRef, useContext } from "react";
// // import Context to get shared data.
// import Context from "../Context";
// // import validator to validate user's information.
// import validator from "validator";
// // import firebase authentication methods.
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { realTimeDb } from "../firebase";
// // import uuid to generate id for users.
// import { v4 as uuidv4 } from "uuid";

// function SignUp(props) {
//   // get toggleModal function from higher order components.
//   const { toggleModal } = props;

//   // create refs to get user's email, user's password, user's confirm password.
//   const emailRef = useRef(null);
//   const phoneRef = useRef(null);
//   const roleRef = useRef(null);
//   const passwordRef = useRef(null);
//   const confirmPasswordRef = useRef(null);

//   const { cometChat, setIsLoading } = useContext(Context);
//   const auth = getAuth();

//   const driverRole = 'driver';
//   const userRole = 'user';

//   /**
//    * generate random avatar for demo purpose
//    * @returns 
//    */
//   const generateAvatar = () => {
//     const avatars = [
//       'https://data-us.cometchat.io/assets/images/avatars/captainamerica.png',
//       'https://data-us.cometchat.io/assets/images/avatars/cyclops.png',
//       'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
//       'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
//       'https://data-us.cometchat.io/assets/images/avatars/wolverine.png'
//     ];
//     const avatarPosition = Math.floor(Math.random() * avatars.length);
//     return avatars[avatarPosition];
//   }

//   /**
//    * validate user's information.
//    */
//   const isSignupValid = ({ email, phone, role, password, confirmPassword }) => {
//     if (!validator.isEmail(email)) {
//       alert("Please input your email");
//       return false;
//     }
//     if (!validator.isMobilePhone(phone, ['vi-VN', 'en-US'])) {
//       alert("Please input your phone number");
//       return false;
//     }
//     if (validator.isEmpty(role)) {
//       alert("Please input your role");
//       return false;
//     }
//     if (validator.isEmpty(password) || !validator.isLength(password, { min: 6 })) {
//       alert("Please input your password. Your password must have at least 6 characters");
//       return false;
//     }
//     if (validator.isEmpty(confirmPassword)) {
//       alert("Please input your confirm password");
//       return false;
//     }
//     if (password !== confirmPassword) {
//       alert("Confirm password and password must be the same");
//       return false;
//     }
//     return true;
//   };

//   /**
//    * sign up
//    */
//   const signup = async () => {
//     const email = emailRef.current.value;
//     const phone = phoneRef.current.value;
//     const role = roleRef.current.value;
//     const password = passwordRef.current.value;
//     const confirmPassword = confirmPasswordRef.current.value;

//     if (isSignupValid({ email, phone, role, password, confirmPassword })) {
//       setIsLoading(true);
//       const userUuid = uuidv4();
//       const userAvatar = generateAvatar();

//       try {
//         const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
//         if (userCredentials) {
//           await realTimeDb.ref(`users/${userUuid}`).set({
//             id: userUuid,
//             email,
//             phone,
//             role,
//             avatar: userAvatar
//           });

//           alert(`${userCredentials.user.email} was created successfully! Please sign in with your created account`);

//           const authKey = `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`;
//           const user = new cometChat.User(userUuid);
//           user.setName(email);
//           user.setAvatar(userAvatar);

//           cometChat.createUser(user, authKey).then(
//             () => {
//               setIsLoading(false);
//             }, 
//             (error) => {
//               console.error("CometChat account creation failed:", error);
//               setIsLoading(false);
//             }
//           );

//           toggleModal(false);
//         }
//       } catch (error) {
//         console.error("Error creating account:", error);
//         alert(`Cannot create your account, ${email} might be existed, please try again!`);
//         setIsLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="signup">
//       <div className="signup__content">
//         <div className="signup__container">
//           <div className="signup__title">Sign Up</div>
//           <div className="signup__close">
//             <img
//               alt="close"
//               onClick={() => toggleModal(false)}
//               src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
//             />
//           </div>
//         </div>
//         <div className="signup__subtitle"></div>
//         <div className="signup__form">
//           <input type="text" placeholder="Email" ref={emailRef} />
//           <input type="text" placeholder="Phone" ref={phoneRef} />
//           <select ref={roleRef} defaultValue={userRole}>
//             <option value={userRole}>User</option>
//             <option value={driverRole}>Driver</option>
//           </select>
//           <input type="password" placeholder="Password" ref={passwordRef} />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             ref={confirmPasswordRef}
//           />
//           <button className="signup__btn" onClick={signup}>
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;
