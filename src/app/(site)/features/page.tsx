import About from "@/components/About";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Features from "@/components/Features";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | CRM",
  description: "This is Features page description",
};

const AboutPage = () => {
  return (
    <main>
      <Breadcrumb pageName="Features" />
      <Features />
    </main>
  );
};

export default AboutPage;
