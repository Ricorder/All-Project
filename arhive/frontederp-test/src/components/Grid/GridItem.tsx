import Grid from "@material-ui/core/Grid";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library to set properties for components
import { ReactNodeLike } from "prop-types";
import React from "react";

const styles = {
  grid: {
    padding: "0 15px !important",
    width: "100%"
  }
};

const useStyles = makeStyles(styles);

interface GridItemProps {
  children?: ReactNodeLike;
  className?: any;
  [index: string]: any;
}

const GridItem: React.FC<GridItemProps> = (props: GridItemProps) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}

export default GridItem;
