import { RiDeleteBin5Line } from "react-icons/ri";
import { FaBoxArchive } from "react-icons/fa6";
import { MdDriveFileMove } from "react-icons/md";
import { BsFillSendFill } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";

const mailBoxHeader = [
  { icon: RiDeleteBin5Line, value: "Delete" },
  { icon: FaBoxArchive, value: "Archive" },
  { icon: MdDriveFileMove, value: "Move" },
];

const specialLink = [
  { href: "#sent", value: "Sent", icon: BsFillSendFill },
  { href: "#draft", value: "Draft", icon: RiDraftLine },
];

export { mailBoxHeader, specialLink };
