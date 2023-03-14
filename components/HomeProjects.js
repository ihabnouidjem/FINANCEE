import React, { useState, useContext, useEffect } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import Project from "@/components/Project";
import { homeContext } from "@/pages";
import Link from "next/link";

function HomeProjects() {
  const { recommended } = useContext(homeContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (recommended && recommended.length >= 4) {
      let rec = [];
      for (let i = 0; i < 4; i++) {
        rec.push(recommended[i]);
      }
      setRecommendations(rec);
    }
  }, [recommended]);
  useEffect(() => {
    if (recommended.length >= 8 && recommendations !== []) {
      const interval = setInterval(async () => {
        let currRecs = recommendations;
        const randomRecs = [];
        for (let i = 0; i < 4; i++) {
          let newRec = await recommended.map((project) => {
            const filterRec = currRecs.filter((prj) => {
              return prj._id === project._id;
            });
            if (!(filterRec && filterRec.length !== 0)) {
              return project;
            }
          });
          var cleanRec = await newRec.filter((rec) => {
            return rec;
          });
          await randomRecs.push(
            cleanRec[Math.floor(Math.random() * cleanRec.length)]
          );
          currRecs.push(randomRecs[i]);
        }
        setRecommendations(randomRecs);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [recommendations, recommended]);
  return (
    <div className="homeProjects" id="homeProjects">
      <div className="homeProjects-header">
        <h4 className="h4 black-90">RECOMMENDATIONS</h4>
        <Link href={"/projects"} className="homeProjects-header-button">
          <h6 className="h6 orange">all projects</h6>
          <i className="icon-32 orange">
            <HiArrowLongRight />
          </i>
        </Link>
      </div>
      {recommendations.length === 4 && (
        <div className="homeProjects-projects">
          {recommendations.map(
            ({ _id, uid, projectName, raised, donators, projectImg }) => {
              return (
                <Project
                  key={_id}
                  _id={_id}
                  uid={uid}
                  projectName={projectName}
                  raised={raised}
                  donators={donators}
                  projectImg={
                    projectImg && projectImg !== ""
                      ? projectImg
                      : "/exeption/profileImage.png"
                  }
                />
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default HomeProjects;
