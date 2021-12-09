import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Divider from "@material-ui/core/Divider";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import DashboardIcon from "@material-ui/icons/Dashboard";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle";
import classNames from "classnames";
import { Button } from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import React from "react";

const useStyles = makeStyles(styles as any);

export interface HeaderLinksProps {
  close?: boolean;
  icon?: any;
}

export const AdminNavbarLinks: React.FC<HeaderLinksProps> = (props) => {
  const [notifications, setNotifications] = React.useState([
    { id: 0, text: "Проект завершен" },
    { id: 1, text: "У вас 5 активных задач" },
    { id: 2, text: "Заседание Совета директоров"},
    { id: 3, text: "Заполните данные своего профиля" },
    { id: 4, text: "Задача \"Проведение ЭС закрыта\"" }
  ]);

  const removeNotification = (notification: { id: number, text: string }) => {
    setNotifications(notifications.filter(n => n.id !== notification.id));
  };

  const [openNotification, setOpenNotification] = React.useState(null as any);
  const handleClickNotification = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const [openProfile, setOpenProfile] = React.useState(null as any);
  const handleClickProfile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (openProfile && openProfile.contains && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const classes = useStyles();
  const searchButton =
    classes.top +
    " " +
    classes.searchButton;
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover);
  const closeItem = classNames(
    classes.dropdownItem,
    classes.primaryHover,
    classes.notificationItem
  );
  const wrapper = classNames({
    [classes.wrapper]: true
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true
  });
  return (
    <div className={wrapper}>
      {/* <CustomInput
        formControlProps={{
          className: classes.top + " " + classes.search
        }}
        inputProps={{
          placeholder: "Поиск",
          inputProps: {
            className: classes.searchInput
          }
        }}
      />
      <Button color="white" justIcon round className={searchButton}>
        <SearchIcon
          className={classes.headerLinksSvg + " " + classes.searchIcon}
        />
      </Button>
      <Button
        color="transparent"
        simple
        justIcon
        href="admin/dashboard"
        className={classes.buttonLink}
        muiClasses={{
          label: ""
        }}
      >
        <DashboardIcon
          className={
            classes.headerLinksSvg +
            " " +
            classes.links
          }
        />
        <Hidden mdUp implementation="css">
          <span className={classes.linkText}>
            Dashboard
          </span>
        </Hidden>
      </Button>
      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          onClick={handleClickNotification}
          className={classes.buttonLink}
          muiClasses={{
            label: ""
          }}
        >
          <NotificationsIcon
            className={
              classes.headerLinksSvg +
              " " +
              classes.links
            }
          />
          <span className={classes.notifications}>{notifications.length}</span>
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickNotification}
              className={classes.linkText}
            >
              Notification
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openNotification,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {notifications.map(notification => (
                      <MenuItem
                        key={notification.id}
                        onClick={() => removeNotification(notification)}
                        className={closeItem}
                      >
                        <span className={classes.notificationText}>
                          {notification.text}
                        </span>
                        <IconButton
                          size="small"
                          className={classes.iconButton}
                          key="close"
                          color="inherit"
                          disableRipple={true}
                        >
                          <CloseIcon className={classes.close} />
                        </IconButton>
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          onClick={handleClickProfile}
          className={classes.buttonLink}
          muiClasses={{
            label: ""
          }}
        >
          <PersonIcon
            className={
              classes.headerLinksSvg +
              " " +
              classes.links
            }
          />
          <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              Profile
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      component={Link}
                      href="/admin/user-page"
                      // onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      Профиль
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      Log out
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div> */}
    </div>
  );
}