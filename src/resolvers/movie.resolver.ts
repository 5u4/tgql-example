import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { PersonMovieRelation } from "../enums/personMovieRelation.enum";
import { PaginationInput } from "../inputs/pagination.input";
import { Movie } from "../models/movie.model";
import { Person } from "../models/person.model";

@Resolver(of => Movie)
export class UserResolver {
    @Query(returns => [Movie])
    async movies(@Arg("pagination", { nullable: true }) pagination?: PaginationInput): Promise<Movie[] | undefined> {
        return Movie.getAllMovies(pagination);
    }

    @FieldResolver(returns => [Person])
    async people(
        @Root() movie: Movie,
        @Arg("relation", type => PersonMovieRelation, { nullable: true, defaultValue: PersonMovieRelation.ALL })
        relation: PersonMovieRelation,
        @Arg("pagination", { nullable: true }) pagination?: PaginationInput
    ): Promise<Person[] | undefined> {
        return Movie.getMoviePeople(movie.identity, relation, pagination);
    }
}
