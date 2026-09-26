import { readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "dist");
const outputFile = path.join(outputDirectory, "index.html");
const manifestFile = path.join(outputDirectory, ".vite", "manifest.json");

const vite = await createServer({
  configFile: path.join(projectRoot, "vite.config.js"),
  root: projectRoot,
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");
  const html = await readFile(outputFile, "utf8");
  const manifest = JSON.parse(await readFile(manifestFile, "utf8"));
  const profilePicture = manifest["src/assets/profile-picture.webp"]?.file;

  if (!profilePicture) {
    throw new Error("Could not find the profile picture in Vite's build manifest.");
  }

  const sourcePicturePath = "/src/assets/profile-picture.webp";
  const productionPicturePath = `/${profilePicture}`;
  const markup = renderToString(render("/")).replaceAll(
    sourcePicturePath,
    productionPicturePath,
  );

  if (markup.includes(sourcePicturePath)) {
    throw new Error("Could not replace the development URL for the profile picture.");
  }

  const rootMarker = '<div id="root"></div>';

  if (!html.includes(rootMarker)) {
    throw new Error(`Could not find ${rootMarker} in ${outputFile}`);
  }

  await writeFile(outputFile, html.replace(rootMarker, `<div id="root">${markup}</div>`));
  await unlink(manifestFile);
  console.log("Pre-rendered / into dist/index.html");
} finally {
  await vite.close();
}
