import { v1 } from "neo4j-driver";
import { Node, Record, StatementResult } from "neo4j-driver/types/v1";
import { config } from "../config/config";

const db = v1.driver(
    config.database.neo4j.url,
    v1.auth.basic(config.database.neo4j.user, config.database.neo4j.password),
    { disableLosslessIntegers: true }
);

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

    static transform<T>(results: StatementResult, _transform = this._transform) {
        const result = results.records.pop();

        if (!result) {
            return undefined;
        }

        return _transform<T>(result);
    }

    static collection<T>(results: StatementResult, _transform = this._transform) {
        return results.records.map(result => _transform<T>(result));
    }
}
