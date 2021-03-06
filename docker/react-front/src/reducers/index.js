import { combineReducers } from "redux";
import users from "./users";
import articles from "./articles";
import topics from "./topics";
import comments from "./comments";
import auth from "./auth";
import selectUser from "./select_user";
import likeArticles from "./like_articles";
import notifications from "./notifications";
import topicManagement from "./topic_management";
import likedUsers from "./liked_users";
import { reducer as form } from "redux-form";

const appReducer = combineReducers({
  users,
  articles,
  topics,
  comments,
  auth,
  form,
  selectUser,
  likeArticles,
  notifications,
  topicManagement,
  likedUsers,
});

const rootReducer = (state, action) => {
  if (
    action.type === "LOGOUT_USER_EVENT" ||
    action.type === "DELETE_USER_EVENT"
  ) {
    localStorage.removeItem("shareIT_token");
    localStorage.removeItem("login_user_icon_URL");
    localStorage.removeItem("currentPage");
    // storeを空に
    state = undefined;
  }
  return appReducer(state, action);
};

// storeで使うのでexportを付ける
export default rootReducer;
