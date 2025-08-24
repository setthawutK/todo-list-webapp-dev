import { TagDesignTokens } from '@primeng/themes/types/tag';
import variables from '../../../../build/token/json/variables.json';

export default {
  // root is default style ui
  // learn more https://github.com/primefaces/primeng/blob/master/packages/themes/src/presets/lara/tag/index.ts
  root: {
    fontSize: '0.875rem',
    fontWeight: '700',
    padding: `0 ${variables['sd-badge-padding-horz-medium']}`,
    gap: '0.25rem',
    borderRadius: variables['sd-badge-numeric-radius-default'],
    roundedBorderRadius: variables['sd-badge-radius-default'],
  },
  icon: {
    size: '0.75rem',
  },
  colorScheme: {
    light: {
      primary: {
        background: '{primary.color}',
        color: '{primary.contrast.color}',
      },
      secondary: {
        background: '{surface.100}',
        color: '{surface.600}',
      },
      success: {
        background: '{green.500}',
        color: '{surface.0}',
      },
      info: {
        background: '{sky.500}',
        color: '{surface.0}',
      },
      warn: {
        background: '#FFF4EE',
        color: '#EA722F',
      },
      danger: {
        background: '{red.500}',
        color: '{surface.0}',
      },
      contrast: {
        background: '{surface.950}',
        color: '{surface.0}',
      },
    },
    // dark: {
    //   primary: {
    //     background: '{primary.color}',
    //     color: '{primary.contrast.color}',
    //   },
    //   secondary: {
    //     background: '{surface.800}',
    //     color: '{surface.300}',
    //   },
    //   success: {
    //     background: '{green.400}',
    //     color: '{green.950}',
    //   },
    //   info: {
    //     background: '{sky.400}',
    //     color: '{sky.950}',
    //   },
    //   warn: {
    //     background: '{orange.400}',
    //     color: '{orange.950}',
    //   },
    //   danger: {
    //     background: '{red.400}',
    //     color: '{red.950}',
    //   },
    //   contrast: {
    //     background: '{surface.0}',
    //     color: '{surface.950}',
    //   },
    // },
  },
} as TagDesignTokens;
