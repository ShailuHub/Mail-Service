import { RiDeleteBin5Line } from "react-icons/ri";
import { FaBoxArchive } from "react-icons/fa6";
import { MdDriveFileMove, MdOutlineForwardToInbox } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";

const mailBoxHeader = [
  { icon: RiDeleteBin5Line, value: "Delete", action: "delete" },
  { icon: FaBoxArchive, value: "Archive", action: "archive" },
  { icon: MdDriveFileMove, value: "Move", action: "move" },
];

const specialLink = [
  {
    href: "/auth/inbox",
    value: "inbox",
    icon: MdOutlineForwardToInbox,
    action: "inbox",
  },
  {
    href: "/auth/sent-mails",
    value: "Sent",
    icon: BsFillSendFill,
    action: "sent",
  },
  { href: "/auth/draft", value: "Draft", icon: RiDraftLine, action: "draft" },
];

const editorConfig = {
  toolbarAdaptive: true,
  toolbarButtonSize: "large",
  language: "en",
  height: 350,
  colors: {
    palette: [
      "#000000", // Black
      "#ff0000", // Red
      "#00ff00", // Green
      "#0000ff", // Blue
      "#ffffff", // White
    ],
  },
  contentCss: ".jodit-container { color: black !important; }",
};

const baseUrl = "http://localhost:3000";

const convertDate = (dateString) => {
  const dateData = new Date(dateString);
  const month = dateData.getMonth();
  const date = dateData.getDate();
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let outcome = "";
  if (date < 10) {
    outcome += `0${date} `;
  } else {
    outcome += `${date} `;
  }
  return outcome + monthList[month];
};

const convertTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  return formattedTime;
};

export {
  mailBoxHeader,
  specialLink,
  editorConfig,
  baseUrl,
  convertDate,
  convertTime,
};
