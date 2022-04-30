import JestHasteMap from "jest-haste-map";
import { cpus } from "os";
import { fileURLToPath } from "url";
import { dirname } from "path";

const root = dirname(fileURLToPath(import.meta.url));
const HasteMapOptions = {
  extensions: ["js"],
  maxWorkers: cpus().length,
  name: "best",
  platforms: [],
  rootDir: root,
  roots: [root],
};

// Need to use `.default` as of Jest 27.
const hasteMap = new JestHasteMap.default(HasteMapOptions);
// This line is only necessary in 'jest-haste-map' version 28 or later
await hasteMap.setupCachePath(HasteMapOptions);

const { hasteFS } = await hasteMap.build();
const testFiles = hasteFS.matchFilesWithGlob(["**/*.test.js"]);

console.log(testFiles);
