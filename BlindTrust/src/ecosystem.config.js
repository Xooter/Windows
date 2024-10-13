export const apps = [
  {
    name: "persiana",
    script: "index.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 4000,
    },
  },
];
