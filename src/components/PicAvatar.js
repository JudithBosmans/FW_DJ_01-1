import React, { useRef } from "react";
//01 JUNGLE
import Jungle_00 from "../pics/01/03_Background.png";
import Jungle_01 from "../pics/01/01_Jungle_Back.png";
import Jungle_02 from "../pics/01/02_Jungle_Back_02.png";
import Jungle_03 from "../pics/01/04_tiger.png";

const PicAvatar = () => {
  const videoRef = useRef(null);

  const displayMediaOptions = {
    video: {
      cursor: "always",
    },
    audio: false,
  };

  async function handleCaptureAndDownload() {
    try {
      const captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
      if (videoRef.current) {
        videoRef.current.srcObject = captureStream;
        videoRef.current.onloadedmetadata = () => {
          setTimeout(() => {
            // Ensure the video stream is ready
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "screenshot.png";
              a.click();
              URL.revokeObjectURL(url);
              captureStream.getTracks().forEach((track) => track.stop());
            });
          }, 500);
        };
      }
    } catch (err) {
      console.error(`Error: ${err}`);
    }
  }

  return (
    <div>
      <button onClick={handleCaptureAndDownload}>Capture & Download</button>
      <video ref={videoRef} autoPlay style={{ display: "none" }}></video>
    </div>
  );
};

export default PicAvatar;
