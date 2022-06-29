/** @type {import('next').NextConfig} */

const withWorkbox = require("next-with-workbox");

const nextConfig = withWorkbox( {
  workbox: {
    dest: "public",
    swDest: "sw.js",
    swSrc: "worker.ts",
    force: true,
    exclude: [ /middleware/ ]
  },
  reactStrictMode: true
})

module.exports = nextConfig