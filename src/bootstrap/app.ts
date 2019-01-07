import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { config } from "../config/config";

export const build = async () => {
    const schema = await buildSchema({
        resolvers: config.graphql.resolverPaths,
        emitSchemaFile: config.graphql.schemaEmitPath,
    });

    // TODO: Add middlewares (rate limit, query complexity)
    const app = new ApolloServer({
        schema,
        playground: config.app.playground,
        tracing: config.app.tracing,
    });

    return app;
};

export const serve = async () => {
    process.env.NODE_ENV = config.app.env;

    const app = await build();

    const server = await app.listen(config.app.port);
    // tslint:disable-next-line:no-console
    console.log(`🚀 Server started on ${server.url}`);

    return server;
};
