import { Arg, Query, Resolver } from "type-graphql";
import { PaginationInput } from "../inputs/pagination.input";
import { Post } from "../models/post.model";

@Resolver(of => Post)
export class UserResolver {
    @Query(returns => [Post])
    async posts(@Arg("pagination", { nullable: true }) pagination?: PaginationInput): Promise<Post[] | undefined> {
        return Post.getAllPosts(pagination);
    }
}
