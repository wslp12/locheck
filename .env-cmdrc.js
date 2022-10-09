const env = {
  renderer: {
    R_TARGET: 'web',
  },
  main: {
    R_TARGET: 'electron-main',
  },
  dev: {
    R_MODE: 'development',
    R_RUN_MODE: 'development',
  },
  prod: {
    R_MODE: 'production',
    R_RUN_MODE: 'production',
  },
  local: {
    R_MODE: 'development',
    R_RUN_MODE: 'local',
  },
};

module.exports = new Promise((resolve) => {
  resolve(env);
});
