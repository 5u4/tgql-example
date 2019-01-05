import { v1 } from "neo4j-driver";
import { Record, Node } from "neo4j-driver/types/v1";

const db = v1.driver("bolt://localhost", v1.auth.basic("neo4j", "abcd"), {
    disableLosslessIntegers: true,
});

export class NeoDB {
    static async query(_query: string, variables = {}, mode: "READ" | "WRITE" = "READ") {
        const session = db.session(mode);

        const results = await session.run(_query, variables);

        session.close();

        return results;
    }

    static transform<T>(records: Record[], alias = "n") {
        return records.map(result => {
            const node = result.get(alias) as Node;

            return {
                identity: node.identity,
                ...node.properties,
            } as unknown as T;
        });
    }

    static async queryAndTransform<T>(query: string, variables = {}, mode: "READ" | "WRITE" = "READ", alias = "n") {
        const results = await this.query(query, variables, mode);

        return this.transform<T>(results.records, alias);
    }
}
