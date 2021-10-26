import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import { cardTitle, grayColor } from "assets/jss/material-dashboard-pro-react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import Table from "components/Table/Table";
import React from "react";
import { Bar } from "react-chartjs-2";
import { formatDate } from "./Dashboard";
import styles from "assets/scss/chart-colors.module.scss";
import fake from "assets/img/partners/fake-partner.svg";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import DateRange from "@material-ui/icons/DateRange";
import { config } from "services/config";
import { AirplanemodeActiveSharp } from "@material-ui/icons";

require("chartist-plugin-legend");

export const statuses: any = {
  work: "45e89ed8-7798-41b9-877f-e65488326236",
  paused: "ba5c6a77-946d-4e23-af97-e6ebe9295fa1",
  canceled: "f867cfe9-861f-4498-a430-a9f1a70b490d",
  done: "a304db26-0bc6-454f-b390-14361aeeabbf"
};

const chartColors = styles.chartColors.split(" ");

interface Projects {
  total: number;
  work?: number;
  paused?: number;
  canceled?: number;
  done?: number;
}

type ProjectsByQuarter = [number, number, number, number, number];

interface Partner {
  id: string;
  name: string;
  avatarUrl: string;
  color: string;
  projects: Projects;
  projectsByQuarter: ProjectsByQuarter;
}

interface PartnersById {
  [guid: string]: Partner;
}

interface DataMp {
  id: string;
  name: string;
  color: string;
  avatarUrl: string;
  projectsByQuarter: ProjectsByQuarter;
  projects: Projects | any;
}

//----------------------------------------------------------------------------
const useStyles = makeStyles({
  cardTitle: {
    ...cardTitle,
    marginTop: "15px"
  },
  cardBody: {
    position: "relative"
  },
  cardCategory: {
    color: grayColor[0],
    fontSize: "14px",
    paddingTop: "10px",
    marginBottom: 0,
    marginTop: 0,
    margin: 0
  },
  center: {
    textAlign: "center"
  },
  canvas: {
    "& canvas": {
      width: "100% !important",
      maxWidth: "100%",
      height: "auto !important",
      maxHeight: "507px"
    }
  },
  cardIconBlue: {
    backgroundColor: "#3B5998 !important",
    background: "#3B5998 !important",
    width: "80px",
    height: "80px"
  }
});

