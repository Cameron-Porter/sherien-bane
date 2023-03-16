import React, { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { useForm, SubmitHandler } from "react-hook-form";

type ContactInput = {
  email: string;
};

type Props = {};

export default function Contact({}: Props) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>();
  const onSubmit: SubmitHandler<ContactInput> = async (data) => {
    fetch("/api/createMessage", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };
  return (
    <section id="contact" className="snap-start">
      <div className="h-screen max-h-screen w-full flex relative flex-col text-center md:text-left max-w-5xl px-10 mx-auto items-center">
        <h3 className="uppercase tracking-[20px] pl-5 text-cyan-500 text-2xl mt-[4rem] mb-[2rem] animate-pulse">
          Sherien A. Bain
        </h3>
        <div className="flex flex-col w-full max-w-5xl mx-2 space-y-3">
          <h4 className="flex-wrap text-xl font-semibold text-center">
            Intended Specialty: <wbr />
            <span className="underline decoration-cyan-500">
              Anesthesiology
            </span>
          </h4>
          <div className="space-y-10">
            <div className="flex items-center space-x-5 justify-center">
              <EnvelopeIcon className="text-cyan-500 h-7 w-7 animate-pulse" />
              <p className="space-y-10">SherienBain@mail.rossmed.edu</p>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col p-5 mt-[3rem] bg-cyan-500 text-black max-w-2xl mx-auto rounded-lg">
              <h3 className="text-2xl font-bold">
                Thank you for accepting my resume!
              </h3>
              <p>
                I look forward to connecting again soon. Till then, have a
                wonderful day!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-2 w-full mx-auto"
            >
              <div className="flex flex-wrap flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2 md:justify-between">
                <div className="md:w-[100%]">
                  <input
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="contactInput w-full"
                    type="email"
                  />
                  <div className="flex flex-col">
                    {errors.email && (
                      <span className="text-red-500">
                        - The email field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="bg-cyan-500 py-5 px-10 rounded-md text-black font-bold"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
