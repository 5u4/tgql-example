import { Max, MaxLength, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { WhereOperator } from "../enums/whereOperator.enum";

@InputType({ description: "Filters for movies" })
export class MovieFiltersInput {
    @Field({ nullable: true, description: "String that contains in title" })
    @MaxLength(30)
    titleContains?: string;

    @Field({ nullable: true, description: "String that contains in tagline" })
    @MaxLength(64)
    taglineContains?: string;

    @Field(type => Int, { nullable: true, description: "Movies released before a certain year" })
    @Min(0) @Max(9999)
    releasedBefore?: number;

    @Field(type => Int, { nullable: true, description: "Movies released after a certain year" })
    @Min(0) @Max(9999)
    releasedAfter?: number;

    @Field(type => WhereOperator, { nullable: true, description: "The filtering operator" })
    operator?: "AND" | "OR" = "AND";
}
