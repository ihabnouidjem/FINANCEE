import { stateContext } from "@/pages/_app";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { BsHouse } from "react-icons/bs";
import { FaRegLightbulb } from "react-icons/fa";
import { GoPerson } from "react-icons/go";

function Nav() {
  const { nav, setNav } = useContext(stateContext);

  useEffect(() => {
    // console.log(nav);

    if (nav.state === "navIn") {
      //   const navInintrvl = setInterval(()=>{
      //     setNav({status:true,state:"navIn"})
      //   },800)
      //   return ()=> clearInterval(navInintrvl)
    } else if (nav.status && nav.state === "navOut") {
      const navOutIntrvl = setInterval(() => {
        setNav({ status: false, state: "navOut" });
      }, 700);
      return () => clearInterval(navOutIntrvl);
    }
  }, [nav]);

  return (
    <div className="nav">
      <div className="nav-background">
        <div className={`nav-circle ${nav.state}-navcircle`}></div>
      </div>
      <div className={`nav-navbar ${nav.state}-navbar`}>
        <Link
          href="/"
          className="nav-navbar-item black-90"
          onClick={() => {
            setNav({ ...nav, state: "navOut" });
          }}
        >
          <i className="btn-32">
            <BsHouse />
          </i>
          <h6 className="h6">Home</h6>
        </Link>
        <Link
          href="/projects"
          className="nav-navbar-item black-90"
          onClick={() => {
            setNav({ ...nav, state: "navOut" });
          }}
        >
          <i className="btn-32">
            <FaRegLightbulb />
          </i>
          <h6 className="h6">Projects</h6>
        </Link>
        <Link
          href="/profile"
          className="nav-navbar-item black-90"
          onClick={() => {
            setNav({ ...nav, state: "navOut" });
          }}
        >
          <i className="btn-32">
            <GoPerson />
          </i>
          <h6 className="h6">Profile</h6>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
