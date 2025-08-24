import { TimelineDesignTokens } from '@primeng/themes/types/timeline';

export default {
  // event: {
  //   minHeight: '5rem',
  // },
  horizontal: {
    eventContent: {
      padding: '1rem 0',
    },
  },
  vertical: {
    eventContent: {
      padding: '0 1rem',
    },
  },
  eventMarker: {
    size: '1.125rem',
    borderRadius: '50%',
    borderWidth: '2px',
    background: '#3490FA',
    borderColor: '#3490FA',
    content: {
      borderRadius: '50%',
      size: '0.375rem',
      background: '',
      insetShadow: 'none',
    },
  },
  eventConnector: {
    color: '#FFFFFF3D',
    size: '2px',
  },
} as TimelineDesignTokens;
