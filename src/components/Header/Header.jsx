import {
  BellOutlined,
  FacebookOutlined,
  GithubOutlined,
  GoogleOutlined,
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
  MenuOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  BackTop,
  Badge,
  Button,
  Carousel,
  Drawer,
  Dropdown,
  Grid,
  Input,
  List,
  Menu,
  Space,
  Typography,
} from "antd";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TopPicApis } from "../../api";
import { Notification } from "../../utils/Notification";
import "./Header.css";
import { setNameTopic } from "../../features/TopicPhoto";
import { Link, NavLink, useNavigate } from "react-router-dom";
const { Search } = Input;
const { useBreakpoint } = Grid;
export function Headers() {
  const breakpoints = useBreakpoint();
  const [topic, setTopic] = useState([]);
  const [user, setUser] = useState({});
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  useEffect(() => {
    const handleScrooll = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScrooll);
  }, []);

  return (
    <div className={sticky ? "sticky" : ""}>
      <div className="navbar">
        <Link to="/MyPhoto/">
          <Typography.Title level={breakpoints.xl ? 2 : 3} type="secondary">
            MyPho
            <Typography.Text level={breakpoints.xl ? 2 : 3} type="success">
              to
            </Typography.Text>
          </Typography.Title>
        </Link>
        <Navigation />
        <UserActions user={user} settingDropDown={settingDropDown} />
      </div>
      <NavBarFilter topic={topic} />
      <BackTop style={{ right: 30 }}></BackTop>
    </div>
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
  const breakpoints = useBreakpoint();
  const data = user.data.results;
  return (
    <div className="notification-box">
      <Typography.Title level={2} type="secondary">
        Notification <BellOutlined />
      </Typography.Title>
      <List
        style={{
          width: breakpoints.xl ? 500 : breakpoints.lg ? 400 : 300,
          background: "#fff",
          overflow: "auto",
          height: breakpoints.xl ? 500 : breakpoints.lg ? 400 : 300,
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
  const dispatch = useDispatch();
  const handleGetTopic = (id) => {
    dispatch(setNameTopic(id));
  };
  return (
    <div className="navbar-filter">
      <NavBarFilterXXl />
    </div>
  );

  function NavBarFilterXXl() {
    const breakpoints = useBreakpoint();

    const SampleNextArrow = (props) => {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{
            ...style,
            color: "black",
            fontSize: "18px",
            lineHeight: "1.5715",
          }}
          onClick={onClick}
        >
          <RightOutlined />
        </div>
      );
    };

    const SamplePrevArrow = (props) => {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{
            ...style,
            color: "black",
            fontSize: "18px",
            lineHeight: "1.5715",
            marginBottom: 2,
          }}
          onClick={onClick}
        >
          <LeftOutlined />
        </div>
      );
    };
    const settings = {
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    return (
      <Carousel
        arrows
        {...settings}
        slidesToShow={
          breakpoints.xl ? 9 : breakpoints.lg ? 6 : breakpoints.md ? 3 : 2
        }
        style={{ textAlign: "center" }}
      >
        {topic.map((item) => (
          <div key={item.id}>
            <NavLink to={"/topic/" + item.id} key={item.id}>
              <Typography.Text
                key={item.id}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: 3,
                  width: 150,
                }}
                onClick={handleGetTopic(item.id)}
              >
                {item.title}
              </Typography.Text>
            </NavLink>
          </div>
        ))}
      </Carousel>
    );
  }
}

function UserActions({ user, settingDropDown }) {
  const breakpoints = useBreakpoint();
  return (
    <Space size={breakpoints.xl ? "large" : "small"}>
      <Dropdown overlay={<NotifiDropDown user={user} />}>
        <Badge count={99} overflowCount={10} size="small">
          <BellOutlined
            style={{
              fontSize: breakpoints.xl ? "25px" : "20px",
              cursor: "pointer",
            }}
          />
        </Badge>
      </Dropdown>
      <Dropdown overlay={settingDropDown}>
        <SettingOutlined
          style={{
            fontSize: breakpoints.xl ? "25px" : "20px",
            cursor: "pointer",
          }}
        />
      </Dropdown>
      <Avatar
        size="large"
        src="https://s120-ava-talk.zadn.vn/5/3/b/f/1/120/f1f7fde0c7600594fa4d2c4532cec7aa.jpg"
      ></Avatar>
    </Space>
  );
}

function Navigation() {
  const breakpoints = useBreakpoint();
  const [visible, setVisible] = useState(false);
  const [keyWord, setkeyWord] = useState("");
  const navigate = useNavigate();
  const showDrawer = () => {
    setVisible(!visible);
  };
  return (
    <Space size="large">
      <Search
        placeholder="input search text"
        allowClear
        style={{
          width: breakpoints.xl ? 350 : 250,
          display: breakpoints.sm ? "flex" : "none",
        }}
        value={keyWord}
        onChange={(e) => setkeyWord(e.target.value)}
        onSearch={(e) => {
          if (keyWord.trim() === "") {
            navigate("/MyPhoto/");
          } else {
            navigate("/search/" + keyWord);
          }
        }}
      ></Search>
      {breakpoints.xl ? <MenuXl mode="horizontal" /> : <MenuX />}
    </Space>
  );

  function MenuXl({ mode }) {
    const [keyWord, setkeyWord] = useState("");
    return (
      <Fragment>
        <Search
          placeholder="input search text"
          allowClear
          style={{
            width: breakpoints.xl ? 350 : 250,
            display: breakpoints.xs ? "flex" : "none",
          }}
          value={keyWord}
          onChange={(e) => setkeyWord(e.target.value)}
          onSearch={(e) => {
            if (keyWord.trim() === "") {
              navigate("/");
            } else {
              navigate("/search/" + keyWord);
            }
          }}
        ></Search>
        <Menu
          mode={mode}
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
            <span
              onClick={(e) => window.open("https://github.com/MinhKhanh693")}
            >
              GitHub
            </span>
          </Menu.Item>
          <Menu.Item>
            <FacebookOutlined />
            <span
              onClick={(e) =>
                window.open("https://www.facebook.com/MinhKhanhh09/")
              }
            >
              FaceBook
            </span>
          </Menu.Item>
          <Menu.Item>
            <GoogleOutlined />
            <span
              onClick={(e) => {
                window.location.href = "mailto:khanhdoan693@gmail.com";
                e.preventDefault();
              }}
              title="khanhdoan693@gmail.com"
            >
              Gmail
            </span>
          </Menu.Item>
        </Menu>
      </Fragment>
    );
  }
  function MenuX() {
    return (
      <Fragment>
        <Button onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          onClose={showDrawer}
          visible={visible}
        >
          <MenuXl mode="vertical" />
        </Drawer>
      </Fragment>
    );
  }
}
