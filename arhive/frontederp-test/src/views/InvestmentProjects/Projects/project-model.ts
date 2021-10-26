//================================================================================
export interface ProjectModel {
    id: string;
    logo?: JSX.Element;
    name: string;
    description?: string;
    type?: string;
    status: string;
    statusOrder?: number;
    subDivision?: string;
    investRegion?: string;
    implementingCompany: string;
    investmentSize?: string;
    createdOn: string;
    stage: any;
    owner?: string;
    industry: string;
    number?: string;
    afkShare?: string;
    sibAddress?: string;
    subType?: string;
    projectEndDate?: string;
    projectFactEndDate?: string;
}

//================================================================================
export const emptyProject: ProjectModel = {
    id: '',
    name: '',
    description: '',
    type: '',
    status: '',
    subDivision: '',
    investRegion: '',
    implementingCompany: '',
    investmentSize: '',
    createdOn: '',
    stage: '',
    owner: '',
    industry: '',
    number: '',
    afkShare: '',
    sibAddress: '',
    subType: '',
    projectEndDate: '',
    projectFactEndDate: '',
}
