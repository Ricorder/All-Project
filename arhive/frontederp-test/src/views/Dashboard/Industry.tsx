import { makeStyles, SvgIcon } from "@material-ui/core";
import { cardTitle, grayColor } from "assets/jss/material-dashboard-pro-react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import React, { useCallback } from "react";
import styles from "assets/scss/chart-colors.module.scss";
import { formatDate } from "./Dashboard";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Build from "@material-ui/icons/Build";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Laptop from "@material-ui/icons/Laptop";
import Landscape from "@material-ui/icons/Landscape";
import DialerSip from "@material-ui/icons/DialerSip";
import fireplace from "assets/img/industry/fireplace.svg"
import ambulance from "assets/img/industry/ambulance.svg"
import HotelBell from "assets/img/industry/hotel-bell.svg"
import Antenna from "@material-ui/icons/SettingsInputAntenna";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
require("chartist-plugin-legend");

const circleColors = styles.chartColors.split(" ");

//----------------------------------------------------------------------------
const useStyles = makeStyles({
    cardTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "11px"
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


//Method for img url component
const getImage = (path: string, classeName?: string) => 
(<div className={classeName} style={{ backgroundImage: "url('" + path + "')" }}></div>);


// Legasy shit must be terminated
export const industryGuids: any = {
    "e9fd522d-125d-415c-95d3-f7e58f75860d": {
        name: "Здравоохранение",
        img: <div className={"industry-block-wrapper-circle-img"} style={{ backgroundImage: "url('" + ambulance + "')" }}></div>,
        color: circleColors[0]
    },
    "a150f968-593d-4748-a7a7-6a240383ed90": {
        name: "Инновационные технологии и ИТ",
        img: <Laptop />,
        color: circleColors[3]
    },
    "ce9b7a16-20e1-455a-8d74-09d9dbb0301e": {
        name: "Потребительские товары",
        img: <ShoppingCart />,
        color: circleColors[4]
    },
    "dbd0f8f1-bbc8-4af8-912a-31ada4b69d3a": {
        name: "Потребительские услуги",
        img: <div className={"industry-block-wrapper-circle-img"} style={{ backgroundImage: "url('" + HotelBell + "')" }}></div>,
        color: circleColors[13]
    },
    "29273947-0c76-4af1-bfb6-af07f25e9350": {
        name: "Промышленные предприятия",
        img: <Build />,
        color: circleColors[2]
    },
    "0154203c-7a89-48d4-bdec-270c002ca497": {
        name: "Сырье и материалы",
        img: <Landscape />,
        color: circleColors[5]
    },
    "c73f94bb-0de8-46b9-a1e4-eebfcaef6c14": {
        name: "Финансовые инструменты и инвестиции",
        img: <AccountBalance />,
        color: circleColors[1]
    },
    "dc8a7161-63ac-4bd1-93bb-6055cdb8540c": {
        name: "Нефтегазовая промышленность",
        img: <div className={"industry-block-wrapper-circle-img"} style={{ backgroundImage: "url('" + fireplace + "')" }}></div>,
        color: circleColors[10]
    },
    "c6276ebe-7005-40ca-a52c-7915d82817ea": {
        name: "Телекоммуникации и связь",
        img: <DialerSip />,
        color: circleColors[14]
    },
    "1f014bd0-0c8a-45b2-ad1c-8a4e92705437": {
        name: "Энергетика и коммунальные услуги",
        img: <Antenna />,
        color: circleColors[12]
    }
};


//----------------------------------------------------------------------------
export const Industry: React.FC<any> = (props: any) => {
    const classes = useStyles();
    const {
        data,
        click
    } = props;

    if (props.data && props.data.length) {
        const total = props.data.reduce((sum: number, current: any) => sum + current.count, 0);
        console.log(props.data);
        for (let i = 0; i < props.data.length; i += 1) {
            props.data[i].img = getImage(process.env.PUBLIC_URL +"/img/industry" + props.data[i].imgPath, "industry-block-wrapper-circle-img");
            props.data[i].percent = Math.round(props.data[i].count * 100 / total);
        }
    }

    const renderCircle = useCallback((props: any) => {

        return (
            <>
                <div className={"industry-block-wrapper"} data-id={props.id}>
                    <div className={"industry-block-wrapper-circle"} style={{ backgroundColor: props.color, width: (Math.round(props.percent / 1.3) + 'vw').toString(), height: (Math.round(props.percent / 1.3) + 'vw').toString() }}>
                        {/*<div className={"industry-block-wrapper-circle-img"} style={{ backgroundImage: "url('" + props.img + "')" }}></div>*/}
                        {props.img}
                    </div>
                </div>
                <div className={"industry-block-percent " + "industry-block-percent-large_" + (props.percent >= 20)}>{props.percent}%</div>
                <div className={"industry-block-name"}>{props.name}</div>
            </>
        );
    }, []);

    return (
        <GridContainer>
            <GridItem>
                <Card>
                    <CardHeader color="success" icon style={{ display: "flex", alignItems: "center" }}>
                        <CardIcon color="primary">
                            <AccountBalance />
                        </CardIcon>
                        <p className={classes.cardCategory}>&nbsp;</p>
                        <h3 className={classes.cardTitle} style={{ paddingRight: "16px", textAlign: "left" }}>Распределение проектов по индустриям (по количеству проектов)</h3>
                    </CardHeader>
                    <CardBody className={"industry"}>
                        {props.data ? <CardBody className={"industry-wrapper"}>{props.data.map((props: any) => (<div className={"industry-block"} key={props.name} onClick={click}>{renderCircle(props)}</div>))}</CardBody> : null}
                        <span className={"industry-text"} style={{ fontStyle: "italic" }}>По количеству инвестиционных проектов за период {formatDate(new Date(new Date().setFullYear((new Date().getFullYear() - 1))))} - {formatDate(new Date())}</span>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
};
