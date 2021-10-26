import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from './Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/styles';
import buttonGroupStyle from 'assets/jss/material-dashboard-pro-react/buttonGroupStyle';

const useStyle = makeStyles({
  ...buttonGroupStyle,
  buttonGroup: {
    ...(buttonGroupStyle.buttonGroup),
    display: "flex",
    margin: "0",
    paddingRight: "21px",
    cursor: "pointer",
    '&:hover': {
      firstButton: {
        boxShadow: "0 14px 26px -12px rgba(233, 30, 99, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(233, 30, 99, 0.2)",
        backgroundColor: "#e91e63"
      },
      lastButton: {
        boxShadow: "0 14px 26px -12px rgba(233, 30, 99, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(233, 30, 99, 0.2)",
        backgroundColor: "#e91e63"
      },
    }
  },
  firstButton: {
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    fontSize: "9px",
    //padding: 0 20px,
    padding: "0 3px 0 25px",
    height: "20px",
    boxShadow: "none",
    backgroundColor: "#E91E63",
    marginLeft: 0,
    marginRight: 0,
    overflow: "hidden",
    '&:hover': {
      boxShadow: "none"
    },
    '& > span': {
      justifyContent: "flex-start",
      textAlign: "left",
      whiteSpace: "nowrap",
      textOverflow: "elipsis"
    }
  },
  lastButton: {
    borderTopRightRadius: "30px",
    borderBottomRightRadius: "30px",
    backgroundColor: "#E91E63",
    width: "22px", // Убрать потом как примут
    height: "20px",
    padding: 0,
    boxShadow: "none",
    marginLeft: "-2px",
    marginRight: 0,
    '&:hover': {
      boxShadow: "none"
    }
  }
} as any);

const options = [
  'Статус: В работе',
  'Статус: Приостановлен',
  'Статус: Отменен',
  'Статус: Отменен / Прекращен',
  'Статус: Завершен'
];

export default function SplitButton(props: any) {
  const option = (props['option'] || 2) - 1;
  const status = props['status'];
  const classes = useStyle();

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(option);

  const handleClick = () => {
    console.log(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const style = selectedIndex === 0 ? {} : {};

  return (
    <Grid container direction="column" alignItems="flex-end">
      <Grid item xs={12}>
        <div className={classes.buttonGroup}>
          <Button color="rose" style={style} size="sm" className={classes.firstButton} onClick={handleClick}>
            {`Статус: ${status}`}
          </Button>
          <Button
            color="rose"
            style={style}
            size="sm"
            className={classes.lastButton}
            //onClick={handleToggle}
          >
            {/* <ArrowDropDownIcon /> */}
          </Button>
        </div>
        <Popper open={open} anchorEl={anchorRef.current} transition disablePortal style={{zIndex: 99, position: "absolute"}}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index)}
                        className={"menu__small--item"}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}