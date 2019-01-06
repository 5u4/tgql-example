import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from "type-graphql";

export const build = async () => {
    const schema = await buildSchema({
        resolvers: [
            path.resolve(__dirname, "../resolvers/**/*.ts"),
        ],
        emitSchemaFile: path.resolve(__dirname, "../schema.graphql"), // TODO: Use config here
    });

    const app = new ApolloServer({
        schema,
        playground: true, // TODO: Add to config
        tracing: true,
    });

    return app;
};

export const serve = async () => {
    const app = await build();

    const server = await app.listen(4000); // TODO: Config port
    // tslint:disable-next-line:no-console
    console.log(`🚀 Server started on ${server.url}`);

    return server;
};
