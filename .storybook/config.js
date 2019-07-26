import { configure, addParameters } from '@storybook/react';
import {theme} from '../src/theme'

const req = require.context('../src/components', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addParameters({
  options: {
    theme: theme
  }
})

configure(loadStories, module);
