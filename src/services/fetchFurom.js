import React from "react";
import { API_BASE_URI, AUTH_HEADER } from "./constants";

export const fetchFurum = async (pageSize, pageNum) => {
  const response = await fetch(`https://stem.automatex.dev/api/forums/`, {
    method: "GET",
    header: {
      Authorization: AUTH_HEADER,
    },
  });
  return response.json();
};
