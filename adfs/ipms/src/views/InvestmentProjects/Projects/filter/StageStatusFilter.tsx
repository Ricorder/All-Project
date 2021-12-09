import React, { Component } from "react";
import ApiService, { ODataRequest, OData } from "services/api";
import "./StageStatusFilter.scss";

import Dvr from "@material-ui/icons/DvrOutlined";

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";


export interface StageStatusFilterProps {
  onChangeStage?: (data: {filter: string, key: string}) => void;
  onChangeStatus?: (data: {filter: string, key: string}) => void;
  idListStage?: string;
  idListStatus?: string;
}

export default class StageStatusFilter extends Component<StageStatusFilterProps> {
  private _apiService = new ApiService();
  public loadingData: Array<any> = [];
  public idList: any = {
    stage: this.props.idListStage ? this.props.idListStage.split(',') : [],
    status: this.props.idListStatus ? this.props.idListStatus.split(',') : []
  };

  public state = {
    stageError: false,
    stageLoading: true,
    stageSelect: [],
    stage: [],

    statusError: false,
    statusLoading: true,
    statusSelect: [],
    status: [],
  };

  public setSelected(data: any, key: string): Array<any> {
    const select = [];
    const idList = this.idList[key];

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      for (let j = 0; j < idList.length; j++) {
        const id = idList[j];
        
        if (element.id === id) {
          select.push(element);
        }
      }
    }

    return select;
  }
  
  public dataPreprocessor(data: OData) {
    if (data === undefined) {
      return;
    }

    return data.d['results'].map<any>((prop: any, key: any) => {
      return {
        id: prop['Id'],
        name: prop['Name']
      };
    });
  }

  public onDataLoaded(data: OData, key: string): void {
    console.log('StageStatusFilter data:', data);
    this.loadingData = this.loadingData.concat(this.dataPreprocessor(data));

    if (data.d['__next']) {
      this.getStatusData(data.d['__next'].split('$skiptoken=')[1]);

      return;
    }

    this.setState({
      [key + 'Error']: false,
      [key + 'Loading']: false,
      [key + 'Select']: this.setSelected(this.loadingData, key),
      [key]: [...this.loadingData]
    });

    this.loadingData = [];
  }

  public onError(err: any, key: string): void {
    this.setState({
      [key + 'Error']: true,
      [key + 'Loading']: false,
    });
  }

  public getStageData(token?: string): void {
    let request: ODataRequest = {
      entityName: 'SibProjectStageCollection',
      fields: [
        "Id",
        "Name",
      ],
      filter: `IsActive eq true`,
      orderby: 'Name'
    };

    if (token) {
      request.token = token;
    }

    this._apiService.getOData(request)
    .then((data: OData) => this.onDataLoaded(data, 'stage'))
    .catch((err) => this.onError(err, 'stage'));
  }

  public getStatusData(token?: string): void {
    let request: ODataRequest = {
      entityName: 'SibProjectStatusCollection',
      fields: [
        "Id",
        "Name",
      ],
      filter: `IsActive eq true`,
      orderby: 'Name'
    };

    if (token) {
      request.token = token;
    }

    this._apiService.getOData(request)
    .then((data: OData) => this.onDataLoaded(data, 'status'))
    .catch((err) => this.onError(err, 'status'));
  }

  public componentDidUpdate(prevProps: any): void {
    if (prevProps.idListStage !== this.props.idListStage) {
      this.idList['stage'] = this.props.idListStage ? this.props.idListStage.split(',') : [];

      this.setState({
        stageSelect: this.setSelected(this.state.stage, 'stage'),
      });
    }

    if (prevProps.idListStatus !== this.props.idListStatus) {
      this.idList['status'] = this.props.idListStatus ? this.props.idListStatus.split(',') : [];

      this.setState({
        statusSelect: this.setSelected(this.state.status, 'status'),
      });
    }
  }

  public componentDidMount(): void {
    this.getStageData();
    this.getStatusData();
  }

  public handleEventValue(entValue: any[]): any[] {
    let isAll = false;
    const list = entValue.map<any>(
      (prop: any) => {
        if (prop !== "all_items") {
          return prop;
        }

        isAll = true;
      });

    if (isAll) {
      return [];
    }

    return list;
  }

  public handleChangeStage = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log('handleChange: ', event.target.value);
    const value = this.handleEventValue(Array.isArray(event.target.value) ? event.target.value : [event.target.value]);
    this.setState({
      stageSelect: value
    });

    if (this.props.onChangeStage) {
      this.props.onChangeStage({
        filter: value.map<any>((prop: any) => prop['id']).toString(),
        key: 'stage'
      });
    }
  };

  public handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log('handleChange: ', event.target.value, typeof event.target.value);
    const value = this.handleEventValue(Array.isArray(event.target.value) ? event.target.value : [event.target.value]);
    this.setState({
      statusSelect: value
    });

    if (this.props.onChangeStatus) {
      this.props.onChangeStatus({
        filter: value.map<any>((prop: any) => prop['id']).toString(),
        key: 'status'
      });
    }
  };

  public render() {
    return (
      <>
        <Card className="projects__filter">
          <CardHeader icon className="projects__filter--header">
            <CardIcon color="primary" className="projects__filter--cardIcon">
              <Dvr/>
            </CardIcon>
            <h4 className="projects__filter--title">Выбор стадии и статуса</h4>
          </CardHeader>

          <CardBody className="account-filter__filter--cardBody">
            <div className="account-filter__filter--form">
              <div className="stageStatusFilter__form">
                  <Select className="stageStatusFilter__select"
                    disabled={this.state.stageLoading}
                    multiple
                    displayEmpty
                    value={this.state.stageSelect}
                    onChange={this.handleChangeStage}
                    input={<Input />}
                    renderValue={selected => {
                      if ((selected as string[]).length === 0) {
                        return 'Все стадии';
                      }
                      return (selected as string[]).map<any>(
                        (prop: any) => prop['name']
                      ).join(', ');
                    }}
                  >
                    <MenuItem disabled={this.state.stageSelect.length === 0} value="all_items">
                      Все стадии
                    </MenuItem>
                    {this.state.stage.map((obj: any) => (
                      <MenuItem key={obj.id} value={obj} className="stageStatusFilter__menu">
                        {obj.name}
                      </MenuItem>
                    ))}
                  </Select>

                  <Select className="stageStatusFilter__select"
                    disabled={this.state.statusLoading}
                    multiple
                    displayEmpty
                    value={this.state.statusSelect}
                    onChange={this.handleChangeStatus}
                    input={<Input />}
                    renderValue={selected => {
                      if ((selected as string[]).length === 0) {
                        return 'Все статусы';
                      }
                      return (selected as string[]).map<any>(
                        (prop: any) => prop['name']
                      ).join(', ');
                    }}
                  >
                    <MenuItem disabled={this.state.statusSelect.length === 0} value="all_items">
                      Все статусы
                    </MenuItem>
                    {this.state.status.map((obj: any) => (
                      <MenuItem key={obj.id} value={obj} className="stageStatusFilter__menu">
                        {obj.name}
                      </MenuItem>
                    ))}
                  </Select>
              </div>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
}
