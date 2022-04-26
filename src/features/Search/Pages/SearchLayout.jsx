import { Grid, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchPhotoApis } from "../../../api";
import { Headers } from "../../../components";
import Loading from "../../../utils/loading/loading";
import { Notification } from "../../../utils/Notification";
import { ListPhoto } from "../../Photo/Components/ListPhoto";
import { SearchContractPage } from "../Components/SearchContractPage";
const { useBreakpoint } = Grid;
const { Header, Content } = Layout;
export function SearchLayout() {
  const breakpoint = useBreakpoint();
  const [listPhoto, getListPhoto] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    searchPhotoApis
      .searchPhoto(params.keyword)
      .then((res) => {
        getListPhoto(res);
        setLoading(false);
      })
      .catch((err) =>
        Notification("error", "error", err.response.data.message)
      );
  }, [params.keyword]);

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
        <div style={breakpoint.xs ? { margin: 0 } : { margin: "0 112px" }}>
          <SearchContractPage
            keyWord={params.keyword}
            total={listPhoto?.total}
          />
          <ListPhoto
            keyWord={params.keyword}
            listPhoto={listPhoto?.results}
            isTopicPage={false}
            isSearchPage={true}
          />
        </div>
      </Content>
    </Layout>
  );
}
