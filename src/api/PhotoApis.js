import axiosClient from "./axiosClient";

export const photoApis = {
  getFirstListPhoto() {
    const url = "/photos/random?count=18";
    return axiosClient.get(url);
  },
  getLoadMoreData(page) {
    const url = `/photos?page=${page}&per_page=10`;
    return axiosClient.get(url);
  },
  getPhotosTopPic(page, topic) {
    const url = `/topics/${topic}/photos?page=${page}&per_page=13`;
    return axiosClient.get(url);
  },
};
