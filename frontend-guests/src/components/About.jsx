import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";

const About = () => {
  gsap.registerPlugin(ScrollTrigger);

  const container = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ".head",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      }
    );
  }, []);

  useGSAP(
    () => {
      const textFades = gsap.utils.toArray(".text-fade");

      textFades.forEach((fadeElement) => {
        gsap.fromTo(
          fadeElement,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.5,
            scrollTrigger: {
              trigger: fadeElement,
              start: "top 90%",
              end: "center",
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <>
      <div ref={container}>
        {/*Mobile Hero Section*/}
        <div className="flex justify-center items-center sm:hidden h-[70vh] w-full bg-[url(/contact-mobile.jpeg)] bg-no-repeat bg-cover bg-center">
          <div className="text-center mt-7 head">
            <h1 className="text-5xl text-white font-bold">BANDA CORTA</h1>
            <p className="text-white text-3xl">ABOUT</p>
          </div>
        </div>
        {/*Tablet Desktop Hero Section*/}
        <div className="hidden sm:flex justify-center items-center  sm:h-[70vh] lg:h-[90vh] w-full bg-[url(/src/assets/img/hero-desktop.jpeg)] bg-no-repeat bg-cover bg-center">
          <div className="text-center mt-7 head">
            <h1 className="sm:text-6xl lg:text-8xl text-white font-bold">
              BANDA CORTA
            </h1>
            <p className="text-white sm:text-4xl lg:text-6xl">ABOUT</p>
          </div>
        </div>

        <div className="container mx-auto mt-10 mb-13">
          <div className="mx-auto w-9/10 md:w-3/4 lg:w-2/3">
            <img src="/or.jpeg" alt="banda.jpeg" className="w-full" />
          </div>
        </div>

        <div className="text-center flex justify-center mb-8 box">
          <div className="w-9/10 sm:w-1/2">
            <p className="font-medium text-fade">
              Per un intrattenimento energico, carismatico e davvero divertente,
              i Banda Corta sono sicuramente la scelta più azzeccata: questa
              band animerà la vostra festa di matrimonio avvalendosi di note
              jazz, soul ma anche pop, con l'unico obiettivo di farvi ballare e
              divertire insieme ai vostri amici e parenti.
            </p>
          </div>
        </div>

        <div className="text-center flex justify-center mb-8">
          <div className="w-9/10 sm:w-1/2">
            <p className="font-medium text-fade">
              La Banda Corta ascolterà le vostre preferenze in campo musicale,
              in modo da rendere la vostra festa perfettamente congeniale alle
              vostre aspettative. La personalizzazione, quindi, sarà all'ordine
              del giorno: i vostri brani preferiti, infatti, saranno accolti di
              buon grado, per non parlare dei consigli in campo musicale offerti
              da tutti i membri del gruppo, sempre pronti a risolvere eventuali
              problemi o a chiarire dubbi.
            </p>
          </div>
        </div>

        <div className="text-center flex justify-center mb-8">
          <div className="w-9/10 sm:w-1/2">
            <p className="font-medium text-fade">
              I musicisti di Banda Corta sono tutti professionisti, con svariati
              anni di esperienza alle spalle e mossi da una passione comune per
              la musica, aspetto che senza dubbio contribuirà all'ottima
              riuscita del vostro ricevimento nuziale.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
