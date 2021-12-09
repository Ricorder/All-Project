import { makeStyles } from "@material-ui/core";
import DateRange from "@material-ui/icons/DateRange";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { Button } from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Table from "components/Table/Table";
import React, { useCallback } from "react";
import Divider from '@material-ui/core/Divider';
import { grayColor, cardTitle } from "assets/jss/material-dashboard-pro-react";

const useStyles = makeStyles({
  cardCategory: {
    margin: "0",
    color: grayColor[0]
  },
  cardTitle: {
    ...cardTitle,
    fontSize: "1.15em"
  },
  stats: {
    color: grayColor[0],
    fontSize: "12px",
    lineHeight: "22px",
    display: "inline-flex",
    "& svg": {
      position: "relative",
      top: "4px",
      width: "16px",
      height: "16px",
      marginRight: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "4px",
      fontSize: "16px",
      marginRight: "3px"
    }
  },
  metricValue: {
    textAlign: "center",
    margin: 0,
    fontWeight: 500
  },
  metricName: {
    textAlign: "center"
  },

  tableHeader: {
    display: "flex",
    alignItems: "center"
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    margin: 0
  },
  agendaButton: {
    textTransform: "uppercase"
  }
});

const Pipeline3: React.FC = () => {
  const classes = useStyles();

  const renderMetric = useCallback(
    (name: string, value: string) => {
      return <>
        <h3 className={classes.metricValue}>{value}</h3>
        <p className={classes.metricName}>{name}</p>
      </>;
    },
    [classes],
  )

  const renderBody = useCallback(
    (text: string) => {
      return <>
        <h5 className={classes.cardTitle}>{text}</h5>
        <div className={classes.stats}>
          <DateRange /> 01.01.2019 - 30.09.2019
        </div>
      </>
    },
    [classes],
  )

  return (
    <>
      <GridContainer>
        <GridItem  xs={12} sm={6} md={6} lg={4}>
          <Card chart>
            <CardHeader color="rose">
              {renderMetric("Проведено заседаний", "12")}
              {renderMetric("Рассмотренно вопросов по инвест. деятельности", "15")}
              {renderMetric("Процент одобрения", "40%")}
            </CardHeader>
            <CardBody>
              {renderBody("Экспертный совет при КФИ")}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem  xs={12} sm={6} md={6} lg={4}>
          <Card chart>
            <CardHeader color="warning">
              {renderMetric("Проведено заседаний", "32")}
              {renderMetric("Рассмотренно вопросов по инвест. деятельности", "55")}
              {renderMetric("Процент одобрения", "84%")}
            </CardHeader>
            <CardBody>
              {renderBody("Комитет по финансам и инвестициям")}
            </CardBody>
          </Card>
        </GridItem>
        <GridItem  xs={12} sm={6} md={6} lg={4}>
          <Card chart>
            <CardHeader color="info">
              {renderMetric("Проведено заседаний", "12")}
              {renderMetric("Рассмотренно вопросов по инвест. деятельности", "2")}
              {renderMetric("Процент одобрения", "100%")}
            </CardHeader>
            <CardBody>
              {renderBody("Совет директоров ПАО АФК “Система”")}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <Card>
        <CardHeader className={classes.tableHeader}>
          <Button color="primary" round className={classes.agendaButton}>
            Agenda
          </Button>
          <h3 className={classes.headerText}>01/12/2019 - 31/12/2019</h3>
        </CardHeader>
        <Divider/>
        <CardBody>
          <Table
            tableHeaderColor="primary"
            tableHead={["Дата", "Заседание коллегиального органа"]}
            tableData={[
              //["4 октября", "Экспертный совет"],
              //["8 октября", "Экспертный совет"],
              //["12 октября", "Совет директоров ПАО АФК \"Система\""],
              //["16 ноября", "Совет директоров ПАО АФК \"Система\""],
              ["21 декабря", "Совет директоров ПАО АФК \"Система\""],
            ]}
          />
        </CardBody>
      </Card>
    </>
  );
};

export default Pipeline3;
