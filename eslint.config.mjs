import nextConfig from "eslint-config-next";

export default [
  {
    ignores: ["node_modules", ".next", "dist"]
  },
  ...nextConfig,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "react-hooks/incompatible-library": "off"
    }
  }
];

