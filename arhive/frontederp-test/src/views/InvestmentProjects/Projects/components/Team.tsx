import React, { Component } from "react";
import './Team.scss'

import PeopleOutlineTwoTone from "@material-ui/icons/PeopleOutlineTwoTone";
import Edit from "@material-ui/icons/Edit";
import IconButton from '@material-ui/core/IconButton/IconButton';

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";

import ApiService, { ODataRequest, OData } from "services/api";
import { ProjectModel } from "../project-model";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  cardIcon: {
    borderRadius: "50px",
  }
});
export interface TeamProps {
  project: ProjectModel;
}
const TeamListItem = (props: any) => {
  const {teamItem} = props;
  return (
    <div className="team__list--item">
      <div className="team__list--row">
        <div className="team__list--title">
          <div className="team__list--name">
            {teamItem.member}
          </div>
        </div>
        <div className="team__list--role">
          <div className={"team__list--badge" + (teamItem.role === "Администратор" ? " primary" : "")}>
            {teamItem.role}
          </div>
        </div>
      </div>
      <div className="team__list--row">
        <div className="team__list--descr">
          <div className="team__list--text">
            {teamItem.sysRole}
          </div>
        </div>
      </div>
    </div>
  );
}

const TeamList = (props: any) => {
  const teamList: any = props.teamList;
  const listItems = teamList.map((teamItem: any) =>
    <TeamListItem teamItem={teamItem} key={teamItem.id} />
  );

  return (
    <div className="team__list">
      {listItems}
    </div>
  );
}

export class Team extends Component<TeamProps> {
  private _apiService = new ApiService();

  public loadingData: Array<any> = [];

  public state = {
    error: false,
    loading: true,
    project: null,
    data: []
  };
  //public classes = useStyles();
  public dataPreprocessor(data: OData) {
    if (data === undefined) {
      return [];
    }

    return data.d['results'].map<any>((prop: any, key: any) => {
      return {
        id: prop['Id'],
        member: prop['TeamMember']['Name'] || prop['SysRole']['Name'],
        role: prop['TeamMemberRole']['Name'].split(' ')[0],
        sysRole:  prop['TeamMember']['Name'] ? prop['SysRole']['Name'] : 'Группа пользователей'
      };
    });
  }

  public onDataLoaded(data: OData): void {
    console.log('Team data:', data);
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
        "Id",
        "TeamMember/Name",
        "TeamMemberRole/Name",
        "SysRole/Name"
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
          <Card className="team__card">
            <CardHeader icon>
              <CardIcon color="info" className={"icon-small"}>
                <PeopleOutlineTwoTone/>
              </CardIcon>

              <h4 className="team__title">Команда проекта</h4>

              {/* <IconButton style={{position: "absolute", right: -12, top: "4px", padding: 0, height: "30px" }}>
                <Edit style={{width: "14px", height: "14px"}}/>
              </IconButton> */}

            </CardHeader>
            <CardBody className={"team__card--body"}>
              <TeamList teamList={this.state.data} />
            </CardBody>
          </Card>
        :
          <p>Loading</p>
        }
      </>
    );
  }
}
