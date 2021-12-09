import { makeStyles } from "@material-ui/core";
import "./InfoCards.scss";
import DateRange from "@material-ui/icons/DateRange";
import DvrIcon from "@material-ui/icons/Dvr";
import MonetizationIcon from "@material-ui/icons/MonetizationOnOutlined";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import { cardTitle, grayColor } from "assets/jss/material-dashboard-pro-react";
import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle";
import Card from "components/Card/Card";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useCallback } from "react";
import { formatDate} from "./Dashboard";
import { formatNumber } from "utils/numbers";

const useStyles = makeStyles({
  ...hoverCardStyle,
  card: {
    cursor: "pointer",
  },
  cardTitle: {
    color: grayColor[0],
    fontSize: "14px",
    paddingTop: "10px",
    marginTop: "0",
    margin: "0"
  },
  cardHeader: {
    overflow: "hidden"
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
  }
});

interface InfoCardProps {
  color: "warning" | "success" | "danger" | "info" | "primary" | "rose";
  icon: JSX.Element;
  title: string;
  subtitle: string;
  click: any;
  summ: boolean;
  date: string;
}

export const InfoCards: React.FC<any> = (props) => {
  const classes = useStyles();
  const cardProps: InfoCardProps[] = [
    {
      title: "Всего проектов",
      subtitle: "0",
      icon: <DvrIcon />,
      color: "warning",
      click: false,
      summ: false,
      date: "не определено"
    },
    {
      title: "Проектов в работе",
      subtitle: "0",
      icon: <OndemandVideoIcon />,
      color: "success",
      click: true,
      summ: false,
      date: "не определено"
    },
    {
      title: "Объем инвестиций, млн руб",
      subtitle: "0",
      icon: <MonetizationIcon />,
      color: "rose",
      click: null,
      summ: true,
      date: "не определено"
    }
  ];

  const {
      data,
      click,
      date
  } = props;

  const cardClick = (e: any) => {
    if (e.currentTarget.querySelector('[data-click]')) {
      props.click(e.currentTarget.querySelector('[data-click]').dataset.click);
    }
  };

  if (props.data) {
    for (let i = 0; i < props.data.length; i += 1) {
      cardProps[i].title = props.data[i].title;
      cardProps[i].subtitle = props.data[i].subtitle;
      cardProps[i].date = props.data[i].date;
      if (props.data[i].click) {
        cardProps[i].click = props.data[i].click;
      }
    }
  }

  const renderCard = useCallback((props: InfoCardProps) => {

    return (
        <Card className={props.click === null ? null : classes.card} click={cardClick}>
          <CardHeader stats icon>
            <CardIcon color={props.color}>
              {props.icon}
            </CardIcon>
            <p className={classes.cardTitle} data-click={props.click}>{props.title}</p>
            <div className="cardSubtitle">
              <h3>{props.summ ? formatNumber(props.subtitle, true) : formatNumber(props.subtitle)}</h3>
            </div>
          </CardHeader>
          <CardFooter stats>
            <div className={classes.stats}>
              <DateRange />
              {props.date}
            </div>
          </CardFooter>
        </Card>
    );
  }, []);

  return (
      <GridContainer>
        {cardProps.map(props => (<GridItem key={props.title} xs={12} sm={6} md={6} lg={4}>{renderCard(props)}</GridItem>))}
      </GridContainer>
  );
};
