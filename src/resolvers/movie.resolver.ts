import { Arg, Query, Resolver } from "type-graphql";
import { PaginationInput } from "../inputs/pagination.input";
import { Movie } from "../models/movie.model";

@Resolver(of => Movie)
export class UserResolver {
    @Query(returns => [Movie])
    async movies(@Arg("pagination", { nullable: true }) pagination?: PaginationInput): Promise<Movie[] | undefined> {
        return Movie.getAllMovies(pagination);
    }
}
