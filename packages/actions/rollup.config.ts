import * as fs from "fs"
import typescript from "@rollup/plugin-typescript"
import cleanup from "rollup-plugin-cleanup"
import autoExternal from "rollup-plugin-auto-external"

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"))
const banner = `/**
 * @module ${pkg.name}
 * @version ${pkg.version}
 * @file ${pkg.description}
 * @copyright Ethereum Foundation 2022
 * @license ${pkg.license}
 * @see [Github]{@link ${pkg.homepage}}
*/`

const config = {
    input: "src/index.ts",
    output: [
        { file: pkg.exports.require, format: "cjs", banner, exports: "auto" },
        { file: pkg.exports.import, format: "es", banner }
    ],
    external: Object.keys(pkg.dependencies),
    plugins: [
        autoExternal(),
        (typescript as any)({
            tsconfig: "./build.tsconfig.json",
            sourceMap: true
        }),
        cleanup({ comments: "jsdoc" })
    ]
}

export default config
