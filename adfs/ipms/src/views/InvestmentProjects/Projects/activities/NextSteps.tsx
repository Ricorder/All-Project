import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import { StepIconProps } from '@material-ui/core/StepIcon';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ContactsIcon from '@material-ui/icons/Contacts';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import TodayIcon from '@material-ui/icons/Today';
import classNames from "classnames";
import React, { useCallback } from 'react';
import { successColor, successBoxShadow, grayColor, roseColor, infoColor } from 'assets/jss/material-dashboard-pro-react';
import { Button } from 'components/CustomButtons/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '90%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    valueContainer: {
      display: "flex",
      flex: 1
    },
    title: {
      marginRight: "1.5em",
      fontWeight: 300,
      fontSize: "1em",
      color: grayColor[0],
    },
    value: {
      flex: 1,
      fontWeight: 300,
      fontSize: "1em",
    },
    stepTitle: {

    },
    stepSubtitle: {

    }
  }),
);

function getSteps() {
  return ['Рассмотреть предложение по проекту', 'Связаться с контактным лицом', 'Согласовать проект'];
}

interface StepData {
  title: string;
  subtitle?: string;
  name: string;
  assignedTo: string;
  priority: string;
}

function getStepData(step: number): StepData {
  switch (step) {
    case 0:
      return {
        title: "Обсуждение целесообразности проекта и его инвестиционной привлекательности  ",
        subtitle: "",
        name: "Иванов И.А.",
        assignedTo: "Василевский А.П.",
        priority: "Высокий"
      }
    case 1:
      return {
        title: "Коммуникация с контактным лицом для получения детальной информации",
        subtitle: "",
        name: "Иванов И.А.",
        assignedTo: "Василевский А.П.",
        priority: "Высокий"
      }
    case 2:
      return {
        title: "Окончальное согласование проекта",
        subtitle: "",
        name: "Иванов И.А.",
        assignedTo: "Василевский А.П.",
        priority: "Высокий"
      }
    default:
      return {
        title: "",
        name: "",
        assignedTo: "",
        priority: ""
      }
  }
}

export function NextSteps() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const renderStep = useCallback(
    (step: number) => {
      const { name, assignedTo, priority, title, subtitle } = getStepData(step);
      return <div>
        <p className={classes.stepTitle}>
          {title}
        </p>
        <p className={classes.stepSubtitle}>
          {subtitle}
        </p>
        <div style={{ display: "flex", justifyContent: "spaceBetween" }}>
          <div className={classes.valueContainer}>
            <div className={classes.title} style={{fontSize:'0.8em'}}>Имя</div>
            <div className={classes.value} style={{fontSize:'0.8em'}}>{name}</div>
          </div>
          <div className={classes.valueContainer}>
            <div className={classes.title} style={{fontSize:'0.8em'}}>Назначено</div>
            <div className={classes.value} style={{fontSize:'0.8em'}}>{assignedTo}</div>
          </div>
          <div className={classes.valueContainer}>
            <div className={classes.title} style={{fontSize:'0.8em'}}>Приоритет</div>
            <div className={classes.value} style={{fontSize:'0.8em'}}>{priority}</div>
          </div>
        </div>
      </div>
    },
    [classes],
  );

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '3px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      boxShadow: successBoxShadow.boxShadow,
    },
    success: {
      background: successColor[0],
    },
    rose: {
      background: roseColor[0],
    },
    info: {
      background: infoColor[0],
    },
  });
  function ColorlibStepIcon(props: StepIconProps) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons: { [index: string]: React.ReactElement } = {
      1: <InboxIcon />,
      3: <TodayIcon />,
      2: <ContactsIcon />,
    };

    return (
      <div
        className={classNames(classes.root, {
          [classes.active]: active,
          [classes.success]: String(props.icon) == "1",
          [classes.rose]: String(props.icon) == "2",
          [classes.info]: String(props.icon) == "3",
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography style={{fontSize:'1.5em', color:'#999'}}>Открытые активности</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
            <StepContent>
              <Typography component={"div"}>{renderStep(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    size="sm"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Отменить
                  </Button>
                  <Button
                    size="sm"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Завершить' : 'Завершить'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography style={{fontSize:'1.5em', color:'#999'}}>Закрытые активности</Typography>
          <Button size="sm" onClick={handleReset} className={classes.button}>
            Отменить
          </Button>
        </Paper>
      )}
    </div>
  );
}