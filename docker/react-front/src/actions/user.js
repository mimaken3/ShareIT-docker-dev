import axios from "axios";
import deleteIcon from "Modules/deleteIcon";
import uploadIcon from "Modules/uploadIcon";
import getLoginUserInfo from "Modules/getLoginUserInfo";
import env from "env";
import convertJSTToDate from "Modules/convert_JST_to_date";

export const LOGIN_USER_EVENT = "LOGIN_USER_EVENT";
export const LOGOUT_USER_EVENT = "LOGOUT_USER_EVENT";
export const CREATE_USER_EVENT = "CREATE_USER_EVENT";
export const ALL_USERS_FOR_SELECT_BOX = "ALL_USERS_FOR_SELECT_BOX";
export const SHOW_ALL_USERS = "SHOW_ALL_USERS";
export const SHOW_USER_DETAIL = "SHOW_USER_DETAIL";
export const UPDATE_USER_EVENT = "UPDATE_USER_EVENT";
export const DELETE_USER_EVENT = "DELETE_USER_EVENT";
export const USER_NOT_EXIST = "USER_NOT_EXIST";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const EMPTY_USERS = "EMPTY_USERS";
export const GET_LIKED_USERS_BY_ARTICLE_ID = "GET_LIKED_USERS_BY_ARTICLE_ID";
export const TOGGLE_LIKE_AT_ARTICLE_DETAIL = "TOGGLE_LIKE_AT_ARTICLE_DETAIL";

const ROOT_URL = env.ROOT_URL;

// ユーザ作成
export const postUserEvent = (user, iconImage) => async (dispatch) => {
  if (iconImage) {
    // 画像の形式をセット
    user.icon_name = iconImage.type.split("/")[1];
  } else {
    // デフォルト画像をセット
    user.icon_name = "default.png";
  }
  const response = await axios.post(`${ROOT_URL}/signUp`, user);

  // ユーザのアイコンをアップロード
  if (iconImage) {
    const newFileName = response.data.user_id;
    uploadIcon(iconImage, newFileName);
  }

  dispatch({ type: CREATE_USER_EVENT, response });
};

// ログイン
export const loginUserEvent = (user) => async (dispatch) => {
  await axios
    .post(`${ROOT_URL}/login`, user)
    .then((response) => {
      if (response.status === 200) {
        dispatch({ type: LOGIN_USER_EVENT, response });
      }
    })
    .catch((error) => {
      // ログイン失敗時
      // TODO:
      const errResponse = Object.assign({}, error);
      const failedUserInfo = errResponse.response.data.user;

      dispatch({ type: LOGIN_FAILED, failedUserInfo });
    });
};

// ログアウト
export const LogoutUserEvent = () => async (dispatch) => {
  dispatch({ type: LOGOUT_USER_EVENT });
};

// ユーザ一覧
export const showAllUsers = (pageNum) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const response = await axios.get(
    `${ROOT_URL}/api/users?ref_pg=${pageNum}`,
    loginUserInfo.sendConfig
  );
  dispatch({ type: SHOW_ALL_USERS, response });
};

// セレクトボックス用のユーザ一覧を取得
export const getAllUsersForSelectBox = (userID) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const response = await axios.get(
    `${ROOT_URL}/api/users/selectBox/${userID}`,
    loginUserInfo.sendConfig
  );
  dispatch({ type: ALL_USERS_FOR_SELECT_BOX, response });
};

// ユーザ詳細画面
export const getUserDetail = (userId) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  await axios
    .get(`${ROOT_URL}/api/users/${userId}`, loginUserInfo.sendConfig)
    .then((response) => {
      dispatch({ type: SHOW_USER_DETAIL, response });
    })
    .catch((e) => {
      console.log("user not found");
      dispatch({ type: USER_NOT_EXIST });
    });
};

// ユーザ情報を更新
export const putUserEvent = (user, iconImage) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  let flag = false;
  if (iconImage) {
    flag = true;
    let preSignedURL = user.icon_name.split("/")[4];
    const deleteFileName = preSignedURL.split("?")[0];

    // アイコンURLを拡張子に変更
    const fileExtension = iconImage.name.split(".")[1];
    user.icon_name = fileExtension;
    if (deleteFileName === "default.png") {
      // 新しいアイコンをアップロード
      uploadIcon(iconImage, user.user_id);
    } else {
      // デフォ画像でないなら削除
      deleteIcon(deleteFileName).then(() => {
        // 新しいアイコンをアップロード
        uploadIcon(iconImage, user.user_id);
      });
    }
  } else {
    user.icon_name = "";
  }

  user.created_date = convertJSTToDate(user.created_date);

  const response = await axios.put(
    `${ROOT_URL}/api/users/${user.user_id}`,
    user,
    loginUserInfo.sendConfig
  );
  dispatch({ type: UPDATE_USER_EVENT, response, flag });
};

// ユーザを削除
export const deleteUserEvent = (user) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();

  const response = await axios.delete(
    `${ROOT_URL}/api/users/${user.user_id}`,
    loginUserInfo.sendConfig
  );

  dispatch({ type: DELETE_USER_EVENT, response });
};

// 記事にいいねした全ユーザを取得
export const getLikedUsersByArticleID = (articleID) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();

  const response = await axios.get(
    `${ROOT_URL}/api/articles/${articleID}/users`,
    loginUserInfo.sendConfig
  );

  dispatch({ type: GET_LIKED_USERS_BY_ARTICLE_ID, response });
};

// 自分が記事にLike or UnLikeした場合
export const toggleLikeAtArticleDetail = (isLiked) => async (dispatch) => {
  const loginUserInfo = getLoginUserInfo();
  const loginUserIconURL = localStorage.getItem("login_user_icon_URL");
  const userID = loginUserInfo.userID;
  const userName = loginUserInfo.userName;
  const userObj = {
    user_id: userID,
    user_name: userName,
    icon_name: loginUserIconURL,
  };

  dispatch({ type: TOGGLE_LIKE_AT_ARTICLE_DETAIL, userObj, isLiked });
};

// storeのusersを空に
export const emptyUsers = () => (dispatch) => {
  dispatch({ type: EMPTY_USERS });
};
