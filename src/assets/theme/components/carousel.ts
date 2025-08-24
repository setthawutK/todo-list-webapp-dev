import { CarouselDesignTokens } from '@primeng/themes/types/carousel';

export default {
  root: {
    transitionDuration: '{transition.duration}',
  },
  content: {
    gap: '0.25rem',
  },
  indicatorList: {
    padding: '1rem',
    gap: '0.5rem',
  },
  indicator: {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '50',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      color: '{focus.ring.color}',
      offset: '{focus.ring.offset}',
      shadow: '{focus.ring.shadow}',
    },
  },
  colorScheme: {
    light: {
      indicator: {
        background: '{primary.color}',
        hoverBackground: '{surface.300}',
        activeBackground: '{surface.200}',
      },
    },
    dark: {
      indicator: {
        background: '{surface.700}',
        hoverBackground: '{surface.600}',
        activeBackground: '{primary.color}',
      },
    },
  },
} as CarouselDesignTokens;
