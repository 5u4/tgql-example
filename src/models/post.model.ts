import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType({ description: "Post" })
export class Post {
    @Field(type => ID)
    id: string;

    @Field()
    content: string;

    @Field(type => Int)
    createdAt: number;
}
