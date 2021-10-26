import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes, { AppRoute } from "../routes";
import auth from "services/authStore";

import { makeStyles } from "@material-ui/core/styles";

import pricing from "assets/img/bg-pricing.jpeg";
import error from "assets/img/clint-mckoy.jpg";
import lock from "assets/img/lock.jpeg";
import login from "assets/img/login.jpeg";
import register from "assets/img/register.jpeg";
// import styles from "assets/jss/material-dashboard-pro-react/layouts/authStyle";
import { whiteColor, blackColor, hexToRgb } from "assets/jss/material-dashboard-pro-react";

import Footer from "components/Footer/Footer";
import AuthNavbar from "components/Navbars/AuthNavbar";

const useStyles = makeStyles((theme: any) => ({
  wrapper: {
    height: "auto",
    minHeight: "100vh",
    position: "relative",
    top: 0
  },
  fullPage: {
    padding: "120px 0",
    position: "relative",
    minHeight: "100vh",
    display: "flex!important",
    margin: 0,
    border: 0,
    color: whiteColor,
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      minHeight: "fit-content!important"
    },
    "& footer": {
      position: "absolute",
      bottom: 0,
      width: "100%",
      border: "none !important"
    },
    "&:before": {
      backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.65)"
    },
    "&:before,&:after": {
      display: "block",
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      zIndex: 2
    }
  }
}));

export default function Pages(props: any) {
  const { ...rest } = props;
  // ref for the wrapper div
  const wrapper = React.createRef<any>();
  // styles
  const classes = useStyles();
  React.useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });
  const getRoutes = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBgImage = () => {
    if (window.location.pathname.indexOf("/auth/register-page") !== -1) {
      return register;
    } else if (window.location.pathname.indexOf("/auth/login-page") !== -1) {
      return login;
    } else if (window.location.pathname.indexOf("/auth/pricing-page") !== -1) {
      return pricing;
    } else if (
      window.location.pathname.indexOf("/auth/lock-screen-page") !== -1
    ) {
      return lock;
    } else if (window.location.pathname.indexOf("/auth/error-page") !== -1) {
      return error;
    }
  };
  const getActiveRoute = (routes: AppRoute[] | undefined): any => {
    routes = routes || [];
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf((routes[i].layout as any) + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  return (
    <>
      { auth.isAuth() ? <Redirect to={{ pathname: "/admin/projects" }} /> :
        (
          <div>
            <AuthNavbar brandText={getActiveRoute(routes)} {...rest} />
            <div className={classes.wrapper} ref={wrapper}>
              <div
                className={classes.fullPage}
                style={{ backgroundImage: "url(" + getBgImage() + ")" }}
              >
                <Switch>
                  {getRoutes(routes)}
                  <Redirect from="/auth" to="/auth/login-page" />
                </Switch>
                <Footer white />
              </div>
            </div>
          </div>
        )
      }
    )
    </>
  )
}
