import { storage } from "@/lib/firebase";
// import { projectContext } from "@/pages/projects/[projectId]";
import { appContext } from "@/pages/_app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import React, { useContext, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useSelector } from "react-redux";

function Checkout() {
  const language = useSelector((state) => state.language?.language);
  const { projectState, setProjectState } = useContext(appContext);
  const { postItem } = useContext(appContext);
  const [checkoutState, setCheckoutState] = useState({
    status: "new_checkout",
    image: null,
    newImgURL: null,
  });

  const imageInputRef = useRef(null);

  const newCheckout = () => {
    setCheckoutState({ ...checkoutState, status: "uploading" });
    if (checkoutState.image) {
      const id = Date.now();
      const imgRef = ref(storage, `transactions/${id}`);
      uploadBytes(imgRef, checkoutState.image).then((res) => {
        const newImgRef = ref(storage, `transactions/${id}`);
        getDownloadURL(newImgRef).then((url) => {
          postItem(`/api/transactions`, {
            ...projectState.checkout,
            image: url,
            status: "new",
          });
          setCheckoutState({
            ...checkoutState,
            status: "new_checkout",
            image: null,
            newImgURL: null,
          });
          setProjectState({
            ...projectState,
            checkoutState: false,
            checkout: {
              uid: "",
              uname: "",
              pid: "",
              pname: "",
              amount: "",
              details: "",
              image: "",
              operation: "",
            },
          });
        });
      });
    }
  };
  return (
    <div className="z-[100] fixed top-0 left-0 w-full h-screen grid grid-cols-1fr grid-rows-1fr">
      <div
        className="w-full h-screen bg-black50 col-1/2 row-1/2 z-[101]"
        onClick={() => {
          setProjectState({
            ...projectState,
            checkoutState: false,
            checkout: {
              uid: "",
              uname: "",
              pid: "",
              pname: "",
              amount: "",
              details: "",
              image: "",
              operation: "",
            },
          });
        }}
      >
        {""}
      </div>
      <div className="m-auto w-[min(calc(1000px-24px),calc(100%-24px))] sm:w-[min(calc(1000px-64px),calc(100%-64px))] max-h-[calc(100%-128px)] p-2 sm:p-6 rounded-xl sm:rounded-[24px] flex flex-col gap-2 sm:gap-3 bg-white overflow-x-hidden overflow-y-scroll u-scrollbar-hidden col-1/2 row-1/2 z-[102]">
        <h4 className="h4 w-full text-zinc-950">
          {language === "english"
            ? "FINANCEE | PAYMENT"
            : language === "francais" && "FINANCEE | PAYMENT"}
        </h4>
        <p className="p w-full text-zinc-800">
          {projectState.checkout?.details}
        </p>
        <div className="w-full flex flex-col gap-[2px]">
          <h5 className="h5 text-zinc-900 w-full">
            {language === "english"
              ? "Take the following steps to help fund the project"
              : language === "francais" &&
                "Suivez les étapes suivantes pour aider à financer le projet"}
          </h5>
          <h6 className="med-h6 text-zinc-900 w-full">
            {language === "english" ? (
              <>
                {`1. Send your fund (`}
                <span className="text-blue-600">
                  {projectState.checkout?.amount &&
                    `${projectState.checkout?.amount}DZD`}
                </span>
                {`) to the following RIP code (`}
                <span className="text-blue-600">{`00799999002573141516`}</span>
                {`) using BaridiMob`}
              </>
            ) : (
              language === "francais" && (
                <>
                  {`1. Envoyez votre fonds `}
                  <span className="text-blue-600 h6">
                    {projectState.checkout?.amount &&
                      `${projectState.checkout?.amount}DA`}
                  </span>
                  {` au code RIP suivant (`}
                  <span className="text-blue-600 h6">{`00799999002573141516`}</span>
                  {`) en utilisant BaridiMob`}
                </>
              )
            )}
          </h6>
          {projectState.checkout?.operation === "donation" ? (
            <h6 className="small-h6 text-zinc-900 w-full">
              {language === "english"
                ? "Please consider that a donation isn't rewarded, we thank you for your help."
                : language === "francais" &&
                  "Veuillez considérer qu'un don n'est pas récompensé, nous vous remercions pour votre aide."}
            </h6>
          ) : (
            <h6 className="small-h6 text-zinc-900 w-full">
              {language === "english"
                ? "Please consider that a fund with an amount less than the above amount will not be approved and you will not be rewarded for it"
                : language === "francais" &&
                  "Veuillez considérer qu'un fonds dont le montant est inférieur au montant ci-dessus ne sera pas approuvé et vous ne serez pas récompensé pour cela."}
            </h6>
          )}
          {/* <h6 className="small-h6 text-zinc-900 w-full">
            {language === "english"
              ? "Please consider that a fund with an amount less than the above amount will not be approved and you will not be rewarded for it"
              : language === "francais" &&
                "Veuillez considérer qu'un fonds dont le montant est inférieur au montant ci-dessus ne sera pas approuvé et vous ne serez pas récompensé pour cela."}
          </h6> */}
          <h6 className="med-h6 text-zinc-900 w-full">
            {language === "english"
              ? "2. Go to your email and take a screenshot confirming this transaction"
              : language === "francais" &&
                "2. Accédez à votre e-mail et prenez une capture d'écran confirmant cette transaction"}
          </h6>
          <h6 className="med-h6 text-zinc-900 w-full">
            {language === "english"
              ? `3. Select the image (screenshot) and press the "CONFIRM" button`
              : language === "francais" &&
                `3. Sélectionnez l'image (capture d'écran) et appuyez sur le bouton "CONFIRM"`}
          </h6>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <div
            className={`w-[min(256px,100%)] h-40 rounded-lg  ${
              !checkoutState.newImgURL &&
              "border-2 border-dashed border-zinc-800"
            }`}
          >
            {checkoutState.newImgURL && (
              <Image
                className="w-full h-40 flex items-center justify-center object-cover rounded-lg"
                src={checkoutState.newImgURL}
                height={500}
                width={500}
                alt={"confirmation image"}
              />
            )}
          </div>
          <div className="w-[min(100%,256px)] flex flex-col gap-2">
            {checkoutState.newImgURL ? (
              <button
                className="px-6 py-2 rounded-lg text-zinc-950 w-full"
                onClick={() => {
                  setCheckoutState({
                    ...checkoutState,
                    image: null,
                    newImgURL: null,
                  });
                }}
              >
                <h6 className="h6 text-zinc-950">
                  {language === "english"
                    ? "Cancel"
                    : language === "francais" && "Annuler"}
                </h6>
              </button>
            ) : (
              <>
                <button
                  className="px-6 py-2 rounded-lg text-zinc-950 w-full"
                  onClick={() => {
                    imageInputRef.current.click();
                  }}
                >
                  <h6 className="h6 text-zinc-950">
                    {language === "english"
                      ? "Select Image"
                      : language === "francais" && "Sélectionner une Image"}
                  </h6>
                </button>
                <input
                  ref={imageInputRef}
                  className="hidden"
                  onChange={(e) => {
                    setCheckoutState({
                      ...checkoutState,
                      image: e.target.files[0],
                      newImgURL: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                  type="file"
                />
              </>
            )}

            <button
              className="px-6 py-2 rounded-lg text-zinc-950 w-full bg-gradient-to-br from-yellow-300 to-yellow-500"
              onClick={() => {
                newCheckout();
              }}
            >
              <h6 className="h6">
                {" "}
                {language === "english"
                  ? "Confirm"
                  : language === "francais" && "Confirm"}
              </h6>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
