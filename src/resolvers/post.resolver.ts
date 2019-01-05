import { Post } from "../models/post.model";
import { Resolver, Query } from "type-graphql";

@Resolver(of => Post)
export class UserResolver {
    @Query(returns => [Post])
    posts (): Post[] | undefined {
        return [
            { id: "someid", content: "some content", createdAt: 150000000 },
        ];
    }
}
