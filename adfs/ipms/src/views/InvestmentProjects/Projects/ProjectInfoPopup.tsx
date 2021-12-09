import { DialogContent, makeStyles, Tab, Tabs } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DateRange from "@material-ui/icons/DateRange";
import { BusinessProcessFlow } from "components/BusinessProcessFlow/BusinessProcessFlow";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { Button } from "components/CustomButtons/Button";
import SplitButton from "components/CustomButtons/SplitButton";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import TabPanel from "components/TabPanel/TabPanel";
import Info from "components/Typography/Info";
import React, { useState } from "react";
import { emptyProject, ProjectModel } from "./project-model";
import { Collaboration } from "./collaboration/Collaboration";
import { ContactModel, Contacts } from "./Contacts";
import { Details } from "./details/Details";
import { NoteModel, Notes } from "./Notes";
import { grayColor, cardTitle, primaryColor } from "assets/jss/material-dashboard-pro-react";
import AssignmentIcon from "@material-ui/icons/Assignment";

import format from "date-fns/format";

//================================================================================
const contacts: ContactModel[] = [
  { id: "1", name: "Иванов А.П. (основной)", position: "Генеральный директор", phone: "+7 999 600 51 52", email: "Ivanov87@mail.ru" },
  { id: "2", name: "Грибов А.А", position: "Заместитель генирально директора", phone: "+7 999 600 50 50", email: "GribovAndrew@mail.ru"},
  { id: "3", name: "Кирьянов В.В", position: "Бухгалтер", phone: "+7 999 777 12 34", email: "KiriyanovVV@mail.ru"},
]

//================================================================================
const notes: NoteModel[] = [
  { id: "1", title: "Фин.Модель", text: "Для презентации проекта необходимо сделать Фин.Модель. Незабыть." },
  { id: "2", title: "Документы", text: "Надо подгрузить информацию о компании." },
  { id: "3", title: "Отправить черновик презентации", text: "Во вторник отправить коллегам черновик презентации на оценку." },
]

//================================================================================
const useStyle = makeStyles({
  dialogTitle: {
    padding: 0,
    background: grayColor[12],
    borderBottom: `1px solid ${grayColor[5]}`
  },
  dialogTitleCard: {
    margin: 0,
    boxShadow: "none!important"
  },
  dialogTitleCardBody: {
    background: grayColor[12],
  },
  projectIcon: {
    width: "64px",
    height: "64px",
    color: "white",
    background: primaryColor[0],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3px",
    boxShadow: "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(0, 172, 193,.4);",
    marginRight: "1em"
  },
  titleButtons: {
    display: "flex",
    alignItems: "center",
    "& > *": {
      marginLeft: "1em"
    }
  },
  nameAndDescription: {
    flex: 1,
  },
  projectDescription: {
    color: grayColor[0],
    fontSize: "14px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0",
    fontWeight: 300
  },
  projectName: {
    ...cardTitle,
    fontSize: "1.75em",
    marginTop: "0px",
    marginBottom: "3px"
  },
  stats: {
    color: grayColor[0]
  },
  bpFlow: {
    marginTop: "15px"
  },
  dateRange: {
    display: "flex",
    flexFlow: "row",
    alignItems: "center"
  },
  infoValue: {
    fontWeight: 300
  }
});

//================================================================================
export interface ProjectInfoPopupProps {
  project: ProjectModel | null;
  open: boolean;
  onClose: () => void;
}

//================================================================================
export function ProjectInfoPopup(props: ProjectInfoPopupProps) {
  const classes = useStyle();
  const { open, onClose } = props;
  const project = props.project || emptyProject;

  const [value, setValue] = useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"xl"}
      disableBackdropClick={true}
    >
      <DialogTitle className={classes.dialogTitle} >
        <Card className={classes.dialogTitleCard}>
          <CardBody className={classes.dialogTitleCardBody}>
            <GridContainer style={{ padding: "0 1em" }}>
              <div className={classes.projectIcon}>
                <AssignmentIcon />
              </div>
              <div className={classes.nameAndDescription}>
                <div className={classes.projectDescription}>
                  Инвестиционный проект
                </div>
                <h3 className={classes.projectName}>
                  {project.name}
                </h3>
              </div>
              <div className={classes.titleButtons}>
                <SplitButton></SplitButton>
                <Button size="sm" round color="primary">Редактировать</Button>
                <IconButton
                  onClick={handleClose}
                  key="close"
                  color="inherit"
                  disableRipple={true}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </GridContainer>

            <GridContainer style={{ padding: "0 1em", marginTop: "1em" }}>
              <GridItem xs={12} sm={6} md={3}>
                <Info>Дата создания</Info>
                <div className={classes.dateRange}>
                  <DateRange className={classes.stats} />
                  <div className={classes.infoValue}>
                    {project.createdOn}
                  </div>
                </div>
                <br/>
                <Info>Реализующая компания</Info>
                <div className={classes.infoValue}>
                  {project.implementingCompany}
                </div>
              </GridItem>

              <GridItem xs={12} sm={6} md={3}>
                <Info>Подразделение</Info>
                <div className={classes.infoValue}>
                  {project.subDivision}
                </div>
                <br/>
                <Info>Управляющий партнер</Info>
                <div className={classes.infoValue}>
                  {project.owner}
                </div>
              </GridItem>

              <GridItem xs={12} sm={6} md={3}>
                <Info>Индустрия</Info>
                <div className={classes.infoValue}>
                  {project.industry}
                </div>
                <br/>
                <Info>География</Info>
                <div className={classes.infoValue}>
                  {project.sibAddress}
                </div>
              </GridItem>

              <GridItem xs={12} sm={6} md={3}>
                <Info>Общий объем инвестиций</Info>
                <div className={classes.infoValue}>
                  {project.investmentSize}
                </div>
                <br/>
                <Info>Объем инвестиций АФК</Info>
                <div className={classes.infoValue}>
                  {project.afkShare}
                </div>
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </DialogTitle>

      <DialogContent>
        <BusinessProcessFlow stage={project.stage} className={classes.bpFlow}></BusinessProcessFlow>

        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Tabs value={value} onChange={handleChange}>
              {/* <Tab label="Активности" /> */}
              <Tab label="Совместная работа" />
              <Tab label="Детали" />
            </Tabs>
            {/* <TabPanel value={value} index={0}>
              <Activities></Activities>
            </TabPanel> */}
            <TabPanel value={value} index={0}>
              <Collaboration project={project}></Collaboration>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Details project={project}></Details>
            </TabPanel>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <Contacts contacts={contacts}></Contacts>
            <Notes notes={notes}></Notes>
          </GridItem>
        </GridContainer>
      </DialogContent>
    </Dialog >
  );
}
