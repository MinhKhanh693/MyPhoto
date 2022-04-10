import { Layout } from "antd";
import React from "react";
import { Headers } from "../../../components";

const { Header, Content } = Layout;
export function HomeLayout() {
  return (
    <Layout>
      <Header style={{ background: "#fff", height: "auto" }}>
        <Headers />
      </Header>
      <Content>
        <h1>HomeLayout</h1>
      </Content>
    </Layout>
  );
}
