import {makeStyles} from "@material-ui/core";
import DateRange from "@material-ui/icons/DateRangeOutlined";
import DvrIcon from "@material-ui/icons/Dvr";
import MonetizationIcon from "@material-ui/icons/MonetizationOnOutlined";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import {cardTitle, grayColor} from "assets/jss/material-dashboard-pro-react";
import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle";
import Card from "components/Card/Card";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, {useCallback} from "react";
import {formatDate} from "./Dashboard";
import { formatNumber } from "utils/numbers";

const useStyles = makeStyles({
    ...hoverCardStyle,
    cardTitle: {
        position: "absolute",
        left: "110px",
        top: "0",
        color: "#000",
        marginTop: "14px",
        fontSize: "24px",
        lineHeight: "28px",
        "@media screen and (max-width: 1279px)": {
            br: {
                display: "none"
            }
        }
    },
    cardSubtitle: {
        ...cardTitle,
        fontSize: "64px",
        marginTop: "0px",
        marginBottom: "0px",
        textAlign: "right",
        lineHeight: 1,
        color: "#000",
        minHeight: "64px",
    },
    cardSubtitleSmall: {
        ...cardTitle,
        fontSize: "50px",
        marginTop: "0px",
        marginBottom: "30px",
        textAlign: "right",
        lineHeight: "59px",
        color: "#000000 !important"
    },
    stats: {
        color: "#ACACAC",
        fontWeight: 300,
        fontSize: "14px",
        lineHeight: "16px",
        "& svg": {
            width: "20px",
            height: "20px",
            marginRight: "3px",
            fill: "#ACACAC",
        },
        "& .fab,& .fas,& .far,& .fal,& .material-icons": {
            position: "relative",
            top: "4px",
            fontSize: "16px",
            marginRight: "3px",
            color: "#ACACAC",
        }
    },
    fullHeight: {
        height: "calc(100% - 45px)",
        cursor: "pointer"
    },
    iconCustomOrange: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "30px !important",
        marginTop: "-26px !important",
        width: "80px",
        height: "80px",
        backgroundColor: "#EF983A !important",
        background: "#EF983A !important",
        "& svg": {
            margin: "10px !important"
        }
    },
    iconCustomGreen: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "30px !important",
        marginTop: "-26px !important",
        width: "80px",
        height: "80px",
        backgroundColor: "#65A45B !important",
        background: "#65A45B !important",
        "& svg": {
            margin: "10px !important"
        }
    },
    iconCustomRose: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: "30px !important",
        marginTop: "-26px !important",
        width: "80px",
        height: "80px",
        backgroundColor: "#E91E63 !important",
        background: "#E91E63 !important",
        "& svg": {
            margin: "10px !important"
        }
    },
    cardBody: {
        flex: "1 1 auto",
        padding: "0 40px",
    },
    cardProjectName: {
        color: "#555",
        textAlign: "right",
        fontSize: "20px",
        fontWeight: 300,
        marginBottom: "0"
    },
    cardBank: {
        height: "calc(50% - 47.5px)",
        marginBottom: "50px",
        cursor: "pointer"
    },
    cardProject: {
        height: "calc(50% - 47.5px)",
        cursor: "pointer"
    },
    cursor: {
        cursor: "pointer"
    }
});

interface InfoBlockProps {
    color: "warning" | "success" | "danger" | "info" | "primary" | "rose";
    icon: JSX.Element;
    title: string;
    subtitle: string;
}

export const InfoBlocks: React.FC<any> = (props) => {
    const classes = useStyles();

    const {
        all,
        active,
        work,
        summ,
        clickAll,
        clickWork,
        clickActive,
        allProjects,
        lastActiveProjects,
        activeProjects
    } = props;

    const summInvest = summ ? summ[0].Value : 0;
    const summInvestAfk = summ ? summ[1].Value : 0;
    const summCountProject = summ ? summ[2].Value : 0;

    const allProjectsClick = () => {
        props.clickAll('')
    };


    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12} lg={6} xl={6}>
                <Card className={classes.cardBank} click={allProjectsClick}>
                    <CardHeader stats icon>
                        <CardIcon color="warning" className={classes.iconCustomOrange}>
                            <DvrIcon/>
                        </CardIcon>
                        <h3 className={classes.cardTitle} style={{paddingRight: "16px", textAlign: "left", marginTop: "14px"}}>{props.allProjects}</h3>
                    </CardHeader>
                    <div className={classes.cardBody}>
                        <h3 className={classes.cardSubtitle}>{props.all}</h3>
                    </div>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <DateRange />
                            на {formatDate(new Date())}
                        </div>
                    </CardFooter>
                </Card>
                <Card className={classes.cardProject}  click={props.clickActive}>
                    <CardHeader stats icon>
                        <CardIcon color="success" className={classes.iconCustomGreen}>
                            <OndemandVideoIcon/>
                        </CardIcon>
                        <h3 className={classes.cardTitle} style={{paddingRight: "16px", textAlign: "left", marginTop: "14px"}}>{props.lastActiveProjects}</h3>
                    </CardHeader>
                    <div className={classes.cardBody}>
                        <h3 className={classes.cardSubtitle}>{props.active}</h3>
                    </div>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <DateRange />
                            {formatDate(new Date(new Date().setFullYear((new Date().getFullYear() - 1))))} - {formatDate(new Date())}
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} lg={6} xl={6}>
                <Card className={classes.fullHeight} click={props.clickWork}>
                    <CardHeader stats icon>
                        <CardIcon color="rose" className={classes.iconCustomRose}>
                            <MonetizationIcon/>
                        </CardIcon>
                        <h3 className={classes.cardTitle} style={{paddingRight: "16px", textAlign: "left", marginTop: "14px"}}>{props.activeProjects}</h3>
                    </CardHeader>
                    <div className={classes.cardBody}>
                        <h3 className={classes.cardSubtitle} style={{marginBottom: "30px"}}>{summCountProject}</h3>
                        <div className={classes.cardProjectName}>Всего инвестиций по проектам в работе, млн руб.</div>
                        <h3 className={classes.cardSubtitleSmall}>{formatNumber(summInvest, true)}</h3>
                        <div className={classes.cardProjectName}>Инвестиции АФК по проектам в работе, млн руб.</div>
                        <h3 className={classes.cardSubtitleSmall} style={{marginBottom: "0"}}>{formatNumber(summInvestAfk, true)}</h3>
                    </div>
                    <CardFooter stats>
                        <div className={classes.stats}>
                            <DateRange />
                            на {formatDate(new Date())}
                        </div>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    );

};
