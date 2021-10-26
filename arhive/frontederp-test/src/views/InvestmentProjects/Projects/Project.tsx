import React, { Component } from "react";
import './Project.scss'

import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import {createStyles, Tab, Tabs, Theme, withStyles} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateRange from "@material-ui/icons/DateRange";
import AssignmentIcon from "@material-ui/icons/Assignment";

import qs from "query-string";

import Preloader from "components/Preloader/Preloader";
import { BusinessProcessFlow } from "components/BusinessProcessFlow/BusinessProcessFlow";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { Button } from "components/CustomButtons/Button";
import SplitButton from "components/CustomButtons/SplitButton";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import TabPanel from "components/TabPanel/TabPanel";
import Info from "components/Typography/Info";
import Avatar from "@material-ui/core/Avatar";
import { DetailsSummary } from './details/DetailsSummary';
import { DetailsFiles } from './details/DetailsFiles';

import { CollaborationSteps } from "./collaboration/CollaborationSteps";

import Description from "./description/Description";
import Audit from "./audit/Audit";
import { Team } from "./components/Team";

import { emptyProject, ProjectModel } from "./project-model";
import { NoteModel, Notes } from "./Notes";

import ApiService, { ODataRequest, OData } from "services/api";
import { config } from 'services/config';

import format from "date-fns/format";
import { dateHandler } from "utils/dateHandler";
import fakePartner from "assets/img/partners/fake-partner.svg";

import { formatNumber } from "utils/numbers"

//================================================================================
// TODO убрать поскольку не используется 
const notes: NoteModel[] = [
  { id: "1", title: "Фин.Модель", text: "Для презентации проекта необходимо сделать Фин.Модель. Незабыть." },
  { id: "2", title: "Документы", text: "Надо подгрузить информацию о компании." },
  { id: "3", title: "Отправить черновик презентации", text: "Во вторник отправить коллегам черновик презентации на оценку." },
]

