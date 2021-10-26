import {
  containerFluid,
  defaultFont,
  primaryColor,
  defaultBoxShadow,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  whiteColor,
  grayColor, drawerMiniWidth, drawerWidth
} from "assets/jss/material-dashboard-pro-react";

const headerStyle = () => ({
  appBar: {
    backgroundColor: "#eee",
    boxShadow: "0 2px 4px rgba(0,0,0,.5)",
    borderBottom: "0",
    marginBottom: "0",
    position: "fixed",
    width: `calc(100% - ${drawerWidth}px)`,
    paddingTop: "10px",
    zIndex: "1029",
    color: grayColor[6],
    border: "0",
    borderRadius: "0",
    padding: "10px 0",
    transition: "width 150ms ease 0s",
    minHeight: "50px",
    display: "block"
  },
  container: {
    ...containerFluid,
    minHeight: "50px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "20px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    paddingTop: "0.625rem",
    paddingBottom: "0.625rem",
    margin: "0 !important",
    letterSpacing: "unset",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    ...defaultBoxShadow
  },
  sidebarMinimize: {
    float: "left",
    padding: "0 0 0 15px",
    display: "block",
    color: grayColor[6],
  },
  sidebarMiniIcon: {
    width: "20px",
    height: "17px"
  }
});

export default headerStyle;
