import React, {Component, FunctionComponent, useState, useEffect} from 'react';
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import Card from 'components/Card/Card';
import { RouteComponentProps, withRouter } from "react-router";
import ApiService, { ODataRequest } from 'services/api';
import { CardActionArea } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { boxShadow } from 'assets/jss/material-dashboard-pro-react';
import GridContainer from 'components/Grid/GridContainer';
import history from "services/history";
import { config, serviceUrl } from "services/config";
import PreLoader from "components/Preloader/Preloader"
import { render } from 'react-dom';
import { getAvatarUrl } from 'utils/common';
//===========================================================

type AccountData = {
    Id: string
    AccountLogoId: string
    ShareholderId: string
    Name: string
}

//===========================================================
//TODO Сделать метод общий 
const navigate = (path: string) => history.push(path);

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: 30,
        '& > *': {
          margin: theme.spacing(6),
          width: theme.spacing(30),
          height: theme.spacing(25),
          maxWidth: 345,
          maxHeight: 350
        }
      },
      card:{
        //boxShadow: "10px 10px 10px 10px rgba(0,0,0,0.2), 10px 10px 10px 10px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)",
        boxShadow:  "9px 6px 6px 5px rgba(0, 0, 0, 0.14)",
        transform: "scale(1)", /* you need a scale here to allow it to transition in both directions */
        transition: "0.10s all ease",
        '&:hover':{
          transform: "scale(1.1)",
          //transform: "translate(50px, 100px)",
          //transform: "translate3d(0px, -20px, 0px)",
          boxShadow:  "9px 6px 6px 5px rgba(255, 0, 0, 0.14)"
        }

      },
      media:{
        height:125,
        padding: 10,
        marginTop: 7
      }
  }));



type CompaniesType = {
    title: string,
    paragraph: string
}

export interface CompanyProps<T> extends RouteComponentProps<T> {
    setTitle: (title: string) => void;
  }

const Companies: React.FC<CompanyProps<CompaniesType>> = (props) => {
  const [state, setstate] = useState(true);
  const [loading, setLoadingStatus] = useState(true);
  const classes = useStyles();
  const _apiService = new ApiService;
  const [data, setData] = useState<AccountData[]>([]);


  const getAccountData : ODataRequest = {
    url: config.url.API_URL + serviceUrl.url.GetAcounts,
     entityName: "",
  }


  const getData = async() => 
    {
      try {
        const accountData : Array<AccountData> = await _apiService.getService(getAccountData);
        setData(accountData);
        await setLoadingStatus(false);
    } catch (err) {
        console.log(err);
    }
    }

    useEffect(() => {
      getData();
    },[])

    if(loading)
      return <PreLoader></PreLoader>;

    return (
    <>
    <GridContainer>
    <div className={classes.root}>
    <CompanyCard classes={classes} body="Сегежа"  image={process.env.PUBLIC_URL + "/img/segezha.jpg"} onClick={() => {navigate("/admin/dzk")}}/>
    {data.map((element, index) => (
                        <CompanyCard key={index} classes={classes} body={element.Name} image={getAvatarUrl(element.AccountLogoId)}/>
                    ))}
    </div>
    </GridContainer>
    </>
        )
  }

 function CompanyCard (props:any){
  return (
        <Card className={props.classes.card}>
          <CardActionArea>
            <CardMedia 
            className={props.classes.media}
            image={props.image}
            title={props.title}
            component="img"
            onClick={props.onClick}/>
          </CardActionArea>
          <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.body}
          </Typography>
        </CardContent>
        </Card>
        )
  }

  export default withRouter(Companies)
