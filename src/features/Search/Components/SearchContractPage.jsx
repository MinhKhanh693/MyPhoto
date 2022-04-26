import { Col, Row, Space, Typography } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import React from "react";

export function SearchContractPage({ keyWord, total }) {
  return (
    <Row
      style={{
        padding: "60px 12px 60px",
      }}
    >
      <Col span={24}>
        <Typography.Title
          level={1}
          style={{ fontSize: 50, fontWeight: "bold" }}
        >
          {keyWord}
        </Typography.Title>
        <Space size="middle">
          <PictureOutlined style={{ fontSize: 50, fontWeight: "bold" }} />
          <Typography.Text style={{ fontSize: 35, fontWeight: "bold" }}>
            Photos: {total}
          </Typography.Text>
        </Space>
      </Col>
    </Row>
  );
}
