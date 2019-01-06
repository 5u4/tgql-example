import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { PersonMovieRelation } from "../enums/personMovieRelation.enum";
import { MovieFiltersInput } from "../inputs/movieFilters.input";
import { PaginationInput } from "../inputs/pagination.input";
import { Movie } from "../models/movie.model";
import { Person } from "../models/person.model";

@Resolver(of => Movie)
export class UserResolver {
    @Query(returns => Movie, { description: "Get a specific movie with movie's graph id" })
    async movie(@Arg("identity") identity: string): Promise<Movie | undefined> {
        return Movie.find(identity);
    }

    @Query(returns => [Movie], { description: "Get movies with pagination and filters" })
    async movies(
        @Arg("pagination", { nullable: true, description: "The movies pagination" }) pagination?: PaginationInput,
        @Arg("filters", { nullable: true, description: "The movies filters" }) filters?: MovieFiltersInput
    ): Promise<Movie[] | undefined> {
        return Movie.all(pagination, filters);
    }

    @FieldResolver(returns => [Person], { description: "Get movie related people" })
    async people(
        @Root() movie: Movie,
        @Arg("relation", type => PersonMovieRelation, {
            nullable: true, defaultValue: PersonMovieRelation.ALL,
            description: "The movie people relation",
        })
        relation: PersonMovieRelation,
        @Arg("pagination", { nullable: true, description: "The movie people pagination" }) pagination?: PaginationInput
    ): Promise<Person[] | undefined> {
        return Movie.people(movie.identity, relation, pagination);
    }
}
