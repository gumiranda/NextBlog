import Footer from "./footer";
import Meta from "./meta";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-full text-black bg-purple-800">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
