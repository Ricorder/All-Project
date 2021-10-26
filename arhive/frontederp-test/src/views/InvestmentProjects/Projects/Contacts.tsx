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
import Person from "@material-ui/icons/Person";
import Add from "@material-ui/icons/Add";
import { cardIconTitle } from "assets/jss/material-dashboard-pro-react";
import IconButton from "@material-ui/core/IconButton";
import { Button } from 'components/CustomButtons/Button';

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
export interface ContactModel {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
}

//================================================================================
export const Contacts: React.FC<{ contacts: ContactModel[] }> = (props) => {
  const classes = useStyles();

  const renderItem = useCallback(
    (contact: ContactModel) => {
      return <React.Fragment key={contact.id}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={contact.name}
            secondary={
              <>
                <span style={{ minWidth: 80 }}>Должность:</span> {contact.position}<br/>
                <span style={{ minWidth: 80 }}>Телефон: </span> {contact.phone}<br/>
                <span style={{ minWidth: 80 }}>Email:</span> {contact.email}<br/>
              </>
            }
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
          <Person />
        </CardIcon>
        <h4 className={classes.cardIconTitle}>Контакты</h4>
        <IconButton style={{position: "absolute", right: 0, top: 0, padding: "6px", marginTop: "0.5em" }} color="primary"><Add/></IconButton>
      </CardHeader>
      <CardBody>
        <List className={classes.root}>
          {props.contacts.map(contact => renderItem(contact))}
        </List>
      </CardBody>
    </Card>

  );
}