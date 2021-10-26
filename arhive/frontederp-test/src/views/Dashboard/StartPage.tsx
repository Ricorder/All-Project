import React, { useEffect, useState } from "react";
// material-ui
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles'
// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import DateRange from "@material-ui/icons/DateRange";
import { grayColor, cardHeader } from "assets/jss/material-dashboard-pro-react";
import {Timeline} from "views/Components/Timeline";
import history from "services/history";
import PreLoader from "components/Preloader/Preloader"
import Tooltip from '@material-ui/core/Tooltip';
//service 
import { config, serviceUrl } from "services/config";
import { ODataRequest } from "services/api";
import ApiService from "services/api";


let theme = createMuiTheme();
theme = responsiveFontSizes(theme);
//=============================================================
const boardmapsUrl: string  = "https://boardmaps.sistema.ru/";
const sdUrl: string = "boardmaps://meeting/d8dd326b-29f7-49bf-ba1b-565be4e28aa1";
const strategyUrl: string = "https://boardmaps.sistema.ru/meetings/3baf6708-399d-4e3c-a889-8ea7e1c1f3cd";

type CountProject = {
    Key: string
    Value: string 
}
//! Вынести класс отдельно!! Используется в двух местах
type News = {
  Id: string
  Name: string
  Description: string
  FENewsPublishDate: Date
  NewsType: string
  FilesPath: string[]
}

type ArrayCountProject = Array<CountProject>

//=============================================================

export const formatDate = (date: Date): string => {

    let d: any = date.getDate(),
      m: any = date.getMonth() + 1,
      y: any = date.getFullYear();
  
    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;
  
    return d + '.' + m + '.' + y;
  };
  
//TODO Сделать метод общим
const navigate = (path: string, state?: any) => history.push(path, state);

const useStyles = makeStyles({
  a:{
    color:"#000"
  },
  cardTitle: {
    marginTop: "10",
    marginBottom: "-10px",
    minHeight: "auto",
    fontSize: 30,
    fontWeight: 500,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: "none",
    cursor:"pointer"
    //'&:hover':{
    //  "text-decoration": "underline"
    //}
  },
  cardTitleWithoutLink: {
    marginTop: "10",
    marginBottom: "-10px",
    minHeight: "auto",
    fontSize: 30,
    fontWeight: 500,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textDecoration: "none"
  },
  cardHeader: {
    paddingTop: "35px!important",
    textAlign: "center",
    minHeight: 220,
    transition: "all 300ms cubic-bezier(0.34, 1.61, 0.7, 1)",
  },
  stats: {
    paddingBottom: 6,
    color: grayColor[0],
    fontSize: "12px",
    lineHeight: "22px",
    display: "inline-block",
    marginLeft: "16px",
    "& svg": {
      position: "relative",
      top: "4px",
      width: "20px",
      height: "20px",
      marginRight: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "4px",
      fontSize: "16px",
      marginRight: "3px",
    },
  },
  bodyText: {
    paddingBottom: 0,
  },
  card:{
    "&:hover": {
      "& $cardHeader": {
        transform: "translate3d(0, -8px, 0)"
      }
    }
  }
});

export default function StartPage(props: any) {
  const _apiService = new ApiService();
  const getProjectData : ODataRequest = {
    url: config.url.API_URL + serviceUrl.url.CountProject,
    entityName: "",
  }
  const getNewsData : ODataRequest = {
    url: config.url.API_URL + serviceUrl.url.GetNews,
    entityName: "",
  }

  const [title, setTitle] = useState("Главная страница")
  const [projects, setProjectsInfo] = useState(() => { return {projects:"", workProject: ""}});
  const [loading, setLoadingStatus] = useState(true);
  const [news, setNews] = useState<Array<News>>([]);

  const getData = async() =>{
    try {
      const projData = await _apiService.getService(getProjectData);
      const newsData: Array<News> = await _apiService.getService(getNewsData);
      debugger;
      await setProjectsInfo({projects: projData[0]?.Value, workProject: projData[1]?.Value});
      await setLoadingStatus(false);
      await setNews(newsData);
  } catch (err) {
      console.log(err);
  }
}
  useEffect(() => {
    getData();
},[]);

  props.setTitle(title)
  const classes = useStyles();
  if(loading)
    return <PreLoader></PreLoader>;

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes.card}>
            <CardHeader color="info" className={classes.cardHeader}>
            <Tooltip title="Переход в Аналитику по Банку проектов"><h4 onClick={()=> navigate("/admin/DashboardArchive")} className={classes.cardTitle}>{projects.projects}</h4></Tooltip>
              <span>Проектов в Банке проектов</span>
              <Tooltip title="Переход в Аналитику Pipeline Review">
                <h4 onClick={()=> navigate("/admin/dashboard", {workProject:projects.workProject })} className={classes.cardTitle}>{projects.workProject}</h4>
                </Tooltip>

              <span>Проектов УП в работе</span>
              {/* <h4 className={classes.cardTitle}>449</h4>
              <span>Проектов в архиве</span> */}
            </CardHeader>
            <CardBody className={classes.bodyText}>Банк проектов{console.log(news)}</CardBody>
            <div className={classes.stats}>
              <DateRange />
              обновлено {formatDate(new Date())}
            </div>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes.card}>
            <CardHeader color="warning" className={classes.cardHeader}>
            <Tooltip title="Переход в список активов"><h4 onClick={() => navigate("/admin/companies")} className={classes.cardTitle}>27</h4></Tooltip>
              <span>Активов</span>
              <h4 className={classes.cardTitleWithoutLink}>35</h4>
              <span>Отраслей</span>
              <h4 className={classes.cardTitle}></h4>
              <span></span>
            </CardHeader>
            <CardBody className={classes.bodyText}>Портфель (в разработке)</CardBody>
            <div className={classes.stats}>
              <DateRange />
              обновлено {formatDate(new Date())}
            </div>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes.card}>
            <CardHeader color="danger" className={classes.cardHeader}>
             <Tooltip title="Переход в BoardMaps: Совет директоров"><h4 onClick={()=> window.open(sdUrl)} className={classes.cardTitle}>5 февраля</h4></Tooltip>
              <span>Совет директоров АФК Система</span>
              <Tooltip title="Переход в BoardMaps: Комитет по стратегии"><h4 onClick={()=> window.open(strategyUrl)} className={classes.cardTitle}>24 февраля</h4></Tooltip>
              <span>Комитет по стратегии</span>
              <h4 className={classes.cardTitle}></h4>
              <span></span>
            </CardHeader>
            <CardBody className={classes.bodyText}>Органы управления (
              <a href="https://boardmaps.sistema.ru/" className={classes.a}>BoardMaps</a>)</CardBody>
            <div className={classes.stats}>
              <DateRange />
              обновлено {formatDate(new Date())}
            </div>
          </Card>
        </GridItem>
      </GridContainer>
      <ThemeProvider theme={theme}>
        <Typography variant="h5">Лента новостей</Typography>
      </ThemeProvider>
        <Timeline news={news}/>
    </>
  );
}

