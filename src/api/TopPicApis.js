import axiosClient from "./axiosClient";

export const TopPicApis = {
  getTopPic() {
    const url = "/topics?page=1&per_page=13&order_by=featured";
    return axiosClient.get(url);
  },
  getTopPicContract(id) {
    const url = "/topics/" + id;
    return axiosClient.get(url);
  },
};
