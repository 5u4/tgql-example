import { Post } from "../models/post.model";
import { Resolver, Query } from "type-graphql";

@Resolver(of => Post)
export class UserResolver {
    @Query(returns => [Post])
    async posts(): Promise<Post[] | undefined> {
        return Post.getAllPosts();
    }
}
