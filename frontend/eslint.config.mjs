import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];