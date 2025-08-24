import { DialogDesignTokens } from '@primeng/themes/types/dialog';
import variables from '../../../../build/token/json/variables.json';

export default {
  // root is default style ui
  // learn more https://github.com/primefaces/primeng/blob/master/packages/themes/src/presets/lara/dialog/index.ts
  root: {
    background: '#ffffff',
    color: variables['sd-color-base-foreground-invert'],
  },
  header: {
    background: '#ffffff',
  },
  footer: {
    background: '#ffffff',
  },
} as DialogDesignTokens;
