import { Max, MaxLength, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { WhereOperator } from "../enums/whereOperator.enum";

@InputType({ description: "Filters for people" })
export class PersonFiltersInput {
    @Field({ nullable: true, description: "String that contains in name" })
    @MaxLength(30)
    nameContains?: string;

    @Field(type => Int, { nullable: true, description: "People born before a certain year" })
    @Min(0) @Max(9999)
    bornBefore?: number;

    @Field(type => Int, { nullable: true, description: "People born after a certain year" })
    @Min(0) @Max(9999)
    bornAfter?: number;

    @Field(type => WhereOperator, { nullable: true, description: "The filtering operator" })
    operator?: "AND" | "OR" = "AND";
}
