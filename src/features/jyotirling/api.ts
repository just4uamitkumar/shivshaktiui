import axios from "axios";
import { server } from "../../redux/store";

export const getAPI = async () => {
  const response = await axios.get(`${server}jyotirlings`);
  // return {
  //   response: response.data.data,
  //   status: response.status,
  //   statustext: response.statusText,
  // };
  return response?.data?.data
};