//----------------------------------------------------------------------------
export const InvestmentProjectsChart: React.FC<any> = props => {
  const classes = useStyles();
  const { data, click } = props;

  //TODO - вынести куда-нибудь потом
  const colors: any = {
    0: {
      color: chartColors[0]
    },
    1: {
      color: chartColors[1]
    },
    2: {
      color: chartColors[2]
    },
    3: {
      color: chartColors[3]
    },
    4: {
      color: chartColors[4]
    },
    5: {
      color: chartColors[5]
    },
    6: {
      color: chartColors[6]
    },
    7: {
      color: chartColors[7]
    },
    8: {
      color: chartColors[8]
    },
    none: {
      color: chartColors[7]
    }
  };

  const nowDate = new Date(),
    lastDate = new Date();
  lastDate.setFullYear(lastDate.getFullYear() - 1);

  const dates: any = {
    now: formatDate(nowDate),
    last: formatDate(lastDate)
  };

  const totalLine: any = {
    total: 0,
    work: 0,
    paused: 0,
    canceled: 0,
    done: 0
  };

  function getAvatar(id: string, dataId: string, name: string) {
    let src = fake;
    if (id && id !== "00000000-0000-0000-0000-000000000000") {
      src = `${config.url.API_URL}/0/img/entity/hash/SysImage/Data/${id}`;
    }

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "0.9em",
          whiteSpace: "nowrap"
        }}
        data-id={dataId}
      >
        <Avatar
          alt={name}
          src={src}
          style={{ margin: "0 10px", height: "36px", width: "36px" }}
        />
        {name}
      </div>
    );
  }

  const getRandomMP = (data: DataMp): Partner => {
    for (let sum in totalLine) {
      totalLine[sum] += data.projects[sum];
    }
    return {
      id: data.id,
      name: data.name,
      color: data.color,
      avatarUrl: data.avatarUrl,
      projects: data.projects,
      projectsByQuarter: data.projectsByQuarter
    };
  };

  const legendCLick = (e: any, legendItem: any): void => {
    //console.log(legendItem);
  };

  const partnersData: PartnersById = {};
  const chartJsData: any = {};
  const chartJsOptions: any = {};

  if (props.data && props.data.length) {
    const nowDate = new Date(),
      label = [],
      nowQuarter = Math.ceil((nowDate.getMonth() + 1) / 3),
      lastYear = new Date(
        nowDate.setFullYear(nowDate.getFullYear() - 1)
      ).getFullYear();

    for (let i = 0, q = nowQuarter, y = lastYear; i < 5; i++, q++) {
      label.push(`${q} кв. ${y}`);

      if (q === 4) {
        q = 0;
        y++;
      }
    }
    chartJsData.labels = label;
    chartJsData.datasets = [];
    chartJsOptions.responsive = true;
    chartJsOptions.maintainAspectRatio = false;
    chartJsOptions.legend = {
      display: true,
      position: "bottom",
      align: "start",
      fullWidth: true,
      onClick: legendCLick,
      labels: {
        usePointStyle: true,
        padding: 15
      }
    };
    chartJsOptions.plugins = {
      datalabels: {
        display: false
      }
    };

    for (let i = 0; i < props.data.length; i += 1) {
      const Quarter: ProjectsByQuarter = [0, 0, 0, 0, 0];
      for (let j = 0; j < 5; j += 1) {
        if (nowQuarter + j <= 4) {
          Quarter[j] = props.data[i].filter(
            (data: any) =>
              data.Quarter === nowQuarter + j && data.QuarterYear === lastYear
          ).length;
        } else {
          Quarter[j] = props.data[i].filter(
            (data: any) =>
              data.Quarter === nowQuarter + j - 4 &&
              data.QuarterYear === lastYear + 1
          ).length;
        }
      }

      const dataset: any = {
        label: props.data[i][0].OrgStructureUnit.Name,
        backgroundColor: colors[i].color,
        borderColor: colors[i].color,
        borderWidth: 1,
        hoverBackgroundColor: colors[i].color,
        hoverBorderColor: colors[i].color,
        data: Quarter
      };

      chartJsData.datasets = chartJsData.datasets.concat(dataset);

      partnersData[
        "guid-" + props.data[i][0].OrgStructureUnit.Id
      ] = getRandomMP({
        id: props.data[i][0].OrgStructureUnit.Id,
        name: props.data[i][0].OrgStructureUnit.Name,
        color: colors[i].color,
        avatarUrl: props.data[i][0].OrgStructureUnit.Head.Contact.Photo.Id,
        projectsByQuarter: Quarter,
        projects: {
          total: props.data[i].length,
          work: props.data[i].filter((data: any) => {
            return data.Status.Id === statuses.work;
          }).length,
          paused: props.data[i].filter((data: any) => {
            return data.Status.Id === statuses.paused;
          }).length,
          canceled: props.data[i].filter((data: any) => {
            return data.Status.Id === statuses.canceled;
          }).length,
          done: props.data[i].filter((data: any) => {
            return data.Status.Id === statuses.done;
          }).length
        }
      });
    }
  }

  const partnersTableDatum = {
    columns: [
      "Управляющий Партнер",
      <div className="text-center nowrap">Всего</div>,
      <div className="text-center nowrap">В работе</div>,
      <div className="text-center nowrap">Пауза</div>,
      <div className="text-center nowrap">Отменен</div>,
      <div className="text-center nowrap">Завершен</div>
    ],
    data: partnersData
  };

  const tableData = Object.values(partnersTableDatum.data).map(p => [
    getAvatar(p.avatarUrl, p.id, p.name),
    <div className={classes.center}>
      <span className="nowrap font-size-small">
        <strong>{p.projects.total}</strong>
      </span>
    </div>,
    <div className={classes.center}>
      <span className="nowrap font-size-small">{p.projects.work || "-"}</span>
    </div>,
    <div className={classes.center}>
      <span className="nowrap font-size-small">{p.projects.paused || "-"}</span>
    </div>,
    <div className={classes.center}>
      <span className="nowrap font-size-small">
        {p.projects.canceled || "-"}
      </span>
    </div>,
    <div className={classes.center}>
      <span className="nowrap font-size-small">{p.projects.done || "-"}</span>
    </div>
  ]);

  return (
    <Card>
      <CardHeader
        color="warning"
        icon
        style={{ display: "flex", alignItems: "center" }}
      >
        <CardIcon color="primary" className={classes.cardIconBlue}>
          <GroupOutlinedIcon />
        </CardIcon>
        <p className={classes.cardCategory}>&nbsp;</p>
        <h3
          className={classes.cardTitle}
          style={{ paddingRight: "16px", textAlign: "left" }}
        >
          Инвестиционные проекты Управляющих Партнеров
        </h3>
      </CardHeader>
      <CardBody style={{}}>
        <GridContainer className={"nowrap-md"}>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            className={"cell-md65"}
          >
            <CardBody style={{ padding: 0 }}>
              <div className="total">
                <Table
                  tableHeaderColor="primary"
                  tableHead={partnersTableDatum.columns}
                  tableFooterColor="primary"
                  tableFooter={[
                    <div className="total-cell total-cell__first">Итого</div>,
                    <div className="total-cell total-cell__center">
                      {totalLine.total}
                    </div>,
                    <div className="total-cell total-cell__center">
                      {totalLine.work}
                    </div>,
                    <div className="total-cell total-cell__center">
                      {totalLine.paused}
                    </div>,
                    <div className="total-cell total-cell__center">
                      {totalLine.canceled}
                    </div>,
                    <div className="total-cell total-cell__center">
                      {totalLine.done}
                    </div>
                  ]}
                  tableData={tableData}
                  colorsColls={["primary"]}
                  rowClick={click}
                  hover={true}
                />
              </div>
            </CardBody>
          </GridItem>
          <GridItem
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            style={{ position: "relative" }}
          >
            <CardBody
              style={{ height: "100%", paddingLeft: 0, paddingRight: 0 }}
              className={classes.canvas}
            >
              <div className="chart-date">
                <DateRange />
                <div className="chart-date__text">
                  {dates.last}-{dates.now}
                </div>
              </div>
              {chartJsData.datasets && chartJsOptions.legend ? (
                <Bar
                  data={chartJsData}
                  options={chartJsOptions}
                  width={600}
                  height={400}
                />
              ) : null}
            </CardBody>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
};
