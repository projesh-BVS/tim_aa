import { getFormattedPrice } from "@/utils/productInfoUtils";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ index, productInfo, callback_OnEditOffset }) => {
  return (
    <section
      className={`animate-appearSpringed flex flex-col bg-white rounded-xl shadow-lg`}
      style={{ animationDelay: `${index * 50 <= 1000 ? index * 50 : 1050}ms` }}
    >
      <div className="flex flex-col px-2 py-2 gap-4 w-full h-full justify-between items-center relative">
        <div className="relative flex items-center justify-center w-full h-60 bg-white rounded-lg overflow-clip">
          <Image
            src={productInfo.poster}
            blurDataURL={productInfo.poster}
            alt="Product Image"
            placeholder="blur"
            quality={100}
            fill
            sizes="15rem"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="flex flex-col gap-2 w-full text-gray-500">
          <h1 className="text-md font-semibold truncate">
            {productInfo.productName}
          </h1>
          <p className="text-sm font-medium italic line-clamp-2">
            {productInfo.description}
          </p>
          <h2 className="text-sm font-normal text-red-500">
            {getFormattedPrice(productInfo.currency, productInfo.price)}
          </h2>
          <div className="flex gap-2">
            <Link
              href={"/dashboard/products/view/" + productInfo.productID}
              className="w-full"
            >
              <button className="flex pl-2 pr-4 w-full items-center justify-center gap-4 h-10 rounded-lg text-md text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all">
                <MagnifyingGlassIcon className="h-6 w-6" />
                <h1 className="font-medium text-md">View</h1>
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href={"/dashboard/products/edit/" + productInfo.productID}
              className="w-full"
            >
              <button className="flex pl-2 pr-4 w-full items-center justify-center gap-2 h-10 rounded-lg text-md text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all">
                <PencilSquareIcon className="h-6 w-6" />
                <h1 className="font-medium text-md">Edit Data</h1>
              </button>
            </Link>
            <div className="w-full">
              <button
                onClick={() => callback_OnEditOffset(productInfo)}
                className="flex pl-2 pr-4 w-full items-center justify-center gap-2 h-10 rounded-lg text-md text-white bg-tif-blue hover:bg-tif-lavender hover:shadow-md whitespace-nowrap transition-all"
              >
                <AdjustmentsHorizontalIcon className="h-6 w-6" />
                <h1 className="font-medium text-md">Edit Offset</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
