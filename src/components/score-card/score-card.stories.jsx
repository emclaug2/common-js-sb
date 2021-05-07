import React from 'react';
import {List} from '@material-ui/core';
import { Cloud, ListAlt, MoreVert, Notifications } from '@material-ui/icons';
import {InfoListItem} from '@pxblue/react-components';
import {ScoreCard} from "./score-card";

const backgroundImage = require('../../assets/topology_40.png');

const title = { type: 'slot', description: '1st line header text' };
const subtitle = { type: 'slot', description: '2nd line header text' };
const info = { type: 'slot', description: '3rd line header text' };
const body = { type: 'slot', description: 'Custom Body content' };
const styles = { type: 'object', description: 'inline-style overrides' };

export default {
  title: 'Demo/Score Card',
  component: ScoreCard,
  decorators: [(Story) => <div style={{ width: 400 }}>{Story()}</div>]
};

const defaultArgs = {
  title: "Title",
};


const withBasicConfigTemplate = (args) => (
  <pxb-score-card {...args}>
    <div slot="pxb-title">{args.title}</div>
    <div slot="pxb-body">
      <div style={{ fontSize: 20 }}>Custom Content Here</div>
    </div>
  </pxb-score-card>
);
export const Default = withBasicConfigTemplate.bind({});
Default.args = { ...defaultArgs, title: 'Score Card Title' };
Default.storyName = 'with basic config';
Default.argTypes = { title };

const WithCustomHeaderTemplate = (args) => (
  <pxb-score-card styles={args.styles}>
    <div slot="pxb-title">{args.title}</div>
    <div slot="pxb-subtitle">{args.subtitle}</div>
    <div slot="pxb-info">{args.info}</div>
    <div slot="pxb-body">
      <div style={{ fontSize: 20 }}>Custom Content Here</div>
    </div>
  </pxb-score-card>
);
export const WithCustomHeader = WithCustomHeaderTemplate.bind({});
WithCustomHeader.args = {
  title: 'Score Card Title',
  subtitle: 'Score Card Subtitle',
  info: 'Score Card Info',
  styles:
    `{
      "header": {
        "background-image": "url(${backgroundImage})"
      }
    }`
};
WithCustomHeader.storyName = 'with custom header';
WithCustomHeader.argTypes = {  title, subtitle, info, body, styles };

const WithCustomBodyTemplate = (args) => (
  <pxb-score-card styles={args.styles}>
    <div slot="pxb-title">{args.title}</div>
    <div slot="pxb-subtitle">{args.subtitle}</div>
    <div slot="pxb-info">{args.info}</div>
    <div slot="pxb-body">
      <List style={{ padding: '.5rem 0' }}>
        <InfoListItem
          dense
          style={{ height: '2.25rem' }}
          title={'0 Alarms'}
          icon={<Notifications color={'inherit'} />}
        />
        <InfoListItem
          dense
          style={{ height: '2.25rem' }}
          title={'1 Event'}
          icon={<ListAlt color={'inherit'} />}
        />
        <InfoListItem
          dense
          chevron={true}
          style={{ height: '2.25rem' }}
          title={'Online'}
          icon={<Cloud color={'inherit'} />}
        />
      </List>
    </div>
  </pxb-score-card>
);
export const WithCustomBody = WithCustomBodyTemplate.bind({});
WithCustomBody.args = {
  title: 'Score Card Title',
  subtitle: 'Score Card Subtitle',
  info: 'Score Card Info',
  styles:
    `{
      "header": {
        "background-image": "url(${backgroundImage})"
      }
    }`
};
WithCustomBody.storyName = 'with custom body';
WithCustomBody.argTypes = {  title, subtitle, info, body, styles };
