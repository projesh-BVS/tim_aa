export const metadata = {
  title: "TIF Dashboard",
  description: "Administrator dashboard for Try It First",
};

export default function LockedLayout({ children }) {
  return <section className="w-full h-full">{children}</section>;
}
