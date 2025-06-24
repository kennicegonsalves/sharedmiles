// // import useContext
// import { useContext } from 'react';
// // import Context
// import Context from '../Context';
// // import react router
// import { useNavigate } from 'react-router-dom';
// // import logo white
// import logoWhite from '../logo_white.png';

// function Header() {
//   const { user, setUser } = useContext(Context);

//   const navigate = useNavigate(); // Use useNavigate instead of useHistory

//   /**
//    * logout
//    */
//   const logout = () => {
//     const isLogout = window.confirm('Do you want to log out ?');
//     if (isLogout) {
//       // remove local storage.
//       localStorage.removeItem('auth');
//       // remove authenticated user from context.
//       setUser(null);
//       // redirect to login page.
//       navigate('/login'); // Use navigate instead of history.push
//     }
//   }

//   return (
//     <div className="header">
//       <div className="header__left">
//         <img src={logoWhite} alt="Uber Clone" />
//         {
//           user && (
//             <div className="header__right">
//               <img src={user.avatar} alt={user.email}/>
//               <span>Hello, {user.email}</span>
//             </div>
//           )
//         }
//       </div>
//       <span className="header__logout" onClick={logout}><span>Logout</span></span>
//     </div>
//   );
// }

// export default Header;




// import useContext
import { useContext } from 'react';
// import Context
import { Context } from "../Context"; // Correct
// import react router
import { useNavigate, NavLink } from 'react-router-dom'; // Keep this for navigation
// import logo white
import logoBlack from "./assets/2.png";


function Header() {
  const { user, setUser } = useContext(Context);

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  /**
   * logout
   */
  const logout = () => {
    const isLogout = window.confirm('Do you want to log out ?');
    if (isLogout) {
      // remove local storage.
      localStorage.removeItem('auth');
      // remove authenticated user from context.
      setUser(null);
      // redirect to login page.
      navigate('/login'); // Use navigate instead of history.push
    }
  }

  return (
    <div className="header">
      <div className="header__left">
        <img src={logoBlack} alt="Uber Clone" />
        {
          user && (
            <div className="header__right">
              <img src={user.avatar} alt={user.email}/>
              <span>Hello, {user.email}</span>
            </div>
          )
        }
      </div>
      <nav>
          <ul>
            <li>
              <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>
                Dashboard
              </NavLink>
            </li>
            <li>
               <a
               href="http://localhost:3001"
               target="_blank" // Opens in a new tab/window
               rel="noopener noreferrer" // Security measure
               className={({ isActive }) => (isActive ? 'active' : '')}>
                Chat
                 </a>
                 </li>

            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      <span className="header__logout" onClick={logout}><span>Logout</span></span>
    </div>
  );
}

export default Header;
