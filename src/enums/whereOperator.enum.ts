import { registerEnumType } from "type-graphql";

export enum WhereOperator {
    AND = "AND",
    OR = "OR",
}

registerEnumType(WhereOperator, { name: "WhereOperator" });
