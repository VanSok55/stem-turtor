import { API_BASE_URI, AUTH_HEADER } from "./constants";
export const fetchLesson = async (pageNum, pageSize) => {
  const response = await fetch(`https://stem.automatex.dev/api/lessons/`, {
    method: "GET",
    headers: {
      Authorization: AUTH_HEADER,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};
