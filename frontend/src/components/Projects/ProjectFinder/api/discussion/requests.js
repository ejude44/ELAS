import { fetchJson } from "../helpers";

/**Get Comments request */
export function GetCommentsRequest({ projectId }) {
  return fetchJson(`discussions/projects/${projectId}`, "GET");
}

/**Creat comment request */
export function CreateCommentRequest({ projectId, owner, body, parent }) {
  return fetchJson(`discussions/projects/${projectId}`, "POST", {
    owner,
    body,
    parent,
  });
}

/** Delete Comment request*/
export function DeleteCommentRequest({ commentId }) {
  return fetchJson(`discussions/${commentId}`, "DELETE");
}
