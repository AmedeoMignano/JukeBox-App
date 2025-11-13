import React from "react";

const Contact = () => {
  return (
    <>
      {/*Mobile Hero Section*/}
      <div className="flex justify-center items-center sm:hidden h-[70vh] w-full bg-[url(/src/assets/img/contact-mobile.jpeg)] bg-no-repeat bg-cover bg-center">
        <div className="text-center mt-7">
          <h1 className="text-5xl text-white font-bold">BANDA CORTA</h1>
          <p className="text-white text-3xl">CONTATTI</p>
        </div>
      </div>
      {/*Tablet Desktop Hero Section*/}
      <div className="hidden sm:flex justify-center items-center  sm:h-[70vh] lg:h-[90vh] w-full bg-[url(/src/assets/img/hero-desktop.jpeg)] bg-no-repeat bg-cover bg-center">
        <div className="text-center mt-7">
          <h1 className="sm:text-6xl lg:text-8xl text-white font-bold">
            BANDA CORTA
          </h1>
          <p className="text-white sm:text-4xl lg:text-6xl">CONTATTI</p>
        </div>
      </div>

      <div className="text-center mt-13">
        <h1>
          PER TUTTE LE INFO MANDA UNA MAIL A: <br />{" "}
          <a href="mailto:ornellabrancatello@gmail.com">
            <span className="text-red-700">ORNELLABRANCATELLO@GMAIL.COM</span>
          </a>
        </h1>
        <h1 className="mt-5">
          CONTATTANDO: <br />{" "}
          <span className="text-red-700">
            ORNELLA BRANCATELLO / FRANCESCO LA SCALA
          </span>
        </h1>
      </div>

      <div className="text-center mt-20 mb-8">
        <h1 className="text-3xl">SOCIALS</h1>
      </div>

      <div className="contact-social-photo bg-[url(/src/assets/img/Contact.jpg)] bg-no-repeat bg-cover bg-center"></div>

      <div className="mt-6 flex justify-around mb-20">
        <div className="rounded-2xl overflow-hidden">
          <a
            href="https://www.matrimonio.com/musica-matrimonio/banda-corta--e219427"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/src/assets/img/matrimonio-com.jpeg"
              alt="matrimonio_com"
              className="w-13"
            />
          </a>
        </div>
        <div className="rounded-2xl overflow-hidden">
          <a
            href="https://www.instagram.com/banda_corta/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/src/assets/img/Instagram_icon.png.webp"
              alt="instagram_logo"
              className="w-13"
            />
          </a>
        </div>
        <div className="rounded-2xl overflow-hidden">
          <a
            href="https://www.facebook.com/p/Banda-Corta-100063638030930/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/src/assets/img/facebook_logo.png"
              alt="matrimonio.com"
              className="w-13"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;
