import Image from "next/image";
import { useState } from "react";

const Plugin_PreviewButton = ({
  col_BG_Normal,
  col_BG_Hover,
  col_Txt_Normal,
  col_Txt_Hover,
  height_Btn,
  radius_Corner,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      className={`flex items-center justify-center w-full p-1 cursor-pointer rounded-full transition-all`}
      style={{
        backgroundColor: isHovered ? col_BG_Hover : col_BG_Normal,
        color: isHovered ? col_Txt_Hover : col_Txt_Normal,
        height: height_Btn + "px",
        borderRadius: radius_Corner + "px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center justify-center p-[0.375rem] h-full aspect-square bg-white rounded-full`}
        style={{
          borderRadius: radius_Corner - 2 + "px",
        }}
      >
        <div className="relative flex shrink-0 items-center justify-center w-full h-full">
          <Image
            src="https://brandlogo.s3.ap-south-1.amazonaws.com/TIF_Bag_Logo.svg"
            blurDataURL="https://brandlogo.s3.ap-south-1.amazonaws.com/TIF_Bag_Logo.svg"
            alt="TryItFirst Logo"
            fill={true}
          />
        </div>
      </div>
      <h1 className="flex items-center justify-center w-full h-full font-medium text-base">
        Try It On Yourself
      </h1>
    </a>
  );
};

export default Plugin_PreviewButton;
