import React, { Component } from "react";
import './Preloader.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Preloader extends Component{
  render() {
    return (
      <div className={'preloader__wrapper'}>
        <CircularProgress size={100} />
      </div>
    );
  }
}
