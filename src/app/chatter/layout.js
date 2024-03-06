import Image from "next/image";
import Link from "next/link";

const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

export default function ChatterLayout({ children }) {
  return (
    <div>
      <h1>ChatterLayout</h1>
      <main>{children}</main>
    </div>
  );
}
