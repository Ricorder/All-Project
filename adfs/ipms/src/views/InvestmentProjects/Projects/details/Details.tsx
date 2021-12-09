import React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import TabPanel from 'components/TabPanel/TabPanel'
import { DetailsSummary } from './DetailsSummary';
import { DetailsChangeLog } from './DetailsChangeLog';
import CardBody from 'components/Card/CardBody';
import Card from 'components/Card/Card';
import { DetailsFiles } from './DetailsFiles';

import { ProjectModel } from "../project-model";

export interface DetailsProps {
  project: ProjectModel;
}

export const Details = (props: DetailsProps) => {
  const project = props.project;
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <CardBody>
        <Tabs value={value} onChange={handleChange} style={{ marginBottom: "1em" }}>>
          <Tab label="Описание" />
          <Tab label="Файлы" />
          <Tab label="История" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <DetailsSummary project={project}></DetailsSummary>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DetailsFiles project={project}></DetailsFiles>
      </TabPanel>
        <TabPanel value={value} index={2}>
          <DetailsChangeLog></DetailsChangeLog>
        </TabPanel>
      </CardBody>
    </Card>
  )
}