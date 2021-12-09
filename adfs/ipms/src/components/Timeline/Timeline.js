import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Badge from "components/Badge/Badge.js";

import styles from "assets/jss/material-dashboard-pro-react/components/timelineStyle.js";

const useStyles = makeStyles(styles);

export default function Timeline(props) {
  const classes = useStyles();
  const { stories, simple } = props;
  const timelineClass =
    classes.timeline +
    " " +
    cx({
      [classes.timelineSimple]: simple
    });
  return (
    <ul className={timelineClass}>
      {stories.map((prop, key) => {
        const panelClasses =
          classes.timelinePanel +
          " " +
          cx({
            [classes.timelinePanelInverted]: prop.inverted || simple,
            [classes.timelineSimplePanel]: simple
          });
        const timelineBadgeClasses =
          classes.timelineBadge +
          " " +
          classes[prop.badgeColor] +
          " " +
          cx({
            [classes.timelineSimpleBadge]: simple
          });
        return (
          <li className={classes.item} key={key}>
            {prop.badgeIcon ? (
              //TODO добавил стиль, поменять потом на входной параметр функции
              <div className={timelineBadgeClasses} style={{left:"1%"}}>
                <div className={classes.data}>
                  {prop.badgeIcon.split(" ")[0]}
                </div>
                <div className={classes.month}>
                  {prop.badgeIcon.split(" ")[1]}
                </div>
                {/* TODO Причесать изменения //<prop.badgeIcon className={classes.badgeIcon} /> */}
              </div>
            ) : null}
            <div className={panelClasses} style={{width: "96%"}}>
              {prop.title ? (
                <div className={classes.timelineHeading}>
                  <Badge color={prop.titleColor}>{prop.title}</Badge>
                </div>
              ) : null}
              <div className={classes.timelineBody}>{prop.body}</div>
              {prop.footerTitle ? (
                <h6 className={classes.footerTitle}>{prop.footerTitle}</h6>
              ) : null}
              {prop.footer ? <hr className={classes.footerLine} /> : null}
              {prop.footer ? (
                <div className={classes.timelineFooter}>{prop.footer}</div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

Timeline.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  simple: PropTypes.bool
};
