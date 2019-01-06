import { Field, ID, ObjectType } from "type-graphql";
import { PaginationInput } from "../inputs/pagination.input";
import { NeoDB } from "../utils/neo4j";

@ObjectType({ description: "Person" })
export class Person {
    @Field(type => ID)
    identity: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    born?: string;

    static async getAllPeople(pagination: PaginationInput = new PaginationInput()): Promise<Person[] | undefined> {
        return NeoDB.collection<Person>(await NeoDB.query(`MATCH (p:Person) RETURN p SKIP {offset} LIMIT {limit}`, {
            offset: pagination.offset(),
            limit: pagination.limit(),
        }));
    }
}
