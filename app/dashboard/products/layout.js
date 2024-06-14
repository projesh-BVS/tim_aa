export const metadata = {
  title: "TIM Dashboard",
  description: "Administrator dashboard for Try It Mirror",
};

export default function ProductsLayout({ children }) {
  return <section className="w-full h-full overflow-auto">{children}</section>;
}
