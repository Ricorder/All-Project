import UIButton, { ButtonProps } from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";
import classNames from "classnames";
import React from "react";

const useStyles = makeStyles(styles as any);

export interface RegularButtonProps extends Omit<ButtonProps, 'color' | 'size'> {
  color?:
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "danger"
    | "rose"
    | "white"
    | "twitter"
    | "facebook"
    | "google"
    | "linkedin"
    | "pinterest"
    | "youtube"
    | "tumblr"
    | "github"
    | "behance"
    | "dribbble"
    | "reddit"
    | "transparent";
    size?: "sm" | "lg";
    simple?: boolean;
    round?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    block?: boolean;
    link?: boolean;
    justIcon?: boolean;
    className?: string;
    muiClasses?: any;
    children?: React.ReactNode;
}

export const Button = React.forwardRef((props: RegularButtonProps, ref: React.Ref<HTMLButtonElement>) => {
  const classes = useStyles();
  const {
    color,
    round,
    children,
    fullWidth,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size as string]]: size,
    [classes[color as string]]: color,
    [classes.round]: round,
    [classes.fullWidth]: fullWidth,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className as string]: className
  });
  return (
    <UIButton  {...rest} ref={ref} classes={muiClasses} className={btnClasses}>
      {children}
    </UIButton>
  );
});
