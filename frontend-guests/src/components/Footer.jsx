import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className="bg-red-900 pt-6 flex flex-col items-center md:flex-row md:justify-around">
        <div className="mb-2 md:mb-0">
          <h1 className="font-bold text-2xl text-white">BANDA CORTA</h1>
        </div>
        <div>
          <p className="text-white font-medium">
            © COPYRIGHT {currentYear} AMEDEO MIGNANO
          </p>
        </div>

        <div className="mt-6 flex justify-around mb-5">
          <div className="rounded-2xl overflow-hidden me-5">
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
          <div className="rounded-2xl overflow-hidden me-5">
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
      </div>
    </>
  );
};

export default Footer;
