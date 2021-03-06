import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/cardBodyStyle.js";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(styles as any);

export interface CardBodyProps {
  className?: string;
  background?: boolean;
  plain?: boolean;
  formHorizontal?: boolean;
  pricing?: boolean;
  signup?: boolean;
  color?: boolean;
  profile?: boolean;
  calendar?: boolean;
  [index: string]: any;
}

const CardBody:React.FC<CardBodyProps> = (props) => {
  const classes = useStyles();
  const {
    className,
    children,
    background,
    plain,
    formHorizontal,
    pricing,
    signup,
    color,
    profile,
    calendar,
    ...rest
  } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyBackground]: background,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyFormHorizontal]: formHorizontal,
    [classes.cardPricing]: pricing,
    [classes.cardSignup]: signup,
    [classes.cardBodyColor]: color,
    [classes.cardBodyProfile]: profile,
    [classes.cardBodyCalendar]: calendar,
    [className as string]: className !== undefined
  });
  return (
    <div className={cardBodyClasses} {...rest}>
      {children}
    </div>
  );
}

export default CardBody;