//================================================================================
export interface ProjectProps<T> extends RouteComponentProps<T> {
  setTitle: (title: string) => void;
}
interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}
const StyledTabs = withStyles({
  root: {
    minHeight: "23px",
    paddingLeft: "13px"
  }
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles((theme: Theme) =>
    createStyles({
      root: {
        fontSize: "14px",
        minWidth: "auto",
        minHeight: "23px",
        padding: "4px 5px",
        marginRight: "68px",
        '&:first-child': {
          marginLeft: '13px',
        },
        '&:last-child': {
          marginRight: 0,
        }
      }
    })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);
type PathParamsType = {
  id: string
}

class Project extends Component<ProjectProps<PathParamsType>> {
  constructor(props: any) {
    super(props);
    // console.log('constructor:', this.props.match.params.id);
  }

  private _apiService = new ApiService();

  public loadingData: Array<any> = [];
  public queryParams = qs.parse(this.props.location.search);
  public projectId: string = this.props.match.params.id;

  public state = {
    error: false,
    loading: true,
    value: 0,
    project: emptyProject,
    data: []
  };

  public handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({
      value: newValue
    });
  }

  public getAvatar(id: string) {
    let src = fakePartner;
    if (id && id !== '00000000-0000-0000-0000-000000000000') {
      src = `${config.url.API_URL}/0/img/entity/hash/SysImage/Data/${id}`;
    }

    return (
      <Avatar src={src} style={{width: "100%", height: "100%"}}/>
    );
  }

  public dataPreprocessor(data: OData) {
    if (data === undefined) {
      return;
    }

    return data.d['results'].map<ProjectModel>((prop: any, key: any) => {
      return {
        id: prop['Id'],
        logo: this.getAvatar(prop['OrgStructureUnit']['Head']['Contact']['Photo']['Id']),
        name: prop['Name'],
        description: prop['Description'].replace(/(\<(\/?[^>]+)>)/g, '').replace("&laquo;","\""),
        type: prop['Type']['Name'],
        status: prop['Status']['Name'],
        statusOrder: prop['Status']['Order'],
        subDivision: prop['OrgStructureUnit']['Name'],
        investRegion: prop['AfkRegion']['Name'],
        implementingCompany: prop['Account']['Name'],
        investmentSize: formatNumber(prop['InvestmentsVolume'], true),

        createdOn: dateHandler(prop['Date']) || dateHandler(prop['CreatedOn']),
        stage: prop['Stage'],
        owner: prop['Owner']['Name'],
        industry: prop['Industry']['Name'],
        afkShare: formatNumber(prop['InvestmentsAFKPart'], true),
        sibAddress: prop['SibAddress']['Name'],

        number: prop['Number'],
        subType: prop['SybTypeProject']['Name'],

        projectEndDate: dateHandler(prop['ProjectEndDate']),
        projectFactEndDate: dateHandler(prop['ProjectFactEndDate'])
      };
    });
  }

  public onDataLoaded(data: OData): void {
    console.log('data:', data);
    this.loadingData = this.loadingData.concat(this.dataPreprocessor(data));

    if (data.d['__next']) {
      this.getData(data.d['__next'].split('$skiptoken=')[1]);

      return;
    }

    this.setState({
      error: false,
      loading: false,
      project: this.loadingData[0],
      data: [...this.loadingData]
    });

    this.loadingData = [];
  }

  public onError(err: any): void {
    this.setState({
      error: true,
      loading: false
    });
  }

  public getData(token?: string): void {
    let request: ODataRequest = {
      entityName: 'SibProjectCollection',
      fields: [
        'Id', // ID
        'Number', // Номер
        'Name', // Название
        'Description', // Описание
        'Status', // Статус
        'Stage', // Стадия
        'AfkRegion/Name', // Инвеcт Регион
        'OrgStructureUnit/Head/Contact/Photo/Id', // Подразделение
        'InvestmentsVolume', // Объем инвестиций
        'Account', // Реализующая компания
        'Owner', // Ответственный
        'Industry/Name', // Индустрия
        'InvestmentsAFKPart', // Доля АФК
        'Date', // Дата начала проекта
        'CreatedOn', // Дата создани
        'SibAddress', // География
        'SybTypeProject', // Подтип
        'Type',
        'ProjectEndDate', // Планируемая дата завершения проекта
        'ProjectFactEndDate', // Фактическая дата завершения проекта
      ],
      expands: [
        'Status',
        'Stage',
        'AfkRegion',
        'Account',
        'Owner',
        'Industry',
        'SibAddress',
        'SybTypeProject',
        'Type',
        'OrgStructureUnit/Head/Contact/Photo'
      ],
      filter: `Id eq guid'${this.projectId}'`
    };

    if (token) {
      request.token = token;
    }

    this._apiService.getOData(request)
    .then((data: OData) => this.onDataLoaded(data))
    .catch((err) => this.onError(err));
  }

  public componentDidMount(): void {
    this.props.setTitle('Инвестиционный проект');
    window.scrollTo(0, 0);

    this.getData();
  }

  public render() {
    return (
      <>
        { !this.state.loading ?
            <div className="project">
              <div className="project__wrapper">
                <DialogTitle className="project__title">
                  <Card className="project__title-card">
                    <CardBody className="project__title-card-body">
                      <GridContainer style={{ padding: "0 1em" }}>
                        <div className="project__icon">
                          {this.state.project.logo}
                        </div>
                        <div className="project__name-description">
                          {/*<div className="project__description">
                        Инвестиционный проект
                      </div>*/}
                          <h3 className="project__name">
                            {this.state.project.number}. {this.state.project.name}
                          </h3>
                        </div>
                        <div className="project__title-buttons">
                          {/* <Button size="sm" round color="primary" className={"project__edit-btn"}>Редактировать проект</Button> */}
                        </div>
                      </GridContainer>

                      <GridContainer className={"project__info"}>
                        <GridItem xs={12} sm={6} md={3}>
                          <Info>
                            <span className="project__info-title">Дата создания</span>
                          </Info>
                          <div className="project__date-range">
                            <DateRange className="project__stats" />
                            <div className="project__info-value">
                              {this.state.project.createdOn}
                            </div>
                          </div>
                          <br/>
                          <Info>
                            <span className="project__info-title">Ответственный</span>
                          </Info>
                          <div className="project__info-value">
                            {this.state.project.owner}
                          </div>
                        </GridItem>
                        <GridItem xs={12} sm={6} md={2}>
                        <Info>
                            <span className="project__info-title">География</span>
                          </Info>
                          <div className="project__info-value">
                            {this.state.project.sibAddress}
                          </div>
                          <br/>
                          {/* <Info>
                            <span className="project__info-title">Тип проекта</span>
                          </Info>
                          <div className="project__info-value">
                            {this.state.project.subType}
                          </div>
                          <br/> */}
                          <Info>
                            <span className="project__info-title">Реализующая компания</span>
                          </Info>
                          <div className="project__info-value">
                            {this.state.project.implementingCompany}
                          </div>
                        </GridItem>

                        <GridItem xs={12} sm={6} md={3}>
                        <Info>
                            <span className="project__info-title">Общий объем инвестиций, млн руб.</span>
                          </Info>
                          <div className="project__info-value">
                            {this.state.project.investmentSize}
                          </div>
                          <br/>
                          <Info>
                            <span className="project__info-title">Индустрия</span>
                          </Info>
                          <div className="project__info-value">
                            {this.state.project.industry}
                          </div>
                        </GridItem>

                        <GridItem xs={12} sm={6} md={3}>
                          <Info>
                            <span className="project__info-title">Объем инвестиций АФК, млн руб.</span>
                          </Info>
                          <div className="project__info-value">
                            {this.state.project.afkShare}
                          </div>
                        </GridItem>
                      </GridContainer>
                    </CardBody>
                  </Card>
                </DialogTitle>

                <div className="project__crumbs">
                  <GridContainer>
                    <GridItem xl={9} lg={9} md={9} sm={12} xs={12}>
                      <BusinessProcessFlow stage={this.state.project.stage} className="project__bp-flow"></BusinessProcessFlow>
                    </GridItem>
                    <GridItem xl={3} lg={3} md={3} sm={12} xs={12}>
                      <div style={{zIndex: 223, position: "relative"}}>
                        <SplitButton
                          // option={this.state.project.statusOrder}
                          status={this.state.project.status}
                        >
                        </SplitButton>
                      </div>
                    </GridItem>
                  </GridContainer>
                </div>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={11}>
                    <StyledTabs value={this.state.value} onChange={this.handleChange}>
                      <StyledTab label="Описание" />
                      <StyledTab label="Документы" />
                      {/* <StyledTab label="Аудит" /> */}
                    </StyledTabs>

                    <TabPanel value={this.state.value} index={0}>
                      <Description project={this.state.project}></Description>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                      <DetailsFiles project={this.state.project}></DetailsFiles>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                      <Audit project={this.state.project}></Audit>
                    </TabPanel>
                  </GridItem>

                  {/* Убрана команда проекта по просьбе Егора */}
                  {/* <GridItem xs={12} sm={12} md={4} style={{paddingLeft: "15px", paddingRight: "15px"}}>
                    <Team project={this.state.project}></Team>
                  </GridItem> */}
                </GridContainer>
              </div>
            </div>
        : null}

        { this.state.loading ? <Preloader></Preloader>: null}
      </>
    );
  }
}

export default withRouter(Project);
  