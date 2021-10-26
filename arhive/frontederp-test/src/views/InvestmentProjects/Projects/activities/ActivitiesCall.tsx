import React from "react";
import ReactTable from "react-table";
import { getTheadThProps } from "utils/getTheadThProps";
  
 const data = [
    {
      name: "Обсдуть перспективы проекта с УП",
      date: "25.10.2019",
      details: "Уточнить детали и насколько интересен данный проект",
      status: "Выполнена"
    },
    {
        name: "Собрать информацию о компании",
        date: "29.10.2019",
        details: "Сбор первичной аналитики",
        status: "Ожидает выполнения"
    },
    {
        name: "Командный сбор",
        date: "30.10.2019",
        details: "Общее обсуждение",
        status: "Ожидает выполнения"
    }
  ];
  
  export function ActivitiesCall() {
    return (
      <ReactTable
        data={data}
        showPagination={false}
        pageSize={4}
        getTheadThProps={() => getTheadThProps()}
        columns={[
          {
            Header: "Название",
            accessor: "name"
          },
          {
            Header: "Дата выполнения",
            accessor: "date"
          },
          {
            Header: "Описание",
            accessor: "details"
          },
          {
            Header: "Статус",
            accessor: "status"
          }
        ]}
      />
    );
  }