import React, { Component } from "react";
import './Projects.scss'
import ReactTable from "react-table";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import qs from "query-string";

import Avatar from "@material-ui/core/Avatar";
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/DvrOutlined";
import Previous from "@material-ui/icons/ChevronLeft";
import Next from "@material-ui/icons/ChevronRight";
import { IconButton, Tooltip } from "@material-ui/core";
import FilterIcon from "@material-ui/icons/FilterList";
import GridIcon from "@material-ui/icons/GridOn";

import { cardTitle } from "assets/jss/material-dashboard-pro-react";
import Pagination from "components/Pagination/Pagination.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon.js";
import { Button } from "components/CustomButtons/Button";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Preloader from "components/Preloader/Preloader";
import { ProjectModel } from "./project-model";
import { cleanObj } from "utils/cleanObj";

import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import ApiService, { ODataRequest, OData } from "services/api";
import {config} from 'services/config';

import format from "date-fns/format";
import { dateHandler } from "utils/dateHandler";
import fakePartner from "assets/img/partners/fake-partner.svg";

import NameFilter from "./filter/NameFilter";
import OrgStructureFilter from "./filter/OrgStructureFilter";
import StageStatusFilter from "./filter/StageStatusFilter";
import AccountFilter from "./filter/AccountFilter";

//================================================================================
// DatePicker
import Datetime from 'react-datetime';
import CustomInput from "components/CustomInput/CustomInput";
import 'moment/locale/ru';
import { makeStyles } from "@material-ui/core/styles";


//================================================================================


//================================================================================
export const stages: any[] = [
  "Проработка",
  "Инвестидея",
 // "Проработка",
 // "Структурирование сделки",
  "Реализация"
]

//============================================================================================
const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    color: "#000"
  },
  buttonsBar: {
    position: "absolute",
    top: "0",
    right: "0",
    marginTop: "1em"
  },
  button: {
    width: 40,
    height: 40,
    padding: 0
  }
};

//============================================================================================
function filterCaseInsensitive(filter: any, row: any) {
  const id = filter.pivotId || filter.id;
  return (
    row[id] !== undefined ?
      String(row[id].toLowerCase()).includes(filter.value.toLowerCase())
      :
      true
  );
}

//============================================================================================
const prev = (props: any) => <Button color="success" {...props}>
  <Previous></Previous>
</Button>
const next = (props: any) => <Button color="success" {...props}>
  <Next></Next>
</Button>

//================================================================================
export interface ReactTablesProps<T> extends RouteComponentProps<T> {
  setTitle: (title: string) => void;
}

type PathParamsType = {
  id: string;
}

//============================================================================================
class ReactTables extends Component<ReactTablesProps<PathParamsType>> {
  private _apiService = new ApiService();
  private history = this.props.history;

  public loadingData: Array<any> = [];
  public qp: qs.ParsedQuery<any> = qs.parse(this.props.location.search);

  public filterList: any = {
    industry: this.qp.industry || '',
    region: this.qp.region || '',
    country: this.qp.country || '',
    modifiedOn: this.qp.modifiedOn || '',

    name: this.qp.name || '',
    partner: this.qp.partner || '',
    stage: this.qp.stage || '',
    status: this.qp.status || '',
    account: this.qp.account || ''
  };

  public state = {
    error: false,
    loading: true,
    page: parseInt(this.qp.page || '1'),
    pages: 0,
    size: 20,
    total: 0,
    project: null,
    data: [],
    isFiltred: false,

    date: [
      this.qp.lastYear ? new Date(this.qp.lastYear) : null,
      this.qp.thisYear ? new Date(this.qp.thisYear) : null
    ],

    ...this.filterList
  };

