import { fetchJson } from '../helpers';

export function GetProjectsRequest() {
  return fetchJson(`/get_projects`, 'GET');
}

export function GetProjectRequest({ projectId }) {
  return fetchJson(`/projects/${projectId}`, 'GET');
}

export function DeleteProjectRequest({ projectId }) {
  return fetchJson(`deleteProject/${projectId}`, 'DELETE');
}

export function EditProjectRequest({ projectId, data, token }) {
  return fetchJson(`editProject/${projectId}`, 'PUT', data, token);
}

export function CreateProjectRequest({ data, token }) {
  return fetchJson(`post_project`, 'POST', data, token);
}

export function ApplyRequest({ projectId, userId }) {
  return fetchJson(`memberships/projects/${projectId}`, 'POST', { userId });
}

export function GetProjectMembershipsRequest({ projectId }) {
  return fetchJson(`memberships/projects/${projectId}`, 'GET');
}

export function GetProjectTeamMembers({ projectId }) {
  return fetchJson(`projectTeamMembers/${projectId}`, 'GET');
}

export function GetRejectedTeamMembers({ projectId }) {
  return fetchJson(`rejectedTeamMembers/${projectId}`, 'GET');
}



export function AcceptApplicantRequest({ membershipId }) {
  return fetchJson(`memberships/${membershipId}`, 'PUT', {
    status: 'accepted',
  });
}

export function RejectApplicantRequest({ membershipId }) {
  return fetchJson(`memberships/${membershipId}`, 'PUT', {
    status: 'rejected',
  });
}

export function RemoveApplicantRequest({ membershipId }) {
  return fetchJson(`memberships/${membershipId}`, 'DELETE',);
}

export function GetMembershipUserProjectRequest({ userId, projectId }) {
  return fetchJson(`memberships/user-project/${userId}/${projectId}`, 'GET');
}
