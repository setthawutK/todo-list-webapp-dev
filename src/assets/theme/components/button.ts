import { ButtonDesignTokens } from '@primeng/themes/types/button';
import variables from '../../../../build/token/json/variables.json';

export default {
  // root is default style ui
  // learn more https://github.com/primefaces/primeng/blob/master/packages/themes/src/presets/lara/button/index.ts
  root: {
    borderRadius: variables['sd-btn-radius-base'],
    label: {
      fontWeight: '400',
    },
  },
  colorScheme: {
    light: {
      root: {
        primary: {
          background: variables['sd-btn-color-background-primary-normal'],
          hoverBackground: variables['sd-btn-color-background-primary-hover'],
          activeBackground: '',
          borderColor: variables['sd-btn-color-border-primary-normal'],
          hoverBorderColor: variables['sd-btn-color-border-primary-hover'],
          activeBorderColor: '',
          color: '#ffffff',
          hoverColor: '#ffffff',
          activeColor: '',
          focusRing: {
            color: 'transparent',
            shadow: '0 0 0 0.2rem {primary.200}',
          },
        },
        secondary: {
          background: variables['sd-btn-color-background-secondary-normal'],
          hoverBackground: variables['sd-btn-color-background-secondary-hover'],
          activeBackground: '',
          borderColor: variables['sd-btn-color-border-secondary-normal'],
          hoverBorderColor: variables['sd-btn-color-border-secondary-hover'],
          activeBorderColor: '',
          color: '#0F295C',
          hoverColor: '#0F295C',
          activeColor: '',
          focusRing: {
            color: 'transparent',
            shadow: '0 0 0 0.2rem {surface.200}',
          },
        },
        contrast: {
          background: '',
          hoverBackground: '{surface.900}',
          activeBackground: '{surface.800}',
          borderColor: '{surface.900}',
          hoverBorderColor: '{surface.900}',
          activeBorderColor: '{surface.800}',
          color: '{surface.0}',
          hoverColor: '{surface.0}',
          activeColor: '{surface.0}',
          focusRing: {
              color: 'transparent',
          }
        },
        danger: {
          background: variables['sd-btn-color-background-primary-danger-normal'],
          hoverBackground: variables['sd-btn-color-background-primary-danger-hover'],
          activeBackground: variables['sd-btn-color-background-primary-danger-pressed'],
          borderColor: variables['sd-btn-color-background-primary-danger-normal'],
          hoverBorderColor: variables['sd-btn-color-background-primary-danger-normal'],
          activeBorderColor: variables['sd-btn-color-background-primary-danger-normal'],
          color: '#ffffff',
          hoverColor: '#ffffff',
          activeColor: '#ffffff',
          focusRing: {
            color: 'transparent',
            shadow: '0 0 0 0.2rem {red.200}',
          },
        }
      },
    },
  },
} as ButtonDesignTokens;
