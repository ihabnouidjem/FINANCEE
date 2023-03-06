import Link from "next/link";
import React from "react";
import { BsFacebook, BsTwitter, BsYoutube, BsInstagram } from "react-icons/bs";
import { MdOutlineCopyright } from "react-icons/md";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-nav">
        <div className="footer-nav-item">
          <div className="footer-nav-header">
            <h5 className="h5 white-90">FINANCEE</h5>
          </div>
          <div className="footer-nav-content">
            <Link href="/about">
              <p className="p white-70 fit-width">terms & conditions</p>
            </Link>
            <Link href="/about">
              <p className="p white-70 fit-width">privacy policy </p>
            </Link>
            <Link href="/about">
              <p className="p white-70 fit-width">campaigns</p>
            </Link>
            <Link href="/about">
              <p className="p white-70 fit-width">security</p>
            </Link>
            <Link href="/about">
              <p className="p white-70 fit-width">about us</p>
            </Link>
          </div>
        </div>
        <div className="footer-nav-item">
          <div className="footer-nav-header">
            <h5 className="h5 white-90">SERVICES</h5>
          </div>
          <div className="footer-nav-content">
            <Link href="/about">
              <p className="p white-70 fit-width">payment</p>
            </Link>
            <Link href="/about">
              <p className="p white-70 fit-width">marketing & promotion</p>
            </Link>
            <Link href="/about">
              <p className="p white-70 fit-width">analytics & reporting</p>
            </Link>
            <Link href="/about">
              <p className="p white-70 fit-width">legal & complience</p>
            </Link>
          </div>
        </div>
        <div className="footer-nav-item">
          <div className="footer-nav-header">
            <h5 className="h5 white-90">NAVIGATE</h5>
          </div>
          <div className="footer-nav-content">
            <Link href="#homeProjects">
              <p className="p white-70 fit-width">projects</p>
            </Link>
            <Link href="#homeCampaigns">
              <p className="p white-70 fit-width">campaigns</p>
            </Link>
            <Link href="#homePayment">
              <p className="p white-70 fit-width">payment</p>
            </Link>
            <Link href="#homeHww">
              <p className="p white-70 fit-width">how we work</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="footer-nav-social">
        <div className="footer-nav-header">
          <h5 className="h5 white-90">SOCIAL</h5>
        </div>
        <div className="footer-nav-social-icons">
          <Link href="">
            <i className="icon-32 white-90">
              <BsFacebook />
            </i>
          </Link>
          <Link href="">
            <i className="icon-32 white-90">
              <BsTwitter />
            </i>
          </Link>
          <Link href="">
            <i className="icon-32 white-90">
              <BsYoutube />
            </i>
          </Link>
          <Link href="">
            <i className="icon-32 white-90">
              <BsInstagram />
            </i>
          </Link>
        </div>
      </div>
      <div className="copyright-container">
        <div className="copyright">
          <p className="p white-50">Copyright</p>
          <i className="icon-24 white-50">
            <MdOutlineCopyright />
          </i>
          <p className="p white-50">2023 FINANCEE</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
