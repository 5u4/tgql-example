import * as path from "path";

export const graphql = {
    resolverPaths: [
        path.resolve(__dirname, "../resolvers/**/*.ts"),
    ],
    schemaEmitPath: path.resolve(__dirname, "../schema.graphql"),
    pagination: {
        maxPerPage: 100,
        defaultPerPage: 30,
    },
};
