import
  {
    BellOutlined, FacebookOutlined, GithubOutlined, GoogleOutlined, HomeOutlined, LogoutOutlined, ProfileOutlined, SettingOutlined
  } from "@ant-design/icons";
import
  {
    Avatar,
    Badge, Dropdown,
    Input,
    List,
    Menu,
    Space,
    Typography
  } from "antd";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { TopPicApis } from "../../api";
import { Notification } from "../../utils/Notification";
import "./Header.css";
const { Search } = Input;
export function Headers() {
  const [topic, setTopic] = useState([]);
  const [user, setUser] = useState({});

  //call api TopPic
  useEffect(() => {
    TopPicApis.getTopPic()
      .then((res) => {
        setTopic(res); // set data to state
      })
      .catch((err) => {
        Notification("error", "error", err.response.data.message);
      });

    axios
      .get(
        "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
      )
      .then((res) => setUser(res))
      .catch((err) => {
        Notification("error", "error", err.response.data.message);
      });
  }, []);

  return (
    <Fragment>
      <div className="navbar">
        <Typography.Title level={2} type="secondary">
          MyPho
          <Typography.Text level={2} type="success">
            to
          </Typography.Text>
        </Typography.Title>
        <Navigation />
        <UserActions user={user} settingDropDown={settingDropDown} />
      </div>
      <NavBarFilter topic={topic} />
    </Fragment>
  );
}

function settingDropDown() {
  return (
    <Menu>
      <Menu.Item>
        <Space size="small">
          <ProfileOutlined />
          Profile
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space size="small">
          <SettingOutlined />
          Setting
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space size="small">
          <LogoutOutlined />
          Logout
        </Space>
      </Menu.Item>
    </Menu>
  );
}

function NotifiDropDown({ user }) {
  const data = user.data.results;
  return (
    <div className="notification-box">
      <Typography.Title level={2} type="secondary">
        Notification <BellOutlined />
      </Typography.Title>
      <List
        style={{
          width: 500,
          background: "#fff",
          overflow: "auto",
          height: 500,
        }}
        bordered
        size="large"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={item.name.last}
              description={item.email}
            />
            <Typography.Text type="success">Notification</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
}

function NavBarFilter({ topic }) {
  return (
    <div className="navbar-filter">
      <Space size="large" align="start">
        {topic.map((item) => (
          <Typography.Text
            key={item.id}
            style={{
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              padding: 5,
            }}
          >
            {item.title}
          </Typography.Text>
        ))}
      </Space>
    </div>
  );
}

function UserActions({ user, settingDropDown }) {
  return (
    <Space size="large">
      <Dropdown overlay={<NotifiDropDown user={user} />}>
        <Badge count={99} overflowCount={10} size="small">
          <BellOutlined
            style={{
              fontSize: "25px",
              cursor: "pointer",
            }}
          />
        </Badge>
      </Dropdown>
      <Dropdown overlay={settingDropDown}>
        <SettingOutlined
          style={{
            fontSize: "25px",
            cursor: "pointer",
          }}
        />
      </Dropdown>
      <Avatar
        size="large"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
      ></Avatar>
    </Space>
  );
}

function Navigation() {
  return (
    <Space size="large">
      <Search
        placeholder="input search text"
        allowClear
        style={{
          width: 350,
          display: "flex",
        }}
      ></Search>
      <Menu
        mode="horizontal"
        defaultActiveFirst={1}
        style={{
          width: 500,
        }}
      >
        <Menu.Item key={1}>
          <HomeOutlined />
          <span>Home</span>
        </Menu.Item>
        <Menu.Item>
          <GithubOutlined />
          <span>GitHub</span>
        </Menu.Item>
        <Menu.Item>
          <FacebookOutlined />
          <span>FaceBook</span>
        </Menu.Item>
        <Menu.Item>
          <GoogleOutlined />
          <span>Gmail</span>
        </Menu.Item>
      </Menu>
    </Space>
  );
}
