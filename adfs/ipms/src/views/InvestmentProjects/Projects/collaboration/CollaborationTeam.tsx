import React, { Component } from "react";
import ReactTable from "react-table";
import { getTheadThProps } from "utils/getTheadThProps";

import ApiService, { ODataRequest, OData } from "services/api";
import { ProjectModel } from "../project-model";

export interface CollaborationTeamProps {
  project: ProjectModel;
}

const dataMembers = [
  {
    member: "Федосеева Ирина Викторовна",
    AdName: "fedoseeva",
    role: "Секретарь"
  },
  {
    member: "Смирнов Андрей Геннадьевич",
    AdName: "smirnov",
    role: "Наблюдатель"
  },
  {
    member: "Романова Дарья Дмитриевна",
    AdName: "d.romanova",
    role: "Администратор"
  },
  {
    member: "Пархоменко Александр Владимирович",
    AdName: "Parhomenko",
    role: "Наблюдатель"
  },
  {
    member: "Мигунов Василий Владимирович",
    AdName: "v.migunov",
    role: "Наблюдатель"
  },
  {
    member: "Мельников Никита Романович",
    AdName: "melnikov",
    role: "Участник"
  }
];

export class CollaborationTeam extends Component<CollaborationTeamProps> {
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
        member: prop['TeamMember']['Name'],
        role: prop['TeamMemberRole']['Name'],
        sysRole: prop['SysRole']['Name']
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
      entityName: 'SibProjectTeamCollection',
      fields: [
        "TeamMember",
        "TeamMemberRole",
        "SysRole"
      ],
      expands: [
        "TeamMember",
        "TeamMemberRole",
        "SysRole"
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
            pageSize={7}
            getTheadThProps={() => getTheadThProps()}
            columns={[
              {
                Header: "Участник команды",
                accessor: "member"
              },
              {
                Header: "Орг. Роль",
                accessor: "sysRole"
              },
              {
                Header: "Роль участника",
                accessor: "role"
              }
            ]}
          />
        :
          <p>Loading</p>
        }
      </>
    );
  }
}
