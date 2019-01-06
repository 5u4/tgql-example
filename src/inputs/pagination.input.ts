import { Max, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType({ description: "The general pagination inputs" })
export class PaginationInput {
    @Field(type => Int, { description: "The page number" })
    @Min(1)
    page = 1;

    @Field(type => Int, { description: "The maximum amount in each page" })
    @Min(1) @Max(100) // TODO: Add maximum to config
    perPage = 30; // TODO: Add default offset to config

    limit = () => this.perPage;
    offset = () => (this.page - 1) * this.perPage;
}
