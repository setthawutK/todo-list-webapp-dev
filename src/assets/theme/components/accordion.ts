import { AccordionDesignTokens } from '@primeng/themes/types/accordion';
import variables from '../../../../build/token/json/variables.json';

export default {
  // root is default style ui
  // learn more https://github.com/primefaces/primeng/blob/master/packages/themes/src/presets/lara/accordion/index.ts
  root: {
    transitionDuration: '{transition.duration}',
  },
  panel: {
    borderWidth: '0',
    borderColor: '{content.border.color}',
  },
  header: {
    color: variables['sd-color-on-base-content-high'],
    hoverColor: '{text.color}',
    activeColor: '{text.color}',
    padding: '1.125rem',
    fontWeight: '300',
    borderRadius: '0',
    borderWidth: '0 1px 1px 1px',
    borderColor: '{content.border.color}',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      color: '{focus.ring.color}',
      offset: '{focus.ring.offset}',
      shadow: 'inset {focus.ring.shadow}',
    },
    toggleIcon: {
      color: '{text.muted.color}',
      hoverColor: '{text.color}',
      activeColor: '{text.color}',
      activeHoverColor: '{text.color}',
    },
    first: {
      topBorderRadius: '{content.border.radius}',
      borderWidth: '1px',
    },
    last: {
      bottomBorderRadius: '{content.border.radius}',
      activeBottomBorderRadius: '0',
    },
  },
  content: {
    borderWidth: '0 1px 1px 1px',
    borderColor: '{content.border.color}',
    background: '#ffffff',
    color: '{text.color}',
    padding: '1.125rem 1.125rem 1.5rem',
  },
  colorScheme: {
    header: {
      background: '#ffffff',
      hoverBackground: 'transparent',
      activeBackground: '#ffffff',
      activeHoverBackground: '#ffffff',
    },
  },
} as AccordionDesignTokens;
