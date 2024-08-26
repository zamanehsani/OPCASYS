import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import Link from "next/link";

const Features = () => {
  return (
    <section className="pb-8 pt-20 dark:bg-dark lg:pb-[50px] lg:pt-[120px]">
      <div className="container">
        <SectionTitle
          subtitle="Features"
          title="Main Features"
          paragraph="Conventional CRMs are a thing of the past; it's time to harness the untapped potential of the technological resources available."
        />

        <div className="-mx-4 mt-12 flex flex-wrap lg:mt-20">
          {featuresData.map((feature, i) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
      </div>
      <div className="container">
        <div className="flex flex-wrap items-center">
          <div className="mt-6 w-full px-4">
            <div className="flex flex-wrap items-center justify-center">
              {/* this link has to take you to the features page... */}
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-center text-base font-medium text-white duration-300 hover:bg-primary/90"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
