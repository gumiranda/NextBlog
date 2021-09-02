import Link from "next/link";

const Header = () => {
  return (
    <h2 className="bg-purple-800 text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20">
      <Link href="/">
        <a className="hover:underline">Dev Doido</a>
      </Link>
      .
    </h2>
  );
};

export default Header;
