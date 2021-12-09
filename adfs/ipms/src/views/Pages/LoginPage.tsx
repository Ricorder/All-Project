import React, { FormEvent, useEffect } from "react";
import history from "services/history";

import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Email from "@material-ui/icons/Email";
import Face from "@material-ui/icons/Face";

import { useAuth } from "context/AuthContext";

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle";
import Preloader from "components/Preloader/Preloader";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
import { Button } from "components/CustomButtons/Button";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainerType from "components/Grid/GridContainer";
import GridItemType from "components/Grid/GridItem";

import Snackbar from '@material-ui/core/Snackbar';

const GridContainer = GridContainerType as any;
const GridItem = GridItemType as any;

const useStyles = makeStyles(styles as any);

export default function LoginPage() {
  const { login, ssoLogin } = useAuth();

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [isLoading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const classes = useStyles();

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  }

  const handlePassChange = (e: any) => {
    setPass(e.target.value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    login({name, pass})
    .then((data: any) => {
      setLoading(false);
      if (data['Code'] === 0) {
        history.push("/admin/projects");
      }

      if (data['Code'] >= 0) {
        setMsg(data['Message']);
      }
    })
    .catch((err: any) => {
      setLoading(false);
    });
  }

  const handleSSOLogin = (e: any) => {
    ssoLogin();
  }

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  useEffect(() => {
    if (document.location.search.includes("use_sso=true")) {
      ssoLogin();
    }
  });

  return (
    <>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <form onSubmit={handleSubmit}>
              <Card login className={classes[cardAnimaton]}>
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="rose"
                >
                  <h4 className={classes.cardTitle}>Вход в систему</h4>
                  {/* <div className={classes.socialLine}>
                    {[
                      "fab fa-facebook-square",
                      "fab fa-twitter",
                      "fab fa-google-plus"
                    ].map((prop, key) => {
                      return (
                        <Button
                          color="transparent"
                          justIcon
                          key={key}
                          className={classes.customButtonClass}
                        >
                          <i className={prop} />
                        </Button>
                      );
                    })}
                  </div> */}
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="Имя"
                    onChange={handleNameChange}
                    id="firstname"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Face className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  />
                  {/* <CustomInput
                    labelText="Email..."
                    id="email"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                      )
                    }}
                  /> */}
                  <CustomInput
                    labelText="Пароль"
                    id="password"
                    onChange={handlePassChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputAdornmentIcon}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      type: "password",
                      autoComplete: "off"
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.justifyContentCenter}>
                  <Button type="submit" color="rose" simple size="lg" block>
                    Войти
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
        <Button simple block onClick={handleSSOLogin}>
          Войти c сертификатом
        </Button>
      </div>

      <Snackbar open={Boolean(msg)} message={msg} anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}/>

      { isLoading ? <Preloader></Preloader>: null}
    </>
  );
}
