import {makeStyles, Tab, Tabs} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {cardTitle, grayColor} from "assets/jss/material-dashboard-pro-react";
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import Table from "components/Table/Table";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import TabPanel from "components/TabPanel/TabPanel";
import React, {useState, DOMElement} from "react";
import styles from "assets/scss/chart-colors.module.scss";
import {VectorMap} from "react-jvectormap";
import {MapTranslator} from "views/Maps/MapTranslator";

import LanguageIcon from "@material-ui/icons/Language";
//----Countries
import hungary from "assets/img/flags-vector/hungary.svg"
import russia from "assets/img/flags-vector/russia.svg"
import usa from "assets/img/flags-vector/usa.svg"
import india from "assets/img/flags-vector/india.svg"
import armenia from "assets/img/flags-vector/armenia.svg"
import austria from "assets/img/flags-vector/austria.svg"
import czech from "assets/img/flags-vector/czech.svg"
import china from "assets/img/flags-vector/china.svg"
import botswana from "assets/img/flags-vector/botswana.svg"
import ukraine from "assets/img/flags-vector/ukraine.svg"
import greece from "assets/img/flags-vector/greece.svg"
import germany from "assets/img/flags-vector/germany.svg"
import kazakhstan from "assets/img/flags-vector/kazakhstan.svg"
import italy from "assets/img/flags-vector/italy.svg"
import moldova from "assets/img/flags-vector/moldova.svg"
import france from "assets/img/flags-vector/france.svg"
import philippines from "assets/img/flags-vector/philippines.svg"
import cyprus from "assets/img/flags-vector/cyprus.svg"
import singapore from "assets/img/flags-vector/singapore.svg"
import unitedKindom from "assets/img/flags-vector/united-kingdom.svg";
import iran from "assets/img/flags-vector/iran.svg";
import indonesia from "assets/img/flags-vector/indonesia.svg";
import lithuania from "assets/img/flags-vector/lithuania.svg";
import belarus from "assets/img/flags-vector/belarus.svg";
import egypt from "assets/img/flags-vector/egypt.svg";
import finland from "assets/img/flags-vector/finland.svg";
import latvia from "assets/img/flags-vector/latvia.svg";
import crotia from "assets/img/flags-vector/croatia.svg"
import bulgaria from "assets/img/flags-vector/bulgaria.svg";
import israel from "assets/img/flags-vector/israel.svg"
import georgia from "assets/img/flags-vector/georgia.svg"
import kuwait from "assets/img/flags-vector/kuwait.svg"
import grenada from "assets/img/flags-vector/grenada.svg"

import { ru } from "date-fns/locale";
//

require("chartist-plugin-legend");

const chartColors = styles.chartColors.split(" ");

