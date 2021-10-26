import { Tab, Tabs, TextField, FormLabel } from "@material-ui/core";
import TabPanel from "components/TabPanel/TabPanel";
import React from "react";
import { NextSteps } from "./NextSteps";
import CardBody from "components/Card/CardBody";
import Card from "components/Card/Card";
import { ActivitiesTask } from "./ActivitiesTask";
import { ActivitiesCall } from "./ActivitiesCall";
import { ActivitiesMeeting } from "./ActivitiesMeeting";
import GridItem from "components/Grid/GridItem";
import { NavPills } from "components/NavPills/NavPills";
import GridContainer from "components/Grid/GridContainer";
import CardHeader from "components/Card/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react";
import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput";
import { Button } from "components/CustomButtons/Button";

const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  cardCategory: {
    margin: "0",
    color: "#999999"
  }
};

const useStyles = makeStyles(styles as any);

export const Activities = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <GridContainer>
        <GridItem xs={8} sm={8} md={12}>
          <Card>
            <CardBody>
              <NavPills
                color="warning"
                tabs={[
                  {
                    tabButton: "Задачи",
                    tabContent: (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CustomInput
                          id="placeholder"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            placeholder: "Тема задачи"
                          }}
                          style={{ justifyContent: "flex-start", width: "50%" }}
                        />
                        <div style={{ width: "50%", marginLeft: "1em" }}>
                          <Button
                            color="warning"
                            size="sm"
                            className={classes.marginRight}
                          >
                            Добавить
                          </Button>
                        </div>
                      </div>
                    ),
                    tabIcon: undefined
                  },
                  {
                    tabButton: "Звонки",
                    tabContent: (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CustomInput
                          id="placeholder"
                          formControlProps={{
                            fullWidth: true
                          }}
                          style={{ justifyContent: "flex-start", width: "50%" }}
                          inputProps={{
                            placeholder: "Тема звонка"
                          }}
                        />
                        <div style={{ width: "50%", marginLeft: "1em" }}>
                          <Button
                            color="warning"
                            size="sm"
                            className={classes.marginRight}
                          >
                            Добавить
                          </Button>
                        </div>
                      </div>
                    ),
                    tabIcon: undefined
                  },
                  {
                    tabButton: "Встречи",
                    tabContent: (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CustomInput
                          id="placeholder"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            placeholder: "Тема встречи"
                          }}
                          style={{ justifyContent: "flex-start", width: "50%" }}
                        />
                        <div style={{ width: "50%", marginLeft: "1em" }}>
                          <Button
                            color="warning"
                            size="sm"
                            className={classes.marginRight}
                          >
                            Добавить
                          </Button>
                        </div>
                      </div>
                    ),
                    tabIcon: undefined
                  }
                ]}
              />
            </CardBody>
          </Card>
          <NextSteps></NextSteps>
        </GridItem>
      </GridContainer>
    </React.Fragment>

    // <React.Fragment>
    //   <Card>
    //     <CardBody>
    //       <Tabs value={value} onChange={handleChange} style={{ marginBottom: "1em" }}>>
    //         <Tab label="Задачи" />
    //         <Tab label="Звонки" />
    //         <Tab label="Встречи" />
    //       </Tabs>
    //       <TabPanel value={value} index={0}>
    //         <ActivitiesTask></ActivitiesTask>
    //       </TabPanel>
    //       <TabPanel value={value} index={1}>
    //         <ActivitiesCall></ActivitiesCall>
    //       </TabPanel>
    //       <TabPanel value={value} index={2}>
    //         <ActivitiesMeeting></ActivitiesMeeting>
    //       </TabPanel>
    //     </CardBody>
    //   </Card>
    //   <NextSteps></NextSteps>
    // </React.Fragment>
  );
};
