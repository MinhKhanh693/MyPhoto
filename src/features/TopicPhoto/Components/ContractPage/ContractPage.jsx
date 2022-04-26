import {
  Avatar,
  Button,
  Col,
  Grid,
  Popover,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  PictureOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
const { useBreakpoint } = Grid;
export function ContractPage({ topicContract }) {
  const breakpoints = useBreakpoint();
  return (
    <Row
      style={{
        padding: "60px 12px 72px",
      }}
    >
      <Col span={breakpoints.xl ? 16 : 24}>
        <Typography.Title level={2}>{topicContract.title}</Typography.Title>
        <Typography.Paragraph
          style={{
            fontSize: 18,
            lineHeight: "28px",
            width: "70%",
          }}
        >
          {topicContract.description}
        </Typography.Paragraph>
      </Col>
      <Col span={breakpoints.xl ? 8 : 24}>
        <Space
          size="large"
          direction="vertical"
          style={{
            display: "flex",
            border: "1px solid #e8e8e8",
            padding: "12px",
          }}
        >
          <Space
            style={{
              borderBottom: "1px solid #e8e8e8",
              padding: "12px",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Space size="middle">
              <ThunderboltOutlined />
              <Typography.Text>Status</Typography.Text>
            </Space>
            <div>
              {topicContract.status === "open" ? (
                <Tag color="success">{topicContract.status}</Tag>
              ) : (
                <Tag color="error">{topicContract.status}</Tag>
              )}
            </div>
          </Space>
          <Space
            style={{
              borderBottom: "1px solid #e8e8e8",
              padding: "12px",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Space size="middle">
              <UserOutlined />
              <Typography.Text>Curator</Typography.Text>
            </Space>
            <div>
              <UserSwitchOutlined
                style={{
                  font: "25px",
                  fontWeight: "bold",
                }}
              />
            </div>
          </Space>
          <Space
            style={{
              borderBottom: "1px solid #e8e8e8",
              padding: "12px",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Space size="middle">
              <PictureOutlined />
              <Typography.Text>Contributions</Typography.Text>
            </Space>
            <div>
              {" "}
              <Typography.Title
                level={4}
                style={{
                  fontWeight: "bold",
                }}
              >
                {topicContract.total_photos}
              </Typography.Title>
            </div>
          </Space>
          <Space
            style={{
              padding: "12px",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Space size="middle">
              <TeamOutlined />
              <Typography.Text>Top contributors</Typography.Text>
            </Space>
            <div>
              <Space size="small">
                {topicContract.top_contributors.map((contributor) => (
                  <Popover title={contributor.name} key={contributor.id}>
                    <Avatar
                      style={{ cursor: "pointer" }}
                      key={contributor.id}
                      size="small"
                      src={contributor.profile_image.small}
                    ></Avatar>
                  </Popover>
                ))}
              </Space>
            </div>
          </Space>
        </Space>
        <Button
          size="large"
          style={{
            width: "100%",
            marginTop: 20,
            color: "#fff",
            background: "#111",
          }}
        >
          Submit to
          <Typography.Text
            style={{
              fontWeight: "bold",
              paddingLeft: 6,
              color: "#fff",
            }}
          >
            {topicContract.title}
          </Typography.Text>
        </Button>
      </Col>
    </Row>
  );
}
