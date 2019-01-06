import { Field, InputType, Int } from "type-graphql";
import { WhereOperator } from "../enums/whereOperator.enum";

@InputType()
export class MovieFiltersInput {
    @Field({ nullable: true })
    titleContains?: string;

    @Field({ nullable: true })
    taglineContains?: string;

    @Field(type => Int, { nullable: true })
    releasedBefore?: number;

    @Field(type => Int, { nullable: true })
    releasedAfter?: number;

    @Field(type => WhereOperator, { nullable: true })
    operator?: "AND" | "OR" = "AND";
}
