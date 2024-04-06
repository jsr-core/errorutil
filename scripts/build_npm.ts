import { build, emptyDir } from "@deno/dnt";

const name = "@lambdalisue/errorutil";
const version = Deno.args[0];
if (!version) {
  throw new Error("No version argument is specified");
}
console.log("*".repeat(80));
console.log(`${name} ${version}`);
console.log("*".repeat(80));

await emptyDir("./npm");

await build({
  typeCheck: false,
  // XXX:
  // snapshot tests doesn't work with dnt so we disable tests for now
  // https://github.com/denoland/dnt/issues/254
  test: false,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: "dev",
  },
  package: {
    // package.json properties
    name,
    version,
    author: "Alisue <lambdalisue@gmail.com>",
    license: "MIT",
    repository: "https://github.com/lambdalisue/deno-errorutil",
  },
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
