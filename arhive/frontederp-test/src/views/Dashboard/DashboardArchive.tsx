import React, { Component } from "react";
import { InfoCards } from "./InfoCards";
import { InfoBlocks } from "./InfoBlocks";
import { InvestmentProjectsChart, statuses } from "./InvestmentProjectsChart";
import { Geography, countries } from "./Geography";
//import { TopFive } from "./TopFive";
import { Industry, industryGuids } from "./Industry";
import { Statuses } from "./Statuses";
import Pipeline3 from "./Pipeline3";
import { InvestmentProjectRegion } from "./InvestmentProjectRegion";
import Preloader from "components/Preloader/Preloader";
import ApiService, { ODataRequest } from "../../services/api";
import { RouteComponentProps } from "react-router";
import qs from "query-string";


// For Breadcrumbs
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { DateRange } from "@material-ui/icons";


export const formatDate = (date: Date): string => {

    let d: any = date.getDate(),
      m: any = date.getMonth() + 1,
      y: any = date.getFullYear();
  
    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;
  
    return d + '.' + m + '.' + y;
  };

  export const formatDay = (d: any): string => {
    if (d < 10) d = '0' + d;
  
    return d;
  };

  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export function CustomSeparator() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
      <Breadcrumbs separator="-" aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
    </div>
  );
}

  interface DashboardArchiveProps extends RouteComponentProps {
    setTitle: (title: string) => void;
  }

  export default class DashboardArchive extends Component<DashboardArchiveProps>  {
    private _apiService = new ApiService();
    private history = this.props.history;
    public qp: qs.ParsedQuery<any> = qs.parse(this.props.location.search);


    public state: any = {
        data: null,
        error: false,
        loading: true,
        cards: null,
        top: null,
        geo: null,
        projects: null,
        oldProjects: null,
        allProjects: null,
        activeProjects: null,
        workProjects: null,
        partners: null,
        industry: null,
        getParams: []
      };
    
      private nowDate: any = new Date();
    
      private dates: any = {
        thisYear: `${this.nowDate.getFullYear()}-${formatDay(this.nowDate.getMonth() + 1)}-${formatDay(this.nowDate.getDate())}`,
        lastYear: `${(new Date(this.nowDate.setFullYear(this.nowDate.getFullYear() - 1)).getFullYear())}-${formatDay(this.nowDate.getMonth() + 1)}-${formatDay(this.nowDate.getDate())}`,
        previousYear: `${(new Date(this.nowDate.setFullYear(this.nowDate.getFullYear() - 1)).getFullYear())}`
      };
    
      private replaceGet = (getObj: any) => {
        if (this.state.getParams.filter((e: any) => e.search === getObj.search).length) {
          let search = '?';
          for (let i = 0; i < this.state.getParams.length; i += 1) {
            if (this.state.getParams[i].search === getObj.search) {
              this.state.getParams[i].id = getObj.id;
            }
            search += (i === 0 ? this.state.getParams[i].search : '&' + this.state.getParams[i].search) + '=' + this.state.getParams[i].id;
          }
          this.history.push(this.history.location.pathname + search);
        }
        else {
          this.history.push(this.history.location.pathname + (this.history.location.search ? this.history.location.search + '&' : '?') + getObj.search + "=" + getObj.id);
          this.state.getParams.push(getObj);
        }
      };
    
      public onDoughnutClick = (e: any) => {
        this.history.push(`/admin/projects/?partner=${this.state.getParams.filter((e: any) => e.search === 'partner')[0].id}&industry=${e}&lastYear=${this.dates.lastYear}&thisYear=${this.dates.thisYear}&status=${statuses.work}`);
      };
    
      public onWorkProjectsClick = () => {
        this.history.push(`/admin/projects/?status=${statuses.work}`);
      };
    
      public onActiveProjectsClick = () => {
        this.history.push(`/admin/projects/?modifiedOn=${this.dates.lastYear}`);
      };
    
      public onCardProjectsClick = (work: string) => {
        // let filter = `?lastYear=${this.dates.lastYear}&thisYear=${this.dates.thisYear}`;
        debugger;
        let filter = `?`;
        this.state.getParams.map((param: any) => {
          filter += `&${param.search}=${param.id}`;
          console.log('State:', this.state);
        });
        if (work === "partnerProjects") {
            let parthersArray = this.state.partners as Array<any>;
            let result = [] as Array<string>; 
            debugger;
            parthersArray.forEach(
              x=> {
                if(x[0].OrgStructureUnit.AfkIsIntegratedFrontendErp){
                  result.push(x[0].OrgStructureUnit.Id)
                }
                  }
              )
            filter += `&status=${statuses.work}&partner=${result.join(",")}`
          }
        else {
        if (JSON.parse(work)) {
          filter += `&status=${statuses.work}`
        }
    }   
        this.history.push(`/admin/projects/${filter}`)
      };
    
      public onProjectClick = (e: any) => {
        let href = '/admin/projects/';
        if (e.currentTarget) {
          href += e.currentTarget.querySelector('[data-id]').dataset.id;
        }
        else {
          href += e;
        }
        this.history.push(href);
      };
    
      public onPartnerClick = (e: any) => {
        this.replaceGet({
          search: 'partner',
          id: e.currentTarget.querySelector('[data-id]').dataset.id
        });
        this.state.oldProjects = null;
      };
    
      public onIndustryClick = (e: any) => {
        this.replaceGet({
          search: 'industry',
          id: e.currentTarget.querySelector('[data-id]').dataset.id
        });
      };
    
      public onRegionClick = (e: any, world: boolean) => {
        let id = e.currentTarget.querySelector('[data-id]') ? e.currentTarget.querySelector('[data-id]').dataset.id : '', regionProjects;
        if (e.target[Object.keys(e.target)[0]].mapObject) {
          if (world) {
            let code = e.target[Object.keys(e.target)[0]].mapObject.getSelectedRegions()[0];
            for (let country in countries) {
              if (countries[country].code === code) {
                code = country;
                break;
              }
            }
            regionProjects = this.state.data.filter((p: any) => p.SibAddress.Country.Code === code);
          }
          else {
            const code = e.target[Object.keys(e.target)[0]].mapObject.getSelectedRegions()[0];
            regionProjects = this.state.data.filter((p: any) => p.SibAddress.Region.Code === code);
          }
    
          if (!regionProjects.length) {
            return;
          }
          else {
            id = world ? regionProjects[0].SibAddress.Country.Id : regionProjects[0].SibAddress.Region.Id;
          }
        }
        this.replaceGet({
          search: world ? 'country' : 'region',
          id
        });
      };
    
      public componentDidUpdate(prevProps: any): void {
        const qp: qs.ParsedQuery<any> = qs.parse(this.props.location.search);
        const pqp: qs.ParsedQuery = qs.parse(prevProps.location.search);
    
        if (Object.keys(pqp).length !== Object.keys(qp).length) {
    
          let getParams = [];
          if (Object.keys(qp).length) {
            for (let i = 0; i < Object.keys(qp).length; i += 1) {
              getParams.push({
                search: Object.keys(qp)[i],
                id: qp[Object.keys(qp)[i]]
              })
            }
          }
          else {
            getParams = [];
          }
    
          this.setState({
            loading: true,
            getParams
          });
    
          window.scrollTo(0, 0);
          this.state.getParams = getParams;
          this.makeData();
        }
      }
    
    
      public onDataLoaded(data: any): void {
        if (data.d['__next']) {
          this.getData(data.d['__next'].split('$skiptoken=')[1]);
        }
    
        let stateData = this.state.data || [];
        let getParams: any = [];
    
        if (Object.keys(this.qp).length) {
          for (let i = 0; i < Object.keys(this.qp).length; i += 1) {
            getParams.push({
              search: Object.keys(this.qp)[i],
              id: this.qp[Object.keys(this.qp)[i]]
            });
          }
        }
    
        this.setState({
          data: (stateData) ? stateData.concat(data.d.results) : data.d.results,
          error: false,
          loading: Boolean(data.d['__next']),
          getParams
        });
    
        if (!data.d['__next']) {
          this.makeData();
        }
      }
    
      public onSummDataLoaded(data: any): void {
        this.setState({
          summData: data,
          error: false
        });
      }
    
      public onOldDataLoaded(data: any): void {
        if (data.d['__next']) {
          this.getOldData(data.d['__next'].split('$skiptoken=')[1]);
        }
    
        let stateOldData: any = this.state.oldProjects || [];
    
        this.setState({
          oldProjects: (stateOldData) ? stateOldData.concat(data.d.results) : data.d.results,
          error: false,
          loading: Boolean(data.d['__next'])
        });
      }
    
      public onAllDataLoaded(data: any): void {
        this.setState({
          allProjects: data.d.__count,
          error: false
        });
      }
    
      public onError(err: any): void {
        this.setState({
          error: true,
          loading: false
        });
      }
    
      public getData(token?: string): void {
        const request: ODataRequest = {
          entityName: 'SibProjectCollection',
          fields: [
            'Id', 'Name', 'Status', 'Status/Name', 'AfkRegion/Name', 'OrgStructureUnit/Id', 'OrgStructureUnit/Name','OrgStructureUnit/AfkIsIntegratedFrontendErp', 'Date', 'ModifiedOn',
            'SibAddress/Region/Id', 'SibAddress/Region/Code', 'SibAddress/Region/Name', 'SibAddress/Country/Id', 'CreatedOn',
            'SibAddress/Country/Code', 'SibAddress/Country/Name', 'InvestmentsVolume', 'OrgStructureUnit/Head/Contact/Photo/Id',
            'Stage/Order', 'Stage/Name', 'PausedDate', 'CanceledDate', 'ProjectFactEndDate', 'Industry/IndustryLevel1/Id',
            'Industry/IndustryLevel1/Name','Industry/IndustryLevel1/Color', 'Industry/IndustryLevel1/ImgPath', 'Type/Id', 'Account/Name', 'Account/AccountLogo/Id', 'Account/AccountLogo/Name', 'Owner/Name'
          ],
          expands: [
            'Status', 'AfkRegion', 'OrgStructureUnit/Head/Contact/Photo', 'SibAddress/Region', 'SibAddress/Country', 'Industry/IndustryLevel1',
            'Owner', 'Type', 'Account/AccountLogo', 'Stage', 'OrgStructureUnit/AfkIsIntegratedFrontendErp'
          ],
          //filter: "Type/Id eq guid'd25d3635-4d66-40fc-8a93-264c722d0600' and OrgStructureUnit/AfkIsIntegratedFrontendErp eq true and ((Date gt datetime'" + this.dates.previousYear + "') or (CreatedOn gt datetime'" + this.dates.lastYear + "'))",
          filter: "Type/Id eq guid'd25d3635-4d66-40fc-8a93-264c722d0600'",
          orderby: 'Date desc',
          //top: 999
      
        };
    
        if (token) {
          request.token = token;
        }
    
        this._apiService.getOData(request)
          .then((data) => this.onDataLoaded(data))
          .catch((err) => this.onError(err));
      }
    
      getSummData(): void {
        this.setState({
          loading: true
        });
    
        const request: ODataRequest = {
          entityName: 'GetInvestments',
          url: 'https://erp.sistema.ru/0/rest/UsrCustomConfigurationService/' // поменять
        }
    
        this._apiService.getOData(request)
          .then((data) => this.onSummDataLoaded(data))
          .catch((err) => this.onError(err));
      }
    
      getOldData(token?: string): void {
        this.setState({
          loading: true
        });
    
        const request: ODataRequest = {
          entityName: 'SibProjectCollection',
          fields: ['Id', 'Name', 'Date', 'CreatedOn', 'PausedDate', 'CanceledDate', 'ProjectFactEndDate', 'Status/Id'],
          expands: ['Status', 'SibAddress/Country'],
        //   filter: "Type/Id eq guid'd25d3635-4d66-40fc-8a93-264c722d0600' and OrgStructureUnit/Id eq guid'" + this.state.getParams.filter((e: any) => e.search === 'partner')[0].id + "' and OrgStructureUnit/AfkIsIntegratedFrontendErp eq true and ((Date lt datetime'" + this.dates.lastYear + "') or (CreatedOn lt datetime'" + this.dates.lastYear + "'))",
          filter: "Type/Id eq guid'd25d3635-4d66-40fc-8a93-264c722d0600' and ((Date lt datetime'" + this.dates.lastYear + "') or (CreatedOn lt datetime'" + this.dates.lastYear + "'))",
          orderby: 'Date desc'
        };
    
        if (token) {
          request.token = token;
        }
        else {
          this.state.oldProjects = null;
        }
    
        this._apiService.getOData(request)
          .then((data) => this.onOldDataLoaded(data))
          .catch((err) => this.onError(err));
      }
    
      getAllData(): void {
        this.setState({
          loading: true
        });
    
        const request: ODataRequest = {
          entityName: 'SibProjectCollection',
          top: 1,
          fields: ['Id'],
          expands: [],
        //   filter: "Type/Id eq guid'd25d3635-4d66-40fc-8a93-264c722d0600' and OrgStructureUnit/AfkIsIntegratedFrontendErp eq true",
        filter: "Type/Id eq guid'd25d3635-4d66-40fc-8a93-264c722d0600'",
          orderby: 'Date desc',
          count: true
        };
    
        this._apiService.getOData(request)
          .then((data) => this.onAllDataLoaded(data))
          .catch((err) => this.onError(err));
      }
    
      public componentDidMount(): void {
        this.getSummData();
        this.getAllData();
        this.getData();
      }
    
      public makeData() {
        let stateData: any[] = this.state.data || [], partners: any = {}, industry: any = {}, industryWork: any = {}, geo: any = {}, regionArray: any = [],
          title = 'Аналитика по Банку проектов', activeProjects: number = 0;
    
        if (this.state.getParams.length) {
          if (this.state.getParams.filter((e: any) => e.search === 'partner').length) {
            if (!this.state.getParams.filter((e: any) => e.search === 'industry').length && !this.state.getParams.filter((e: any) => e.search === 'region').length && !this.state.getParams.filter((e: any) => e.search === 'country').length) {
              this.getOldData();
            }
            stateData = stateData.filter((a: any) => a.OrgStructureUnit.Id === this.state.getParams.filter((e: any) => e.search === 'partner')[0].id);
            title += ' по ' + stateData[0].OrgStructureUnit.Name;
          }
          
          if (this.state.getParams.filter((e: any) => e.search === 'industry').length) {
            stateData = stateData.filter((a: any) => a.Industry.IndustryLevel1.Id === this.state.getParams.filter((e: any) => e.search === 'industry')[0].id);
            title += ' по индустрии ' + stateData[0].Industry.IndustryLevel1.Name;
          }
          if (this.state.getParams.filter((e: any) => e.search === 'region').length) {
            stateData = stateData.filter((a: any) => (a.SibAddress.Region.Id === this.state.getParams.filter((e: any) => e.search === 'region')[0].id && a.SibAddress.Country.Code === "RUS"));
            regionArray = stateData;
            title += ' по региону ' + (stateData[0].SibAddress.Region.Name || 'Федеральный');
          }
          else if (this.state.getParams.filter((e: any) => e.search === 'country').length) {
            stateData = stateData.filter((a: any) => (a.SibAddress.Country.Id === this.state.getParams.filter((e: any) => e.search === 'country')[0].id));
            regionArray = stateData;
            title += ' по стране ' + (stateData[0].SibAddress.Country.Name || '');
          }
        }
    
        for (let i = 0; i < stateData.length; i += 1) {
          if (stateData[i].Industry.IndustryLevel1.Id !== '00000000-0000-0000-0000-000000000000') {
            if (industry[stateData[i].Industry.IndustryLevel1.Id]) {
              industry[stateData[i].Industry.IndustryLevel1.Id].count += 1;
            } else {
              industry[stateData[i].Industry.IndustryLevel1.Id] = {
                count: 1,
                id: stateData[i].Industry.IndustryLevel1.Id,
                name: stateData[i].Industry.IndustryLevel1.Name,
                color: stateData[i].Industry.IndustryLevel1.Color,
                imgPath: stateData[i].Industry.IndustryLevel1.ImgPath
              }
            }
    
            if (stateData[i].Status.Id === statuses.work) {
              if (industryWork[stateData[i].Industry.IndustryLevel1.Id]) {
                industryWork[stateData[i].Industry.IndustryLevel1.Id].count += 1;
              } else {
                industryWork[stateData[i].Industry.IndustryLevel1.Id] = {
                  count: 1,
                  id: stateData[i].Industry.IndustryLevel1.Id,
                  name: stateData[i].Industry.IndustryLevel1.Name,
                  color: stateData[i].Industry.IndustryLevel1.Color,
                  imgPath: stateData[i].Industry.IndustryLevel1.ImgPath
                }
              }
            }
          }
    
          if (new Date(stateData[i].ModifiedOn) > new Date(this.dates.lastYear)) {
            activeProjects += 1;
          }
    
          if (stateData[i].Date && new Date(stateData[i].Date) > new Date(this.dates.lastYear)) { //Fix bug with InvestProjectCharts по датам, показывались не те проекты
            stateData[i].Quarter = Math.ceil((new Date(stateData[i].Date).getMonth() + 1) / 3);
            stateData[i].QuarterYear = new Date(stateData[i].Date).getFullYear();
          }
          else {
            stateData[i].Quarter = Math.ceil((new Date(stateData[i].CreatedOn).getMonth() + 1) / 3);
            stateData[i].QuarterYear = new Date(stateData[i].CreatedOn).getFullYear();
          }
    
          if (!partners[stateData[i].OrgStructureUnit.Id]) {
            partners[stateData[i].OrgStructureUnit.Id] = [stateData[i]]
          }
          else {
            partners[stateData[i].OrgStructureUnit.Id].push(stateData[i])
          }
    
          if (stateData[i].SibAddress.Country.Id !== '00000000-0000-0000-0000-000000000000') {
            if (!geo[stateData[i].SibAddress.Country.Id]) {
              geo[stateData[i].SibAddress.Country.Id] = [stateData[i]]
            }
            else {
              geo[stateData[i].SibAddress.Country.Id].push(stateData[i])
            }
          }
        }
    
        const partnersArray = Object.values(partners).sort((a: any, b: any) => { return b.length - a.length }),
          industryArray = Object.values(industry).sort((a: any, b: any) => { return b.count - a.count }),
          industryWorkArray = Object.values(industryWork).sort((a: any, b: any) => { return b.count - a.count }),
          geoArray = Object.values(geo).sort((a: any, b: any) => { return b.length - a.length }),//TODO Sort change
          maxArray = stateData.concat().filter((p: any) => p.Status.Id === statuses.work).sort((a: any, b: any) => parseFloat(b.InvestmentsVolume) - parseFloat(a.InvestmentsVolume)).slice(0, 5),
          newArray = stateData.concat().filter((p: any) => p.Status.Id === statuses.work).sort((a: any, b: any) => {
            let dateA, dateB;
    
            dateA = a.Date ? a.Date : a.CreatedOn;
            dateB = b.Date ? b.Date : b.CreatedOn;
    
            return new Date(dateB).getTime() - new Date(dateA).getTime();
          }).slice(0, 5),
          workProjects = stateData.filter((data: any) => data.Status.Id === '45e89ed8-7798-41b9-877f-e65488326236').length,
          partnerProjects = stateData.filter((data: any) => data.Status.Id === '45e89ed8-7798-41b9-877f-e65488326236' && data.OrgStructureUnit.AfkIsIntegratedFrontendErp === true).length,
          investVolume = stateData.filter((data: any) => data.Status.Id === '45e89ed8-7798-41b9-877f-e65488326236').reduce((sum:number, current:any)=> { return sum+ +current.InvestmentsVolume },0),
          dateRange = formatDate(new Date(new Date().setFullYear((new Date().getFullYear() - 1)))) + " - " + formatDate(new Date()),
          dateCurrent = "на " + formatDate(new Date())
        this.props.setTitle(title);
        this.setState({
          cardMain: [
            {
              title: "Всего проектов",
              subtitle: stateData.length,
              date: dateCurrent
            },
            {
              title: "Проектов в работе",
              subtitle: workProjects,
              date: dateCurrent
            },
            {
              title: "Проектов УП в работе",
              subtitle: partnerProjects,
              date: dateCurrent,
              click: "partnerProjects"
            }
          ],
          cards: [
            {
              title: "Всего проектов",
              subtitle: stateData.length,
              date: dateRange
            },
            {
              title: "Проектов в работе",
              subtitle: workProjects,
              date: dateRange
            },
            {
              title: "Объем инвестиций, млн руб",
              subtitle: investVolume,
              date: dateRange
            }
          ],
          partners: partnersArray,
          industry: industryArray,
          industryWork: industryWorkArray,
          projects: regionArray,
          activeProjects,
          workProjects,
          geo: geoArray,
          loading: false
        })
      }
    
      render() {
        return (
          <div>
            {this.state.loading ? <Preloader></Preloader> : null}
            {!this.state.loading && this.state.getParams.length !== 0 ? <InfoCards data={this.state.cards} click={this.onCardProjectsClick}></InfoCards> : null}
            {!this.state.loading && this.state.getParams.length === 0 ? <InfoCards data={this.state.cardMain} click={this.onCardProjectsClick}></InfoCards> : null}
            {/* <InfoCards data={this.state.cards} click={this.onCardProjectsClick}></InfoCards> : null} */}
            {/* {!this.state.loading && this.state.getParams.length === 0 ? <InfoBlocks summ={this.state.summData} all={this.state.allProjects} active={this.state.activeProjects} work={this.state.workProjects} clickAll={this.onProjectClick} clickWork={this.onWorkProjectsClick} clickActive={this.onActiveProjectsClick} allProjects="Всего проектов" lastActiveProjects="Проектов с активностью" activeProjects="Проектов в работе на сегодня"></InfoBlocks> : null} */}
            {!this.state.loading && (this.state.getParams.filter((e: any) => e.search === 'partner').length !== 0 && (this.state.getParams.filter((e: any) => e.search === 'region').length === 0 && this.state.getParams.filter((e: any) => e.search === 'country').length === 0 && this.state.getParams.filter((e: any) => e.search === 'industry').length === 0)) ? <Statuses data={this.state.partners} projectsLength={this.state.cards} industry={this.state.industryWork} oldProjects={this.state.oldProjects} click={this.onDoughnutClick}></Statuses> : null}
            {/* <GlobalSales useStyles={useStyles}></GlobalSales> */}
            {/* <Charts useStyles={useStyles}></Charts> */}
            {/* {!this.state.loading && (this.state.getParams.filter((e: any) => e.search === 'partner').length === 0) ? <InvestmentProjectsChart data={this.state.partners} click={this.onPartnerClick}></InvestmentProjectsChart> : null} */}
            {/* {!this.state.loading ? <TopFive data={this.state.top} click={this.onProjectClick}></TopFive> : null} */}
            {!this.state.loading && (this.state.getParams.filter((e: any) => e.search === 'region').length === 0 && this.state.getParams.filter((e: any) => e.search === 'country').length === 0) ? <Geography data={this.state.geo} click={this.onRegionClick}></Geography> : null}
            {!this.state.loading && (this.state.getParams.filter((e: any) => e.search === 'industry').length === 0) ? <Industry data={this.state.industry} click={this.onIndustryClick}></Industry> : null}
            {!this.state.loading && (this.state.getParams.filter((e: any) => e.search === 'region').length !== 0 || this.state.getParams.filter((e: any) => e.search === 'country').length !== 0) ? <InvestmentProjectRegion data={this.state.projects} click={this.onProjectClick}></InvestmentProjectRegion> : null}
            {false ? <Pipeline3></Pipeline3> : null}
            {/* <Listings useStyles={useStyles}></Listings> */}
          </div>
        );
      }
    }
    