import React, { useCallback } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import NoteIcon from "@material-ui/icons/Note";
import { cardIconTitle } from "assets/jss/material-dashboard-pro-react";
import IconButton from '@material-ui/core/IconButton/IconButton';
import Add from "@material-ui/icons/Add";

//================================================================================
export interface NoteModel {
  id: string;
  title: string;
  text: string;
}

//================================================================================
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    cardIconTitle: cardIconTitle
  } as any),
);

//================================================================================
export const Notes: React.FC<{ notes: NoteModel[] }> = (props) => {
  const classes = useStyles();

  const renderItem = useCallback(
    (note: NoteModel) => {
      return <React.Fragment key={note.id}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={note.title}
            secondary={note.text}
          />
        </ListItem>
        <Divider component="li" />
      </React.Fragment>
    },
    [],
  )

  return (
    <Card>
      <CardHeader color="info" icon>
        <CardIcon color="info">
          <NoteIcon />
        </CardIcon>
        <h4 className={classes.cardIconTitle}>Заметки</h4>
        <IconButton style={{position: "absolute", right: 0, top: 0, padding: "6px", marginTop: "0.5em" }} color="primary"><Add/></IconButton>
      </CardHeader>
      <CardBody>
        <List className={classes.root}>
          {props.notes.map(note => renderItem(note))}
        </List>
      </CardBody>
    </Card>
  );
}