import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const sha = process.env.GITHUB_SHA ?? execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
if (!/^[a-f0-9]{40}$/i.test(sha)) throw new Error("No se obtuvo un SHA de commit de 40 caracteres.");

const outputDirectory = path.resolve("dist");
await mkdir(outputDirectory, { recursive: true });
await writeFile(path.join(outputDirectory, "build-id.txt"), `${sha}\n${new Date().toISOString()}\n`, "utf8");
console.log(`Sello de build escrito para ${sha}.`);
