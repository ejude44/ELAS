export const apiUrl = `/projectfinder`;

/** Make API URL*/
export function makeApiUrl(path) {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  return `${apiUrl}${path}`;
}

/** Prepare Json response*/
export async function makeJsonResult(response) {
  let jsonResponse = null;

  try {
    jsonResponse = await response.json();
  } catch (e) {}

  return {
    success: response.status >= 200 && response.status <= 399,
    status: response.status,
    data: jsonResponse,
  };
}

/** Handles all API requests*/
export async function fetchJson(path, method, data = null, token = null) {
  const response = await fetch(makeApiUrl(path), {
    method: method,
    headers: {
      "Content-Type": data ? "application/json" : null,
      Authorization: token ? `Bearer ${token}` : null,
    },
    body: data ? JSON.stringify(data) : null,
  });

  return await makeJsonResult(response);
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
