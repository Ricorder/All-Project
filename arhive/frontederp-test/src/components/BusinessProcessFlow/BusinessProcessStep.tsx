import React from "react";
import classNames from "classnames";
import "./BusinessProcessStep.scss";
import { Button } from "components/CustomButtons/Button";
import DoneIcon from "@material-ui/icons/Done";


export const BusinessProcessStep = (props: {
  roundedLeft?: boolean;
  roundedRight?: boolean;
  text: string;
  color?: "success" | "bright-blue";
}) => {
  const buttonClasses = classNames({
    "business-process-step__button": true,
    "business-process-step__button--success": props.color === "success",
    "business-process-step__button--bright-blue": props.color === "bright-blue",
  });
  const leftCircleClasses =  classNames({
    "business-process-step__circle-left": true,
    "business-process-step__circle--success": props.color === "success",
    "business-process-step__circle--bright-blue": props.color === "bright-blue",
  });
  const rightCircleClasses =  classNames({
    "business-process-step__circle-right": true,
    "business-process-step__circle--success": props.color === "success",
    "business-process-step__circle--bright-blue": props.color === "bright-blue",
  });

  return (
    <div className="business-process-step__button-wrapper">
      {props.roundedLeft && <div className={leftCircleClasses}></div>}
      {props.roundedRight && <div className={rightCircleClasses}></div>}
      <Button disableRipple={true} size={"sm"} className={buttonClasses} >
        {props.color === "success" ? <DoneIcon className={"business-process-step__text"} /> : ''}<span className={"business-process-step__text"}>{props.text}</span>
      </Button>
    </div>
  );
};
