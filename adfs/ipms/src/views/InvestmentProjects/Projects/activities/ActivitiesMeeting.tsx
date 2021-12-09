import React, { useCallback } from "react";
import ReactTable from "react-table";
import { getTheadThProps } from "utils/getTheadThProps";

const data = [
  {
    name: "Встреча с ГД",
    start: "31.11.2019",
    details: "Встреча с гениральныйм директором",
    address: "Москва, ул. Воротынская, д 8",
    status: "Ожидает выполнения"
  },
  {
    name: "Встреча с советом директоров",
    start: "05.11.2019",
    details: "Обсуждение перспектив",
    address: "Москва, ул. Воротынская, д 8",
    status: "Ожидает выполнения"
  }
];

export function ActivitiesMeeting() {
  return (
    <ReactTable
      data={data}
      showPagination={false}
      pageSize={2}
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