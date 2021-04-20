import { storiesOf } from '@storybook/html';

/**
 * Iterates all of the stencil contexts and build a "config" object
 * which is used to generate the individual stories.
 */
function buildStencilStories(name, componentsCtx, storiesCtx) {
  const configs = buildGeneratorConfigs(componentsCtx, storiesCtx);

  const stories = storiesOf(name, module);

  Object.keys(configs)
    .map(comp => configs[comp])
    .forEach(config =>
      typeof config === 'function'
        ? // If the config is a function, call it with the stories context.
          // The function is responsible for calling stories.add(...) manually.
        config(stories)
        : createStencilStory(config, stories),
    );
}

export default buildStencilStories;

/**
 * Generates DOM nodes from states to render.
 */
function createNodes(el, elements) {
  if (elements && elements.length > 0) {
    elements.forEach(({ tag, innerText, props, children }) => {
      let childEl = document.createElement(tag);
      childEl.innerHTML = innerText;
      if (props) {
        Object.keys(props).forEach(prop => {
          if (props[prop]) {
            childEl.setAttribute(prop, props[prop]);
          } else {
            childEl.removeAttribute(prop);
          }
        });
      }
      createNodes(childEl, children);
      el.appendChild(childEl);
    });
  }
}

/**
 * Generates an interactive controls-enabled story for a stencil Component.
 * For any additional states, a static rendering is generated with
 * the given state.
 */
function createStencilStory({ Component, notes, states, args = {}, argTypes = {} }, stories) {
  // It is important that the main container element
  // is NOT created inside of the render function below!!
  const mainEl = document.createElement('div');
  const controls = getPropsWithControlValues(Component, { args, argTypes });
  const storyOpts = notes ? { notes, args: controls.args, argTypes: controls.argTypes } : { args: controls.args, argTypes: controls.argTypes };
  const tag = Component.is;

  // Clone the "states" array and add the default state first
  states = states && states.length ? states.slice(0) : [];
  states.unshift({
    title: 'Default state (use Controls below to edit props):',
    tag: Component.is,
    props: {},
    children: [{ tag: 'span', innerText: 'Default' }],
  });

  // Create the story with all of the states
  stories.add(
    Component.name,
    args => {
      mainEl.innerHTML = '';
      // First, add the controls-enabled props to the default state.
      // This MUST be done inside this render function!!
      states[0].props = { ...args };
      states[0].argTypes = controls.argTypes;

      // Next, render each state. Only the first one is interactive (with controls).
      // This is sort of a light-weight "chapters" addon because the community
      // "chapters" addon only works with react :/
      states.forEach(({ title, description, props, children }) => {
        const containerEl = document.createElement('div');
        const componentEl = document.createElement(String(tag));

        if (props) {
          Object.keys(props).forEach(prop => {
            const propKebab = Case.kebab(prop);
            if (props[prop]) {
              componentEl.setAttribute(propKebab, props[prop]);
            } else {
              componentEl.removeAttribute(propKebab);
            }
          });
        }

        if (children) {
          createNodes(componentEl, children);
        }

        containerEl.innerHTML = getStencilTemplate({
          title,
          description,
          tag,
          props,
          args,
          children,
        });

        containerEl.querySelector(`.placeholder`).appendChild(componentEl);
        mainEl.appendChild(containerEl);
      });

      return mainEl;
    },
    storyOpts,
  );
}
