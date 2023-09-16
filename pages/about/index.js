import { setCategories } from "@/features/categoriesSlice";
import { setProfile } from "@/features/profileSlice";
import { setSession } from "@/features/sessionSlice";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function About({ profile, categories }) {
  const { data: session, status } = useSession();
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories]);
  useEffect(() => {
    if (profile) {
      dispatch(
        setProfile({
          profile: profile,
          projects: profile.projects,
          status: profile.status,
        })
      );
    }
  }, [profile]);
  useEffect(() => {
    if (session) {
      dispatch(setSession(session.user));
    }
  }, [session]);
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-col items-center py-8 px-4 sm:px-8 xl:px-16">
        <div className="w-[min(100%,1400px)] flex flex-col gap-3">
          <div className="w-full flex flex-col gap-[2px]">
            <h4 className="w-full h4  text-zinc-950">
              {language === "english" ? `FINANCEE` : `FINANCEE`}
            </h4>
          </div>
          <div className="w-full flex flex-col gap-[2px]">
            <p className="w-full p text-zinc-800">
              {language === "english"
                ? `Financee is a dynamic crowdfunding platform dedicated to turning dreams into reality. We provide a seamless and secure space where individuals, startups, and creative projects can connect with a global community of backers. Whether you're an entrepreneur looking to launch your next big idea or an individual seeking support for a personal passion project, Financee offers the tools and resources to make it happen. Join us in shaping a brighter future together, one contribution at a time.`
                : `Financee est une plateforme de financement participatif dynamique dédiée à transformer les rêves en réalité. Nous fournissons un espace transparent et sécurisé où les individus, les startups et les projets créatifs peuvent se connecter avec une communauté mondiale de bailleurs de fonds. Que vous soyez un entrepreneur cherchant à lancer votre prochaine grande idée ou un particulier cherchant du soutien pour un projet personnel passionné, Financee offre les outils et les ressources nécessaires pour y parvenir. Rejoignez-nous pour façonner ensemble un avenir meilleur, une contribution à la fois.`}
            </p>{" "}
          </div>
        </div>
      </div>
      {""}
      <div className="w-full flex flex-col items-center py-8 px-4 sm:px-8 xl:px-16">
        <div className="w-[min(100%,1400px)] flex flex-col gap-3">
          <div className="w-full flex flex-col gap-[2px]">
            <h4 className="w-full h4  text-zinc-950">
              {language === "english"
                ? `Contact info`
                : `Informations de contact`}
            </h4>
          </div>
          <div className="w-full flex flex-col gap-[2px]">
            <h6 className="w-full h6  text-zinc-900">
              {language === "english" ? `PHONE NUMBER` : `NUMÉRO DE TÉLÉPHONE`}
            </h6>
            <p className="w-full p  text-zinc-800">{`0699608119`}</p>
          </div>
          <div className="w-full flex flex-col gap-[2px]">
            <h6 className="w-full h6  text-zinc-900">
              {language === "english" ? `EMAIL` : `EMAIL`}
            </h6>
            <p className="w-full p  text-zinc-800">{`ihab.financee@gmail.com`}</p>
          </div>
        </div>
      </div>
      {""}
      <div className="w-full flex flex-col items-center py-8 px-4 sm:px-8 xl:px-16">
        <div className="w-[min(100%,1400px)] flex flex-col gap-3">
          <div className="w-full flex flex-col gap-[2px]">
            <h4 className="w-full h4  text-zinc-950">
              {language === "english"
                ? "Terms & conditions"
                : language === "francais" && " Termes et conditions"}
            </h4>
          </div>

          <div className="w-full flex flex-col gap-[2px]">
            <h6 className="w-full h6  text-zinc-900">
              {language === "english"
                ? "Project Approval and Review"
                : language === "francais" && "Approbation du projet"}
            </h6>
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? "Each project is revewed by and admin, it can later be approved or declined based on whether it is on complience with the platform policies or not"
                : language === "francais" &&
                  "Chaque projet est examiné par un administrateur, il peut ensuite être approuvé ou refusé selon qu'il est conforme ou non aux politiques de la plateforme."}
            </p>
          </div>

          <div className="w-full flex flex-col gap-[2px]">
            <h6 className="w-full h6  text-zinc-900">
              {language === "english"
                ? "Project Creation and Review"
                : language === "francais" &&
                  "Création et révision de la projet"}
            </h6>
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? `To create a project you must log in then click on the "new project" button (in the profile page), the name and description of the project must be precise and the amount is in "DZD".`
                : language === "francais" &&
                  `Pour créer un projet vous devez vous connecter puis cliquer sur le bouton "nouveau projet" (dans la page profil), le nom et la description du projet doivent être précis et le montant est en "DA".`}
            </p>
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? `Funding will be based on the amount entered and the funds will be collected to the FINANCEE's account, then after collecting all the funds, 90% of the final amount will be transferred to the project owner's account. (FINANCEE takes 10% of the final amount raised).`
                : language === "francais" &&
                  `Le financement sera basé sur le montant saisi et les fonds seront collectés sur le compte du FINANCEE, puis après avoir collecté tous les fonds, 90% du montant final sera transféré sur le compte du porteur de projet. (FINANCEE prend 10% du montant final récolté).`}
            </p>
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? `Rewards for donors and investors are set by the project leader and must be paid by them.`
                : language === "francais" &&
                  `Les récompenses des donateurs et des investisseurs sont fixées par le porteur du projet et doivent être payées par lui.`}
            </p>
          </div>
          <div className="w-full flex flex-col gap-[2px]">
            <h6 className="w-full h6  text-zinc-900">
              {language === "english"
                ? "Prohibited Activities"
                : language === "francais" && "Activités interdites"}
            </h6>
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? "Projects that oppose the law or religion will be rejected or blocked."
                : language === "francais" &&
                  "Les projets opposés à la loi ou à la religion seront rejetés ou bloqués."}
            </p>
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? "Projects with suspicious activity will get blocked"
                : language === "francais" &&
                  "Les projets présentant une activité suspecte seront bloqués"}
            </p>
          </div>
        </div>
      </div>
      {""}
      <div className="w-full flex flex-col items-center py-8 px-4 sm:px-8 xl:px-16">
        <div className="w-[min(100%,1400px)] flex flex-col gap-3">
          <div className="w-full flex flex-col gap-[2px]">
            <h4 className="w-full h4  text-zinc-950">
              {language === "english"
                ? `Privacy Policy`
                : `Politique de confidentialité`}
            </h4>
          </div>
          <div className="w-full flex flex-col gap-[2px]">
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? "FINANCEE only collects data about your project or user activity, we respect and maintain the privacy of our users."
                : language === "francais" &&
                  "FINANCEE collecte uniquement des données sur votre projet ou l'activité de l'utilisateur, nous respectons et maintenons la vie privée de nos utilisateurs."}
            </p>
          </div>
        </div>
      </div>
      {""}
      <div className="w-full flex flex-col items-center py-8 px-4 sm:px-8 xl:px-16">
        <div className="w-[min(100%,1400px)] flex flex-col gap-3">
          <div className="w-full flex flex-col gap-[2px]">
            <h4 className="w-full h4  text-zinc-950">
              {language === "english" ? `Campaigns` : `Campagnes`}
            </h4>
          </div>
          <div className="w-full flex flex-col gap-[2px]">
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? "In FINANCEE, a list of our most valuable projects is added to our crowdfunding campaign, these start-ups and projects are allowed to present their projects in front of a group of donors and investors, the campaigns are promoted on the social media and give us access to a larger pool of donors"
                : language === "francais" &&
                  "Dans FINANCEE, une liste de nos projets les plus précieux est ajoutée à notre campagne de financement participatif, ces start-ups et projets sont autorisés à présenter leurs projets devant un groupe de donateurs et d'investisseurs, les campagnes sont promues sur les réseaux sociaux et nous donnent accès à un plus grand bassin de donateurs"}
            </p>
          </div>
        </div>
      </div>
      {""}
      <div className="w-full flex flex-col items-center py-8 px-4 sm:px-8 xl:px-16">
        <div className="w-[min(100%,1400px)] flex flex-col gap-3">
          <div className="w-full flex flex-col gap-[2px]">
            <h4 className="w-full h4  text-zinc-950">
              {language === "english"
                ? "Security"
                : language === "francais" && "Sécurité"}
            </h4>
          </div>

          <div className="w-full flex flex-col gap-[2px]">
            <h6 className="w-full h6  text-zinc-900">
              {language === "english"
                ? "Data Encryption"
                : language === "francais" && "Cryptage des données"}
            </h6>
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? "FINANCEE implements encription protocol (SSL) to secure data transmission. "
                : language === "francais" &&
                  "FINANCEE met en œuvre un protocole de cryptage (SSL) pour sécuriser la transmission des données."}
            </p>
          </div>

          <div className="w-full flex flex-col gap-[2px]">
            <h6 className="w-full h6  text-zinc-900">
              {language === "english"
                ? "Secure Authentication"
                : language === "francais" && "Authentification sécurisée"}
            </h6>
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? "We use google (provider) authentication to add an extra layer of security."
                : language === "francais" &&
                  "Nous utilisons l'authentification Google (fournisseur) pour ajouter une couche de sécurité supplémentaire."}
            </p>
          </div>

          <div className="w-full flex flex-col gap-[2px]">
            <h6 className="w-full h6  text-zinc-900">
              {language === "english"
                ? "User Authorization"
                : language === "francais" && "Autorisation de l'utilisateur"}
            </h6>
            <p className="w-full p  text-zinc-800">
              {language === "english"
                ? "FINANCEE applies appropriate access controls and user permissions to limit access to sensitive data of other users. (users cannot access or modify data that does not concern them)."
                : language === "francais" &&
                  "FINANCEE applique des contrôles d'accès et des autorisations d'utilisateur appropriés pour limiter l'accès aux données sensibles des autres utilisateurs. (les utilisateurs ne peuvent accéder ni modifier les données qui ne les concernent pas)."}
            </p>
          </div>
        </div>
      </div>
      {""}
    </div>
  );
}

export default About;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const profile = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://financee-nu.vercel.app"
          : "http://localhost:3000"
      }/api/profile/${session.user.id}`
    ).then((data) => data.json());

    const categories = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://financee-nu.vercel.app"
          : "http://localhost:3000"
      }/api/global/categories`
    ).then((data) => data.json());

    const data = await Promise.all([profile, categories]);
    return {
      props: {
        profile: data[0],
        categories: data[1],
      },
    };
  } else {
    const categories = fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "https://financee-nu.vercel.app"
          : "http://localhost:3000"
      }/api/global/categories`
    ).then((data) => data.json());

    const data = await Promise.all([categories]);
    return {
      props: {
        categories: data[0],
      },
    };
  }
}
