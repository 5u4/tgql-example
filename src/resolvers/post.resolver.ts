import { Post } from "../models/post.model";
import { Resolver, Query, Arg } from "type-graphql";
import { PaginationInput } from "../inputs/pagination.input";

@Resolver(of => Post)
export class UserResolver {
    @Query(returns => [Post])
    async posts(@Arg("pagination", { nullable: true }) pagination?: PaginationInput): Promise<Post[] | undefined> {
        return Post.getAllPosts(pagination);
    }
}