  public getAvatar(id: string) {
    let src = fakePartner;
    if (id && id !== '00000000-0000-0000-0000-000000000000') {
      src = `${config.url.API_URL}/0/img/entity/hash/SysImage/Data/${id}`;
    }

    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: '0.9em'}}>
        <Avatar src={src} style={{height: "32px", width: "32px"}} />
      </div>
    );
  }

  public getLogo(id: string) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: '0.9em'}}>
        <img src={`${config.url.API_URL}/0/img/entity/hash/SysImage/Data/${id}`} style={{height: "32px"}} />
      </div>
    );
  }

  public updateQueries(queries: any) {
    const {location} = this.props,
      newQueryString = qs.stringify(cleanObj({ ...qs.parse(location.search), ...queries}));

    this.history.push(`${location.pathname}${newQueryString ? `?${newQueryString}` : ''}`);
  }

  public onPagiClick = (p: any) => {
    if (p === this.state.page) {
      return;
    }

    this.updateQueries({page: p});
  }

  public getPaginationList(): Array<any> {
    const list: Array<any> = [];
    const pages = this.state.pages;
    const page = this.state.page;
    let f = (page > 2 ? page - 2 : (page === 2 ? page - 1 : page));
    let l = f + 5 >= pages ? pages : f + 4;

    if (f > 1) {
      list.push({text: 1, active: false, onClick: this.onPagiClick});
    }

    if (f > 2) {
      list.push({text: "...", active: false});
    }

    for (f; f <= l; f++) {
      const p = {text: f, active: false, onClick: this.onPagiClick};

      if (f === page) {
        p.active = true;
      }

      list.push(p);
    }

    if (pages - 1 >= f) {
      list.push({text: "...", active: false});
    }

    if (pages >= f) {
      list.push({text: pages, active: false, onClick: this.onPagiClick});
    }

    return list;
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
        status: prop['Status']['Name'],
        implementingCompany: Boolean(prop['Account']['AccountLogo']['Name']) ? this.getLogo(prop['Account']['AccountLogo']['Id']) : prop['Account']['Name'],

        createdOn: dateHandler(prop['Date']) || dateHandler(prop['CreatedOn']),
        stage: prop['Stage']['Name'],
        industry: prop['Industry']['Name']
      };
    });
  }

  public onDataLoaded(data: OData): void {
    console.log('data:', data['d']['results']);
    this.loadingData = this.loadingData.concat(this.dataPreprocessor(data));
    const total = parseInt(data.d['__count']);
    // const total = 1000;

    this.setState({
      error: false,
      loading: false,
      pages: Math.ceil(total / this.state.size),
      total,
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

  public getData(data: any = {}): void {
    const page = data['page'] || this.state.page;
    const lastYearDate: Date = data['date'] !== undefined ? data['date'][0] : (this.state['date'] ? this.state['date'][0] : null);
    const thisYearDate: Date = data['date'] !== undefined ? data['date'][1] : (this.state['date'] ? this.state['date'][1] : null);

    const d: any = {};
    for (const k in this.filterList) {
      if (this.filterList.hasOwnProperty(k)) {
        d[k] = data[k] === undefined ? this.state[k] : data[k];
      }
    }

    let isFiltred: boolean = false;
    let filter = "Type/Id eq guid'd25d3635-4d66-40fc-8a93-264c722d0600'";// and OrgStructureUnit/AfkIsIntegratedFrontendErp eq true";
    if (lastYearDate && thisYearDate) {
      const lastYear = format(lastYearDate, 'yyyy-MM-dd');
      const thisYear = format(thisYearDate, 'yyyy-MM-dd');
      filter += ` and ((Date gt datetime'${lastYear}' and Date lt datetime'${thisYear}') or (CreatedOn gt datetime'${lastYear}' and CreatedOn lt datetime'${thisYear}'))`;

      isFiltred = true;
    }

    if (d['industry']) {
      filter += ` and Industry/IndustryLevel1/Id eq guid'${d['industry']}'`;
    }

    if (d['region']) {
      const regionId = d['region'] === '00000000-0000-0000-0000-000000000000' ? 'null' : `guid'${d['region']}'`
      filter += ` and SibAddress/Region/Id eq ${regionId} and SibAddress/Country/Id eq guid'a570b005-e8bb-df11-b00f-001d60e938c6'`;
    }

    if (d['country']) {
      filter += ` and SibAddress/Country/Id eq guid'${d['country']}'`;
    }

    if (d['modifiedOn']) {
      filter += ` and ModifiedOn gt datetime'${d['modifiedOn']}'`;
    }

    if (d['name']) {
      filter += ` and substringof('${d['name']}', Name)`;
      isFiltred = true;
    }

    if (d['stage']) {
      const stageList = d['stage'].split(',');

      filter += ` and (`;
      for (let i = 0; i < stageList.length; i++) {
        filter += `${i === 0 ? '' : ' or '}(Stage/Id eq guid'${stageList[i]}')`;
      }
      filter += `)`;

      isFiltred = true;
    }

    if (d['status']) {
      const statusList = d['status'].split(',');

      filter += ` and (`;
      for (let i = 0; i < statusList.length; i++) {
        filter += `${i === 0 ? '' : ' or '}(Status/Id eq guid'${statusList[i]}')`;
      }
      filter += `)`;

      isFiltred = true;
    }

    if (d['partner']) {
      const partners = d['partner'].split(',');

      filter += ` and (`;
      for (let i = 0; i < partners.length; i++) {
        filter += `${i === 0 ? '' : ' or '}(OrgStructureUnit/Id eq guid'${partners[i]}')`;
      }
      filter += `)`;

      isFiltred = true;
    }

    if (d['account']) {
      const accounts = d['account'].split(',');

      filter += ` and (`;
      for (let i = 0; i < accounts.length; i++) {
        filter += `${i === 0 ? '' : ' or '}(Account/Id eq guid'${accounts[i]}')`;
      }
      filter += `)`;

      isFiltred = true;
    }

    this.setState({
      isFiltred
    });

    console.log(filter);

    const top = page * this.state.size;
    const skip = top - this.state.size;
    let request: ODataRequest = {
      entityName: 'SibProjectCollection',
      skip,
      top,
      fields: [
        'Id', // ID
        'Name', // Название
        'Status/Name', // Статус
        'Stage/Name', // Стадия
        'Account', // Реализующая компания
        'OrgStructureUnit/Head/Contact/Photo', // Ответственный
        'Industry/Name', // Индустрия
        'CreatedOn', // Дата создани
        'Date',
      ],
      expands: [
        'Status',
        'Stage',
        'Account/AccountLogo',
        'Industry',
        'OrgStructureUnit/Head/Contact/Photo'
      ],
      filter,
      orderby: 'Date desc',
      count: true
    };

    this._apiService.getOData(request)
    .then((data: OData) => this.onDataLoaded(data))
    .catch((err) => this.onError(err));
  }

  public componentDidUpdate(prevProps: any): void {
    const qp: qs.ParsedQuery<any> = qs.parse(this.props.location.search);
    const pqp: qs.ParsedQuery<any> = qs.parse(prevProps.location.search);
    const params: any = {};
    let isLoading: boolean = false;

    if (pqp.page !== qp.page) {
      isLoading = true;
      params['page'] = parseInt(qp.page || '1');
    }

    if (pqp.lastYear !== qp.lastYear) {
      if (params['date'] === undefined) {
        params['date'] = [];
      }
      isLoading = true;

      params['date'][0] = qp.lastYear ? new Date(qp.lastYear) : null;
      params['date'][1] = pqp.thisYear ? new Date(pqp.thisYear) : new Date();
    }

    if (pqp.thisYear !== qp.thisYear) {
      if (params['date'] === undefined) {
        params['date'] = [];
      }
      isLoading = true;

      if (params['date'][0] === undefined) {
        params['date'][0] = pqp.lastYear ? new Date(pqp.lastYear) : null;
      }
      params['date'][1] = qp.thisYear ? new Date(qp.thisYear) : new Date();
      // if (params['date'][1] === undefined) {
      //   params['date'][1] = qp.thisYear ? new Date(qp.thisYear) : new Date();
      // }
    }

    for (const k in this.filterList) {
      if (this.filterList.hasOwnProperty(k) && pqp[k] !== qp[k]) {
        isLoading = true;
        params[k]= qp[k] || '';
      }
    }

    if (isLoading) {
      this.setState({
        loading: true,
        data: [],
        ...params
      });

      this.getData(params);
    }
  }

  public componentDidMount(): void {
    this.props.setTitle('Проекты');
    window.scrollTo(0, 0);
    this.state.date[1] = new Date();
    this.getData();
  }

  public onRowClick = (state: any, rowInfo: any, column: any, instance: any) => {
    return {
      onClick: (e: any) => {
        this.history.push('/admin/projects/' + rowInfo.original.id);
      }
    }
  }

  public onChangeDateFrom = (date: any) => {
    console.log('onChangeDateRange', date);
    this.updateQueries({
      lastYear: date && date._d ? format(date._d, 'yyyy-MM-dd') : null,
    });
  }
  public onChangeDateTo = (date: any) => {
    console.log('onChangeDateRange', date);

    this.updateQueries({
      thisYear: date && date._d ? format(date._d, 'yyyy-MM-dd') : null
    });
  }

  public onChangeFilter = (data: {filter: string, key: string}) => {
    console.log('onChangeFilter', data);
    const {filter, key} = data;

    this.updateQueries({
      page: 1,
      [key]: filter || ''
    });
  }

  public onHeaderClick = (state: any, rowInfo: any, column: any, instance: any) => {
    return {
      onClick: (e: any) => {
        console.log(column, instance);
        if (column.sortable !== false) {
          // instance.sortColumn(column)
        }
      },
      style: {
        textAlign: 'left',
        fontSize: '0.9em',
        fontWeight: 400
      }
    }
  }

  public onClearAll = () => {
    this.updateQueries({
      lastYear: null,
      thisYear: null,
      name: '',
      partner: '',
      stage: '',
      status: '',
      account: ''
    });
  }

  public render() {
    return (
      <>
        <GridContainer className="projects__grid-container">
          <div
            className="projects__clear-btn"
            style={{display: this.state.isFiltred ? 'block' : 'none'}}
            onClick={this.onClearAll}
          >
            Сбросить фильтры
          </div>

          <div className="projects__grid--fluid-container">
            <NameFilter
                onChange={this.onChangeFilter}
                value={this.state.name}
            >
            </NameFilter>

            <Card className="projects__filter">
              <CardHeader icon className="projects__filter--header">
                <CardIcon color="rose" className="projects__filter--cardIcon">
                  <Dvr/>
                </CardIcon>
                <h4 className="projects__filter--title" style={styles.cardIconTitle}>Выбор периода</h4>
              </CardHeader>
              <CardBody className="date-filter__filter--cardBody">
                        <div>c&nbsp;</div>
                     <Datetime className="datePickerFilter__select"
                        onChange={this.onChangeDateFrom}
                        closeOnSelect={true}
                        locale="ru-RU"
                        viewMode={"years"}
                        timeFormat={false}
                        value={this.state.date[0]}
                       //inputProps={{ placeholder: "с" }}
                    />
                    <div>по&nbsp;</div>
                    <Datetime className="datePickerFilter__select"
                        //value={this.state.date}
                        onChange={this.onChangeDateTo}
                        closeOnSelect={true}
                        locale="ru-RU"
                        viewMode={"years"}
                        timeFormat={false}
                        value={this.state.date[1]}
                        //inputProps={{ placeholder: "по" }}
                    />  
              </CardBody>
            </Card>

            <OrgStructureFilter
                onChange={this.onChangeFilter}
                idList={this.state.partner}
            >
            </OrgStructureFilter>

            <StageStatusFilter
                onChangeStage={this.onChangeFilter}
                onChangeStatus={this.onChangeFilter}
                idListStage={this.state.stage}
                idListStatus={this.state.status}
            >
            </StageStatusFilter>

            <AccountFilter
                onChange={this.onChangeFilter}
                idList={this.state.account}
            >
            </AccountFilter>
          </div>
          {/*<GridItem xs={12} sm={6} md={6} lg={3} xl={3}>
            <NameFilter
              onChange={this.onChangeFilter}
              value={this.state.name}
            >
            </NameFilter>
          </GridItem>*/}

          {/*<GridItem xs={12} sm={6} md={6} lg={3} xl={3}>
            <Card className="projects__filter">
              <CardHeader icon className="projects__filter--header">
                <CardIcon color="rose" className="projects__filter--cardIcon">
                  <Dvr/>
                </CardIcon>
                <h4 className="projects__filter--title" style={styles.cardIconTitle}>Выбор периода</h4>
              </CardHeader>
              <CardBody className="projects__filter--cardBody">
                <DateRangePicker className="projects__filter--datepicker"
                                 onChange={this.onChangeDateRange}
                                 value={this.state.date}
                                 format="dd.MM.yyyy"
                                 dayPlaceholder={"дд"}
                                 monthPlaceholder={"мм"}
                                 yearPlaceholder={"гггг"}
                />
              </CardBody>
            </Card>
          </GridItem>*/}

          {/*<GridItem xs={12} sm={6} md={6} lg={3} xl={3}>
            <OrgStructureFilter
              onChange={this.onChangeFilter}
              idList={this.state.partner}
            >
            </OrgStructureFilter>
          </GridItem>*/}

          {/*<GridItem xs={12} sm={6} md={6} lg={3} xl={3}>
            <StageStatusFilter
              onChangeStage={this.onChangeFilter}
              onChangeStatus={this.onChangeFilter}
              idListStage={this.state.stage}
              idListStatus={this.state.status}
            >
            </StageStatusFilter>
          </GridItem>*/}

          {/*<GridItem xs={12} sm={6} md={6} lg={3} xl={3}>
            <AccountFilter
              onChange={this.onChangeFilter}
              idList={this.state.account}
            >
            </AccountFilter>
          </GridItem>*/}
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} className={"paddingless"}>
            <Card className="projects__wrapper">
              <CardHeader className="projects__header-wrapper" color="primary" icon>
                <CardIcon color="primary" className={"project__wrapper--cardIcon"}>
                  <Assignment />
                </CardIcon>
                <h4 className="project__wrapper--title" style={styles.cardIconTitle}>Инвестиционные проекты</h4>
                <div style={{position: "absolute", top: "0", right: "0", marginTop: "1em"}}>
                  {/* <Tooltip title="Расширенный фильтр">
                    <IconButton style={styles.button}>
                      <FilterIcon style={{width: "20px", height: "20px", marginTop: "4px"}}/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Экспорт в Excel">
                    <IconButton style={styles.button}>
                      <GridIcon style={{width: "20px", height: "20px", marginTop: "4px"}}/>
                    </IconButton>
                  </Tooltip> */}
                </div>
              </CardHeader>
              <CardBody className="projects__table-wrapper">
                <ReactTable
                  data={this.state.data}
                  sortable={false}
                  noDataText={ this.state.loading ? '' : 'Неправильное отображение'}
                  // filterable
                  // defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row)}
                  getTheadThProps={this.onHeaderClick}
                  columns={[
                    {
                      Header: "",
                      accessor: "logo",
                      sortable: false,
                      resizable: false,
                      headerClassName: 'projects__table-avatar',
                      className: 'projects__table-avatar'
                    },
                    {
                      Header: "Название проекта",
                      accessor: "name",
                      className: "project__name-cell",
                      headerClassName: "project__name-cell"
                    },
                    {
                      Header: "Компания",
                      headerClassName: "text-center",
                      accessor: "implementingCompany",
                      className: "justify-center text-center"
                    },
                    {
                      Header: "Индустрия",
                      accessor: "industry"
                    },
                    {
                      Header: "Стадия",
                      accessor: "stage"
                    },
                    {
                      Header: "Статус",
                      accessor: "status"
                    },
                    {
                      Header: "Дата создания",
                      accessor: "createdOn"
                    }
                  ]}
                  minRows={1}
                  showPagination={false}
                  // defaultPageSize={20}
                  // PreviousComponent={prev}
                  // NextComponent={next}
                  // showPaginationBottom
                  className="projects__table projects__table-highlight"
                  getTrProps={this.onRowClick}
                />
              </CardBody>
              <div style={{margin: "0 auto"}}>
                <Pagination
                  pages={this.getPaginationList()}
                />
              </div>
            </Card>
          </GridItem>
        </GridContainer>

        { this.state.loading ? <Preloader></Preloader>: null}
      </>
    );
  }
}

export default withRouter(ReactTables);
