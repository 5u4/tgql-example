import { Max, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";
import { config } from "../config";

@InputType({ description: "The general pagination inputs" })
export class PaginationInput {
    @Field(type => Int, { description: "The page number" })
    @Min(1)
    page = 1;

    @Field(type => Int, { description: "The maximum amount in each page" })
    @Min(1) @Max(config.graphql.pagination.maxPerPage)
    perPage = config.graphql.pagination.defaultPerPage;

    limit = () => this.perPage;
    offset = () => (this.page - 1) * this.perPage;
}
