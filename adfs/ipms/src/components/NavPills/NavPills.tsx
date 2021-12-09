import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import styles from "assets/jss/material-dashboard-pro-react/components/navPillsStyle.js";
import classNames from "classnames";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { ReactNodeLike } from "prop-types";
import React from "react";
import SwipeableViews from "react-swipeable-views";

//================================================================================
export interface NavPillTab {
  tabButton: string;
  tabIcon: any;
  tabContent: ReactNodeLike;
}

export type NavPillColor = "primary" | "warning" | "danger" | "success" | "info" | "rose";

//================================================================================
export interface NavPillsProps {
  active?: number;
  tabs: NavPillTab[];
  color? :NavPillColor;
  direction?: string;
  horizontal?: {
    tabsGrid: any;
    contentGrid: any;
  },
  alignCenter?: boolean;
}

//================================================================================
const useStyles = makeStyles(styles as any);

export const NavPills: React.FC<NavPillsProps> = (props) => {
  const [active, setActive] = React.useState(props.active);
  const handleChange = (event: any, active: number) => {
    setActive(active);
  };
  const handleChangeIndex = (index: number) => {
    setActive(index);
  };
  const classes = useStyles();
  const { tabs, direction, color, horizontal, alignCenter } = props;
  const flexContainerClasses = classNames({
    [classes.flexContainer]: true,
    [classes.horizontalDisplay]: horizontal !== undefined
  });
  const tabButtons = (
    <Tabs
      classes={{
        root: classes.root,
        fixed: classes.fixed,
        flexContainer: flexContainerClasses,
        indicator: classes.displayNone
      }}
      value={active}
      onChange={handleChange}
      centered={alignCenter}
    >
      {tabs.map((prop, key) => {
        var icon: any = {};
        if (prop.tabIcon !== undefined) {
          icon["icon"] = <prop.tabIcon className={classes.tabIcon} />;
        }
        const pillsClasses = classNames({
          [classes.pills]: true,
          [classes.horizontalPills]: horizontal !== undefined,
          [classes.pillsWithIcons]: prop.tabIcon !== undefined
        });
        return (
          <Tab
            label={prop.tabButton}
            key={key}
            {...icon}
            classes={{
              root: pillsClasses,
              selected: classes[color as NavPillColor]
            }}
          />
        );
      })}
    </Tabs>
  );
  const tabContent = (
    <div className={classes.contentWrapper}>
      <SwipeableViews
        axis={"x"}
        index={active}
        onChangeIndex={handleChangeIndex}
        style={{ overflowY: "hidden" }}
      >
        {tabs.map((prop, key) => {
          return (
            <div className={classes.tabContent} key={key}>
              {prop.tabContent}
            </div>
          );
        })}
      </SwipeableViews>
    </div>
  );
  return horizontal !== undefined ? (
    <GridContainer>
      <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
      <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
    </GridContainer>
  ) : (
    <div>
      {tabButtons}
      {tabContent}
    </div>
  );
}

NavPills.defaultProps = {
  active: 0,
  color: "primary"
};