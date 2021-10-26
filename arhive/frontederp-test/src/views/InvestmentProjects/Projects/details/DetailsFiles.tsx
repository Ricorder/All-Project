import { Button } from 'components/CustomButtons/Button';
import 'filepond/dist/filepond.min.css';
import React, { Component } from 'react';
import { FilePond } from 'react-filepond';
import ReactTable from 'react-table';
import './DetailsFiles.scss';
import { getTheadThProps } from 'utils/getTheadThProps';
import { Edit} from "@material-ui/icons";
import ApiService, { ODataRequest, OData } from "services/api";
import { ProjectModel } from "../project-model";
import { dateHandler } from "utils/dateHandler";
import {config} from 'services/config';

export interface DetailsFilesProps {
  project: ProjectModel;
}

export class DetailsFiles extends Component<DetailsFilesProps> {
  private _apiService = new ApiService();

  public loadingData: Array<any> = [];

  public state = {
    error: false,
    loading: true,
    project: null,
    data: []
  };

  public codeHandler(code: string): string {
    if (code === 'ES') {
      return 'Экспертный совет';
    }

    if (code === 'КФИ') {
      return 'КФИ';
    }

    if (code === 'SD') {
      return 'Совет директоров';
    }

    return '';
  }

  public dataPreprocessor(data: OData) {
    if (data === undefined) {
      return [];
    }

    return data.d['results'].map<any>((prop: any, key: any) => {
      return {
        id: prop['Id'],
        name: (
          prop['SPPath'] ? <a href={config.url.FILE_URL + prop['SPPath']} target="_blank">{prop['Name']}</a> : prop['Name']
        ),
        type: prop['MaterialType']['Name'],
        code: prop['Document']['Question']['Board']['Title'],
        // code: this.codeHandler(prop['Board']['Code']),
        version: prop['Version'],
        createdOn: dateHandler(prop['CreatedOn']),
        actions: (
          <div className="actions-right">
            <Button
              style={{ margin: 0 }}
              size="sm"
              justIcon
              round
              simple
              onClick={() => {
                const id = prop['Id'];
                let obj = this.state.data.find((o: any) => o.id === id);
                console.log(obj);
              }}
              color="info"
              className="like">
              <Edit/>
            </Button>{" "}
          </div>
        )
      };
    });
  }

  public onDataLoaded(data: OData): void {
    console.log('DetailsFiles data:', data);
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
      entityName: 'SibMaterialCollection',
      fields: [
        "Id",
        "Name",
        "MaterialType",
        // "Board/Code",
        "Document/Question/Board/Title",
        "Version",
        "SPPath",
        "CreatedOn"
      ],
      expands: [
        "Board",
        "MaterialType",
        "Question/Project",
        "Document/Question/Board"
      ],
      filter: `Project/Id eq guid'${this.props.project.id}' 
      or Question/Project/Id eq guid'${this.props.project.id}' 
      or Document/Project/Id eq guid'${this.props.project.id}'
      or Document/Question/Project/Id eq guid'${this.props.project.id}'`
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
      <div className="details-files__wrapper">
        <div className="details-files__container">
          { !this.state.loading ?
            <ReactTable
              data={this.state.data}
              className={"details-files__react-table"}
              noDataText={'Файлы отсутсвуют'}
              getTheadThProps={() => getTheadThProps()}
              columns={[
                {
                  Header: "Тип документа",
                  accessor: "type",
                  filterable: false,
                  className: "details-files__td-type",
                  headerClassName: "details-files__td-type"
                },
                {
                  Header: "Коллегиальный орган",
                  accessor: "code",
                  filterable: false,
                  className: "details-files__td-organ",
                  headerClassName: "details-files__td-organ"
                },
                {
                  Header: "Название",
                  accessor: "name",
                  filterable: false,
                  className: "details-files__td-link",
                  headerClassName: "details-files__td-link"
                },
                {
                  Header: "Дата создания",
                  accessor: "createdOn",
                  filterable: false,
                  className: "details-files__td-link",
                  headerClassName: "details-files__td-link"
                },
                // {
                //   Header: "Версия",
                //   accessor: "version",
                //   filterable: false,
                //   className: "details-files__td-version",
                //   headerClassName: "details-files__td-version"
                // },
                // {
                //   Header: "",
                //   accessor: "actions",
                //   sortable: false,
                //   filterable: false,
                //   className: "details-files__td-version",
                //   headerClassName: "details-files__td-version"
                // }
              ]}
              minRows={0}
              defaultPageSize={500}
              showPagination={false}
            />
          :
            <p>Loading</p>
          }

          {/* <div className="details-files__uploader">
            <FilePond labelIdle={`Перетащите файлы или <span class="filepond--label-action">Загрузите</span>`} />
          </div> */}
        </div>
      </div>
    );
  }
}
