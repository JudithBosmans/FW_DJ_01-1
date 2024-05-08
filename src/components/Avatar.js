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

      // Subscribe to all events sent from Ready Player Me once frame is ready
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

      // Get avatar GLB URL and navigate to another page
      if (json.eventName === "v1.avatar.exported") {
        console.log(`Avatar URL: ${json.data.url}`);
        localStorage.setItem("avatarUrl", json.data.url);
        navigate("/Overview");
      }

      // Get user id
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

    // Cleanup function to remove the event listeners when the component unmounts
    return () => {
      window.removeEventListener("message", subscribe);
      document.removeEventListener("message", subscribe);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <iframe
      id="frame"
      src="https://fwtest01.readyplayer.me?frameApi"
      title="Avatar Frame"
    ></iframe>
  );
}

export default ReadyPlayerMeComponent;
