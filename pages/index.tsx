import Head from "next/head";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#22f3ee]">
      <Head>
        <title>Cameron Porter</title>
      </Head>

      <Contact />
    </div>
  );
};

export default Home;
