import { Dialog } from "@headlessui/react";

const OwnerModifyForm_Header = ({
  iconHeader,
  txtTitle,
  txtSubtitle,
  showSubtitle = false,
}) => {
  return (
    <div className="flex flex-col justify-between p-4 bg-gradient-to-br from-tif-blue to-tif-pink">
      <Dialog.Title
        as="div"
        className="flex gap-2 items-center text-lg font-medium leading-6 text-white"
      >
        {iconHeader}
        <h1>{txtTitle}</h1>
      </Dialog.Title>

      {showSubtitle && (
        <div className={`mt-1`}>
          <p className="text-sm text-gray-200">
            {txtSubtitle != null ? txtSubtitle : null}
          </p>
        </div>
      )}
    </div>
  );
};

export default OwnerModifyForm_Header;
