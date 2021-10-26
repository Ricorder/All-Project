import React from 'react'
import { BusinessProcessStep } from './BusinessProcessStep'
import { Button } from 'components/CustomButtons/Button'
import './BusinessProcessFlow.scss'
import DoneIcon from "@material-ui/icons/Done";

export interface BusinessProcessFlowProps {
  stage: any;
  className?: string;
}

const orderList: any = {
  '37dc1ccc-190a-49a1-9507-a5dfdbf900ff': 1,
  '8554da09-fd85-44ba-83a2-e626679601e0': 2,
  // '03ef0fed-81f9-4d9f-8d9d-61bdb0310bf0': 3,
  '04e036e4-5e62-4a50-ba15-b675c0cededf': 3
};

export const BusinessProcessFlow = (props: BusinessProcessFlowProps) => {
  const stageOrder: number = orderList[props.stage.Id];

  const setStageClass = (order: number) => {
    if (order < stageOrder) {
      return "success";
    }
    if (order === stageOrder) {
      return "bright-blue";
    }
    if (order > stageOrder) {
      return;
    }
  };

  return (
    <div className={props.className}>
      <div className={"business-process-flow"}>
        {/* <BusinessProcessStep roundedLeft={true} text={"Инвестидея"} color={setStageClass(1)}></BusinessProcessStep> */}
        {/* <BusinessProcessStep text={"Проработка"} color={setStageClass(2)}></BusinessProcessStep> */}
        {/* <BusinessProcessStep text={"Структурирование сделки"} color={setStageClass(3)}></BusinessProcessStep> */}
        {/* <BusinessProcessStep roundedRight={true} text={"Реализация"} color={setStageClass(3)}></BusinessProcessStep> */}
        {/* <Button style={{ height: "2rem", marginLeft: "1em", backgroundColor: "#0976b4" }} round size={"sm"} color={"primary"} onClick={() => { }}><DoneIcon className={"business-process-step__text"} /> Завершить стадию</Button> */}
      </div>
    </div>
  )
}