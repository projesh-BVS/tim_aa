import { useEffect } from "react";

const ProductViewMirror = ({
  iFrameBaseURLMobile,
  iFrameBaseURLDesktop,
  debugMode,
  productID,
  skeJSON,
  texJSON,
  texPNG,
  curr_Size,
  curr_Offset_X,
  curr_Offset_Y,
  switchCam,
  callback_SwitchCam,
}) => {
  let iFrameSrc = "";
  let iFrameParams = [
    "productID=" + productID,
    "skeJson=" + skeJSON,
    "texJson=" + texJSON,
    "texPng=" + texPNG,
    "debug=" + (debugMode ? debugMode : 0),
  ];

  useEffect(() => {
    if (switchCam) {
      HandleCamSwitch();
      callback_SwitchCam(false);
    }
  }, [switchCam]);

  useEffect(() => {
    Handle_Change_Size();
  }, [curr_Size]);

  useEffect(() => {
    Handle_Change_Offset_X();
  }, [curr_Offset_X]);

  useEffect(() => {
    Handle_Change_Offset_Y();
  }, [curr_Offset_Y]);

  function GenerateFrameSrc() {
    iFrameSrc = (isMobile() ? iFrameBaseURLMobile : iFrameBaseURLDesktop) + "?";

    for (let i = 0; i < iFrameParams.length; i++) {
      iFrameSrc += iFrameParams[i];
      if (i != iFrameParams.length - 1) iFrameSrc += "&";
    }

    return iFrameSrc;
  }

  function isMobile() {
    return (
      navigator.maxTouchPoints > 0 &&
      /Android|iPhone/i.test(navigator.userAgent)
    );
  }

  function HandleCamSwitch() {
    let iframe = document.getElementById("MirrorFrame");
    let iframeWindow = iframe.contentWindow;

    iframeWindow.postMessage({ switchCam: true }, "*");
  }

  function Handle_Change_Size() {
    let iframe = document.getElementById("MirrorFrame");
    let iframeWindow = iframe.contentWindow;
    let setSizeFactorLive = "setSizeFactorLive";
    iframeWindow.postMessage({ setSizeFactorLive: curr_Size }, "*");
  }

  function Handle_Change_Offset_X() {
    let iframe = document.getElementById("MirrorFrame");
    let iframeWindow = iframe.contentWindow;
    let setOffsetXLive = "setOffsetXLive";
    iframeWindow.postMessage({ setOffsetXLive: curr_Offset_X }, "*");
  }

  function Handle_Change_Offset_Y() {
    let iframe = document.getElementById("MirrorFrame");
    let iframeWindow = iframe.contentWindow;
    let setOffsetYLive = "setOffsetYLive";
    iframeWindow.postMessage({ setOffsetYLive: curr_Offset_Y }, "*");
  }

  return (
    <iframe
      id="MirrorFrame"
      src={GenerateFrameSrc()}
      width="100%"
      height="100%"
      allow="camera"
      className="z-0 overflow-clip"
    ></iframe>
  );
};

export default ProductViewMirror;
