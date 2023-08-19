import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeLng } from "@/features/languageSlice";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdCopyright } from "react-icons/md";
import { GB, FR } from "country-flag-icons/react/3x2";

function Footer() {
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();
  return (
    <div className="w-full flex flex-col items-center bg-slate-900 gap-6 px-4 py-8 sm:px-8 xl:px-16">
      <div className="w-full p-4 rounded-xl bg-slate-950 shadow-inner flex flex-wrap gap-4 sm:gap-16">
        <div className="flex flex-col gap-2">
          <h5 className="h5 text-white">FINANCEE</h5>
          <Link href="">
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "terms & conditions"
                : language === "francais" && " termes et conditions"}
            </p>
          </Link>
          <Link href="">
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "privacy policy"
                : language === "francais" && "politique de confidentialité"}
            </p>
          </Link>
          <Link href="">
            {" "}
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "campaigns"
                : language === "francais" && "campagnes"}
            </p>
          </Link>
          <Link href="">
            {" "}
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "security"
                : language === "francais" && "sécurité"}
            </p>
          </Link>
          <Link href="">
            {" "}
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "about us"
                : language === "francais" && "à propos"}
            </p>
          </Link>
        </div>
        {""}
        <div className="flex flex-col gap-2">
          <h5 className="h5 text-white">
            {language === "english"
              ? "SERVICES"
              : language === "francais" && "SERVICES"}
          </h5>
          <Link href="">
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "payment"
                : language === "francais" && "paiement"}
            </p>
          </Link>
          <Link href="">
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "marketing & promotion"
                : language === "francais" && "marketing et promotion"}
            </p>
          </Link>
          <Link href="">
            {" "}
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "analytics & reporting"
                : language === "francais" && "analyses et rapports"}{" "}
            </p>
          </Link>
          <Link href="">
            {" "}
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "legal & complience"
                : language === "francais" && "juridique et conformité"}
            </p>
          </Link>
        </div>
        {""}
        <div className="flex flex-col gap-2">
          <h5 className="h5 text-white">
            {language === "english"
              ? "NAVIGATION"
              : language === "francais" && "NAVIGATION"}
          </h5>
          <Link href="">
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "projects"
                : language === "francais" && "projets"}
            </p>
          </Link>
          <Link href="">
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "campaigns"
                : language === "francais" && "campagnes"}
            </p>
          </Link>
          <Link href="">
            {" "}
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "payment"
                : language === "francais" && "paiement"}
            </p>
          </Link>
          <Link href="">
            {" "}
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "we provide"
                : language === "francais" && "nous fournissons"}
            </p>
          </Link>
          <Link href="">
            {" "}
            <p className="p text-gray-300 mx-2 hover:text-white">
              {language === "english"
                ? "how we work"
                : language === "francais" && "comment nous travaillons"}
            </p>
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-wrap items-center">
        <h5 className="h5 text-white">
          {language === "english"
            ? "SOCIAL"
            : language === "francais" && "SOCIALE"}
        </h5>
        <div className="max-w-[300px] w-full ml-auto flex flex-row items-center justify-around">
          <i className="icon-32 text-gray-300 hover:text-white">
            <FaFacebook />
          </i>
          <i className="icon-32 text-gray-300 hover:text-white">
            <FaInstagram />
          </i>
          <i className="icon-32 text-gray-300 hover:text-white">
            <FaTwitter />
          </i>
          <i className="icon-32 text-gray-300 hover:text-white">
            <FaYoutube />
          </i>
        </div>
      </div>
      <div className="w-full flex items-center flex-wrap gap-2">
        <div className="flex flex-row items-center text-white gap-2">
          <p>Copyright </p>
          <i className="w-[20px] h-[20px] text-[20px] flex items-center justify-center">
            <MdCopyright />
          </i>
          <p className="p text-white"> FINANCEE 2023</p>
        </div>
        <p className="p text-white ml-auto">
          {language === "english"
            ? "Credits:"
            : language === "francais" && "Crédits:"}{" "}
          <Link
            href="ihabnouidjem.com"
            className="font-semibold"
            target={"_blink"}
          >
            ihab nouidjem
          </Link>
        </p>
      </div>
      <div className="w-full flex items-center justify-center gap-4 ">
        <i
          className="w-6 h-6 flex items-center justify-center"
          onClick={() => dispatch(changeLng("english"))}
        >
          <GB
            title="English"
            className="w-full h-full object-contain flex items-center justify-center"
          />
        </i>
        <i
          className="w-6 h-6 flex items-center justify-center"
          onClick={() => dispatch(changeLng("francais"))}
        >
          <FR
            title="Francais"
            className="w-full h-full object-contain flex items-center justify-center"
          />
        </i>
      </div>
    </div>
  );
}

export default Footer;
