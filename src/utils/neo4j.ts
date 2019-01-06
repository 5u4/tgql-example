import { v1 } from "neo4j-driver";
import { Node, Record, StatementResult } from "neo4j-driver/types/v1";

const db = v1.driver("bolt://localhost", v1.auth.basic("neo4j", "abcd"), {
    disableLosslessIntegers: true,
});

interface QueryOptions {
    mode?: "READ" | "WRITE";
}

export class NeoDB {
    static async query(_query: string, variables = {}, options: QueryOptions = { mode: "READ" }) {
        const session = db.session(options.mode);

        const results = await session.run(_query, variables);

        session.close();

        return results;
    }

    private static _transform<T>(result: Record) {
        const node = result.get(0) as Node;

        return {
            identity: node.identity,
            ...node.properties,
        } as unknown as T;
    }

    static transform<T>(results: StatementResult) {
        const result = results.records.pop();

        if (!result) {
            return undefined;
        }

        return this._transform<T>(result);
    }

    static collection<T>(results: StatementResult) {
        return results.records.map(result => this._transform<T>(result));
    }
}
