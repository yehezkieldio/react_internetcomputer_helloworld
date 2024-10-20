import { resolve } from "path";

import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
    context: __dirname,
    entry: {
        main: "./src/main.tsx",
    },

    resolve: {
        extensions: ["...", ".ts", ".tsx", ".jsx"],
        tsConfig: resolve(__dirname, "./tsconfig.json"),
    },
    devServer: {
        proxy: [
            {
                context: ["/api"],
                target: "http://127.0.0.1:4943",
                changeOrigin: true,
            },
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: {
                                    tailwindcss: {},
                                    autoprefixer: {},
                                },
                            },
                        },
                    },
                ],
                type: "css",
            },
            {
                test: /\.svg$/,
                type: "asset",
            },
            {
                test: /\.(jsx?|tsx?)$/,
                use: [
                    {
                        loader: "builtin:swc-loader",
                        options: {
                            jsc: {
                                parser: {
                                    syntax: "typescript",
                                    tsx: true,
                                },
                                transform: {
                                    react: {
                                        runtime: "automatic",
                                        development: isDev,
                                        refresh: isDev,
                                    },
                                },
                            },
                            env: { targets },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new rspack.HtmlRspackPlugin({
            template: "./index.html",
        }),
        new rspack.EnvironmentPlugin(["NODE_ENV", "IC_HOST", "CANISTER_ID_BACKEND", "DFX_NETWORK"]),
        isDev ? new RefreshPlugin() : null,
    ].filter(Boolean),

    optimization: {
        minimizer: [
            new rspack.SwcJsMinimizerRspackPlugin(),
            new rspack.LightningCssMinimizerRspackPlugin({
                minimizerOptions: { targets },
            }),
        ],
    },
    experiments: {
        css: true,
    },
});
