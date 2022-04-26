import { Layout } from "antd";
import React from "react";
import { Headers } from "../../../components";
import { ListPhotoLayout } from "../../Photo/Pages/ListPhotoLayout";

const { Header, Content } = Layout;
export function HomeLayout() {
  return (
    <Layout>
      <Header id="header">
        <Headers />
      </Header>
      <div id="line-header"></div>
      <Content style={{ background: "#fff" }}>
        <ListPhotoLayout />
      </Content>
    </Layout>
  );
}
