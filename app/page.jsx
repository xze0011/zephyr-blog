import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

// components
import Social from "@/components/Social";
import Stats from "@/components/Stats";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex justify-center xl:pt-10 xl:pb-24">
          {/* text */}
          <div className="w-full max-w-[980px] text-center xl:text-left">
            <span className="text-xl">Fullstack Software Engineer</span>
            <h1 className="h1 mb-6">
              Hello I am <span className="block text-accent">Zephyr Zeng</span>
            </h1>
            <p className="max-w-[760px] mb-8 text-white/80 mx-auto xl:mx-0">
              Product-driven software engineer, focused on building practical,
              high-impact solutions that deliver real business value while
              contributing positively to the community.
            </p>
            <p className="max-w-[760px] mb-8 text-white/80 mx-auto xl:mx-0">
              Lifelong learner and writer, sharing weekly insights on personal
              growth, business biography and psychology through a wechat blog.
            </p>
            <p className="max-w-[760px] mb-8 text-white/80 mx-auto xl:mx-0">
              Curious and growth-oriented, comfortable with uncertainty, open to
              new challenges, and committed to continuous improvement.
            </p>

            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Link href="/Zephyr_Zeng_CV.pdf" passHref legacyBehavior>
                <a target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="lg"
                    className="uppercase flex items-center gap-2"
                  >
                    <span>Download CV</span>
                    <FiDownload className="text-xl" />
                  </Button>
                </a>
              </Link>
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
