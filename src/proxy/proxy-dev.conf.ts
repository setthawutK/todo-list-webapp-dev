const todoListService = 'http://103.99.11.216:30899';

const PROXY_CONFIG = {
  '/todo-list-service': {
    target: todoListService,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      '^/todo-list-service': '',
    },
  },
};

module.exports = PROXY_CONFIG;
