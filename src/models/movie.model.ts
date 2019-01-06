import { Node, Record, Relationship } from "neo4j-driver/types/v1";
import { Field, Int, ID, ObjectType } from "type-graphql";
import { PersonMovieRelation } from "../enums/personMovieRelation.enum";
import { MovieFiltersInput } from "../inputs/movieFilters.input";
import { PaginationInput } from "../inputs/pagination.input";
import { NeoDB } from "../utils/neo4j";
import { Person } from "./person.model";

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

    @Field(type => [String], { nullable: true, description: "Person role in the movie. Only exists in nested query" })
    roles?: string[];

    @Field(type => PersonMovieRelation, {
        nullable: true, description: "Person relation with the movie. Only exists in nested query",
    })
    personRelation?: PersonMovieRelation;

    static async find(identity: string) {
        return NeoDB.transform<Movie>(await NeoDB.query(`MATCH (m:Movie) WHERE ID(m) = {id} RETURN m`, {
            id: +identity,
        }));
    }

    static async all(
        pagination: PaginationInput = new PaginationInput(),
        filters: MovieFiltersInput = new MovieFiltersInput()
    ): Promise<Movie[] | undefined> {
        let query = `MATCH (m:Movie)`;

        const whereClauses: string[] = [];

        if (filters.titleContains) {
            // Indexing does not work when toLower is been used
            whereClauses.push(`toLower(m.title) CONTAINS toLower('${filters.titleContains}')`);
        }

        if (filters.taglineContains) {
            // Indexing does not work when toLower is been used
            whereClauses.push(`toLower(m.tagline) CONTAINS toLower('${filters.taglineContains}')`);
        }

        if (filters.releasedBefore) {
            whereClauses.push(`m.released < ${filters.releasedBefore}`);
        }

        if (filters.releasedAfter) {
            whereClauses.push(`m.released >= ${filters.releasedAfter}`);
        }

        if (whereClauses.length > 0) {
            query += `
                WHERE ${whereClauses.join(` ${filters.operator} `)}
            `;
        }

        query += `
            RETURN m SKIP {offset} LIMIT {limit}
        `;

        return NeoDB.collection<Movie>(await NeoDB.query(query, {
            offset: pagination.offset(),
            limit: pagination.limit(),
        }));
    }

    static async people(
        id: string,
        relation: PersonMovieRelation = PersonMovieRelation.ALL,
        pagination: PaginationInput = new PaginationInput()
    ): Promise<Person[] | undefined> {
        const queryRelation = relation === PersonMovieRelation.ALL ? `` : `:${relation.toString()}`;

        const query = `
            MATCH (m:Movie) WHERE ID(m) = {id}
            MATCH (m)-[r${queryRelation}]-(p:Person)
            RETURN p, r SKIP {offset} LIMIT {limit}
        `;

        return NeoDB.collection<Person>(await NeoDB.query(query, {
            id,
            offset: pagination.offset(),
            limit: pagination.limit(),
        }), <Person>(record: Record) => {
            const person = record.get(0) as Node;
            const r = record.get(1) as Relationship;

            return {
                identity: person.identity,
                ...person.properties,
                ...r.properties,
                movieRelation: r.type as PersonMovieRelation,
            } as unknown as Person;
        });
    }
}
