import React, { useState } from "react";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CustomInput from "components/CustomInput/CustomInput";

import { ProjectModel } from "../project-model";

enum ProjectDataId {
  name = "name",
  subType = "subType",
  industry = "industry",
  owner = "owner",
  subDivision = "subDivision",
  implementingCompany = "implementingCompany",
  sibAddress = "sibAddress",
  status = "status",
  number = "number"
}

export interface DetailsSummaryProps {
  project: ProjectModel;
}

interface UserData {
  [id: string]: any;
}

interface FormControlProps {
  id: ProjectDataId;
  label: string;
}

export const DetailsSummary = (props: DetailsSummaryProps) => {
  const project = props.project;
  const [values, setValues] = useState<UserData>({
    [ProjectDataId.name]: project.name,
    [ProjectDataId.subType]: project.subType,
    [ProjectDataId.industry]: project.industry,
    [ProjectDataId.owner]: project.owner,
    [ProjectDataId.subDivision]: project.subDivision,
    [ProjectDataId.implementingCompany]: project.implementingCompany,
    [ProjectDataId.sibAddress]: project.sibAddress,
    [ProjectDataId.status]: project.status,
    [ProjectDataId.number]: project.number
  });

  const FormControl: React.FC<FormControlProps> = props => {
    return (
      <GridItem xs={12} sm={12} md={12}>
        <CustomInput
          labelText={props.label}
          id={props.id}
          inputProps={{
            value: values[props.id]
          }}
          formControlProps={{
            fullWidth: true
          }}
        />
      </GridItem>
    );
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={6} md={3}>
        <FormControl label={"Название"} id={ProjectDataId.name} />
        <FormControl label={"Подтип"} id={ProjectDataId.subType} />
        <FormControl label={"Индустрия"} id={ProjectDataId.industry} />
      </GridItem>
      <GridItem xs={12} sm={6} md={6}>
        <FormControl label={"Ответственныц"} id={ProjectDataId.owner} />
        <FormControl
          label={"Подразделение"}
          id={ProjectDataId.subDivision}
        />
        <FormControl
          label={"Реализующая компания"}
          id={ProjectDataId.implementingCompany}
        />
        <FormControl label={"География"} id={ProjectDataId.sibAddress} />
      </GridItem>
      <GridItem xs={12} sm={6} md={3}>
        <FormControl label={"Статус"} id={ProjectDataId.status} />
        <FormControl label={"Номер"} id={ProjectDataId.number} />
      </GridItem>
    </GridContainer>
  );
};
