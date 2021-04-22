import React from 'react';
import ScoreCard from '../../../dist/collection/components/score-card/score-card';
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
Default.argTypes = { title, body };

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
