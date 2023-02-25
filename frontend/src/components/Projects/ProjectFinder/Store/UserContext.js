import React, { useState, useEffect } from "react";
import { useGetLoggedInUser } from "../api/user/hooks";


 /**Context-api for Currently logged-in user */
 
const UserContext = React.createContext({
  id: "",
  firstName: "",
  lastName: "",
  degree: "",
  skills: "",
  languageSkills: "",
  description: "",
  foto: "",
  getLoggedInUser: "",
});

export const UserContextProvider = (props) => {
  const token = JSON.parse(sessionStorage.getItem("elas_user")).token;
  const [loadedUser, setLoadedUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    degree: "",
    skills: "",
    description: "",
    languageSkills: "",
    foto: "",
  });
  const { user, getLoggedInUser } = useGetLoggedInUser(token);
  const [toComplete, setToComplete] = useState(false);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      setLoadedUser(user);
      user.map((details) => {
        setLoadedUser({
          id: details.id,
          firstName: details.firstname,
          lastName: details.lastname,
          degree: details.degree,
          skills: details.skills,
          languageSkills: details.languageSkills,
          description: details.description,
          foto: details.profile_image,
        });
        return "";
      });
    }
    if (user !== null && user !== undefined) {
      user.map((details) => {
        if (
          details.degree === "" ||
          details.skills === [] ||
          details.description === "" ||
          details.languageSkills === []
        ) {
          setToComplete(true);
        } else {
          setToComplete(false);
        }
        return " ";
      });
    }
  }, [user, toComplete]);



  const contextValue = {
    id: loadedUser.id,
    languageSkills: loadedUser.languageSkills,
    firstName: loadedUser.firstName,
    lastName: loadedUser.lastName,
    degree: loadedUser.degree,
    skills: loadedUser.skills,
    description: loadedUser.description,
    foto: loadedUser.foto,
    getLoggedInUser: getLoggedInUser,
    toComplete: toComplete,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
