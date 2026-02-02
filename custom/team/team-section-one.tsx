import React from "react";
import Image from "next/image";
import team_data from "@/data/team-data";
import TeamSingle from "./team-single";
import Link from "next/link";

const TeamSectionOne = () => {
  const teams = team_data.filter((t) => t.page === "home");
  return (
    <div className="team-section-one mt-150 lg-mt-80">
      <div className="container">
     
      </div>
    </div>
  );
};

export default TeamSectionOne;
