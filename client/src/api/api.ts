/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const url = "http://localhost:4000/api/v1";

type createDataType = {
  userData: any;
  endpoints: string;
};

export const createData = async ({ userData, endpoints }: createDataType) => {
  try {
    const { data } = await axios.post(`${url}${endpoints}`, userData);
    return data;
  } catch (error: any) {
    throw error.response || error.response.message;
  }
};

export const loginUser = async ({ userData, endpoints }: createDataType) => {
  try {
    const { data } = await axios.post(`${url}${endpoints}`, userData);
    return data;
  } catch (error: any) {
    throw error.response || error.response.message;
  }
};
