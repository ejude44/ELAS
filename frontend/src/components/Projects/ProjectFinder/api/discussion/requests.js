import { fetchJson } from '../helpers'

export function GetCommentsRequest({ projectId }) {
  return fetchJson(`discussions/projects/${projectId}`, 'GET')
}

export function CreateCommentRequest({ projectId, owner, body, parent }) {
  return fetchJson(`discussions/projects/${projectId}`, 'POST', { owner, body, parent })
}

export function DeleteCommentRequest({ commentId }) {
  return fetchJson(`discussions/${commentId}`, 'DELETE')
}
