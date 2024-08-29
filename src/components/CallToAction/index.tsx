import Link from "next/link";
import SingleClient from "../Clients/SingleClient";
import { clientsData } from "../Clients/clientsData";

const CallToAction = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-primary py-10 lg:py-[50px]">
      <div className="container mx-auto items-center justify-center">
        {/* Container with overflow-x-auto to enable horizontal scrolling */}
        <div className="relative mx-auto max-w-[570px] text-center">
          <h2 className="mb-2.5 text-3xl font-bold text-white md:text-[38px] md:leading-[1.44]">
            <span>Free PSP Integration</span>
          </h2>
        </div>

        {/* Scrollable items container */}
        {/* Centered and Scrollable Items Container */}
        <div className="relative w-full overflow-x-auto">
          <div
            className="scrollbar-hide mx-auto flex max-w-screen-lg justify-center space-x-4 overflow-x-auto p-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Hide scrollbar for WebKit browsers */}
            <style>
              {`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}
            </style>

            <img className="px-8" src="/images/brands/Praxis-Logo.png" />
            <img
              className="px-2"
              src="/images/brands/Skrill-Logo.svg"
              width={160}
            />
            <img
              className="px-2"
              src="/images/brands/b2binpay.svg"
              width={290}
            />
            <img className="px-2" src="images/brands/stripe.svg" width={220} />
          </div>
        </div>
      </div>

      {/* Background SVGs can be placed here if needed */}
      {/* <div className="container">
        <span className="absolute left-0 top-0">
          <svg
            width="495"
            height="470"
            viewBox="0 0 495 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="55"
              cy="442"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="446"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M245.406 137.609L233.985 94.9852L276.609 106.406L245.406 137.609Z"
              stroke="white"
              strokeOpacity="0.08"
              strokeWidth="12"
            />
          </svg>
        </span>
        <span className="absolute bottom-0 right-0">
          <svg
            width="493"
            height="470"
            viewBox="0 0 493 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="462"
              cy="5"
              r="138"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="50"
            />
            <circle
              cx="49"
              cy="470"
              r="39"
              stroke="white"
              strokeOpacity="0.04"
              strokeWidth="20"
            />
            <path
              d="M222.393 226.701L272.808 213.192L259.299 263.607L222.393 226.701Z"
              stroke="white"
              strokeOpacity="0.06"
              strokeWidth="13"
            />
          </svg>
        </span>
      </div> */}
    </section>
  );
};

export default CallToAction;
