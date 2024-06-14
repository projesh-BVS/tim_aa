export const metadata = {
  title: "TIM Dashboard",
  description: "Administrator dashboard for Try It Mirror",
};

export default function LockedLayout({ children }) {
  return <section className="w-full h-full">{children}</section>;
}
