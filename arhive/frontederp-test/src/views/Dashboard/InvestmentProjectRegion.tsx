import {makeStyles} from "@material-ui/core";
import {cardTitle, grayColor} from "../../assets/jss/material-dashboard-pro-react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import React, {useState} from "react";
import ReactTable from "react-table";
import Assignment from "@material-ui/icons/Assignment";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {getTheadThProps} from "../../utils/getTheadThProps";
import fake from "assets/img/partners/fake-partner.svg";

import Avatar from "@material-ui/core/Avatar";
import { config } from 'services/config';
import { stages } from "../InvestmentProjects/Projects/Projects";
import { statuses } from "./InvestmentProjectsChart";
import { industryGuids } from "./Industry";
import format from "date-fns/format";

const useStyles = makeStyles({
    cardTitle: {
        ...cardTitle,
        marginTop: "15px",
    },
    cardCategory: {
        color: grayColor[0],
        fontSize: "14px",
        paddingTop: "10px",
        marginBottom: 0,
        marginTop: 0,
        margin: 0
    },
    center: {
        textAlign: "center"
    }
});

export const InvestmentProjectRegion: React.FC<any> = (props) => {
    const classes = useStyles();
    const {
        data,
        click
    } = props;

    const tables: any = {
        true: [],
        false: [],
    };

    if (props.data && props.data.length) {
        tables.true = dataPreprocessor(props.data.filter((p: any) => p.Status.Id === statuses.work));
        tables.false = dataPreprocessor(props.data);
    }

    const [value = 'false', setValue] = useState(0);

    const changeProjects = (event: React.ChangeEvent<{}>, newValue?: any) => {
        setValue(newValue);
    };

    const onRowClick = (state: any, rowInfo: any, column: any, instance: any) => {
        return {
            onClick: (e: any) => {
                props.click(rowInfo.original.id);
            }
        }
    };

    function getAvatar(id: string) {
        let src = fake;
        if (id && id !== '00000000-0000-0000-0000-000000000000') {
            src = `${config.url.API_URL}/0/img/entity/hash/SysImage/Data/${id}`;
        }

        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: '0.9em'}}>
                <Avatar src={src} style={{height: "32px", width: "32px"}} />
            </div>
        );
    }

    function getLogo(id: string) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: '0.9em'}}>
                <img src={`${config.url.API_URL}/0/img/entity/hash/SysImage/Data/${id}`} style={{height: "32px"}} />
            </div>
        );
    }

    function dataPreprocessor(data: any) {
        if (data === undefined) {
            return;
        }

        return data.map((prop: any, key: any) => {
            return {
                id: prop['Id'],
                logo: getAvatar(prop['OrgStructureUnit']['Head']['Contact']['Photo']['Id']),
                name: prop['Name'],
                type: prop['Type']['Name'],
                status: prop['Status']['Name'],
                subDivision: prop['OrgStructureUnit']['Name'],
                investRegion: prop['AfkRegion']['Name'],
                implementingCompany: Boolean(prop['Account']['AccountLogo']['Name']) ? getLogo(prop['Account']['AccountLogo']['Id']) : prop['Account']['Name'],
                investmentSize: prop['InvestmentsVolume'],
                createdOn: format(new Date(prop['CreatedOn']), 'dd.MM.yyyy'),
                stage: stages[prop['Stage']['Order']] || '',
                owner: prop['Owner']['Name'],
                industry: industryGuids[prop['Industry']['IndustryLevel1']['Id']] ? industryGuids[prop['Industry']['IndustryLevel1']['Id']].name : prop['Industry']['IndustryLevel1']['Name'],
                afkShare: prop['InvestmentsAFKPart'],
                sibAddress: prop['SibAddress']['Name'],
                number: prop['Number'],
                subType: '',
            };
        });
    }


    return (
        <Card>
            <CardHeader color="success" icon style={{display: "flex", alignItems: "center"}}>
                <CardIcon color="primary">
                    <Assignment></Assignment>
                </CardIcon>
                <p className={classes.cardCategory}>&nbsp;</p>
                <h3 className={classes.cardTitle} style={{paddingRight: "16px", textAlign: "left"}}>Инвестиционные проекты в регионе</h3>
                <div style={{position: "absolute", top: "0", right: "0", marginTop: "1em"}}>
                    <FormControlLabel className="switch__control"
                        control={
                            <Switch className="switch__primary"
                                value={value}
                            />
                        }
                        label="Активные проекты"
                        onChange={changeProjects}
                    />
                </div>
            </CardHeader>
            <CardBody>
                <ReactTable
                    data={tables[value || 'false']}
                    sortable={false}
                    // filterable
                    // defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row)}
                    getTheadThProps={() => getTheadThProps()}
                    columns={[
                        {
                            Header: "",
                            accessor: "logo",
                            sortable: false,
                            resizable: false,
                            headerClassName: 'projects__table-avatar',
                            className: 'projects__table-avatar'
                        },
                        {
                            Header: "Название",
                            accessor: "name"
                        },
                        {
                            Header: "Компания",
                            headerClassName: "text-center",
                            accessor: "implementingCompany",
                            className: "justify-center text-center"
                        },
                        {
                            Header: "Индустрия",
                            accessor: "industry"
                        },
                        {
                            Header: "Стадия",
                            accessor: "stage"
                        },
                        {
                            Header: "Статус",
                            accessor: "status"
                        },
                        {
                            Header: "Дата создания",
                            accessor: "createdOn"
                        }
                    ]}
                    minRows={1}
                    showPagination={false}
                    defaultPageSize={10000}
                    // PreviousComponent={prev}
                    // NextComponent={next}
                    // showPaginationBottom
                    getTrProps={onRowClick}
                    className="projects__table projects__table-highlight"
                />
            </CardBody>
        </Card>
    );
};