// my-component.stories.js
import readme from '../readme.md';

export default {
  title: 'My Component',
  parameters: {
    markdown: readme,
  },
};

export const asdg = () => `
  <my-component first="Millie" middle="Bobby" last="Brown"></my-component>
`;
