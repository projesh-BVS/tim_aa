import LoadingIndicator from "@/components/Common/LoadingIndicator";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-screen h-screen">
      <LoadingIndicator />
    </div>
  );
}
