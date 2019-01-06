import { Arg, Query, Resolver } from "type-graphql";
import { PaginationInput } from "../inputs/pagination.input";
import { Person } from "../models/person.model";

@Resolver(of => Person)
export class PersonResolver {
    @Query(returns => [Person])
    async people(@Arg("pagination", { nullable: true }) pagination?: PaginationInput): Promise<Person[] | undefined> {
        return Person.getAllPeople(pagination);
    }
}
