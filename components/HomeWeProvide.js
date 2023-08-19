import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

function HomeWeProvide() {
  const language = useSelector((state) => state.language?.language);
  return (
    <div className="w-full flex flex-col items-center gap-4  py-8 px-4 sm:px-8 xl:px-16">
      <div className="w-[min(100%,1400px)] flex items-center justify-between">
        <h4 className="h4 text-gray-900">
          {language === "english"
            ? "WE PROVIDE"
            : language === "francais" && "NOUS FOURNISSONS"}
        </h4>
      </div>{" "}
      <div className="w-[min(100%,1000px)] flex flex-row justify-around gap-3">
        <div className="shadow-md bg-gray-100 flex flex-col items-center rounded-xl w-[calc((100%-24px)/3)] p-2 gap-1 sm-gap-2 sm:p-4 md:w-[200px]">
          <div className="aspect-square flex items-center justify-center  p-2 w-[100%] md:p-0 md:w-[140px]">
            <Image
              src={"/clock.png"}
              alt="clock icon"
              height={140}
              width={140}
            />
          </div>
          <h6 className="text-gray-900 w-full text-center overflow-hidden font-archivo font-semibold text-[14px] sm:text-[18px] xl:text-[20px]">
            {language === "english"
              ? "SPEED"
              : language === "francais" && "VITESSE"}
          </h6>
          <p className="small-p text-gray-700 w-full text-center">
            {language === "english"
              ? "Add your project and start raising money right now!"
              : language === "francais" &&
                "Ajoutez votre projet et commencez à collecter des fonds dès maintenant !"}
          </p>
        </div>
        {""}
        <div className="shadow-md bg-gray-100 flex flex-col items-center rounded-xl w-[calc((100%-24px)/3)] p-2 gap-1 sm-gap-2 sm:p-4 md:w-[200px]">
          <div className="aspect-square flex items-center justify-center  p-2 w-[100%] md:p-0 md:w-[140px]">
            <Image
              src={"/handshake.png"}
              alt="handshake icon"
              height={140}
              width={140}
            />
          </div>
          <h6 className="text-gray-900 w-full text-center overflow-hidden font-archivo font-semibold text-[14px] sm:text-[18px] xl:text-[20px]">
            {language === "english"
              ? "CERTAINTY"
              : language === "francais" && "CERTITUDE"}
          </h6>
          <p className="small-p text-gray-700 w-full text-center">
            {language === "english"
              ? "We help build trust between companies and funders."
              : language === "francais" &&
                "Nous aidons à établir la confiance entre les entreprises et les bailleurs de fonds."}
          </p>
        </div>
        {""}
        <div className="shadow-md bg-gray-100 flex flex-col items-center rounded-xl w-[calc((100%-24px)/3)] p-2 gap-1 sm-gap-2 sm:p-4 md:w-[200px]">
          <div className="aspect-square flex items-center justify-center  p-2 w-[100%] md:p-0 md:w-[140px]">
            <Image
              src={"/security.png"}
              alt="security icon"
              height={140}
              width={140}
            />
          </div>
          <h6 className="text-gray-900 w-full text-center overflow-hidden font-archivo font-semibold text-[14px] sm:text-[18px] xl:text-[20px]">
            {language === "english"
              ? "SECURITY"
              : language === "francais" && "SÉCURITÉ"}
          </h6>
          <p className="small-p text-gray-700 w-full text-center">
            {language === "english"
              ? "We ensure your transactions are secure."
              : language === "francais" &&
                "Nous assurons la sécurité de vos transactions."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeWeProvide;
