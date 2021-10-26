import HomeIcon from '@material-ui/icons/Home';
import BankProjectIcon from '@material-ui/icons/Work';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import DashboardIcon from "@material-ui/icons/Dashboard";
import CollegialBodyIcon from '@material-ui/icons/Group';
import Timeline from "@material-ui/icons/Timeline";
import Event from '@material-ui/icons/Event'

import LoginPage from "views/Pages/LoginPage";
import Charts from "views/Charts/Charts";
import Dashboard from "views/Dashboard/Dashboard";
import DashboardArchive from "views/Dashboard/DashboardArchive";
import Projects from "views/InvestmentProjects/Projects/Projects";
import Project from "views/InvestmentProjects/Projects/Project";
import { ProjectsQuestionsKO } from "views/InvestmentProjects/QuestionsKO/ProjectsQuestionsKO";
import { AspectRatioSharp } from '@material-ui/icons';
import { Tasks } from "views/InvestmentProjects/Tasks/Tasks";
import { UserProfile } from "views/Pages/UserProfile";
import StartPage from 'views/Dashboard/StartPage';
import { NavigateBeforeSharp } from '@material-ui/icons';
import DzkComp from 'views/Dashboard/dzk';
import Companies from 'views/Company/Companies';
import Calendar from 'views/Calendar/Calendar';


export interface AppRoute {
  name: string;
  path?: string;
  exact?: boolean;
  icon?: any;
  component?: any;
  layout?: string;
  collapse?: boolean;
  state?: string;
  views?: AppRoute[];
  mini?: string;
  render?: boolean;
  outsideUrl?: string;
}

var dashRoutes: AppRoute[] = [
  // {
  //   path: "/startPage",
  //   name: "Главная страница",
  //   icon: HomeIcon,
  //   component: StartPage,
  //   layout: "/admin"
  // },
  {
    path: "/user-page",
    name: "Профиль",
    component: UserProfile,
    layout: "/admin",
    render: false
  },
  {
    path: "/projects/:id",
    name: "Инвестиционный проект",
    component: Project,
    layout: "/admin",
    render: false
  },
  {
    collapse: true,
    name: "Pages",
    icon: DashboardIcon,
    state: "pageCollapse",
    render: false,
    views: [
      {
        path: "/login-page",
        name: "Вход в систему",
        mini: "В",
        component: LoginPage,
        layout: "/auth"
      },
      // {
      //   path: "/dzk",
      //   name: "Test",
      //   mini: "C",
      //   component: DzkComp,
      //   layout: "/admin"
      // },
      {
        path: "/startpage",
        name: "Стартовая страница",
        mini: "A",
        component: StartPage,
        layout: "/admin"
      }
    ]
  },
  // {
  //   collapse: true,
  //   name: "Аналитика",
  //   icon: Timeline,
  //   state: "pageExpanded",
  //   views: [
  //     {
  //       path: "/DashboardArchive",
  //       name: "Все проекты",
  //       mini: "А",
  //       component: DashboardArchive,
  //       layout: "/admin",
  //       views: [
  //         {
  //           path: "/DashboardArchive/?partners=:id",
  //           name: "Аналитика",
  //           component: DashboardArchive,
  //           layout: "/admin",
  //           render: true
  //         }
  //       ]
  //     },
  //     {
  //       path: "/dashboard",
  //       name: "Pipeline УП",
  //       mini: "P",
  //       component: Dashboard,
  //       layout: "/admin",
  //       views: [
  //         {
  //           path: "/dashboard/?partners=:id",
  //           name: "Аналитика по УП",
  //           component: Dashboard,
  //           layout: "/admin",
  //           render: true
  //         }
  //       ]
  //     },
  //   ]
  // },
  {
    path: "/projects",
    name: "Банк проектов",
    icon: BankProjectIcon,
    component: Projects,
    layout: "/admin"
  }
  // {
  //   path: "/companies",
  //   name: "Активы",
  //   icon: AspectRatioSharp,
  //   exact: true,
  //   component: Companies,
  //   layout: "/admin",
  //   views: []
  // },
  // {
  //   path: "/calendar",
  //   name: "Календарь событий",
  //   icon: Event,
  //   component: Calendar,
  //   layout: "/admin",
  // },
  // {
  //   path: "/boardmaps",
  //   name: "Органы управления",
  //   icon: CollegialBodyIcon,
  //   component: StartPage,
  //   outsideUrl: "https://boardmaps.sistema.ru",
  // }
];
export default dashRoutes;
