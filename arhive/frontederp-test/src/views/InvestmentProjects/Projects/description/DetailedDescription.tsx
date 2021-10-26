import React, { Component } from "react";
import "./DetailedDescription.scss";

import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import Info from "components/Typography/Info";
import DateRange from "@material-ui/icons/DateRange";

import { ProjectModel } from "../project-model";


//================================================================================
export interface DetailedDescriptionProps {
  project: ProjectModel;
}

export default class DetailedDescription extends Component<DetailedDescriptionProps> {
  public state = {
    project: this.props.project
  };
  
  public handleChange(event: any) {
    // this.setState({value: event.target.value});
  }

  public render() {
    return (
      <div className="detailed-description__wrapper">
        <h2 className="detailed-description__title">Подробное описание</h2>

        <div className="detailed-description__container">
          <div className="detailed-description__form">
            <div className="detailed-description__form--control">
              <textarea 
                        className="detailed-description__textarea"
                        value={this.state.project.description || ''}
                        placeholder=""
                        onChange={this.handleChange}
                        readOnly>
              </textarea>
            </div>
          </div>

          {/* <div className="detailed-description">
            <div className="detailed-description__block" style={{width: "107px"}}>
              <div className="detailed-description__date-range">
                <DateRange className="detailed-description__stats" />
                <input className="detailed-description__input" id="dateStart" type="text" value={this.state.project.createdOn} onChange={this.handleChange} required/>
                <label className="detailed-description__info-title" htmlFor="dateStart">Дата начала проекта</label>
              </div>
            </div>

            <div className="detailed-description__block" style={{width: "204px"}}>
              <div className="detailed-description__date-range">
                <DateRange className="detailed-description__stats" />
                <input className="detailed-description__input" id="datePlan" type="text" value={this.state.project.projectEndDate || ''} onChange={this.handleChange} required/>
                <label className="detailed-description__info-title" htmlFor="datePlan">Планируемая дата завершения проекта</label>
              </div>
            </div>

            <div className="detailed-description__block" style={{width: "201px"}}>
              <div className="detailed-description__date-range">
                <DateRange className="detailed-description__stats"/>
                <input className="detailed-description__input" id="dateEnd" type="text" value={this.state.project.projectFactEndDate || ''} onChange={this.handleChange} required/>
                <label className="detailed-description__info-title" htmlFor="dateEnd">Фактическая дата завершения проекта</label>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}