//----------------------------------------------------------------------------
const useStyles = makeStyles({
    cardTitle: {
        ...cardTitle,
        marginTop: "15px"
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

export const countries: any = {
    RUS: {
        code: "RU",
        flag: russia,
        name: "Россия"
    },
    AUT: {
        code: "AT",
        flag: austria,
        name: "Австрия"
    },
    USA: {
        code: "US",
        flag: usa,
        name: "США"
    },
    IND: {
        code: "IN",
        flag: india,
        name: "Индия"
    },
    ARM: {
        code: "AM",
        flag: armenia,
        name: "Армения"
    },
    CZE: {
        code: "CZ",
        flag: czech,
        name: "Чехия"
    },
    CHN: {
        code: "CN",
        flag: china,
        name: "Китай"
    },
    UKR: {
        code: "UA",
        flag: ukraine, 
        name: "Украина"
    },
    GRC: {
        code: "GR",
        flag: greece, 
        name: "Греция"
    },
    DEU: {
        code: "DE",
        flag: germany, 
        name: "Германия"
    },
    KAZ: {
        code: "KZ",
        flag: kazakhstan, 
        name: "Казахстан"
    },
    ITA: {
        code: "IT",
        flag: italy, 
        name: "Италия"
    },
    MDA: {
        code: "MD",
        flag: moldova, 
        name: "Молдова"
    },
    FRA: {
        code: "FR",
        flag: france, 
        name: "Франция"
    },
    PHL: {
        code: "PH",
        flag: philippines, 
        name: "Филиппины"
    },
    CYP: {
        code: "CY",
        flag: cyprus, 
        name: "Кипр"
    },
    SGP: {
        code: "SG",
        flag: singapore,
        name: "Сингапур"
    },
    GBR:{
        code: "GB",
        flag: unitedKindom,
        name: "Великобритания"
    },
    IRN:{
        code:"IR",
        flag: iran,
        name: "Иран"
    },
    HUN: {
        code:"HU",
        flag: hungary,
        name: "Венгрия"
    },
    IDN: {
        code:"ID",
        flag: indonesia,
        name: "Индонезия"
    },
    LTU: {
        code:"LT",
        flag: lithuania,
        name: "Литва"
    },
    BLR: {
        code:"BY",
        flag: belarus,
        name: "Беларусь"
    },
    EGY: {
        code: "EG",
        flag: egypt,
        name: "Египет"
    },
    FIN: {
        code: "FI",
        flag: finland,
        name: "Финляндия"
    },
    LVA: {
        code: "LV",
        flag: latvia,
        name: "Латвия"
    },
    HRV: {
        code: "HR",
        flag: crotia,
        name: "Хорватия"
    },
    BGR: {
        code: "BG",
        flag: bulgaria,
        name: "Болгария"
    },
    ISR: {
        code: "IL",
        flag: israel,
        name: "Израиль"
    },
    GEO: {
        code: "GE",
        flag: georgia,
        name: "Грузия"
    },
    KWT:{
        code: "KW",
        flag: kuwait,
        name: "Кувейт"
    },
    GRD: {
        code: "",
        flag: grenada,
        name: "Гренада"
    },
    none: {
        code: "AA",
        flag: botswana,
        name: "Не найдено"
    }
};

interface StyledTabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        '& > div': {
            display: 'none'
        },
    },
    root: {
        display: 'flex',
        position: 'relative',
        overflow: 'visible',
        minHeight: 0,
        '& > div': {
            display: 'flex',
            justifyContent: 'flex-end',
            width: '300px',
            position: 'absolute',
            top: '-45px',
            right: '40px',
            zIndex: 3,
        }
    }
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

interface StyledTabProps {
    label: string;
}

const StyledTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: 'none',
            backgroundColor: 'transparent',
            borderRadius: '50px',
            padding: '0px 12px',
            color: '#000',
            minWidth: '100px',
            fontWeight: theme.typography.fontWeightRegular,
            fontSize: theme.typography.pxToRem(24),
            marginRight: theme.spacing(1),
            marginLeft: '40px',
            '&:focus': {
                opacity: 1,
            },
            '&.Mui-selected': {
                textTransform: 'none',
                backgroundColor: '#65A45B',
                borderRadius: '50px',
                padding: '0px 12px',
                color: '#fff',
                minWidth: '100px',
                fontWeight: theme.typography.fontWeightRegular,
                fontSize: theme.typography.pxToRem(24),
                marginRight: theme.spacing(1),
                opacity: 1,
                '&:focus': {
                    opacity: 1,
                },
            }
        },
    })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);


