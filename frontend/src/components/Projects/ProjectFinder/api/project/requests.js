import { fetchJson } from "../helpers";
/** This file contains all requests associated with Projects*/

/** Get projects requests*/
export function GetProjectsRequest() {
  return fetchJson(`/get_projects`, "GET");
}

/** Get project request*/
export function GetProjectRequest({ projectId }) {
  return fetchJson(`/projects/${projectId}`, "GET");
}

/** Delete project Request*/
export function DeleteProjectRequest({ projectId }) {
  return fetchJson(`deleteProject/${projectId}`, "DELETE");
}

/** Edit project request*/
export function EditProjectRequest({ projectId, data, token }) {
  return fetchJson(`editProject/${projectId}`, "PUT", data, token);
}

/**Create project request */
export function CreateProjectRequest({ data, token }) {
  return fetchJson(`post_project`, "POST", data, token);
}

/** apply to a project request*/
export function ApplyRequest({ projectId, userId }) {
  return fetchJson(`memberships/projects/${projectId}`, "POST", { userId });
}

/**Get project membership request */
export function GetProjectMembershipsRequest({ projectId }) {
  return fetchJson(`memberships/projects/${projectId}`, "GET");
}

/**Get project Team members */
export function GetProjectTeamMembers({ projectId }) {
  return fetchJson(`projectTeamMembers/${projectId}`, "GET");
}

/**Get rejected Team members */
export function GetRejectedTeamMembers({ projectId }) {
  return fetchJson(`rejectedTeamMembers/${projectId}`, "GET");
}

/**Accept applicant request */
export function AcceptApplicantRequest({ membershipId }) {
  return fetchJson(`memberships/${membershipId}`, "PUT", {
    status: "accepted",
  });
}
/**Reject applicant request  */
export function RejectApplicantRequest({ membershipId }) {
  return fetchJson(`memberships/${membershipId}`, "PUT", {
    status: "rejected",
  });
}

/** Remove applicant request*/
export function RemoveApplicantRequest({ membershipId }) {
  return fetchJson(`memberships/${membershipId}`, "DELETE");
}

/**Get membership user project request */
export function GetMembershipUserProjectRequest({ userId, projectId }) {
  return fetchJson(`memberships/user-project/${userId}/${projectId}`, "GET");
}
