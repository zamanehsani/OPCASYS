import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="bg-gray-2 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-12 max-w-[540px] lg:mb-0">
                <h2 className="mb-5 text-3xl font-bold leading-tight text-dark dark:text-white sm:text-[40px] sm:leading-[1.2]">
                  Rebate HQ{""}
                  <span className="align-super text-sm font-normal">&reg;</span>
                </h2>
                <p className="mb-10 text-base leading-relaxed text-body-color dark:text-dark-6">
                  Our fully independent rebate center is the one-stop
                  destination for all your rebate needs. Whether you&apos;re
                  looking to adjust a rebate, track its status, or create a
                  rebate structure for a single introducing broker or various
                  introducing broker groups, our user-friendly platform has you
                  covered. With a dedicated team of professionals ready to
                  assist you every step of the way, we strive to make the rebate
                  process as seamless and hassle-free as possible.
                  <br /> <br />
                  Save time and money by taking advantage of the rebate
                  center&apos;s friendly user interface, or switch to advanced
                  mode.
                </p>

                <a
                  href="/#"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white duration-300 hover:bg-primary/90"
                >
                  Know More
                </a>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="-mx-2 flex flex-wrap  sm:-mx-4 lg:-mx-2 xl:-mx-4">
                <Image
                  className="h-full w-full"
                  width={350}
                  height={200}
                  src="/images/about/rebate.png"
                  alt="about image"
                />
                <div className="w-full px-2 sm:w-1/2 sm:px-4 lg:px-2 xl:px-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
