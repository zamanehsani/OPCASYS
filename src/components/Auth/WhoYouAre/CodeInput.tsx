"use client";
import Loader from "@/components/Common/Loader";
import { verifyEmailCode } from "@/utils/authActions";
import { sendVerificationEmail } from "@/utils/emailActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VerificationInput from "react-verification-input";
const CodeInput = () => {
  const [emailSending, setEmailSending] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const router = useRouter();
  const { data, update, status } = useSession();

  const userEmail = data?.user.email as string;

  useEffect(() => {
    if (userEmail) {
      setEmailSending(true);
      sendVerificationEmail(userEmail).then(() => {
        setEmailSending(false);
      });
    }
    //
  }, [userEmail]);

  const handleCodeCompleted = async (value: string) => {
    setVerifyingCode(true);
    if (value?.length === 6) {
      const rs = await verifyEmailCode(userEmail, value);
      if (rs.status === 200) {
        update({
          data: {
            ...data,
            user: {
              ...data?.user,
              emailVerified: true,
            },
          },
        }).then(() => {
          setVerifyingCode(false);
          window.location.assign("/");
        });
      }

      setVerifyingCode(false);
    }
  };

  return (
    <div className="relative my-6 flex flex-col items-center justify-center gap-2">
      <VerificationInput
        autoFocus
        placeholder=""
        onComplete={handleCodeCompleted}
      />
      {status === "loading" ||
        emailSending ||
        (verifyingCode && (
          <div className="flex w-full items-center justify-center">
            <Loader />
          </div>
        ))}
    </div>
  );
};

export default CodeInput;
