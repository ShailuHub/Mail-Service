import { Router } from "express";
import authentication from "../middleware/authentication";
import {
  get_inbox,
  post_mail,
  delete_mail,
  sent_mail,
  update_mail,
} from "../controllers/mailControllers";
const route = Router();

route.get("/inbox", authentication, get_inbox);
route.post("/send-mail", authentication, post_mail);
route.post("/delete-mail", authentication, delete_mail);
route.get("/sent-mail", authentication, sent_mail);
route.patch("/update-mail", authentication, update_mail);

export default route;
