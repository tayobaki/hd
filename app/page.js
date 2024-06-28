import Link from "next/link";
import Form1 from "./components/Form1";

export default function Home() {
  return (
    <section className=" h-screen text-white flex flex-col gap-10  bg-accent-foreground items-center justify-center">
      <span className=" text-4xl font-black">Home</span>
      <Form1 />
      <Link
        href={"/home"}
        className="flex items-center justify-between bg-blue-500 rounded-full hover:scale-105 duration-300 h-[68px] w-[250px] border-4 border-white py-4 px-8 text-white"
      >
        <span className="text-lg font-semibold">View Full Site</span>
        <span className=" text-2xl">➜</span>
      </Link>
    </section>
  );
}
