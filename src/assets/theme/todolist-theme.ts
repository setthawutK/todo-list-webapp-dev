import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import variables from '../../../build/token/json/variables.json';
import accordion from './components/accordion';
import button from './components/button';
import dialog from './components/dialog';
import inputtext from './components/inputtext';
import select from './components/select';
import tag from './components/tag';
import datatable from './components/datatable';
import paginator from './components/paginator';
import tabs from './components/tabs';
import timeline from './components/timeline';
import datepicker from './components/datepicker';
import carousel from './components/carousel';
import drawer from './components/drawer';

export const TodoListPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          color: variables['sd-color-primary-foreground-default'],
          invarseColor: '#FFFFFF14',
          hoverColor: variables['sd-color-primary-foreground-hover'],
          activeColor: variables['sd-color-primary-foreground-pressed'],
        },
        highlight: {
          background: variables['sd-color-secondary-foreground-default'],
          focusBackground: variables['sd-color-primary-foreground-hover'],
          color: '#FFFFFF14',
          focusColor: '#FFFFFF14',
        },
        mask: { background: 'rgba(0,0,0,0.4)', color: '{surface.200}' },
        formField: {
          background: variables['sd-color-primary-foreground-default'],
          disabledBackground: '{surface.200}',
          filledBackground: '{surface.50}',
          filledHoverBackground: '{surface.0}',
          filledFocusBackground: '{surface.0}',
          borderColor: variables['sd-color-primary-foreground-default'],
          hoverBorderColor: '{surface.0}',
          focusBorderColor: '#ffffff',
          invalidBorderColor: '{red.400}',
          color: '{surface.0}',
          disabledColor: '{surface.500}',
          placeholderColor: '#FFFFFF3D',
          invalidPlaceholderColor: '{red.600}',
          floatLabelColor: '{surface.500}',
          floatLabelFocusColor: '{primary.600}',
          floatLabelActiveColor: '{surface.500}',
          floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
          iconColor: '{surface.400}',
          shadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)',
        },
        text: { color: '{surface.700}', hoverColor: '{surface.800}', mutedColor: '{surface.500}', hoverMutedColor: '{surface.600}' },
        content: {
          background: '{surface.0}',
          hoverBackground: '{surface.100}',
          borderColor: '{surface.200}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
        overlay: {
          select: {
            background: '#ffffff',
            hoverBackground: '#000000',
            borderColor: '',
            color: variables['sd-color-primary-foreground-subtle'],
          },
          popover: { background: '{surface.0}', borderColor: '{surface.200}', color: '{text.color}' },
          modal: { background: '{surface.0}', borderColor: '{surface.200}', color: '{text.color}' },
        },
        list: {
          option: {
            focusBackground: '#484c79',
            selectedBackground: '{highlight.background}',
            selectedFocusBackground: '#484c79',
            color: '{text.color}',
            focusColor: '#ffffff',
            selectedColor: '#ffffff',
            selectedFocusColor: '#ffffff',
            icon: { color: '{surface.400}', focusColor: '{surface.500}' },
          },
          optionGroup: { background: 'transparent', color: '{text.muted.color}' },
        },
        // navigation: {
        //   item: {
        //     focusBackground: '{surface.100}',
        //     activeBackground: '{surface.100}',
        //     color: '{text.color}',
        //     focusColor: '{text.hover.color}',
        //     activeColor: '{text.hover.color}',
        //     icon: {
        //       color: '{surface.400}',
        //       focusColor: '{surface.500}',
        //       activeColor: '{surface.500}',
        //     },
        //   },
        //   submenuLabel: {
        //     background: 'transparent',
        //     color: '{text.muted.color}',
        //   },
        //   submenuIcon: {
        //     color: '{surface.400}',
        //     focusColor: '{surface.500}',
        //     activeColor: '{surface.500}',
        //   },
        // },
      },
      //   dark: {
      //     primary: {
      //       color: '{red.50}',
      //       invarseColor: '{red.950}',
      //       hovarColor: '{red.100}',
      //       activeColor: '{red.200}',
      //     },
      //     highlight: {
      //       background: 'rgba(250, 250, 250, .16)',
      //       focusBackground: 'rgba(250, 250, 250, .24)',
      //       color: 'rgba(255,255,255,.87)',
      //       focusColor: 'rgba(255,255,255,.87)',
      //     },
      //   },
    },
  },
  components: { button, dialog, select, inputtext, accordion, tag, tabs, datatable, paginator, timeline, datepicker, carousel, drawer },
});
