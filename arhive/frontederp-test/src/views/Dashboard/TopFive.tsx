import {makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import DvrIcon from "@material-ui/icons/Dvr";
import {cardTitle, grayColor} from "assets/jss/material-dashboard-pro-react";
import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Table from "components/Table/Table";
import React, {useCallback} from "react";
import {formatDate} from "./Dashboard";
import {formatNumber} from "utils/numbers";
import { config } from 'services/config';

import fake from "assets/img/partners/fake-partner.svg";

const useStyles = makeStyles({
    ...hoverCardStyle,
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
    cardSubtitle: {
        ...cardTitle,
        fontSize: "3.75em",
        marginTop: "0px",
        marginBottom: "3px"
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
    tableResponsive: {
        overflow: "hidden",
        "table-layout":"fixed"
    },
    spanBlock:{
        minWidth: 80,
    }
});

interface TopFiveProps {
    color: "warning" | "success" | "danger" | "info" | "primary" | "rose";
    icon: JSX.Element;
    title: string;
    data: any;
}

export const TopFive: React.FC<any> = (props) => {
    const classes = useStyles();
    const topProps: TopFiveProps[] = [
        {
            title: "ТОП-5",
            icon: <DvrIcon/>,
            color: "warning",
            data: null
        },
        {
            title: "ТОП-5",
            icon: <DvrIcon/>,
            color: "rose",
            data: null
        }
    ];

    const statuses: any = {
        "45e89ed8-7798-41b9-877f-e65488326236": "В работе",
        "ba5c6a77-946d-4e23-af97-e6ebe9295fa1": "Приостановлено",
        "f867cfe9-861f-4498-a430-a9f1a70b490d": "Отменен",
        "a304db26-0bc6-454f-b390-14361aeeabbf": "Завершен"
    };

    const {
        data,
        click
    } = props;

    function getAvatar(id: string) {
        let src = fake;
        if (id && id !== '00000000-0000-0000-0000-000000000000') {
            src = `${config.url.API_URL}/0/img/entity/hash/SysImage/Data/${id}`;
        }

        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: '0.9em'}}>
                <Avatar src={src} style={{height: "32px", width: "32px"}} />
            </div>
        );
    }
    console.log("Data:", props.data);
    if (props.data && props.data.length) {
        for (let i = 0; i < props.data.length; i += 1) {
            debugger;
            if (topProps[i]) {
                topProps[i].title = props.data[i].title;
                topProps[i].data = props.data[i];
                topProps[i].data.tableData = props.data[i].table.map((p: any) => [
                    getAvatar(p.OrgStructureUnit.Head.Contact.Photo.Id),
                    <span data-id={p.Id}>{p.Name}</span>,
                    <div className="text-center">{ props.data[i].date ? formatDate(new Date(p.Date || p.CreatedOn)) : formatNumber(p.InvestmentsVolume, true) }</div>,
                    <div className="text-center">{topProps[i].title === "ТОП-5 Новых проектов УП" ? p.Industry.IndustryLevel1.Name : formatNumber(p.InvestmentsAFKPart)}</div>,
                    <span>{topProps[i].title === "ТОП-5 Новых проектов УП" ? [p.SibAddress.Country.Name, p.SibAddress.Region.Name].filter(x => x !== "").join(', ') : p.Status.Name}</span>
                ]);
            }
            // if (!props.data[i].photo) {
            //     props.data[i].header.reverse();
            //     props.data[i].header.length = 5; 
            //     props.data[i].header.reverse();
            //     topProps[i].data.tableData = topProps[i].data.tableData.map((p: any) => p.slice(1))
            // }
        }
    }
 
    const renderTop = useCallback((props: TopFiveProps) => {
        return (
            <Card className="card__fluid">
                <CardHeader icon>
                    <CardIcon color={props.color}>
                        {props.icon}
                    </CardIcon>
                    <h3 className={classes.cardTitle} style={{
                        paddingRight: "16px",
                        textAlign: "left",
                    }}>{props.title}</h3>
                </CardHeader>
                <CardBody style={{display: "flex"}}>
                    { props.data.tableData.length ? <Table style={{tableLayout: "fixed"}}
                        
                        tableHeaderColor="primary"
                        tableHead={props.data.header}
                        tableData={props.data.tableData}
                        colorsColls={["primary"]}
                        rowClick={click}
                        hover={true}
                    /> : <div>Нет проектов</div>
                    }
                </CardBody>
            </Card>
        );
    }, []);

    return (
        <GridContainer>
            { topProps[0].data ? topProps.map(props => (<GridItem key={props.title} xs={12} sm={12} md={12} lg={6} xl={6}>{renderTop(props)}</GridItem>)) : null }
        </GridContainer>
    );
};
