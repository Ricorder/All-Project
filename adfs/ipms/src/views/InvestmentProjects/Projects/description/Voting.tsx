import React, { Component } from "react";
import ApiService, { ODataRequest, OData } from "services/api";


//================================================================================
export interface VotingProps {
  id: any;
}

export default class Voting extends Component<VotingProps> {
  private _apiService = new ApiService();

  public loadingData: Array<any> = [];

  public state = {
    error: false,
    loading: true,
    data: {y: 0, n: 0, a: 0}
  };
  
  public dataPreprocessor(data: Array<any>) {
    if (data === undefined) {
      return [];
    }

    const result = {y: 0, n: 0, a: 0};

    for (const key in data) {
      const element = data[key]['VoteKind']['Name'];

      if (element === 'За') {
        result.y++;
      }

      if (element === 'Против') {
        result.n++;
      }

      if (element === 'Воздержался') {
        result.a++;
      }
    }

    return result;
  }

  public onDataLoaded(data: OData): void {
    console.log('Voting data:', data);
    this.loadingData = this.loadingData.concat(data.d['results']);

    if (data.d['__next']) {
      this.getData(data.d['__next'].split('$skiptoken=')[1]);

      return;
    }

    this.setState({
      error: false,
      loading: false,
      data: this.dataPreprocessor(this.loadingData)
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
      entityName: 'SibParticipantVotingCollection',
      fields: [
        "VoteKind/Name",
      ],
      expands: [
        "VoteKind",
      ],
      filter: `Question/Id eq guid'${this.props.id}'`,
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
          <>
            <div className="corporate-approval__vote-for">ЗА: <span className="vote-count">{this.state.data.y}</span> голосов</div>
            <div className="corporate-approval__abstained">ВОЗДЕРЖАЛСЯ: <span className="vote-count">{this.state.data.a}</span> голосов</div>
            <div className="corporate-approval__vote-against">ПРОТИВ: <span className="vote-count">{this.state.data.n}</span> голосов</div>
          </>
         : 'loading' }
      </>
    );
  }
}