export const Geography: React.FC<any> = (props) => {
    const classes = useStyles(), mapData: any = {}, rusMapData: any = {};
    const {
        data,
        click
    } = props;

    const [value, setValue] = useState(0);
    let geoData: any = [], rusData: any = [];
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const regionClick = (e: any) => {
        debugger;
        const map = e.target[Object.keys(e.target)[0]].mapObject, region: any = {};
        if (map.getSelectedRegions()[0]) {
            props.click(e, (map.params.map.indexOf('world') !== -1 ? true : false));
            region[map.getSelectedRegions()[0]] = false;
            map.setSelectedRegions(region);
        }
        let hoverDiv = document.getElementsByClassName("jvectormap-tip");
        //**Bug with toolTip
        for (let index = 0; index < hoverDiv.length; index++) {
            if(hoverDiv[index].innerHTML){
                hoverDiv[index].remove();//Delete all hover elements afterClick
            }
        }
    };

    const worldTableClick = (e: any) => {
        props.click(e, true)
    };

    const hideTips = (e: any) => {
    };

    const onRegionLabelShow = (event: any, label: any, code: string) => {
        //var lol = MapTranslator as Array<string>;
        label.html(MapTranslator["ru"][code]);
    }

    const regionOver = (e: any, code: string) => {
        const data: any = {
            object: 'Region',
            query: 'ruaddress',
            cursor: true,
            code
        };
        let hover: boolean = false;
        
        if (code.indexOf('RU-') === -1) {
            data.object = 'Country';
            data.query = 'address';
            data.cursor = true;
            for (let country in countries) {
                if (countries[country].code === code) {
                    data.code = country;
                    break;
                }
            }
            hover = !!props.data.filter((region: any) => region[0].SibAddress[data.object].Code === data.code).length;
        }
        else {
            if (props.data.filter((region: any) => region[0].SibAddress.Country.Code === "RUS").length) {
                hover = !!props.data.filter((region: any) => region[0].SibAddress.Country.Code === "RUS")[0].filter((p: any) => 
                    p.SibAddress[data.object].Code === data.code).length;
            }
            else {
                hover = false;
            }
        }

        if (hover) {
            const map = e.target, line = document.body.querySelectorAll(`[data-${data.query}]`);
            if (data.cursor) {
                map.style.cursor = 'pointer';
            }
            line.forEach((e: any) => {
                if (e.dataset[data.query] === code) {
                    e.parentNode.parentNode.classList.add('row-hovered');
                }
            })
        }
    };

    const regionOut = (e: any, code: string) => {
        const map = e.target, line = document.body.querySelectorAll(code.indexOf('RU-') === -1 ? '[data-address]' : '[data-ruaddress]');
        map.style.cursor = 'default';
        line.forEach((e: any) => {
            e.parentNode.parentNode.classList.remove('row-hovered');
        })
    };

    if (props.data && props.data.length) {
        for (let i = 0; i < props.data.length; i += 1) {
            const code = countries[props.data[i][0].SibAddress.Country.Code] ? countries[props.data[i][0].SibAddress.Country.Code].code : countries['none'].code;
            mapData[code] = props.data[i].length;
            if (props.data[i][0].SibAddress.Country.Code === "RUS") {
                const rusRegions: any = {};
                for (let j = 0; j < props.data[i].length; j += 1) {
                    const rusCode = props.data[i][j].SibAddress.Region.Code;
                    if (rusCode !== '') {
                        rusMapData[rusCode] = props.data[i].length;
                    }
                    if (!rusRegions[props.data[i][j].SibAddress.Region.Id]) {
                        rusRegions[props.data[i][j].SibAddress.Region.Id] = [props.data[i][j]]
                    }
                    else {
                        rusRegions[props.data[i][j].SibAddress.Region.Id].push(props.data[i][j])
                    }
                }
                const rusRegionsArray = Object.values(rusRegions).sort((a: any, b: any) => { return b.length - a.length });
                rusData = rusRegionsArray.map((p: any) => [
                    <div className="text-left font-size-med" data-id={p[0].SibAddress.Region.Id} data-ruaddress={p[0].SibAddress.Region.Code}>{p[0].SibAddress.Region.Name || "Федеральный"}</div>,
                    <div className="text-right font-size-med">{p.length}</div>
                ]).slice(0,6);
            }
        }
        geoData = props.data.map((p: any) => [
            <div style={{display: "flex"}} data-id={p[0].SibAddress.Country.Id}  data-address={countries[p[0].SibAddress.Country.Code] ? countries[p[0].SibAddress.Country.Code].code : countries['none'].code}>
                <Avatar src={countries[p[0].SibAddress.Country.Code] ? countries[p[0].SibAddress.Country.Code].flag : countries['none'].flag} style={{height: "35px", width: "35px", marginRight: "18px"}}/>
                <div className="text-left font-size-med">{countries[p[0].SibAddress.Country.Code] ? countries[p[0].SibAddress.Country.Code].name : p[0].SibAddress.Country.Code + " " + p[0].SibAddress.Country.Name }</div>
            </div>,
            <div className="text-right font-size-med">{p.length}</div>
        ]).slice(0,6);
    }

    return (
        <Card>
            <CardHeader color="success" icon style={{display: "flex", alignItems: "center"}}>
                <CardIcon color="success">
                    <LanguageIcon/>
                </CardIcon>
                <p className={classes.cardCategory}>&nbsp;</p>
                <h3 className={classes.cardTitle} style={{paddingRight: "16px", textAlign: "left"}}>География проектов</h3>
            </CardHeader>
            <CardBody style={{ padding: 0 }}>
                <GridContainer>
                    <GridItem xl={12} lg={12} md={12} sm={12} xs={12}>
                        <StyledTabs
                            value={value}
                            onChange={handleChange}>
                            <StyledTab label="Мир"/>
                            <StyledTab label="Россия"/>
                        </StyledTabs>
                        <TabPanel value={value} index={0}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5} lg={5} xl={5}>
                                    <CardBody>
                                        <Table
                                            tableHeaderColor="primary"
                                            tableData={geoData}
                                            rowClick={worldTableClick}
                                            colorsColls={["primary"]}
                                            hover={true}
                                        />
                                    </CardBody>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={7} lg={7} xl={7}>
                                    <CardBody>
                                    { value === 0 ?
                                        <VectorMap map={'world_mill'}
                                           backgroundColor="#fff"
                                           containerStyle={{
                                               width: '100%',
                                               height: '461px',
                                               maxWidth: '790px',
                                               margin: '0 auto'
                                           }}
                                           containerClassName="map"
                                           zoomOnScroll={true}
                                           regionStyle={{
                                               initial: {
                                                   fill: "#e7e7e7", //дефолтный цвет стран
                                                   "fill-opacity": 1,
                                                   stroke: "none",
                                                   "stroke-width": 0, //толщина границ стран
                                                   "stroke-opacity": 0
                                               },
                                               hover: {
                                                   "fill-opacity": 0.8,
                                                   cursor: "pointer"
                                               },
                                               selected: {
                                                   "fill-opacity": 0.5, //Кликнул на страну - выделилиось этим цветом
                                               },
                                               selectedHover: {}
                                           }}
                                           onRegionTipShow={onRegionLabelShow}
                                           //onRegionTipShow={hideTips}
                                           regionsSelectable={true}
                                           onRegionSelected={regionClick}
                                           onRegionOver={regionOver}
                                           onRegionOut={regionOut}
                                           series={{
                                               regions: [
                                                   {
                                                       values: mapData, //нужные страны
                                                       scale: ["#606060", "#212121"], //интенсивность цвета
                                                       normalizeFunction: "polynomial"
                                                   }
                                               ]
                                           }}
                                        />
                                    : null}
                                    </CardBody>
                                </GridItem>
                            </GridContainer>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={5} lg={5} xl={5}>
                                    <CardBody>
                                        <Table
                                            tableHeaderColor="primary"
                                            tableData={rusData}
                                            rowClick={click}
                                            colorsColls={["primary"]}
                                            hover={true}
                                        />
                                    </CardBody>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={7} lg={7} xl={7}>
                                    <CardBody>
                                    { value === 1 ?
                                        <VectorMap map={'ru_mill'}
                                           backgroundColor="#fff"
                                           containerStyle={{
                                               width: '100%',
                                               height: '461px',
                                               maxWidth: '790px',
                                               margin: '0 auto'
                                           }}
                                           containerClassName="map"
                                           zoomOnScroll={true}
                                           regionStyle={{
                                               initial: {
                                                   fill: "#e7e7e7", //дефолтный цвет стран
                                                   "fill-opacity": 1,
                                                   stroke: "none",
                                                   "stroke-width": 0, //толщина границ стран
                                                   "stroke-opacity": 0
                                               },
                                               hover: {
                                                   "fill-opacity": 0.8,
                                                   cursor: "pointer"
                                               },
                                               selected: {
                                                   "fill-opacity": 0.5, //Кликнул на страну - выделилиось этим цветом
                                               },
                                               selectedHover: {}
                                           }}
                                           onRegionTipShow={onRegionLabelShow}
                                           regionsSelectable={true}
                                           onRegionSelected={regionClick}
                                           onRegionOver={regionOver}
                                           onRegionOut={regionOut}
                                           series={{
                                               regions: [
                                                   {
                                                       values: rusMapData, //нужные страны
                                                       scale: ["#606060", "#212121"], //интенсивность цвета
                                                       normalizeFunction: "polynomial"
                                                   }
                                               ]
                                           }}
                                        />
                                    : null}
                                    </CardBody>
                                </GridItem>
                            </GridContainer>
                        </TabPanel>
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );
};