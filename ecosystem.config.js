// pm进程守护的配置
module.exports = {
  apps: [
    {
      name: 'projectName', // 应用名称
      exec_mode: 'cluster',
      // 开启的进程数
      instances: 1, // Or a number of instances
      script: './build/main.js',
      args: 'start',
      env: {
        NODE_ENV: 'development',
      },
      env_dev: {
        NODE_ENV: 'development',
      },
      env_prod: {
        NODE_ENV: 'production',
      },
    },
  ],
};
