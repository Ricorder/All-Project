import React, { Component } from "react";
import "./NameFilter.scss";

import Dvr from "@material-ui/icons/DvrOutlined";

import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";


export interface NameFilterProps {
  onChange?: (data: {filter: string, key: string}) => void;
  value?: string;
}

export default class NameFilter extends Component<NameFilterProps> {
  public state = {
    name: this.props.value || ''
  };

  public componentDidUpdate(prevProps: any): void {
    if (prevProps.value === this.props.value) {
      return;
    }

    this.setState({name: this.props.value});
  }

  public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.props.onChange === undefined) {
      return;
    }

    console.log('handleSubmit', this.state.name);
    this.props.onChange({
      filter: this.state.name,
      key: 'name'
    });
  };

  public handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({name: event.target.value});
  };

  public render() {
    return (
      <>
        <Card className="name-filter__filter">
          <CardHeader icon className="name-filter__filter--header">
            <CardIcon color="success" className="name-filter__filter--cardIcon">
              <Dvr/>
            </CardIcon>

            <h4 className="name-filter__filter--title">
              Название проекта
            </h4>
          </CardHeader>

          <CardBody className="name-filter__filter--cardBody">
            <div className="name-filter__filter--form">
              <div className="name-filter__filter--formControl">
                <form
                  className="nameFilter__form"
                  onSubmit={this.handleSubmit}
                >
                  <div className="name-filter__field">
                    <input
                        id="companyName"
                        className="name-filter__input"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <label
                      className="name-filter__input-title"
                      htmlFor="companyName"
                    >
                      Введите название проекта
                    </label>
                  </div>
                  {/* <input type="submit" value="Поиск" /> */}
                </form>
              </div>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
}
