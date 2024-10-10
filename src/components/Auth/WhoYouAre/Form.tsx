"use client";
import { useAuthCheck } from "@/components/Common/AuthCheckProvider";
import Loader from "@/components/Common/Loader";
import { registerUser } from "@/utils/authActions";
import { signUpSchema } from "@/utils/authValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

const WhoYouAreForm = () => {
  const { setLoginModalOpen } = useAuthCheck();
  const [isPending, startTransition] = React.useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      lastName: "",
      phone: "",
    },
  });

  const login = async (email: string, password: string) => {
    let response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (response?.ok) {
      setLoginModalOpen(false);
      reset();
    } else if (response?.error) {
      console.log("hello from login");
    }
  };

  const onSubmit = (data: {
    email: string;
    password: string;
    name: string;
    lastName: string;
    phone: string;
  }) => {
    startTransition(async () => {
      const response = await registerUser(data);
      if (response.status === 201) {
        await login(data.email, data.password);
      } else {
        const message = JSON.parse(response.body).message;
        if (message?.includes("already exists")) {
          await login(data.email, data.password);
          return;
        }

        console.log({
          message,
        });
        // toast.error(message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-start justify-between gap-0 md:flex-row md:gap-2">
        <div className="w-full">
          <label htmlFor="name" className="block w-full px-1 py-2 text-left ">
            First Name:
          </label>
          <input
            {...register("name", { required: true })}
            name="name"
            type="text"
            id="name"
            placeholder="Alen"
            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
          />
          <p className="w-full p-1 py-2 text-left text-sm text-red-500">
            {errors?.name?.message}
          </p>
        </div>
        <div className="w-full">
          <label
            htmlFor="lastName"
            className="block w-full px-1 py-2 text-left "
          >
            Last Name:
          </label>
          <input
            {...register("lastName", { required: true })}
            name="lastName"
            type="text"
            id="lastName"
            placeholder="Walker"
            className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
          />
          <p className="w-full p-1 py-2 text-left text-sm text-red-500">
            {errors?.lastName?.message}
          </p>
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block w-full px-1 py-2 text-left ">
          Phone:
        </label>
        <input
          {...register("phone", { required: true })}
          name="phone"
          type="text"
          id="phone"
          placeholder="+1 123 456 7890"
          className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
        />
        <p className="w-full p-1 py-2 text-left text-sm text-red-500">
          {errors?.phone?.message}
        </p>
      </div>
      <div className="mb-[22px]">
        <label htmlFor="email" className="block w-full px-1 py-2 text-left ">
          Email:
        </label>
        <input
          {...register("email", { required: true })}
          name="email"
          type="email"
          id="email"
          placeholder="alen@walker.com"
          className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-dark-6 focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white dark:focus:border-primary"
        />
        <p className="w-full p-1 py-2 text-left text-sm text-red-500">
          {errors?.email?.message}
        </p>
      </div>

      <div className="mb-9">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center rounded-md border border-primary bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:bg-primary/90"
        >
          Submit {isPending && <Loader />}
        </button>
      </div>
    </form>
  );
};

export default WhoYouAreForm;
