import WhoYouAre from "@/components/Auth/WhoYouAre/WhoYouAre";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | CRM",
};

const SigninPage = () => {
  return (
    <>
      <WhoYouAre />
    </>
  );
};

export default SigninPage;
