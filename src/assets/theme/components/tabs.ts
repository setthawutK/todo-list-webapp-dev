import { TabsDesignTokens } from '@primeng/themes/types/tabs';
import variables from '../../../../build/token/json/variables.json';

export default {
  root: {
    transitionDuration: '{transition.duration}',
  },
  tablist: {
    borderWidth: '0',
    background: '',
    borderColor: variables['sd-select-color-background-normal'],
  },
  tab: {
    borderWidth: '0',
    borderColor: variables['sd-select-color-background-normal'],
    hoverBorderColor: 'transparent',
    activeBorderColor: variables['sd-select-color-background-normal'],
    color: '#ffffff',
    activeColor: '#ffffff',
    padding: '1rem 1.25rem',
    fontWeight: '300',
    margin: '0',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      color: '{focus.ring.color}',
      offset: '{focus.ring.offset}',
      shadow: 'inset {focus.ring.shadow}',
    },
  },
  tabpanel: {
    background: '{content.background}',
    color: '{content.color}',
    padding: '0.875rem 1.125rem 1.125rem 1.125rem',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      color: '{focus.ring.color}',
      offset: '{focus.ring.offset}',
      shadow: 'inset {focus.ring.shadow}',
    },
  },
  navButton: {
    background: '{content.background}',
    color: '{text.muted.color}',
    hoverColor: '{text.color}',
    size: '2rem',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      color: '{focus.ring.color}',
      offset: '{focus.ring.offset}',
      shadow: 'inset {focus.ring.shadow}',
    },
  },
  activeBar: {
    height: '0',
    bottom: '0',
    background: variables['sd-select-color-background-normal'],
  },
  colorScheme: {
    light: {
      navButton: {
        color: '#0F295C',
        shadow: '',
        background: '#ffffff',
      },
      tab: {
        background: '',
        hoverBackground: '{surface.100}',
        activeBackground: variables['sd-select-color-background-normal'],
      },
    },
    dark: {
      navButton: {
        shadow: '0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)',
      },
      tab: {
        background: '{surface.800}',
        hoverBackground: '{surface.700}',
        activeBackground: '{surface.900}',
      },
    },
  },
} as TabsDesignTokens;
