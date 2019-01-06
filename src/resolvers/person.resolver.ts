import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { PersonMovieRelation } from "../enums/personMovieRelation.enum";
import { PaginationInput } from "../inputs/pagination.input";
import { Movie } from "../models/movie.model";
import { Person } from "../models/person.model";

@Resolver(of => Person)
export class PersonResolver {
    @Query(returns => [Person])
    async people(@Arg("pagination", { nullable: true }) pagination?: PaginationInput): Promise<Person[] | undefined> {
        return Person.getAllPeople(pagination);
    }

    @FieldResolver(returns => [Movie])
    async movies(
        @Root() person: Person,
        @Arg("relation", type => PersonMovieRelation, { nullable: true, defaultValue: PersonMovieRelation.ALL })
        relation: PersonMovieRelation,
        @Arg("pagination", { nullable: true }) pagination?: PaginationInput
    ): Promise<Movie[] | undefined> {
        return Person.getPersonMovies(person.identity, relation, pagination);
    }
}
