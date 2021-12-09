import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import avatar from "assets/img/faces/profile_photo.png";
import styles from "assets/jss/material-dashboard-pro-react/views/userProfileStyles";
import Card from "components/Card/Card";
import CardAvatar from "components/Card/CardAvatar";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import { Button } from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useCallback, useState } from "react";

const useStyles = makeStyles(styles as any);

enum UserDataId {
  grade = "grade",
  areaOfActivity = "areaOfActivity",
  position = "position",
  unit = "unit",
  manager = "manager",
  firstName = "firstName",
  lastName = "lastName",
  birthday = "birthday",
  email = "email",
  workPhone = "workPhone",
  personalPhone = "personalPhone",
  aboutMe = "aboutMe"
}

interface UserData {
  [id: string]: any;
}

interface FormControlProps {
  id: UserDataId;
  label: string;
}

export const UserProfile: React.FC = () => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  const [values, setValues] = useState<UserData>({
    [UserDataId.grade]: "Руководители",
    [UserDataId.areaOfActivity]: "Стратегия",
    [UserDataId.position]: "Вице-президент по стратегии",
    [UserDataId.unit]: "Департамент стратегии",
    [UserDataId.manager]: "Дубовсков А.А.",
    [UserDataId.firstName]: "Артем",
    [UserDataId.lastName]: "Засурский",
    [UserDataId.birthday]: "",
    [UserDataId.email]: "A.Zassoursky@sistema.ru",
    [UserDataId.workPhone]: "50026",
    [UserDataId.personalPhone]: null,
    [UserDataId.aboutMe]:
      "Вице-президент по стратегии."
  });

  const [tempValues, setTempValues] = useState<UserData>(values);

  const beginEdit = useCallback(() => {
    setValues(tempValues);
    setTempValues(tempValues);
    setIsEditing(true);
  }, [tempValues]);

  const cancelEdit = useCallback(() => {
    setValues(values);
    setTempValues(values)
    setIsEditing(false);
  }, [values]);

  const confirmEdit = useCallback(() => {
    setValues(tempValues);
    setIsEditing(false);
  }, [tempValues]);

  const FormControl: React.FC<FormControlProps> = props => {
    return (
      <GridItem xs={12} sm={12} md={12}>
        <CustomInput
          labelText={props.label}
          id={props.id}
          inputProps={{
            value:  isEditing ? tempValues[props.id] : values[props.id],
            onChange: (evt: any) => {
              setTempValues({
                ...tempValues,
                [props.id]: evt.target.value
              });
            }
          }}
          formControlProps={{
            fullWidth: true,
            disabled: !isEditing
          }}
        />
      </GridItem>
    );
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              {/* <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p> */}
              <GridContainer>
                <FormControl
                  id={UserDataId.position}
                  label="Должность"
                ></FormControl>
                <FormControl
                  id={UserDataId.unit}
                  label="Подразделение"
                ></FormControl>
                <FormControl
                  id={UserDataId.manager}
                  label="Руководитель"
                ></FormControl>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="rose" icon>
              {/* <CardIcon color="rose">
                <PermIdentity />
              </CardIcon> */}
              <h4 className={classes.cardIconTitle}>Контакты</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <FormControl
                  id={UserDataId.firstName}
                  label="Имя"
                ></FormControl>
                <FormControl
                  id={UserDataId.lastName}
                  label="Фамилия"
                ></FormControl>
              </GridContainer>
              <GridContainer>
                <FormControl id={UserDataId.email} label="E-Mail"></FormControl>
                <FormControl
                  id={UserDataId.workPhone}
                  label="Рабочий номер"
                ></FormControl>
                <FormControl
                  id={UserDataId.personalPhone}
                  label="Личный номер"
                ></FormControl>
              </GridContainer>
              <div className={classes.userProfileButtons}>
                {!isEditing && (
                  <Button color="primary" onClick={beginEdit}>
                    Редактировать
                  </Button>
                )}
                {isEditing && (
                  <Button color="danger" onClick={cancelEdit}>
                    Отменить
                  </Button>
                )}
                {isEditing && (
                  <Button color="success" onClick={confirmEdit}>
                    Сохранить
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};
