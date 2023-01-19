import { fetchJson } from '../helpers';

export function GetUserById({ userId }) {
  return fetchJson(`/profile/${userId}`, 'GET');
}

export function GetLoggedInUser({ token }) {
  return fetchJson('/home', 'GET', null, token);
}

export function GetLoggedInUserProjects({ userId, token }) {
  return fetchJson(`projectsUser/${userId}`, 'GET', null, token);
}

export function GetLoggedInUserOtherProjects({ token }) {
  return fetchJson(`project/users`, 'GET', null, token);
}

export function RegisterUser({ data }) {
  return fetchJson(`register`, 'POST', data);
}

export function EditProfileRequest({ userId, data, token }) {
  return fetchJson(`editProfile/${userId}`, 'PUT', data, token);
}

export function GetUserMembershipsRequest({ userId }) {
  return fetchJson(`memberships/users/${userId}`, 'GET');
}

export function GetProjectMembers({ userId }) {
  return fetchJson(`get_project_members/${userId}`, 'GET');
}
