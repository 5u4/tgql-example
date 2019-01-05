import { ObjectType, Field, Int, ID } from "type-graphql";
import { NeoDB } from "../utils/neo4j";

@ObjectType({ description: "User" })
export class User {
    @Field(type => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    email: string;

    password: string;

    @Field(type => Int)
    createdAt: number;

    static async getAllUsers(): Promise<User[] | undefined> {
        return NeoDB.queryAndTransform<User>(`MATCH (n:User) RETURN n`);
    }
}
