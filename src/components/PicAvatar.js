import React, { useRef } from "react";
import html2canvas from "html2canvas";
import "../styles/PicAvatar.css";
import AvatarLoad from "./AvatarLoad.js";

const PicAvatar = () => {
  function takeScreenshotAndSave() {
    html2canvas(document.body)
      .then((canvas) => {
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `screenshot-${new Date().toISOString()}.png`;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, "image/png");
      })
      .catch((error) => {
        console.error("Error taking screenshot:", error);
      });
  }

  return (
    <div>
      <h1>PicAvatar</h1>
      <button onClick={takeScreenshotAndSave} className="buttonPic">
        Take a picture with your avatar!
      </button>
      <AvatarLoad />
    </div>
  );
};

export default PicAvatar;
