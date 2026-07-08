module.exports = {
  apps: [
    {
      name: 'dev-backend',
      cwd: '/srv/dev/backend',
      script: 'dist/main.js',
      interpreter: '/root/.nvm/versions/node/v22.22.3/bin/node',
      env: {
        NODE_ENV: 'development',
        PORT: 4000,
        FRONTEND_URL: 'https://dev.dajflek.sk',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/tmp/dev-backend-error.log',
      out_file: '/tmp/dev-backend-out.log',
      merge_logs: true,
      max_restarts: 10,
      restart_delay: 5000,
    },
    {
      name: 'dev-frontend',
      cwd: '/srv/dev/frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'dev -p 3000',
      interpreter: '/root/.nvm/versions/node/v22.22.3/bin/node',
      env: {
        NODE_ENV: 'development',
        NEXT_PUBLIC_API_URL: 'https://dev.dajflek.sk/api',
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: '/tmp/dev-frontend-error.log',
      out_file: '/tmp/dev-frontend-out.log',
      merge_logs: true,
      max_restarts: 10,
      restart_delay: 5000,
    },
  ],
};
