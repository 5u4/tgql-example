import { ObjectType, Field, Int, ID } from "type-graphql";
import { NeoDB } from "../utils/neo4j";
import { PaginationInput } from "../inputs/pagination.input";
import * as uuid from "uuid";
import * as bcrypt from "bcryptjs";

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

    static async getAllUsers(pagination: PaginationInput = new PaginationInput()): Promise<User[] | undefined> {
        return NeoDB.collection<User>(await NeoDB.query(`MATCH (n:User) RETURN n SKIP {offset} LIMIT {limit}`, {
            offset: pagination.offset(),
            limit: pagination.limit(),
        }));
    }

    static async createUser(username: string, email: string, password: string) {
        const query = `CREATE (n:User {
            id: {id},
            username: {username},
            email: {email},
            password: {password},
            createdAt: {createdAt}
        }) RETURN n`;

        const variables = {
            id: uuid.v4(),
            username,
            email,
            password: await bcrypt.hash(password, 10),
            createdAt: Date.now() / 1000 | 0,
        };

        return NeoDB.transform<User>(await NeoDB.query(query, variables, { mode: "WRITE" }));
    }
}
