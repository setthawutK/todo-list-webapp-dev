import { DrawerDesignTokens } from '@primeng/themes/types/drawer';

export default {
  root: {
    background: 'linear-gradient(90deg, #080B2A 0%, #070A29 100%)',
    borderColor: '#FFFFFF6E',
    color: '#FFFFFFD9',
    shadow: '{overlay.modal.shadow}',
  },
  header: {
    padding: '{overlay.modal.padding}',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  content: {
    padding: '0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}',
  },
  footer: {
    padding: '{overlay.modal.padding}',
  },
} as DrawerDesignTokens;
