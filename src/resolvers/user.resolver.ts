import { User } from "../models/user.model";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { PaginationInput } from "../inputs/pagination.input";

@Resolver(of => User)
export class UserResolver {
    @Query(returns => [User])
    async users(@Arg("pagination", { nullable: true }) pagination?: PaginationInput): Promise<User[] | undefined> {
        return User.getAllUsers(pagination);
    }

    @Mutation(returns => User)
    async register(
        @Arg("username") username: string,
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<User | undefined> {
        return User.createUser(username, email, password);
    }
}
