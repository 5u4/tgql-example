import { User } from "../models/user.model";
import { Resolver, Query } from "type-graphql";

@Resolver(of => User)
export class UserResolver {
    @Query(returns => [User])
    async users(): Promise<User[] | undefined> {
        return User.getAllUsers();
    }
}
