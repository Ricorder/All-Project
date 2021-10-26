import React, { Component } from "react";
import ApiService, { ODataRequest, OData } from "services/api";


//================================================================================
export interface NumberFIlesProps {
  id: any;
  actualDocumentId: any;
}

export default class NumberFIles extends Component<NumberFIlesProps> {
  private _apiService = new ApiService();

  public loadingData: Array<any> = [];

  public state = {
    error: false,
    loading: true,
    number: 0
  };

  public onDataLoaded(data: OData): void {
    console.log('NumberFIles data:', data.d['__count']);

    this.setState({
      error: false,
      loading: false,
      number: data.d['__count']
    });

  }

  public onError(err: any): void {
    this.setState({
      error: true,
      loading: false
    });
  }

  public getData(): void {
    let request: ODataRequest = {
      entityName: 'SibMaterialCollection',
      fields: [
        "Id",
      ],
      filter: `Question/Id eq guid'${this.props.id}' or Document/Id eq guid'${this.props.actualDocumentId}'`,
      count: true
    };

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
        { !this.state.loading ? <>{this.state.number}</> : 'loading' }
      </>
    );
  }
}
