import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// material-ui icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Table from "components/Table/Table";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";

import { cardTitle } from "assets/jss/material-dashboard-pro-react";

const styles = {
  customCardContentClass: {
    paddingLeft: "0",
    paddingRight: "0"
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles as any);

const getRndSalary = (): string => {
    const salary = Math.floor(40000 + Math.random() * 50000);
    return `$ ${Math.floor(salary / 1000)},${salary % 1000}`;
}

export function Meetings() {
  const classes = useStyles();

  const title = "Заседания";
  const columns = ["Name", "Country", "City", "Salary"];
  const data = [
    ["Dakota Rice", "Niger", "Oud-Turnhout", getRndSalary()],
    ["Minerva Hooper", "Curaçao", "Sinaai-Waas", getRndSalary()],
    ["Sage Rodriguez", "Netherlands", "Baileux", getRndSalary()],
    ["Philip Chaney", "Korea, South", "Overland Park", getRndSalary()],
    ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", getRndSalary()],
    ["Mason Porter", "Chile", "Gloucester", getRndSalary()]
  ];

  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>{title}</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={columns}
              tableData={data}
              coloredColls={[3]}
              colorsColls={["primary"]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
