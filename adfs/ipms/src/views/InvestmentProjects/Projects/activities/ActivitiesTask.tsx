import React, { useCallback } from "react";
import ReactTable from "react-table";
import { getTheadThProps } from "utils/getTheadThProps";
  
 const data = [
    {
      name: "Назначить СД",
      start: "25.10.2019",
      end: "Секретарь",
      type: "Задача",
      category: "Выполнить",
      status: "Выполнена"
    },
    {
        name: "Отправить согласование",
        start: "28.10.2019",
        end: "29.10.2019",
        type: "Задача",
        category: "Выполнить",
        status: "Не начата"
    },
    {
        name: "Согласовать отправку",
        start: "29.10.2019",
        end: "31.10.2019",
        type: "Согласование",
        category: "Согласование",
        status: "Отменена"
      },
      {
        name: "Заполнить проект решения",
        start: "29.10.2019",
        end: "31.10.2019",
        type: "Задача",
        category: "Выполнить",
        status: "Отменена"
      },
      {
        name: "Назначить КФИ",
        start: "29.10.2019",
        end: "31.10.2019",
        type: "Задачи",
        category: "Выполнить",
        status: "Не начата"
      }
  ];
  
  export function ActivitiesTask() {
    return (
      <ReactTable
        data={data}
        showPagination={false}
        pageSize={5}
        getTheadThProps={() => getTheadThProps()}
        columns={[
          {
            Header: "Название",
            accessor: "name"
          },
          {
            Header: "Начало",
            accessor: "start"
          },
          {
            Header: "Завершение",
            accessor: "end"
          },
          {
            Header: "Тип задачи",
            accessor: "type"
          },
          {
            Header: "Статус",
            accessor: "status"
          }
        ]}
      />
    );
  }