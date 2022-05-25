import axios from "axios";

function sendRequest() {
  const axiosSettings = {
    headers: {
      Accept: "application/json",
    },
    crossdomain: true,
    withCredentials: false,
  };
  return axios.create(axiosSettings);
}

export const instance = sendRequest();
