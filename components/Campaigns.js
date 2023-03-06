import Image from "next/image";
import React from "react";
import { MdPlace } from "react-icons/md";

function Campaigns() {
  return (
    <div className="campaigns" id="homeCampaigns">
      <div className="campaigns-header">
        <h4 className="h4 black-90">CAMPAIGNS</h4>
      </div>
      <div className="campaign-item-container">
        <h6 className="h6 black-70 text-center">ORGANIZING A CAMPAIGN</h6>
      </div>
      <div className="campaign-item-container">
        <p className="p black-50 text-center">
          Organizing a crowdfunding campaign can be a daunting task, but with
          careful planning and execution, it can be a successful way to raise
          funds for your project.
        </p>
      </div>
      <div className="campaigns-campaign-container">
        <div className="campaigns-campaign">
          <div className="campaign-img">
            <Image src="/campaign-1.jpg" alt="" height={400} width={400} />{" "}
          </div>
          <div className="campaign-info">
            <div className="campaign-position">
              <i className="icon-24 green">
                <MdPlace />
              </i>
              <h6 className="h6 white">Es-Senia oran</h6>
            </div>
            <p className="p white">In 25/3/2023 . for 5days</p>
          </div>
        </div>
        <div className="campaigns-campaign">
          <div className="campaign-img">
            <Image src="/campaign-2.jpeg" alt="" height={400} width={400} />{" "}
          </div>
          <div className="campaign-info">
            <div className="campaign-position">
              <i className="icon-24 green">
                <MdPlace />
              </i>
              <h6 className="h6 white">Es-Senia oran</h6>
            </div>
            <p className="p white">In 25/3/2024 . for 5days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Campaigns;
