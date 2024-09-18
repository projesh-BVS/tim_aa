import { ArrowDownTrayIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";

const HomePluginGuideCard = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full rounded-xl shadow-md overflow-clip">
      <div className="flex items-center justify-start py-4 px-4 gap-2 w-full text-white md:text-lg font-medium bg-gradient-to-br from-tif-blue to-tif-pink">
        <BookOpenIcon className="w-5 h-5" />
        <h1>3rd Party Plugin Guides</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2 py-2 gap-2 w-full bg-white">
        <GuideDownloadCard
          platform_Logo="/Logos/Shopify_Full_Logo.svg"
          platform_Name="Shopify"
          download_URL="https://tryitfirstdocumentation.s3.ap-south-1.amazonaws.com/TIF+-+Shopify+Plugin+Integration+Guide.pdf"
          isDisabled={true}
        />
        <GuideDownloadCard
          platform_Logo="/Logos/Magento_Full_Logo.svg"
          platform_Name="Magento"
          download_URL="https://tryitfirstdocumentation.s3.ap-south-1.amazonaws.com/TIF+-+Shopify+Plugin+Integration+Guide.pdf"
          isDisabled={true}
        />
      </div>
    </section>
  );
};

export default HomePluginGuideCard;

const GuideDownloadCard = ({
  platform_Logo,
  platform_Name,
  download_URL,
  isDisabled = false,
}) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  async function HandleGuideDownload() {
    setIsDownloading(true);
    const response = await fetch(download_URL);

    if (!response?.body) return;

    const contentLength = response.headers.get("Content-Length");
    const totalLength =
      typeof contentLength === "string" && parseInt(contentLength);

    const reader = response.body.getReader();
    const chunks = [];

    let recievedLength = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setIsDownloading(false);
        break;
      }

      chunks.push(value);

      recievedLength = recievedLength + value.length;
      if (typeof totalLength === "number") {
        const step =
          parseFloat((recievedLength / totalLength).toFixed(2)) * 100;
        setDownloadProgress(step);
      }
    }

    const blob = new Blob(chunks);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "TIF - " + platform_Name + " Integration Guide.pdf";

    function handleOnDownload() {
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.removeEventListener("click", handleOnDownload);
      }, 10);
    }

    a.addEventListener("click", handleOnDownload, false);
    a.click();
  }

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 gap-4 border-2 border-gray-200 rounded-lg ${
        isDisabled ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative h-6 md:h-8 w-full">
        <Image
          src={platform_Logo}
          blurDataURL={platform_Logo}
          alt="Profile Picture"
          placeholder="blur"
          quality={100}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <p className="text-sm">
        Guide for integrating TryItFirst Mirror apparel viewer in your{" "}
        {platform_Name} store
      </p>
      <button
        className={`relative flex items-center justify-center px-4 py-2 gap-2 w-full text-white bg-tif-blue hover:bg-tif-lavender disabled:bg-green-900 hover:shadow-md rounded-md transition-all overflow-clip`}
        onClick={HandleGuideDownload}
        disabled={isDownloading}
      >
        <div
          className={`absolute top-0 bottom-0 left-0 bg-green-500 transition-all ${
            isDownloading ? "opacity-100" : "opacity-0"
          }`}
          style={{ right: `${100 - downloadProgress}%` }}
        />

        <ArrowDownTrayIcon
          className={`w-5 h-5 z-10 ${
            isDownloading ? "animate-bounce" : "animate-none"
          }`}
        />
        <h1 className="z-10">
          {isDownloading
            ? "Downloading " +
              (downloadProgress ? downloadProgress.toFixed() + "%" : "")
            : "Download Guide"}
        </h1>
      </button>
    </div>
  );
};
