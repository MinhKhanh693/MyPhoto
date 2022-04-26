import axiosClient from "./axiosClient";

export const searchPhotoApis = {
  searchPhoto(keyWord) {
    const url = `/search/photos?page=1&query=${keyWord}&per_page=12`;
    return axiosClient.get(url);
  },
  LoadMoreSearchPhoto(keyWord, pageSearch) {
    const url = `/search/photos?page=${pageSearch}&query=${keyWord}&per_page=12`;
    return axiosClient.get(url);
  },
};
