import React, { useState } from "react";

const userContext = React.createContext({
    user: {},
    userAdd: () => {},
});

// export const UserContext = (props) => {
//     const [user, setUser] = useState({});

//     const userHandler = (userData) => {
//         setUser(userData);
//     };
//     return (
//         <userContext.Provider value={{ userAdd: userHandler, user: user }}>
//             {props.children}
//         </userContext.Provider>
//     );
// };

export default userContext;
