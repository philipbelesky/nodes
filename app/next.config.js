const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = withBundleAnalyzer({
    distDir: 'build',
    redirects: async () => {
      return [
        {
          source: '/gh',
          destination: '/',
          permanent: false
        },
        {
          source: '/gh/:any*',
          destination: '/',
          permanent: false
        },
        {
          source: '/legal/:any*',
          destination: '/',
          permanent: false
        },
        {
          source: '/signin',
          destination: '/',
          permanent: false
        },
        {
          source: '/signup',
          destination: '/',
          permanent: false
        },
        {
          source: '/pwr',
          destination: '/',
          permanent: false
        }
      ]
    },
    webpack: (config) => {
      config.resolve.fallback = {
        child_process: false,
        constants: false,
        crypto: false,
        "fast-crc32c": false,
        fs: false,
        http: false,
        https: false,
        net: false,
        os: false,
        path: false,
        querystring: false,
        request: false,
        stream: false,
        tls: false,
        worker_threads: false,
        zlib: false
      };

      // The `rhino3dm.wasm` file needs to land where the `rhino3dm.js` gets placed by webpack
      config.plugins.push(new CopyWebpackPlugin({
        patterns: [
          { from: "node_modules/rhino3dm/rhino3dm.wasm", to: "static/chunks/rhino3dm.wasm" },
          { from: "node_modules/rhino3dm/rhino3dm.wasm", to: "static/chunks/pages/rhino3dm.wasm" },
          { from: "node_modules/rhino3dm/rhino3dm.wasm", to: "static/chunks/pages/[user]/gh/rhino3dm.wasm" }
        ],
      }))

      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      })

      return config;
    },
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
})