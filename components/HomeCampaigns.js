import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";

function HomeCampaigns() {
  const language = useSelector((state) => state.language?.language);

  return (
    <div className="w-full flex flex-col gap-4 items-center py-8 px-4 sm:px-8 xl:px-16">
      <div className="w-[min(100%,1400px)] flex items-center justify-between">
        <h4 className="h4 text-gray-900">
          {language === "english"
            ? "CAMPAIGNS"
            : language === "francais" && "CAMPAGNES"}
        </h4>
        <Link
          className="flex flex-row items-center gap-2 ml-auto text-yellow-500"
          href="/"
        >
          <h6 className="p hidden sm:block">
            {language === "english"
              ? "View all"
              : language === "francais" && "Voir tout"}
          </h6>
          <i className="icon-32">
            <BsArrowRight />
          </i>
        </Link>
      </div>
      <div className="w-[min(100%,1400px)] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-repAuto grid-rows-1fr gap-4 relative animate-h_Campaigns">
          <Link
            href={`/`}
            className="aspect-[3/1] row-1/2 w-[min(calc(100vw-32px),1400px)] sm:w-[min(calc(100vw-64px),1400px)] xl:w-[min(calc(100vw-128px),1400px)]"
          >
            <Image
              className="w-full h-full flex items-center justify-center object-cover row-1/2"
              src={"/exeptions/campaign_1.jpeg"}
              alt={"campaign"}
              height={400}
              width={1400}
            />
          </Link>
          <Link
            href={`/`}
            className="aspect-[3/1] row-1/2 w-[min(calc(100vw-32px),1400px)] sm:w-[min(calc(100vw-64px),1400px)] xl:w-[min(calc(100vw-128px),1400px)]"
          >
            <Image
              className="w-full h-full flex items-center justify-center object-cover rounded-2xl row-1/2"
              src={"/exeptions/campaign_2.jpg"}
              alt={"campaign"}
              height={400}
              width={1400}
            />
          </Link>
          <Link
            href={`/`}
            className="aspect-[3/1] row-1/2 w-[min(calc(100vw-32px),1400px)] sm:w-[min(calc(100vw-64px),1400px)] xl:w-[min(calc(100vw-128px),1400px)]"
          >
            <Image
              className="w-full h-full flex items-center justify-center object-cover rounded-2xl row-1/2"
              src={"/exeptions/campaign_1.jpeg"}
              alt={"campaign"}
              height={400}
              width={1400}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeCampaigns;
