import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-sky-500 p-10 lg:flex flex-col space-y-5">
        <h1 className="title">
          E commerce
        </h1>
        <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quam sed praesentium nisi quos mollitia facilis voluptatum, laudantium culpa. Asperiores, minus sed vero culpa quod qui labore nostrum. Corporis, reiciendis.</p>
        <Image
          src='/assets/images/e-commerce.png'
          alt="sdsdss"
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