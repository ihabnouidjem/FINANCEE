import Link from "next/link";
import React from "react";
import { BsArrowRight, BsArrowRightShort } from "react-icons/bs";
import { FiArrowUpRight, FiChevronRight } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { useSelector } from "react-redux";

function HomeHWW() {
  const language = useSelector((state) => state.language?.language);

  return (
    <div className="w-full flex flex-col items-center gap-6  py-8 px-4 sm:px-8 xl:px-16">
      <div className="w-[min(100%,1400px)] flex items-center justify-between">
        <h4 className="h4 text-gray-900">
          {language === "english"
            ? "HOW WE WORK"
            : language === "francais" && "COMMENT NOUS TRAVAILLONS"}
        </h4>
      </div>{" "}
      <div className="w-[min(100%,1000px)] flex items-center justify-center px-4">
        <p className="p text-gray-700 text-center w-full">
          {language === "english"
            ? "We raise funds from a large number of people through our online platform, in order to finance a start-up. financing a start-up is done in three major steps."
            : language === "francais" &&
              "Nous collectons des fonds auprès d'un grand nombre de personnes via notre plateforme en ligne, afin de financer une start-up. le financement d'une start-up se fait en trois grandes étapes."}
        </p>
      </div>
      <div className="w-[min(100%,600px)] flex flex-col items-center gap-2 px-4">
        <div className="w-full h-[120px] grid grid-cols-1fr grid-rows-1fr">
          <div className="col-1/2 row-1/2 z-0 h-full w-[2px] bg-yellow-400 m-auto"></div>
          <div className="w-[48px] h-[48px] flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-full mx-auto mt-4 col-1/2 row-1/2 z-10 border-[3px] border-white">
            <h6 className="h6 text-gray-700">1</h6>
          </div>
        </div>
        <div className="w-full">
          <h6 className="w-full h6 text-gray-800 text-center">
            {language === "english"
              ? "ADD YOUR PROJECT"
              : language === "francais" && "AJOUTEZ VOTRE PROJET"}
          </h6>
        </div>
        <div>
          <p className="w-full p text-gray-700 text-center">
            {language === "english"
              ? "FINANCEE makes it easy for you to add a project and start getting funds immediately, click the button down below to add your own project."
              : language === "francais" &&
                "FINANCEE vous permet d'ajouter facilement un projet et de commencer à obtenir des fonds immédiatement, cliquez sur le bouton ci-dessous pour ajouter votre propre projet."}
          </p>
        </div>
        <Link
          className="flex flex-row items-center gap-2 px-4 py-2 rounded-xl text-yellow-500"
          href=""
        >
          <p className="small-p-16">
            {language === "english"
              ? "Add project"
              : language === "francais" && "Ajouter un projet"}
          </p>
          <i className="icon-20">
            <MdArrowForward />
          </i>
        </Link>
      </div>
      <div className="w-[min(100%,600px)] flex flex-col items-center gap-2 px-4">
        <div className="w-full h-[120px] grid grid-cols-1fr grid-rows-1fr">
          <div className="col-1/2 row-1/2 z-0 h-full w-[2px] bg-yellow-400 m-auto"></div>
          <div className="w-[48px] h-[48px] flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-full mx-auto mt-4 col-1/2 row-1/2 z-10 border-[3px] border-white">
            <h6 className="h6 text-gray-700">2</h6>
          </div>
        </div>
        <div className="w-full">
          <h6 className="w-full h6 text-gray-800 text-center">
            {language === "english"
              ? "PROMOTION & MARKETING"
              : language === "francais" && "PROMOTION & COMMERCIALISATION"}
          </h6>
        </div>
        <div>
          <p className="w-full p text-gray-700 text-center">
            {language === "english"
              ? "We provide marketing and promotional support to help your project reach a wider audience and attract more backers."
              : language === "francais" &&
                "Nous fournissons un soutien marketing et promotionnel pour aider votre projet à atteindre un public plus large et à attirer plus de bailleurs de fonds."}
          </p>
        </div>
        <Link
          className="flex flex-row items-center gap-2 px-3 py-[6px] rounded-lg bg-blue-500 text-white active:scale-90 transition duration-200"
          href=""
          target={"_blank"}
        >
          <p className="small-p-16">
            {language === "english"
              ? "Promotion & Marketing"
              : language === "francais" && "La promotion et le marketing"}
          </p>
          <i className="icon-20">
            <FiArrowUpRight />
          </i>
        </Link>
      </div>
      <div className="w-[min(100%,600px)] flex flex-col items-center gap-2 px-4">
        <div className="w-full h-[120px] grid grid-cols-1fr grid-rows-1fr">
          <div className="col-1/2 row-1/2 z-0 h-full w-[2px] bg-yellow-400 m-auto"></div>
          <div className="w-[48px] h-[48px] flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-full mx-auto mt-4 col-1/2 row-1/2 z-10 border-[3px] border-white">
            <h6 className="h6 text-gray-700">3</h6>
          </div>
        </div>
        <div className="w-full">
          <h6 className="w-full h6 text-gray-800 text-center">
            {language === "english"
              ? "SUBSCRIBE TO CAMPAIGNS"
              : language === "francais" && "S'INSCRIRE AUX CAMPAGNES"}
          </h6>
        </div>
        <div>
          <p className="w-full p text-gray-700 text-center">
            {language === "english"
              ? "Subscribing to a campaign gives you access to a larger pool of backers, helps market your project, and is the fastest way to finance your project."
              : language === "francais" &&
                "L'abonnement à une campagne vous donne accès à un plus grand nombre de bailleurs de fonds, vous aide à commercialiser votre projet et constitue le moyen le plus rapide de financer votre projet."}
          </p>
        </div>
        <Link
          className="flex flex-row items-center gap-2 px-3 py-[6px] rounded-lg bg-blue-500 text-white active:scale-90 transition duration-200"
          href=""
          target={"_blank"}
        >
          <p className="small-p-16">
            {language === "english"
              ? "Read more about campaigns"
              : language === "francais" && "En savoir plus"}
          </p>
          <i className="icon-20">
            <FiArrowUpRight />
          </i>
        </Link>
      </div>
    </div>
  );
}

export default HomeHWW;
