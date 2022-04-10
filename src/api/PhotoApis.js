import axiosClient from "./axiosClient";

export const photoApis = {
  getListPhoto() {
    const url = "/photos";
    return axiosClient.get(url);
  },
};
