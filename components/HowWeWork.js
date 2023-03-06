import Link from "next/link";
import React from "react";
import { HiArrowLongRight } from "react-icons/hi2";

function HowWeWork() {
  return (
    <div className="hww" id="homeHww">
      <div className="hww-header">
        <h4 className="h4 black-90">HOW WE WORK</h4>
      </div>
      <div className="hww-p-item">
        <p className="p black-50 text-center">
          We raise funds from a large number of people through our online
          platform to finance a start-up. financing a start-up is done in three
          major steps:
        </p>
      </div>
      <div className="hww-steps">
        <div className="hww-step">
          <div className="hww-step-number">
            <div className="hww-step-number-line"></div>
            <div className="hww-step-number-circle">
              <h6 className="h6 white">1</h6>
            </div>
          </div>
          <div className="hww-step-info">
            <div className="hww-step-p">
              <h6 className="h6 black-70 text-center">ADD YOUR PROJECT</h6>
            </div>
            <div className="hww-step-p">
              <p className="p black-50 text-center">
                FINANCEE makes it easy for you to add a project and start
                getting funds immediately, click the button down below to add
                your project
              </p>
            </div>
            <Link href="/profile" className="hww-step-btn">
              <h6 className="h6 orange">add project</h6>
              <i className="icon-32 orange">
                <HiArrowLongRight />
              </i>
            </Link>
          </div>
        </div>
        <div className="hww-step">
          <div className="hww-step-number">
            <div className="hww-step-number-line"></div>
            <div className="hww-step-number-circle">
              <h6 className="h6 white">2</h6>
            </div>
          </div>
          <div className="hww-step-info">
            <div className="hww-step-p">
              <h6 className="h6 black-70 text-center">
                PROMOTION & MARKETINGT
              </h6>
            </div>
            <div className="hww-step-p">
              <p className="p black-50 text-center">
                We provide marketing and promotional support to help your
                project reach a wider audience and attract more backers.
              </p>
            </div>
            <div className="hww-step-link">
              <p className="p black-50">{"read more about"}</p>
              <Link href="about">
                <h6 className="h6 blue-link">promotion & marketing</h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="hww-step">
          <div className="hww-step-number">
            <div className="hww-step-number-line"></div>
            <div className="hww-step-number-circle">
              <h6 className="h6 white">3</h6>
            </div>
          </div>
          <div className="hww-step-info">
            <div className="hww-step-p">
              <h6 className="h6 black-70 text-center">WE KEEP YOU SECURE</h6>
            </div>
            <div className="hww-step-p">
              <p className="p black-50 text-center">
                While we help raise your funds, we ensure that funds are
                securely and efficiently transferred between backers and
                projects
              </p>
            </div>
            <div className="hww-step-link">
              <p className="p black-50">{"read more about"}</p>
              <Link href="about">
                <h6 className="h6 blue-link">privacy policy</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowWeWork;
