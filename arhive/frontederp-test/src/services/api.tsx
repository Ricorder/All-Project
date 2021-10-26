import auth from "services/authStore";
import { config } from 'services/config';

export interface ODataRequest {
  entityName: string;
  fields?: Array<string>;
  expands?: Array<string>;
  filter?: string;
  skip?: number;
  top?: number;
  token?: string;
  orderby?: string;
  count?: boolean;
  url?: string;
  service?: string;
}

export interface OData {
  d: {
    results: Array<Object>,
    __next: string,
    __count: string
  }
}

export default class ApiService {
  constructor() {}

  private _ApiBase: string = `${config.url.API_URL}/0/ServiceModel/EntityDataService.svc/`;
  private _auth = auth;

  private async _getData(url: string, custom: string | boolean) {
    const res = await fetch(
      custom ? `${custom}${url}` : `${this._ApiBase}${url}`,
      {
        headers: {
            'accept': 'application/json;odata=verbose',
            'content-type': 'application/json',
            'forceusesession': 'true',
            'ForceUseSession': 'true',
          },
          credentials: 'include'
        }
    );

    if (res.status === 401) {
      console.log('Error status: ', res.status);
      // window.location.href = `/Login/NuiLogin.aspx?ReturnUrl=${window.location.href}`;
      this._auth.logout();
    }

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}`);
    }

    return await res.json();
  }

  public async getOData(request: ODataRequest): Promise<any> {
    let url = request.url ? request.entityName : `${request.entityName}/?`;

    if (request.fields) {
      const fieldsString = request.fields.join(',');
      url = `${url}$select=${fieldsString}`;
    }

    if (request.expands) {
      const expandsString = request.expands.join(',');
      url = `${url}&$expand=${expandsString}`;
    }

    if (request.filter) {
      url = `${url}&$filter=${request.filter}`;
    }

    if (request.skip) {
      url = `${url}&$skip=${request.skip}`;
    }

    if (request.top) {
      url = `${url}&$top=${request.top}`;
    }

    if (request.token) {
      url = `${url}&$skiptoken=${request.token}`;
    }

    if (request.orderby) {
      url = `${url}&$orderby=${request.orderby}`;
    }

    if (request.count) {
      url = `${url}&$inlinecount=allpages`;
    }

    return await this._getData(url, request.url || false);
  }

  public async getService(request: ODataRequest): Promise<any>{
    let url: string = request.url || "";
    return await this._getData("", url);

  }
}
