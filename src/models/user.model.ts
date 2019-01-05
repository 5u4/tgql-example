import { ObjectType, Field, Int, ID } from "type-graphql";

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
}
