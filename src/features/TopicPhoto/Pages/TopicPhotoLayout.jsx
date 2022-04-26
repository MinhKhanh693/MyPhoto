import { Grid, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { photoApis, TopPicApis } from "../../../api";
import { Headers } from "../../../components";
import Loading from "../../../utils/loading/loading";
import { Notification } from "../../../utils/Notification";
import { ListPhoto } from "../../Photo/Components/ListPhoto";
import { ContractPage } from "../../TopicPhoto/Components/ContractPage";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;
export function TopicPhotoLayout() {
  const breakpoint = useBreakpoint();
  const [topicContract, setTopicContract] = useState([]);
  const [listPhoto, getListPhoto] = useState([]);

  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    TopPicApis.getTopPicContract(params.id)
      .then((res) => {
        setTopicContract(res);
        setLoading(false);
      })
      .catch((err) =>
        Notification("error", "error", err.response.data.message)
      );

    photoApis.getPhotosTopPic(1, params.id).then((res) => {
      getListPhoto(res);
    });
  }, [params.id]);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }
  return (
    <Layout>
      <Header id="header">
        <Headers />
      </Header>
      <div id="line-header"></div>
      <Content style={{ background: "#fff" }}>
        <div style={breakpoint.xs ? { margin:0 } : { margin: "0 112px" }}>
          <ContractPage topicContract={topicContract} />
          <ListPhoto
            listPhoto={listPhoto}
            isTopicPage={true}
            isSearchPage={false}
          />
        </div>
      </Content>
    </Layout>
  );
}
