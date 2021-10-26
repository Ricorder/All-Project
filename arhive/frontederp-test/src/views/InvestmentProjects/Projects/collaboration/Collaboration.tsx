import React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import TabPanel from 'components/TabPanel/TabPanel'
import { CollaborationSteps } from './CollaborationSteps';
import { CollaborationTeam } from './CollaborationTeam';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';

import { ProjectModel } from "../project-model";

export interface CollaborationProps {
  project: ProjectModel;
}

export const Collaboration = (props: CollaborationProps) => {
  const { project } = props;
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card>
      <CardBody>
        <Tabs value={value} onChange={handleChange} style={{ marginBottom: "1em" }}>>
          <Tab label="Этапы" />
          <Tab label="Команда проекта" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <CollaborationSteps project={project}></CollaborationSteps>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CollaborationTeam project={project}></CollaborationTeam>
        </TabPanel>
      </CardBody>
    </Card>
  )
}
