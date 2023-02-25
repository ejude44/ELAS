import { fetchJson } from "../helpers";

/*Get User detaild by ID */
export function GetUserById({ userId }) {
  return fetchJson(`/profile/${userId}`, "GET");
}

/** Get Logged in user Details*/
export function GetLoggedInUser({ token }) {
  return fetchJson("/home", "GET", null, token);
}

/**Get logged in user owned Projects */
export function GetLoggedInUserProjects({ userId, token }) {
  return fetchJson(`projectsUser/${userId}`, "GET", null, token);
}

/**Get other projects of logged in User*/
export function GetLoggedInUserOtherProjects({ token }) {
  return fetchJson(`project/users`, "GET", null, token);
}

/** Register user-not implemented*/
export function RegisterUser({ data }) {
  return fetchJson(`register`, "POST", data);
}

/**Edit profile request */
export function EditProfileRequest({ userId, data, token }) {
  return fetchJson(`editProfile/${userId}`, "PUT", data, token);
}

/**Get user membership request */
export function GetUserMembershipsRequest({ userId }) {
  return fetchJson(`memberships/users/${userId}`, "GET");
}

/**Get project members */
export function GetProjectMembers({ userId }) {
  return fetchJson(`get_project_members/${userId}`, "GET");
}
