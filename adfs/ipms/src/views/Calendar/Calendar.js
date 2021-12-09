import React, {useEffect, useState} from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import SweetAlert from "react-bootstrap-sweetalert";
import { makeStyles } from "@material-ui/core/styles";
import Heading from "components/Heading/Heading.js";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody";
import styles from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";
import { events as calendarEvents } from "views/Calendar/CalendarData";
import 'moment/locale/ru';
import {serviceUrl, config} from "services/config";
import { getMinutes } from "date-fns";
import PreLoader from "components/Preloader/Preloader"

const localizer = momentLocalizer(moment);

const useStyles = makeStyles(styles);

export default function Calendar() {
  const classes = useStyles();
  //const [events, setEvents] = useState(calendarEvents);
  const [alert, setAlert] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoadingStatus] = useState(true);

  const selectedEvent = event => {
    window.alert(event.title);
  };
  const formatDateCalender = (date, time) => {
    let dateValue = moment(date).toDate();
    let timeValue = moment(time);
    if(timeValue.isValid()){
      let timeDate = timeValue.toDate();
      dateValue.setHours(timeDate.getHours(), timeDate.getMinutes());
    }

    return dateValue;
  };

  const getEvents = async ()=> {
    let responce = await fetch(config.url.API_URL + serviceUrl.url.GetEvents ,{ headers: {
      'accept': 'application/json;odata=verbose',
      'content-type': 'application/json'
  }});
  debugger;
    let data = await responce.json();
    setEvents(data);
    setLoadingStatus(false);
    console.log("CalenderEvents:", events);
  } 

  useEffect(() => {
    getEvents();
  }, [])

  const addNewEventAlert = event => {
    setAlert(
      <SweetAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Событие"
         onConfirm={() => hideAlert()}
         confirmBtnCssClass={classes.button + " " + classes.success}
    >
      <p>{moment(event.start).format('HH:mm') + " - " + moment(event.end).format('HH:mm') + ": " + event.title}</p>
      <p>{event.description}</p>
    </SweetAlert>
    );
  };
  const hideAlert = () => {
    setAlert(null);
  };
  const eventColors = event => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  };

  const messages = {
    allDay: 'Весь день',
    previous: '<',
    next: '>',
    today: 'Сегодня',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    agenda: 'Список',
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
  };

  if(loading)
    return <PreLoader></PreLoader>;

  return (
    <div>
      <Heading
        textAlign="center"
        title='Календарь событий ПАО АФК "Система"'
        category={
          <span>
          </span>
        }
      />
      {alert}
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={11}>
          <Card>
            <CardBody calendar>
              <BigCalendar
                selectable
                localizer={localizer}
                events={events.map((event) =>{
                  return{
                    title: event.Name,
                    description: event.Location,
                    start: formatDateCalender(event.StartDate, event.StartTime),
                    end: event?.EndDate ? formatDateCalender(event.EndDate, event.EndTime) : formatDateCalender(event.StartDate, event.StartTime), 
                    allDay: event.AllDay,
                    color: event.Color
                  }
                })}
                views={["month","week","agenda"]}
                defaultView="month"
                messages={messages}
                scrollToTime={new Date(2020, 1, 1, 6)}
                defaultDate={new Date()}
                onSelectEvent={event => addNewEventAlert(event)}
                eventPropGetter={eventColors}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
