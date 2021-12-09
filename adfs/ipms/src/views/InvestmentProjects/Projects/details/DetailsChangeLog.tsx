import React, { useCallback } from "react";
import ReactTable from "react-table";
import { getTheadThProps } from "utils/getTheadThProps";

const data = [
  {
    author: "Василевский Артем Павлович",
    date: "21.10.2019 19:34",
    title: "Фактическая дата завершения",
    oldValue: "",
    newValue: "21.10.2019"
  },
  {
    author: "Василевский Артем Павлович",
    date: "21.10.2019 19:34",
    title: "Фактическая дата завершения",
    oldValue: "",
    newValue: "21.10.2019"
  },
  {
    author: "Василевский Артем Павлович",
    date: "21.10.2019 19:34",
    title: "Фактическая дата завершения",
    oldValue: "",
    newValue: "21.10.2019"
  },
  {
    author: "Василевский Артем Павлович",
    date: "21.10.2019 19:34",
    title: "Фактическая дата завершения",
    oldValue: "",
    newValue: "21.10.2019"
  },
  {
    author: "Василевский Артем Павлович",
    date: "21.10.2019 19:34",
    title: "Фактическая дата завершения",
    oldValue: "",
    newValue: "21.10.2019"
  },
  {
    author: "Василевский Артем Павлович",
    date: "21.10.2019 19:34",
    title: "Фактическая дата завершения",
    oldValue: "",
    newValue: "21.10.2019"
  },
  {
    author: "Василевский Артем Павлович",
    date: "21.10.2019 19:34",
    title: "Фактическая дата завершения",
    oldValue: "",
    newValue: "21.10.2019"
  },
  {
    author: "Василевский Артем Павлович",
    date: "21.10.2019 19:34",
    title: "Фактическая дата завершения",
    oldValue: "",
    newValue: "21.10.2019"
  },
  {
    author: "Василевский Артем Павлович",
    date: "21.10.2019 19:34",
    title: "Фактическая дата завершения",
    oldValue: "",
    newValue: "21.10.2019"
  },
  {
    author: "Василевский Артем Павлович",
    date: "21.10.2019 19:34",
    title: "Фактическая дата завершения",
    oldValue: "",
    newValue: "21.10.2019"
  }
];

export function DetailsChangeLog() {
  return (
    <ReactTable
      data={data}
      showPagination={false}
      getTheadThProps={() => getTheadThProps()}
      pageSize={8}
      columns={[
        {
          Header: "Изменил",
          accessor: "author",
          headerClassName: "change-log-table__header--left"
        },
        {
          Header: "Дата изменения",
          accessor: "date",
          headerClassName: "change-log-table__header--left"
        },
        {
          Header: "Наименование значения",
          accessor: "title",
          headerClassName: "change-log-table__header--left"
        },
        {
          Header: "Старое значение",
          accessor: "oldValue",
          headerClassName: "change-log-table__header--left"
        },
        {
          Header: "Новое значение",
          accessor: "newValue",
          headerClassName: "change-log-table__header--left"
        }
      ]}
    />
  );
}