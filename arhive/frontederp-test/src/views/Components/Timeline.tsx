import React from "react";
// core components
import TimelineComponent from "components/Timeline/Timeline";
import moment from "moment";
import HtmlReactParser from "react-html-parser"
//! Вынести класс отдельно!! Используется в двух местах
type News = {
  Id: string
  Name: string
  Description: string
  FENewsPublishDate: Date
  NewsType: string
  FilesPath: string[]
}

export interface Props{
  news: News[];
}

const Timeline: React.FC<Props> = (props) => {
    return (
      <TimelineComponent stories={ props.news.map((element: News) => {
        return {
          inverted: true,
          badgeColor: element.NewsType,
          badgeIcon: moment(element.FENewsPublishDate).format("DD MMM"),
          title: element.Name,
          titleColor: element.NewsType,
          body: (
              HtmlReactParser(element.Description)
          )
        }
      })}/>
    );
  }
  export {Timeline}