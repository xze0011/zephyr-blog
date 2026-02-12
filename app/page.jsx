import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Link from "next/link";

// components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Fullstack Software Engineer</span>
            <h1 className="h1 mb-6">
              Hello I am <br /> <span className="text-accent">Zephyr Zeng</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              A proficient React, Next.js, Node.js, .Net and Python Full-stack
              SE(Saas focused), experienced with SQL, MongoDB, CICD pipelines,
              Docker, AWS and Azure Cloud.
            </p>
            <p className="max-w-[500px] mb-9 text-white/80">
              A lifelong learner, regularly sharing weekly book reviews about
              personal growth, psychology and life experiences.
            </p>
            <p className="max-w-[500px] mb-9 text-white/80">
              Most importantly, a person with love and courage, always ready to
              embrace the next challenge, willing to take risks and contribute
              kindness to make the world a better place.
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
          {/* photo */}
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  );
};

export default Home;
