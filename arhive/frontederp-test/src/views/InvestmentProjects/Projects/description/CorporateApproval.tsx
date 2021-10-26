import React, { Component } from "react";
import "./CorporateApproval.scss";

import ApiService, { ODataRequest, OData } from "services/api";
import { ProjectModel } from "../project-model";
import { Add } from "@material-ui/icons";
import { AttachFile } from "@material-ui/icons";

import NumberFiles from "./NumberFIles";
import Voting from "./Voting";

import { dateHandler } from "utils/dateHandler";

const StageListItem = (props: any) => {
  const {stageItem} = props;
  return (
    <div className="corporate-approval__timeline--row">
      <div className="corporate-approval__timeline--tree">
        <div className="corporate-approval__tree--item">
          { stageItem.code === 'KFI' ? <div className="corporate-approval__avatar orange">КФИ</div> : null}
          { stageItem.code === 'SD' ? <div className="corporate-approval__avatar orange">СД</div> : null}
          { stageItem.code === 'ES' ? <div className="corporate-approval__avatar primary">ЭС</div> : null}
          { stageItem.code === '' ? <div className="corporate-approval__avatar orange">РГ</div> : null}
        </div>
      </div>
      <div className="corporate-approval__timeline--card">
        <div className="corporate-approval__card--header">
          <div className="corporate-approval__card--badge green">
            {stageItem.status}
          </div>
          { stageItem.date ? 
          <div className="corporate-approval__card--date">
            <span><strong>Дата заседания:</strong>
              &nbsp;{stageItem.date}
            </span>
          </div>
          : null}
        </div>
        <div className="corporate-approval__card--content">
          <p className="paragraph">
            {stageItem.description}
          </p>
        </div>
        { stageItem.IsNotVoeting === false && stageItem.showVote ?
          <div className="corporate-approval__card--footer">
            <Voting id={stageItem.id}></Voting>
          </div>
        : null}
        {/* <div className="corporate-approval__card--panel">
          <div className="corporate-approval__note">
            <AttachFile/>
            <div className="corporate-approval__note--count">
              <NumberFiles id={stageItem.id} actualDocumentId={stageItem.actualDocumentId}></NumberFiles>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

const StageList = (props: any) => {
  const stageList: any = props.stageList;
  console.log('stageList', stageList);
  const listItems = stageList.map((stageItem: any) =>
    <StageListItem stageItem={stageItem} key={stageItem.id} />
  );

  return (
    <>
      {listItems}
    </>
  );
}

//================================================================================
export interface CorporateApprovalProps {
  project: ProjectModel;
}

export default class CorporateApproval extends Component<CorporateApprovalProps> {
  private _apiService = new ApiService();

  public loadingData: Array<any> = [];

  public state = {
    error: false,
    loading: true,
    data: []
  };

  public showVote(data: any): boolean {
    if (data['Name'] === 'Голосование завершено' || data['Name'] === 'Идет голосование') {
      return true;
    }

    return false;
  }

  public dataPreprocessor(data: OData) {
    if (data === undefined) {
      return [];
    }

    return data.d['results'].map<any>((prop: any, key: any) => {
      return {
        id: prop['Id'],
        code: prop['Board']['Code'],
        name: prop['Name'],
        description: prop['Name'],
        status: prop['Status']['Name'].split('. ')[1],
        date: dateHandler(prop['Meeting']['MeetingDateActual']),
        showVote: this.showVote(prop['VoteStatus']),
        IsNotVoeting: prop['IsNotVoeting'],
        actualDocumentId: prop['ActualDocumentId']
      };
    });
  }

  public onDataLoaded(data: OData): void {
    console.log('CorporateApproval data:', data);
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
        "Id",
        "Name",
        "Type",
        "Status",
        "Board",
        "Meeting",
        "VoteStatus/Id",
        "VoteStatus/Name",
        "IsNotVoeting"
      ],
      expands: [
        "Project/SibAddress/Country",
        "Type",
        "Meeting",
        "Status",
        "Board",
        "SubType",
        "VoteStatus"
      ],
      filter: `Project/Id eq guid'${this.props.project.id}'`,
      orderby: `DateOfBoardScheduled`
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
      <div className="corporate-approval__wrapper">
        <h2 className="corporate-approval__title">Корпоративное одобрение</h2>
        <div className="corporate-approval__timeline">

          <div className="corporate-approval__timeline--actions">
            {/* <div className="corporate-approval__actions--btn">
              <Add/>
            </div> */}
          </div>

          <StageList stageList={this.state.data}></StageList>
        </div>
      </div>
    );
  }
}
