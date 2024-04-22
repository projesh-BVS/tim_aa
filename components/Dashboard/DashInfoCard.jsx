import Link from "next/link";

const DashInfoCard = ({ icon, text, page, count }) => {
  return (
    <section className="flex flex-col p-2 gap-2 rounded-xl shadow-md bg-white">
      <div className="flex gap-2">
        <div className="flex w-2/3 gap-4 items-center">
          <div className="p-2 rounded-lg bg-tif-blue text-white">{icon}</div>
          <h1 className="font-normal text-xl">
            Total
            <br />
            <span className="font-bold">{text}</span>
          </h1>
        </div>

        <div className="w-[2px] mx-2 bg-slate-400" />

        <div className="flex  w-1/3 pr-2 items-center justify-center font-extrabold text-2xl text">
          {count}
        </div>
      </div>
      <Link href={page} className="w-full">
        <button className="px-2 py-1 w-full rounded-lg text-sm text-white bg-tif-blue whitespace-nowrap">
          See all {text.toLowerCase()}
        </button>
      </Link>
    </section>
  );
};

export default DashInfoCard;
