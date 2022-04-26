import { Grid } from "antd";
import React, { useEffect, useState } from "react";
import { photoApis, TopPicApis } from "../../../api";
import Loading from "../../../utils/loading/loading";
import { Notification } from "../../../utils/Notification";
import { ContractPage } from "../../TopicPhoto/Components/ContractPage";
import { ListPhoto } from "../Components/ListPhoto";
const { useBreakpoint } = Grid;
export function ListPhotoLayout() {
  const breakpoint = useBreakpoint();
  const [topicContract, setTopicContract] = useState([]);
  const [listPhoto, getListPhoto] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TopPicApis.getTopPicContract("bo8jQKTaE0Y")
      .then((res) => {
        setTopicContract(res);
        setLoading(false);
      })
      .catch((err) =>
        Notification("error", "error", err.response.data.message)
      );

    photoApis.getFirstListPhoto().then((res) => getListPhoto(res));
  }, []);
  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }
  return (
    <div style={breakpoint.xs ? { margin: 0 } : { margin: "0 112px" }}>
      <ContractPage topicContract={topicContract} />
      <ListPhoto
        listPhoto={listPhoto}
        isTopicPage={false}
        isSearchPage={false}
      />
    </div>
  );
}
