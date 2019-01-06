import { Field, InputType, Int } from "type-graphql";
import { WhereOperator } from "../enums/whereOperator.enum";

@InputType()
export class PersonFiltersInput {
    @Field({ nullable: true })
    nameContains?: string;

    @Field(type => Int, { nullable: true })
    bornBefore?: number;

    @Field(type => Int, { nullable: true })
    bornAfter?: number;

    @Field(type => WhereOperator, { nullable: true })
    operator?: "AND" | "OR" = "AND";
}
