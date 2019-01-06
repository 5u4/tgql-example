import { Node, Record, Relationship } from "neo4j-driver/types/v1";
import { Field, ID, ObjectType } from "type-graphql";
import { PersonMovieRelation } from "../enums/personMovieRelation.enum";
import { PaginationInput } from "../inputs/pagination.input";
import { PersonFiltersInput } from "../inputs/personFilters.input";
import { NeoDB } from "../utils/neo4j";
import { Movie } from "./movie.model";

@ObjectType({ description: "Person" })
export class Person {
    @Field(type => ID, { description: "The person graph id in Neo4J" })
    identity: string;

    @Field({ description: "The name of the person" })
    name: string;

    @Field({ nullable: true, description: "The year of the person born" })
    born?: string;

    @Field(type => [String], { nullable: true, description: "Person role in the movie. Only exists in nested query" })
    roles?: string[];

    @Field(type => PersonMovieRelation, {
        nullable: true, description: "Person relation with the movie. Only exists in nested query",
    })
    movieRelation?: PersonMovieRelation;

    /**
     * Find a person with its graph id in Neo4J
     *
     * @param identity Person graph id in Neo4J
     */
    static async find(identity: string) {
        return NeoDB.transform<Person>(await NeoDB.query(`MATCH (p:Person) WHERE ID(p) = {id} RETURN p`, {
            id: +identity,
        }));
    }

    /**
     * List all people with pagination and filters
     *
     * @param pagination Paginations for people
     * @param filters Filters that filter people
     */
    static async all(
        pagination: PaginationInput = new PaginationInput(),
        filters: PersonFiltersInput = new PersonFiltersInput()
    ): Promise<Person[] | undefined> {
        let query = `
            MATCH (p:Person)
        `;

        const whereClauses: string[] = [];

        if (filters.nameContains) {
            // Indexing does not work when toLower is been used
            whereClauses.push(`toLower(p.name) CONTAINS toLower('${filters.nameContains}')`);
        }

        if (filters.bornBefore) {
            whereClauses.push(`p.born < ${filters.bornBefore}`);
        }

        if (filters.bornAfter) {
            whereClauses.push(`p.born >= ${filters.bornAfter}`);
        }

        if (whereClauses.length > 0) {
            query += `
                WHERE ${whereClauses.join(` ${filters.operator} `)}
            `;
        }

        query += `
            RETURN p SKIP {offset} LIMIT {limit}
        `;

        return NeoDB.collection<Person>(await NeoDB.query(query, {
            offset: pagination.offset(),
            limit: pagination.limit(),
        }));
    }

    /**
     * Get a person's related movies
     *
     * @param id The person graph id in Neo4J
     * @param relation The specific relation between person and movie
     * @param pagination The person movies pagination
     */
    static async movies(
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
