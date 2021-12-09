import { makeStyles } from "@material-ui/core";
import { cardTitle, grayColor } from "assets/jss/material-dashboard-pro-react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import React, { useCallback } from "react";
import {Bar, Doughnut} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-waterfall';
import { formatDate, formatDay } from "./Dashboard";
import { industryGuids } from "./Industry";
import { statuses } from "./InvestmentProjectsChart";
import ApiService, { ODataRequest } from "../../services/api";
import GridContainer from "components/Grid/GridContainer"
import GridItem from "components/Grid/GridItem"
import DvrIcon from "@material-ui/icons/Dvr";
require("chartist-plugin-legend");

//----------------------------------------------------------------------------
const useStyles = makeStyles({
    cardTitle: {
        ...cardTitle,
        marginTop: "15px",
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
    }
});

//----------------------------------------------------------------------------
export const Statuses: React.FC<any> = (props: any) => {
    const _apiService = new ApiService();
    const classes = useStyles();
    const {
        data,
        projectsLength,
        industry,
        oldProjects,
        click
    } = props;

    const waterfallData: any = [0];

    const chartJsData: any = {
        labels: [],
        datasets: [{
            data: [
                0,
                [0,0],
                [0,0],
                [0,0],
                [0,0],
                0
            ],
            backgroundColor: [
                '#3B5998',
                '#EF983A',
                '#999999',
                '#35A0B8',
                '#65A45B',
                '#3B5998'
            ]
        }]
    };

    const doughnutData: any = {
        labels: [],
        datasets: [{
            label: '',
            borderWidth: 0,
            backgroundColor: [],
            data: []
        }]
    };

    const doughnutHover = (event: any, chartElement: any): void => {
        event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    };

    const doughnutClick = (e: any): void => {
        if (e[0]) {
            props.click(props.industry[e[0]['_index']].id);
        }
    };

    if (props.data && props.data.length && props.oldProjects) {
        for (let i = 0; i < props.industry.length; i += 1) {
            doughnutData.labels.push(props.industry[i].name);
            doughnutData.datasets[0].backgroundColor.push(props.industry[i].color);
            doughnutData.datasets[0].data.push(props.industry[i].count);
        }
        console.log("DataDough:", doughnutData)
        chartJsData.labels = [
            "В работе на " + formatDate(new Date(new Date().setFullYear((new Date().getFullYear() - 1)))),
            "Новые проекты", "Приостановлено", "Отменено", "Выполнено",
            "В работе на " + formatDate(new Date())
        ];

        if (props.oldProjects.length) {
            for (let i = 0; i < props.oldProjects.length; i += 1) {
                if (props.oldProjects[i].Status.Id === statuses.work) {
                    waterfallData[0] += 1;
                } else if (props.oldProjects[i].PausedDate !== '0001-01-01T00:00:00' && new Date(props.oldProjects[i].PausedDate) < new Date() && new Date(props.oldProjects[i].PausedDate) > new Date(new Date().setFullYear((new Date().getFullYear() - 1)))) {
                    waterfallData[0] += 1;
                } else if (props.oldProjects[i].CanceledDate !== '0001-01-01T00:00:00' && new Date(props.oldProjects[i].CanceledDate) < new Date() && new Date(props.oldProjects[i].CanceledDate) > new Date(new Date().setFullYear((new Date().getFullYear() - 1)))) {
                    waterfallData[0] += 1;
                } else if (props.oldProjects[i].ProjectFactEndDate !== '0001-01-01T00:00:00' && new Date(props.oldProjects[i].ProjectFactEndDate) < new Date() && new Date(props.oldProjects[i].ProjectFactEndDate) > new Date(new Date().setFullYear((new Date().getFullYear() - 1)))) {
                    waterfallData[0] += 1;
                }
            }

            waterfallData[1] = [waterfallData[0], props.projectsLength[0].subtitle];
            //console.log("OnDate:", waterfallData[0], props.projectsLength[0].subtitle, props.oldProjects.length);
            waterfallData[2] = [waterfallData[1][1], waterfallData[1][1] - props.data[0].filter((p: any) => p.PausedDate !== '0001-01-01T00:00:00').length];
            //console.log("Pause:", props.data[0].filter((p: any) => p.PausedDate !== '0001-01-01T00:00:00').length);
            waterfallData[3] = [waterfallData[2][1], waterfallData[2][1] - props.data[0].filter((p: any) => p.CanceledDate !== '0001-01-01T00:00:00').length];
            //console.log("Cancel:", props.data[0].filter((p: any) => p.CanceledDate !== '0001-01-01T00:00:00').length);
            waterfallData[4] = [waterfallData[3][1], waterfallData[3][1] - props.data[0].filter((p: any) => p.ProjectFactEndDate !== '0001-01-01T00:00:00').length];
            //console.log("End:", props.data[0].filter((p: any) => p.ProjectFactEndDate !== '0001-01-01T00:00:00').length);
            waterfallData[5] = props.data[0].filter((p: any) => p.Status.Id === statuses.work).length;

            chartJsData.datasets[0].data = waterfallData;
        }
    }

    return (
        <Card>
            <CardHeader color="success" icon style={{display: "flex", alignItems: "center"}}>
                <CardIcon color="info">
                    <DvrIcon />
                </CardIcon>
                <p className={classes.cardCategory}>&nbsp;</p>
                <h3 className={classes.cardTitle} style={{width: "100%", paddingRight: "66px", textAlign: "left", display: "flex", justifyContent: "space-between"}}>
                    <span>Изменение проектов в работе</span>
                </h3>
            </CardHeader>
            <CardBody className={"statuses"}>
                <GridContainer>
                    <GridItem xl={7} lg={7} md={7} sm={12} xs={12}>
                        <Bar
                            data={chartJsData}
                            height={360}
                            options={{
                                maintainAspectRatio: false,
                                title: {
                                    display: false
                                },
                                legend: {
                                    display: false
                                },
                                tooltips: {
                                    enabled: false
                                },
                                plugins: {
                                    datalabels: {
                                        display: false
                                    }
                                },
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                                stepSize: 1
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </GridItem>
                    <GridItem xl={5} lg={5} md={5} sm={12} xs={12} style={{position: "relative"}}>
                        <h3 className="chart-header">Индустрии</h3>
                        <Doughnut
                            onElementsClick={doughnutClick}
                            data={doughnutData}
                            width={360}
                            height={360}
                            options={{
                                maintainAspectRatio: false,
                                title: {
                                    display: false
                                },
                                legend: {
                                    display: false,
                                    position: "bottom"
                                },
                                cutoutPercentage: 70,
                                tooltips: {
                                    enabled: true
                                },
                                plugins: {
                                    datalabels: {
                                        color: '#ffffff'
                                    }
                                },
                                hover: {
                                    onHover: doughnutHover
                                }
                            }}/>
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );
};
