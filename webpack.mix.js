// https://alpas.dev/docs/mixing-assets

let mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
const resourcesPath = "src/main/resources";
const templatesPath = `${resourcesPath}/templates`;
const publicPath = `${resourcesPath}/web`;

mix
  .setPublicPath(publicPath)
  .js(`${resourcesPath}/js/app.js`, "js")
  .postCss(`${resourcesPath}/css/app.css`, "css", [
    tailwindcss("./tailwind.config.js"),
  ])
  .disableNotifications();

if (mix.inProduction()) {
  mix.version();
} else {
  mix.browserSync({
    open: false,
    notify: false,
    proxy: `localhost:${process.env.MIX_APP_PORT}`,
    files: ["out/**/*", publicPath, templatesPath],
  });
}
