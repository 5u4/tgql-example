import { Field, Int, ID, ObjectType } from "type-graphql";
import { PaginationInput } from "../inputs/pagination.input";
import { NeoDB } from "../utils/neo4j";

@ObjectType({ description: "Movie" })
export class Movie {
    @Field(type => ID)
    identity: string;

    @Field()
    title: string;

    @Field(type => Int)
    released: number;

    @Field({ nullable: true })
    tagline?: string;

    static async getAllMovies(pagination: PaginationInput = new PaginationInput()): Promise<Movie[] | undefined> {
        return NeoDB.collection<Movie>(await NeoDB.query(`MATCH (m:Movie) RETURN m SKIP {offset} LIMIT {limit}`, {
            offset: pagination.offset(),
            limit: pagination.limit(),
        }));
    }
}
