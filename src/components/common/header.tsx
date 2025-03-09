import Link from "next/link";

export const Header = () => {
  return (
    <div className="w-full h-[10vh] bg-white flex px-10 justify-between min-w-[500px]">
      <div className="h-full flex justify-center items-center py-2">
        <img src="/neu-logo.png" alt="NEU Logo" className="w-[60px] h-[60px]" />
      </div>
      <div className="flex items-center justify-center gap-x-8">
        <Link className="text-[18px] hover:underline font-normal" href={"/features"}>
          Features
        </Link>
        <Link className="text-[18px] hover:underline font-normal" href={"/about"}>
          About
        </Link>
        <Link className="text-[18px] hover:underline font-normal" href={"/contact"}>
          Contact Us
        </Link>
      </div>
    </div>
  );
};
