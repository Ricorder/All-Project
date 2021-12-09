import React, { Component } from "react";
import "./Description.scss";

import DetailedDescription from "./DetailedDescription";
import CorporateApproval from "./CorporateApproval";

import { ProjectModel } from "../project-model";


//================================================================================
export interface DescriptionProps {
  project: ProjectModel;
}

const Description = (props: DescriptionProps) => {
  const project = props.project;

  return (
    <div className="description__wrapper">
      <DetailedDescription project={project}></DetailedDescription>
      <CorporateApproval project={project}></CorporateApproval>
    </div>
  );
}

export default Description;
