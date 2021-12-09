import React, { Component } from "react";
import "./Audit.scss";

import Pagination from "components/Pagination/Pagination.js";
import ReactTable from 'react-table';
import { getTheadThProps } from 'utils/getTheadThProps';

import ApiService, { ODataRequest, OData } from "services/api";
import { ProjectModel } from "../project-model";

import format from "date-fns/format";

//================================================================================
export interface AuditProps {
  project: ProjectModel;
}

export default class Audit extends Component<AuditProps> {
  private _apiService = new ApiService();

  public loadingData: Array<any> = [];

  public state = {
    error: false,
    loading: true,
    page: 1,
    pages: 0,
    size: 10,
    total: 0,
    data: []
  };

  public onPagiClick = (page: any) => {
    if (page === this.state.page) {
      return;
    }

    this.setState({
      loading: true,
      page,
      data: []
    });

    this.getData(page);
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
      return [];
    }

    return data.d['results'].map<any>((prop: any, key: any) => {
      return {
        id: prop['Id'],
        caption: prop['SmrColumnCaption'],
        oldValue: prop['SmrOldValue'],
        newValue: prop['SmrNewValue'],
        createdBy: prop['CreatedBy']['Name'],
        date: format(new Date(prop['CreatedOn']), 'dd.MM.yyyy')
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

  public getData(page: number): void {
    const top = page * this.state.size;
    const skip = top - this.state.size;
    let request: ODataRequest = {
      entityName: 'SmrLoggingRecordCollection',
      skip,
      top,
      // fields: [
      //   "Id",
      //   "Type",
      //   "Status",
      //   "Board",
      //   "DateOfBoardScheduled"
      // ],
      expands: [
        "CreatedBy"
      ],
      filter: `SmrRecordId eq guid'${this.props.project.id}'`,
      count: true
    };

    this._apiService.getOData(request)
    .then((data: OData) => this.onDataLoaded(data))
    .catch((err) => this.onError(err));
  }

  public componentDidMount(): void {
    this.getData(1);
  }

  public render() {
    return (
      <div className="audit__wrapper">
        {/*<h2 className="audit__title">Аудит</h2>*/}
        <div className="audit__timeline">

        { !this.state.loading ?
          <ReactTable
            data={this.state.data}
            className={"audit__react-table"}
            noDataText={'Записи отсутствуют'}
            getTheadThProps={() => getTheadThProps()}
            columns={[
              {
                Header: "Дата события",
                accessor: "date",
                filterable: false
              },
              {
                Header: "Объект",
                accessor: "caption",
                filterable: false
              },
              {
                Header: "Старое значение",
                accessor: "oldValue",
                filterable: false
              },
              {
                Header: "Новое значение",
                accessor: "newValue",
                filterable: false
              },
              {
                Header: "Пользователь",
                accessor: "createdBy",
                filterable: false
              }
            ]}
            minRows={0}
            defaultPageSize={10}
            showPagination={false}
          />
        :
          <p>Loading</p>
        }

        </div>
        <div className="audit__pagination">
          <Pagination
              pages={this.getPaginationList()}
          />
        </div>
      </div>
    );
  }
}
