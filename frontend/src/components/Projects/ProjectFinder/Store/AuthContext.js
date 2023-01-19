import React, { useState, useEffect,} from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  //   login: (token) => {},
  //   logout: () => {},
});

// const calculateRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime();

//   const adjExpirationTime = new Date(expirationTime).getTime();

//   const remaningDuration = adjExpirationTime - currentTime;

//   return remaningDuration;
// };

const retrieveStoredToken = () => {
  const token = JSON.parse(sessionStorage.getItem('elas_user')).token;
  // const storedExpirationDate = JSON.parse(window.atob(token.split('.')[1])).exp;

  // const remainingTime = calculateRemainingTime(storedExpirationDate);


  return {
    token: token,
    // duration: remainingTime,
  };
};
export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  

  useEffect(() => {
    if (tokenData) {
    
    }
  }, [
    tokenData,
    
  ]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
