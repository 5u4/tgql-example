import { Node, Record, Relationship } from "neo4j-driver/types/v1";
import { Field, ID, ObjectType } from "type-graphql";
import { PersonMovieRelation } from "../enums/personMovieRelation.enum";
import { PaginationInput } from "../inputs/pagination.input";
import { NeoDB } from "../utils/neo4j";
import { Movie } from "./movie.model";

@ObjectType({ description: "Person" })
export class Person {
    @Field(type => ID)
    identity: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    born?: string;

    @Field(type => [String], { nullable: true, description: "Person role in the movie. Only exists in nested query" })
    roles?: string[];

    @Field(type => PersonMovieRelation, {
        nullable: true, description: "Person relation with the movie. Only exists in nested query",
    })
    movieRelation?: PersonMovieRelation;

    static async getAllPeople(pagination: PaginationInput = new PaginationInput()): Promise<Person[] | undefined> {
        return NeoDB.collection<Person>(await NeoDB.query(`MATCH (p:Person) RETURN p SKIP {offset} LIMIT {limit}`, {
            offset: pagination.offset(),
            limit: pagination.limit(),
        }));
    }

    static async getPersonMovies(
        id: string,
        relation: PersonMovieRelation = PersonMovieRelation.ALL,
        pagination: PaginationInput = new PaginationInput()
    ): Promise<Movie[] | undefined> {
        const queryRelation = relation === PersonMovieRelation.ALL ? `` : `:${relation.toString()}`;

        const query = `
            MATCH (p:Person) WHERE ID(p) = {id}
            MATCH (p)-[r${queryRelation}]-(m:Movie)
            RETURN m, r SKIP {offset} LIMIT {limit}
        `;

        return NeoDB.collection<Movie>(await NeoDB.query(query, {
            id,
            offset: pagination.offset(),
            limit: pagination.limit(),
        }), <Movie>(record: Record) => {
            const movie = record.get(0) as Node;
            const r = record.get(1) as Relationship;

            return {
                identity: movie.identity,
                ...movie.properties,
                ...r.properties,
                personRelation: r.type as PersonMovieRelation,
            } as unknown as Movie;
        });
    }
}
