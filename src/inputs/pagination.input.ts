import { InputType, Field, Int } from "type-graphql";

@InputType()
export class PaginationInput {
    @Field(type => Int)
    page = 1;

    @Field(type => Int)
    perPage = 30; // TODO: Add default offset to config

    // limit = this.perPage;
    // offset = (this.page - 1) * this.perPage;

    limit = () => this.perPage;
    offset = () => (this.page - 1) * this.perPage;
}
