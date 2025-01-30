import React from "react";
import Image from "next/image";
import { getSettings } from "@/utils/actions/content.actions";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const settings = await getSettings();

  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-sky-500 p-10 lg:flex flex-col space-y-5">
        <h1 className="title">
          <Image
            src={settings.site_logo}
            alt="Logo"
            width={110}
            height={110}
          />
        </h1>
        <p className="text-white font-medium text-sm lg:text-lg text-center">{settings.site_about}</p>
        <Image
          src='/assets/images/e-commerce.png'
          alt="E-commerce"
          width={300}
          height={300}
        />
      </section>
      <section className="flex flex-1 flex-col items-center justify-center bg-white px-10 sm:px-20">
        {children}
      </section>
    </div>
  );
};

export default Layout;