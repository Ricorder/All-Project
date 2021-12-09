import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  blackColor,
  defaultFont,
  hexToRgb
} from "assets/jss/material-dashboard-pro-react";

const tableStyle = theme => ({
  warning: {
    color: warningColor[0]
  },
  primary: {
    color: primaryColor[0]
  },
  danger: {
    color: dangerColor[0]
  },
  success: {
    color: successColor[0]
  },
  info: {
    color: infoColor[0]
  },
  rose: {
    color: roseColor[0]
  },
  gray: {
    color: grayColor[0]
  },
  right: {
    textAlign: "right"
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    overflow: "auto"
  },
  tableShoppingHead: {
    fontSize: "0.9em !important",
    textTransform: "uppercase !important"
  },
  tableShoppingFooter: {
    fontSize: "0.9em !important",
    textTransform: "uppercase !important"
  },
  tableHeadFontSize: {
    fontSize: "1.25em !important"
  },
  tableFooterFontSize: {
    fontSize: "1.25em !important"
  },
  tableHeadCell: {
    //color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    border: "none !important",
    fontSize: "1rem !important",
    fontWeight: "500 !important",
    color: "#555555",
    whiteSpace: "nowrap",
    "@media screen and (max-width: 1540px)": {
      whiteSpace: "normal",
    },
  },
  tableFooterCell: {
    //color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
    border: "none !important",
    fontSize: "1rem !important",
    fontWeight: "500 !important",
    color: "#555555",
    whiteSpace: "nowrap"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 6px!important",
    verticalAlign: "middle",
    fontSize: "1rem",
    borderBottom: "none",
    borderTop: "1px solid " + grayColor[5],
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      minHeight: "24px",
      minWidth: "32px"
    },
    "@media screen and (max-width: 1440px)": {
      "&:last-child span.nowrap": {
        whiteSpace: "normal !important"
      },
    },
  },
  tableCellTotal: {
    fontWeight: "500",
    fontSize: "1.25em",
    paddingTop: "14px",
    textAlign: "right",
    //fontWeight: "bold !important"
  },
  tableCellAmount: {
    fontSize: "26px",
    fontWeight: "300",
    marginTop: "5px",
    textAlign: "right"
  },
  tableResponsive: {
    width: "100%",
    minHeight: "0.1%",
    //overflowX: "auto"
  },
  tableStripedRow: {
    backgroundColor: grayColor[12]
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: grayColor[13]
    }
  },
  warningRow: {
    backgroundColor: warningColor[6],
    "&:hover": {
      backgroundColor: warningColor[5]
    }
  },
  dangerRow: {
    backgroundColor: dangerColor[6],
    "&:hover": {
      backgroundColor: dangerColor[5]
    }
  },
  successRow: {
    backgroundColor: successColor[6],
    "&:hover": {
      backgroundColor: successColor[5]
    }
  },
  infoRow: {
    backgroundColor: infoColor[6],
    "&:hover": {
      backgroundColor: infoColor[5]
    }
  },
  tableRowBody: {
    height: "48px"
  },
  tableRowHead: {
    height: "56px"
  },
  tableRowFooter: {
    height: "56px"
  }
});

export default tableStyle;
