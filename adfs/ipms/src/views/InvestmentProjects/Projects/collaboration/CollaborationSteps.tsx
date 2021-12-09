import React, { Component } from "react";
import ReactTable from "react-table";
import { getTheadThProps } from "utils/getTheadThProps";

import ApiService, { ODataRequest, OData } from "services/api";
import { ProjectModel } from "../project-model";

import format from "date-fns/format";

export interface CollaborationStepsProps {
  project: ProjectModel;
}

const data = [
  {
    title: "КФИ №1 согласование бюджкта",
    type: "Рассмотрение КО",
    status: "ОК. Принято решение по вопросу",
    collegialBody: 'ПАО АФК "Система"',
    meetingDate: "21.10.2019",
    addDate: "21.10.2019"
  },
  {
    title: "КФИ №1 согласование бюджкта",
    type: "Рассмотрение КО",
    status: "ОК. Принято решение по вопросу",
    collegialBody: 'ПАО АФК "Система"',
    meetingDate: "21.10.2019",
    addDate: "21.10.2019"
  },
  {
    title: "КФИ №1 согласование бюджкта",
    type: "Рассмотрение КО",
    status: "ОК. Принято решение по вопросу",
    collegialBody: 'ПАО АФК "Система"',
    meetingDate: "21.10.2019",
    addDate: "21.10.2019"
  },
  {
    title: "КФИ №1 согласование бюджкта",
    type: "Рассмотрение КО",
    status: "ОК. Принято решение по вопросу",
    collegialBody: 'ПАО АФК "Система"',
    meetingDate: "21.10.2019",
    addDate: "21.10.2019"
  },
  {
    title: "КФИ №1 согласование бюджкта",
    type: "Рассмотрение КО",
    status: "ОК. Принято решение по вопросу",
    collegialBody: 'ПАО АФК "Система"',
    meetingDate: "21.10.2019",
    addDate: "21.10.2019"
  },
  {
    title: "КФИ №1 согласование бюджкта",
    type: "Рассмотрение КО",
    status: "ОК. Принято решение по вопросу",
    collegialBody: 'ПАО АФК "Система"',
    meetingDate: "21.10.2019",
    addDate: "21.10.2019"
  },
  {
    title: "КФИ №1 согласование бюджкта",
    type: "Рассмотрение КО",
    status: "ОК. Принято решение по вопросу",
    collegialBody: 'ПАО АФК "Система"',
    meetingDate: "21.10.2019",
    addDate: "21.10.2019"
  },
  {
    title: "КФИ №1 согласование бюджкта",
    type: "Рассмотрение КО",
    status: "ОК. Принято решение по вопросу",
    collegialBody: 'ПАО АФК "Система"',
    meetingDate: "21.10.2019",
    addDate: "21.10.2019"
  }
];

const dataMembers = [
  {
    member: "Федосеева Ирина Викторовна",
    AdName: "fedoseeva",
    role: "Секретарь"
  },
  {
    member: "Федосеева Ирина Викторовна",
    AdName: "fedoseeva",
    role: "Секретарь"
  }
];

export class CollaborationSteps extends Component<CollaborationStepsProps> {
  private _apiService = new ApiService();

  public loadingData: Array<any> = [];

  public state = {
    error: false,
    loading: true,
    open: false,
    project: null,
    data: []
  };

  public dataPreprocessor(data: OData) {
    if (data === undefined) {
      return [];
    }

    return data.d['results'].map<any>((prop: any, key: any) => {
      return {
        name: prop['Name'],
        type: prop['Type']['Name'],
        status: prop['Status']['Name'],
        board: prop['Board']['Name'],
        date: format(new Date(parseInt(prop['DateOfBoardScheduled'].slice(6))), 'dd.MM.yyyy'),
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
      entityName: 'SibQuestionCollection',
      fields: [
        "Name",
        "Type",
        "Status",
        "Board",
        "DateOfBoardScheduled"
      ],
      expands: [
        "Type",
        "Status",
        "Board",
        "DateOfBoardScheduled"
      ],
      filter: `Project/Id eq guid'${this.props.project.id}'`
    };

    if (token) {
      request.token = token;
    }

    this._apiService.getOData(request)
    .then((data: OData) => this.onDataLoaded(data))
    .catch((err) => this.onError(err));
  }

  public componentDidMount(): void {
    this.getData();
  }

  public render() {
    return (
      <>
        { !this.state.loading ?
          <ReactTable
            data={this.state.data}
            showPagination={false}
            minRows={0}
            pageSize={8}
            getTheadThProps={() => getTheadThProps()}
            columns={[
              {
                Header: "Название",
                accessor: "name"
              },
              {
                Header: "Тип",
                accessor: "type"
              },
              {
                Header: "Статус",
                accessor: "status"
              },
              {
                Header: "Коллегиальный орган",
                accessor: "board"
              },
              {
                Header: "Дата заседания",
                accessor: "date"
              },
              // {
              //   Header: "Дата добавления в повестку",
              //   accessor: "addDate"
              // }
            ]}
          />
        :
          <p>Loading</p>
        }
      </>
    );
  }
}
