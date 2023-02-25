import {
  GetUserById,
  GetLoggedInUser,
  GetLoggedInUserProjects,
  RegisterUser,
  GetUserMembershipsRequest,
  EditProfileRequest,
  GetLoggedInUserOtherProjects,
  GetProjectMembers,
} from "./requests";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../Store/UserContext";

/** This file contains all custom hooks related to the user*/

/**Get user by ID hoook */
export function useGetUserById(userId) {
  const [result, setUser] = useState(null);
  const getUserById = async () => {
    if (userId) {
      setUser(await GetUserById({ userId }));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    getUserById();
  }, [userId]);

  return { result, us: result?.data, getUserById };
}

/**Logged in user Details Hook*/
export function useGetLoggedInUser(token) {
  const [result, setUser] = useState(null);

  const getLoggedInUser = async () => {
    if (token) {
      setUser(await GetLoggedInUser({ token }));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, [token]);

  return { result, user: result?.data, getLoggedInUser };
}

/** Get logged in user Projects hooks*/
export function useGetLoggedInUserProjects(userId, token) {
  const [result, setProjects] = useState(null);
  const getLoggedInUserProjects = async () => {
    if (token) {
      setProjects(await GetLoggedInUserProjects({ userId, token }));
    } else {
      setProjects(null);
    }
  };
  useEffect(() => {
    getLoggedInUserProjects();
  }, [userId, token]);

  return { result, projects: result?.data, getLoggedInUserProjects };
}

/**Get logged in user other projects hooks */
export function useGetLoggedInUserOtherProjects(userId, token) {
  const [result, setProjects] = useState(null);
  const getLoggedInUserOtherProjects = async () => {
    if (token) {
      setProjects(await GetLoggedInUserOtherProjects({ userId, token }));
    } else {
      setProjects(null);
    }
  };
  useEffect(() => {
    getLoggedInUserOtherProjects();
  }, [userId, token]);
  return { result, otherProjects: result?.data, getLoggedInUserOtherProjects };
}

/** not implemented*/
export function useCreateUser() {
  const createUser = async (data) => {
    return await RegisterUser({ data });
  };
  return { createUser };
}

/** User membership hook*/
export function useUserMemberships(userId) {
  const [result, setResult] = useState(null);
  const refetch = async () => {
    if (userId) {
      setResult(await GetUserMembershipsRequest({ userId }));
    } else {
      setResult(null);
    }
  };
  useEffect(() => {
    refetch();
  }, [userId]);
  return { result, projects: result?.data, refetch };
}

/**Get Project members Hook*/
export function useProjectMembers(userId) {
  const [result, setResult] = useState(null);
  const refetch = async () => {
    if (userId) {
      setResult(await GetProjectMembers({ userId }));
    } else {
      setResult(null);
    }
  };
  useEffect(() => {
    refetch();
  }, [userId]);
  return { result, members: result?.data, refetch };
}

/** not implemented*/
export function useCurrentUser() {
  const { user } = useContext(UserContext);
  return user;
}

/** Edit profile hook*/
export function useEditProfile() {
  const editProfile = async (userId, data, token) => {
    return await EditProfileRequest({ userId, data, token });
  };
  return { editProfile };
}
