import Grid, { GridContentAlignment, GridDirection, GridItemsAlignment, GridJustification, GridSize, GridSpacing, GridWrap } from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import React from "react";

const styles = {
  grid: {
    margin: "0 -15px",
    width: "calc(100% + 30px)"
    // '&:before,&:after':{
    //   display: 'table',
    //   content: '" "',
    // },
    // '&:after':{
    //   clear: 'both',
    // }
  }
};

const useStyles = makeStyles(styles);

type GridProps = Partial<Record<Breakpoint, boolean | GridSize>> & {
  alignContent?: GridContentAlignment;
  alignItems?: GridItemsAlignment;
  container?: boolean;
  direction?: GridDirection;
  item?: boolean;
  justify?: GridJustification;
  spacing?: GridSpacing;
  wrap?: GridWrap;
  zeroMinWidth?: boolean;
};

export interface GridContainerProps extends GridProps {
  className?: string;
  [index: string]: any;
}

 const GridContainer: React.FC<GridContainerProps> = (props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

export default GridContainer;