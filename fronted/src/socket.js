import { io } from "socket.io-client";
import { baseUrl } from "./constants/mailbox";

const user = JSON.parse(localStorage.getItem("user"));
let userEmail = "";
if (user) {
  userEmail = user.email;
}
const socket = io(baseUrl, { auth: { userEmail: userEmail } });

export default socket;
