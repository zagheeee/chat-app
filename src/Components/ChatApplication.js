import "./ChatApplication.css";
import React, { useState, Fragment } from "react";
import Input from "./Input/Input";
import MessageList from "./Messages/MessageList";
import InitialHeader from "./Header/InitialHeader";
import Login from "./Login/Login";
import { generateDarkColorHex } from "./utils/Colors";
import LoggedInHeader from "./Header/LoggedInHeader";

const ChatApplication = () => {
  // this.setState({loggedIn:whatever we set it})
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentMember, setCurrentMember] = useState({});
  const [drone, setDrone] = useState(null);
  // const [messages, setMessages] = useState([]);

  const LoggedInHandler = (username, emoji, channel_ID) => {
    const member = {
      name: username,
      color: generateDarkColorHex(),
      avatar: emoji,
    };

    const drone = new window.Scaledrone(channel_ID, {
      data: member,
    });

    drone.on("open", (error) => {
      if (error) {
        setLoggedIn(false);
        setDrone(null);
        alert(`${error}.
         We are reverting you to login page.`);

        return console.error(error);
      }
    });

    const room = drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messageList = messages;

      messageList.push({ data: data, id: member?.id, member: member });
      // debugger;
      setMessages([...messageList]);
      //debugger;
    });

    setLoggedIn(true);
    setCurrentMember(member);
    setDrone(drone);
  };

  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    //debugger;
    drone.publish({
      room: "observable-room",
      message: message,
    });
  };

  return (
    <Fragment>
      <div className="ChatApplication ">
        {!loggedIn && <InitialHeader></InitialHeader>}
        {loggedIn && (
          <LoggedInHeader name={currentMember.name}></LoggedInHeader>
        )}

        {!loggedIn && <Login onLogin={LoggedInHandler} />}
        <MessageList
          messages={messages}
          currentMember={currentMember}
        ></MessageList>

        {loggedIn && <Input sendMessage={sendMessage} />}
      </div>
    </Fragment>
  );
};

export default ChatApplication;
