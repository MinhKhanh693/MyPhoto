import { notification } from "antd";

export function Notification({ type, message, description }) {
  notification[type]({
    message: message,
    description: description,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
}
