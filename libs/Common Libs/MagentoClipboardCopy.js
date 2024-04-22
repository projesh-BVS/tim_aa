const MagentoClipboardCopy = (urlGLB, urlUSDZ, urlPoster) => {
  let iFrameSrcString =
    "https://main.d1vhqgytpq3fa1.amplifyapp.com?src=" +
    urlGLB +
    "&poster=" +
    urlPoster +
    "&environmentImage=https://brandlogo.s3.ap-south-1.amazonaws.com/moon_1k.hdr";

  let copyString =
    "<iframe" +
    " " +
    'src="' +
    iFrameSrcString +
    '" ' +
    'width="300px"' +
    " " +
    'height="400px"' +
    " " +
    'allow="camera"' +
    " " +
    "></iframe>";

  navigator.clipboard.writeText(copyString);
};

export default MagentoClipboardCopy;
