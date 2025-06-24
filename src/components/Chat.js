// import React, { useEffect, useContext, useState } from "react";
// import { CometChat } from "@cometchat-pro/chat";
// import { CometChatMessageList, CometChatInput, CometChatUI } from "@cometchat/chat-uikit-react"; 
// import { Context } from "../Context"; 

// const COMETCHAT_CONSTANTS = {
//   APP_ID: process.env.REACT_APP_COMETCHAT_APP_ID,
//   REGION: process.env.REACT_APP_COMETCHAT_REGION,
//   AUTH_KEY: process.env.REACT_APP_COMETCHAT_AUTH_KEY,
// };

// const Chat = () => {
//   const { user } = useContext(Context);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     const initializeCometChat = async () => {
//       try {
//         await CometChat.init(COMETCHAT_CONSTANTS.APP_ID, COMETCHAT_CONSTANTS.REGION);
//         console.log("CometChat initialized successfully");
//       } catch (error) {
//         console.error("Error during CometChat initialization:", error);
//       }
//     };

//     initializeCometChat();
//   }, []);

//   const handleUserSelected = (user) => {
//     setSelectedUser(user);
//   };

//   return (
//     <CometChatUI>
//       <div className="chat-container">
//         <h2>Chat</h2>
//         {selectedUser && (
//           <>
//             <CometChatMessageList user={selectedUser} />
//             <CometChatInput user={selectedUser} />
//           </>
//         )}
//       </div>
//     </CometChatUI>
//   );
// };

// export default Chat;



import React, { useEffect, useContext, useState } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { CometChatMessageList, CometChatInput, CometChatUI } from "@cometchat/chat-uikit-react"; 
import { Context } from "../Context"; 

const COMETCHAT_CONSTANTS = {
  APP_ID: process.env.REACT_APP_COMETCHAT_APP_ID,
  REGION: process.env.REACT_APP_COMETCHAT_REGION,
  AUTH_KEY: process.env.REACT_APP_COMETCHAT_AUTH_KEY,
};

const Chat = () => {
  const { user } = useContext(Context);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isCometChatInitialized, setIsCometChatInitialized] = useState(false);

  useEffect(() => {
    const initializeCometChat = async () => {
      try {
        await CometChat.init(COMETCHAT_CONSTANTS.APP_ID, COMETCHAT_CONSTANTS.REGION);
        console.log("CometChat initialized successfully");
        setIsCometChatInitialized(true);

        // Ensure user is logged in
        if (user) {
          await CometChat.login(user.uid, COMETCHAT_CONSTANTS.AUTH_KEY);
          console.log("User logged in successfully");
        }
      } catch (error) {
        console.error("Error during CometChat initialization or login:", error);
      }
    };

    initializeCometChat();
  }, [user]);

  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      {isCometChatInitialized ? (
        <CometChatUI>
          {selectedUser && (
            <>
              <CometChatMessageList user={selectedUser} />
              <CometChatInput user={selectedUser} />
            </>
          )}
        </CometChatUI>
      ) : (
        <p>Loading chat...</p>
      )}
    </div>
  );
};

export default Chat;






// function Chat(){
//   return(
//       <h1>hello world</h1>
//   )
// }

// export default Chat;