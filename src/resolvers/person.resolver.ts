import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { PersonMovieRelation } from "../enums/personMovieRelation.enum";
import { PaginationInput } from "../inputs/pagination.input";
import { PersonFiltersInput } from "../inputs/personFilters.input";
import { Movie } from "../models/movie.model";
import { Person } from "../models/person.model";

@Resolver(of => Person)
export class PersonResolver {
    @Query(returns => Person, { description: "Get a specific person with person's graph id" })
    async person(@Arg("identity") identity: string): Promise<Person | undefined> {
        return Person.find(identity);
    }

    @Query(returns => [Person], { description: "Get people with pagination and filters" })
    async people(
        @Arg("pagination", { nullable: true, description: "The people pagination" }) pagination?: PaginationInput,
        @Arg("filters", { nullable: true, description: "The people filters" }) filters?: PersonFiltersInput
    ): Promise<Person[] | undefined> {
        return Person.all(pagination, filters);
    }

    @FieldResolver(returns => [Movie], { description: "Get person related movies" })
    async movies(
        @Root() person: Person,
        @Arg("relation", type => PersonMovieRelation, {
            nullable: true, defaultValue: PersonMovieRelation.ALL,
            description: "The person movies relation",
        })
        relation: PersonMovieRelation,
        @Arg("pagination", { nullable: true, description: "The person movies pagination" }) pagination?: PaginationInput
    ): Promise<Movie[] | undefined> {
        return Person.movies(person.identity, relation, pagination);
    }
}
