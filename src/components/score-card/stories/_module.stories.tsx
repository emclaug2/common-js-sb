import { storiesOf } from '@storybook/html';
import {withBasicConfig} from "./with-basic-config.stories";

storiesOf(`Components/ScoreCard`, module)
  .add('with basic config', withBasicConfig)
