import { ObjectType, Field, ID, Int } from "type-graphql";
import { NeoDB } from "../utils/neo4j";

@ObjectType({ description: "Post" })
export class Post {
    @Field(type => ID)
    id: string;

    @Field()
    content: string;

    @Field(type => Int)
    createdAt: number;

    static async getAllPosts(): Promise<Post[] | undefined> {
        return NeoDB.queryAndTransform<Post>(`MATCH (n:Post) RETURN n`);
    }
}
