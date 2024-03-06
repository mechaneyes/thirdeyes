const name = "[Your Name]";
export const siteTitle = "Next.js Sample Website";

export default function ChatLayout({ children }) {
  return (
    <div>
      <h1>ChatLayout</h1>
      <main>{children}</main>
    </div>
  );
}
