![tgql-example](title.png)

## Description

An example of type-graphql with Neo4J as database.

## Schema

See [graphdoc generated](http://senhung.net/tgql-example/)

OR

plain

```graphql
# Movie
type Movie {
  # The movie graph id in Neo4J
  identity: ID!

  # The title of the movie
  title: String!

  # The released year of the movie
  released: Int!

  # The tagline of the movie
  tagline: String

  # Person role in the movie. Only exists in nested query
  roles: [String!]

  # Person relation with the movie. Only exists in nested query
  personRelation: PersonMovieRelation

  # Get movie related people
  people(
    # The movie people pagination
    pagination: PaginationInput

    # The movie people relation
    relation: PersonMovieRelation = ALL
  ): [Person!]!
}

# Filters for movies
input MovieFiltersInput {
  # String that contains in title
  titleContains: String

  # String that contains in tagline
  taglineContains: String

  # Movies released before a certain year
  releasedBefore: Int

  # Movies released after a certain year
  releasedAfter: Int

  # The filtering operator
  operator: WhereOperator = AND
}

# The general pagination inputs
input PaginationInput {
  # The page number
  page: Int = 1

  # The maximum amount in each page
  perPage: Int = 30
}

# Person
type Person {
  # The person graph id in Neo4J
  identity: ID!

  # The name of the person
  name: String!

  # The year of the person born
  born: String

  # Person role in the movie. Only exists in nested query
  roles: [String!]

  # Person relation with the movie. Only exists in nested query
  movieRelation: PersonMovieRelation

  # Get person related movies
  movies(
    # The person movies pagination
    pagination: PaginationInput

    # The person movies relation
    relation: PersonMovieRelation = ALL
  ): [Movie!]!
}

# Filters for people
input PersonFiltersInput {
  # String that contains in name
  nameContains: String

  # People born before a certain year
  bornBefore: Int

  # People born after a certain year
  bornAfter: Int

  # The filtering operator
  operator: WhereOperator = AND
}

# Person and movie relations
enum PersonMovieRelation {
  ACTED_IN
  DIRECTED
  PRODUCED
  WROTE
  REVIEWED
  ALL
}

type Query {
  # Get a specific movie with movie's graph id
  movie(identity: String!): Movie!

  # Get movies with pagination and filters
  movies(
    # The movies filters
    filters: MovieFiltersInput

    # The movies pagination
    pagination: PaginationInput
  ): [Movie!]!

  # Get a specific person with person's graph id
  person(identity: String!): Person!

  # Get people with pagination and filters
  people(
    # The people filters
    filters: PersonFiltersInput

    # The people pagination
    pagination: PaginationInput
  ): [Person!]!
}

# The where clause operators
enum WhereOperator {
  AND
  OR
}

```
