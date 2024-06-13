import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Avatar.css";

function ReadyPlayerMeComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    const frame = document.getElementById("frame");

    const subscribe = (event) => {
      const json = parse(event);

      if (json?.source !== "readyplayerme") {
        return;
      }

      if (json.eventName === "v1.frame.ready") {
        frame.contentWindow.postMessage(
          JSON.stringify({
            target: "readyplayerme",
            type: "subscribe",
            eventName: "v1.**",
          }),
          "*"
        );
      }

      if (json.eventName === "v1.avatar.exported") {
        console.log(`Avatar URL: ${json.data.url}`);
        localStorage.setItem("avatarUrl", json.data.url);
        navigate("/Overview");
      }

      if (json.eventName === "v1.user.set") {
        console.log(
          `User with id ${json.data.id} set: ${JSON.stringify(json)}`
        );
      }
    };

    const parse = (event) => {
      try {
        return JSON.parse(event.data);
      } catch (error) {
        return null;
      }
    };

    window.addEventListener("message", subscribe);
    document.addEventListener("message", subscribe);

    return () => {
      window.removeEventListener("message", subscribe);
      document.removeEventListener("message", subscribe);
    };
  }, []);

  return (
    <iframe
      id="frame"
      src="https://fwtest01.readyplayer.me?frameApi"
      title="Avatar Frame"
    ></iframe>
  );
}

export default ReadyPlayerMeComponent;
