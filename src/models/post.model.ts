import { ObjectType, Field, ID, Int } from "type-graphql";
import { NeoDB } from "../utils/neo4j";
import { PaginationInput } from "../inputs/pagination.input";

@ObjectType({ description: "Post" })
export class Post {
    @Field(type => ID)
    id: string;

    @Field()
    content: string;

    @Field(type => Int)
    createdAt: number;

    static async getAllPosts(pagination: PaginationInput = new PaginationInput()): Promise<Post[] | undefined> {
        return NeoDB.collection<Post>(await NeoDB.query(`MATCH (n:Post) RETURN n SKIP {offset} LIMIT {limit}`, {
            offset: pagination.offset(),
            limit: pagination.limit(),
        }));
    }
}
