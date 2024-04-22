export const metadata = {
  title: "TIF Dashboard",
  description: "Administrator dashboard for Try It First",
};

export default function OutletsLayout({ children }) {
  return <section className="w-full h-full overflow-auto">{children}</section>;
}
