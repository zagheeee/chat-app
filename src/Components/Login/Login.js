import React, { useState, Fragment } from "react";

import UsernameLoginInput from "./LoginData/UsernameLoginInput";
import Channel_ID_LoginInput from "./LoginData/Channel_ID_LoginInput";
import AvatarSelectList from "./LoginData/AvatarSelectList";
import { generateRandomEmoji } from "./LoginData/RandomEmoji";
import "./Login.css";

const Login = (props) => {
  const randomEmoji = generateRandomEmoji();

  const [username, setUsername] = useState("");
  const [channel_ID, setChannel_ID] = useState("jmfB5sdkTRc8QyA1");
  const [avatar, setAvatar] = useState(randomEmoji);

  const usernameChangeHandler = (typedUsername) => {
    setUsername(typedUsername);
  };

  const channel_IDChangeHandler = (typedChannel_ID) => {
    setChannel_ID(typedChannel_ID);
  };

  const avatarChangeHandler = (selectedAvatar) => {
    setAvatar(selectedAvatar);
  };

  const onSubmitUsernameHandler = () => {
    const enteredUsername = username;
    const enteredAvatar = avatar;
    const enteredChannel = channel_ID;

    if (enteredUsername.trim().length === 0) {
      alert("Username must not be empty!");

      return;
    }

    if (channel_ID.trim().length !== 16) {
      alert("Invalid Channel ID!");

      return;
    }

    //e.preventDefault();
    else props.onLogin(enteredUsername, enteredAvatar, enteredChannel);
  };

  return (
    <Fragment>
      <div className="login">
        <UsernameLoginInput
          typed={username}
          onUsernameLogin={usernameChangeHandler}
        ></UsernameLoginInput>

        <AvatarSelectList
          selected={avatar}
          onSelectedAvatar={avatarChangeHandler}
        ></AvatarSelectList>
        <Channel_ID_LoginInput
          typed={channel_ID}
          onChannel_ID_Login={channel_IDChangeHandler}
        ></Channel_ID_LoginInput>

        <button onClick={onSubmitUsernameHandler}>Log in</button>
      </div>
      <div></div>
    </Fragment>
  );
};

export default Login;
