import { registerEnumType } from "type-graphql";

export enum PersonMovieRelation {
    ACTED_IN = "ACTED_IN",
    DIRECTED = "DIRECTED",
    PRODUCED = "PRODUCED",
    WROTE = "WROTE",
    REVIEWED = "REVIEWED",
    ALL = "ALL",
}

registerEnumType(PersonMovieRelation, { name: "PersonMovieRelation", description: "Person and movie relations" });
