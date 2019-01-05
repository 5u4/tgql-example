import { User } from "../models/user.model";
import { Resolver, Query } from "type-graphql";

@Resolver(of => User)
export class UserResolver {
    @Query(returns => User)
    user (): User | undefined {
        return {
            id: "someuuid",
            username: "alex",
            email: "alex@senhung.net",
            password: "pass",
            createdAt: 150000000,
        };
    }
}
