export const database = {
    neo4j: {
        url: process.env.NEO4J_URL || "bolt://localhost",
        user: process.env.NEO4J_USER || "neo4j",
        password: process.env.NEO4J_PASSWORD || "neo4j",
    },
};
