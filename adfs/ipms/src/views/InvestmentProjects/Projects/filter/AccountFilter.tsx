import React, { Component } from "react";
import ApiService, { ODataRequest, OData } from "services/api";
import "./AccountFilter.scss";

import Dvr from "@material-ui/icons/DvrOutlined";

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";


export interface AccountFilterProps {
  onChange?: (data: {filter: string, key: string}) => void;
  idList?: string;
}

export default class AccountFilter extends Component<AccountFilterProps> {
  private _apiService = new ApiService();
  public loadingData: Array<any> = [];
  public idList: Array<string> = this.props.idList ? this.props.idList.split(',') : [];

  public state = {
    error: false,
    loading: true,
    select: [],
    data: []
  };

  public setSelected(data: any): Array<any> {
    const select = [];

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      for (let j = 0; j < this.idList.length; j++) {
        const id = this.idList[j];
        
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

  public onDataLoaded(data: OData): void {
    console.log('AccountFilter data:', data);
    this.loadingData = this.loadingData.concat(this.dataPreprocessor(data));

    if (data.d['__next']) {
      this.getData(data.d['__next'].split('$skiptoken=')[1]);

      return;
    }

    this.setState({
      error: false,
      loading: false,
      select: this.setSelected(this.loadingData),
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
      entityName: 'AccountCollection',
      fields: [
        "Id",
        "Name",
      ],
      filter: `Type/Id eq guid'1c62177b-e5d4-48d0-8702-1a3f435de9c6' and UseForProject eq true or Id eq guid'e308b781-3c5b-4ecb-89ef-5c1ed4da488e'`,
      orderby: 'Name'
    };

    if (token) {
      request.token = token;
    }

    this._apiService.getOData(request)
    .then((data: OData) => this.onDataLoaded(data))
    .catch((err) => this.onError(err));
  }

  public componentDidUpdate(prevProps: any): void {
    if (prevProps.idList !== this.props.idList) {
      this.idList = this.props.idList ? this.props.idList.split(',') : [];

      this.setState({
        select: this.setSelected(this.state.data),
      });
    }
  }

  public componentDidMount(): void {
    this.getData();
  }

  public setData(dataList: string[]) {
    this.setState({select: dataList});

    if (this.props.onChange) {
      this.props.onChange({
        filter: (dataList).map<any>((prop: any) => prop['id']).toString(),
        key: 'account'
      });
    }
  }

  public handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let isAll = false;
    const value: string[] = event.target.value as string[];
    const list = value.map<any>(
      (prop: any) => {
        if (prop !== "all_items") {
          return prop;
        }

        isAll = true;
      });

    console.log('handleChange: ', list.toString());

    if (isAll) {
      this.setData([]);
      return;
    }

    this.setData(list);
  };

  public render() {
    return (
      <>
        <Card className="account-filter__filter">
          <CardHeader icon className="account-filter__filter--header">
            <CardIcon color="success" className="account-filter__filter--cardIcon">
              <Dvr/>
            </CardIcon>

            <h4 className="account-filter__filter--title">
              Компания
            </h4>
          </CardHeader>

          <CardBody className="account-filter__filter--cardBody">
            <div className="account-filter__filter--form">
              <div className="account-filter__filter--formControl">
                <div className="accountFilter__form">
                  <Select className="accountFilter__select"
                    disabled={this.state.loading}
                    multiple
                    displayEmpty
                    value={this.state.select}
                    onChange={this.handleChange}
                    input={<Input />}
                    renderValue={selected => {
                      if ((selected as string[]).length === 0) {
                        return 'Все реализующие компании';
                      }
                      return (selected as string[]).map<any>(
                        (prop: any) => prop['name']
                      ).join(', ');
                    }}
                  >
                    <MenuItem disabled={this.state.select.length === 0} value="all_items">
                      Все реализующие компании
                    </MenuItem>
                    {this.state.data.map((obj: any) => (
                      <MenuItem key={obj.id} value={obj} className="accountFilter__menu">
                        {obj.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
}
