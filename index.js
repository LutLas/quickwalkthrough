const { ApolloServer } = require("apollo-server");
const neo4j = require("neo4j-driver");
const { Neo4jGraphQL } = require("@neo4j/graphql");
const { Neo4jGraphQLAuthJWKSPlugin } = require("@neo4j/graphql-plugin-auth");

const typeDefs = /* GraphQL */ `
    type Business @node{
        businessId: ID!
        name: String!
        city: String!
        state: String!
        address: String!
        location: Point!
        reviews: [Review!]! @relationship(type: "REVIEWS", direction: IN)
        categories: [Category!]! @relationship(type: "IN_CATEGORY", direction: OUT)
    }

    type User @node{
        userID: ID!
        name: String!
        reviews: [Review!]! @relationship(type: "WROTE", direction: OUT)
    }

    type Review @node{
        reviewId: ID!
        stars: Float!
        date: Date!
        text: String
        user: User! @relationship(type: "WROTE", direction: IN)
        business: Business! @relationship(type: "REVIEWS", direction: OUT)
    }

    type Category @node{
        name: String!
        businesses: [Business!]! @relationship(type: "IN_CATEGORY", direction: IN)
    }
`;

const driver = neo4j.driver(
    "neo4j://127.0.0.1:7687",
    neo4j.auth.basic("neo4j", "password")
);

const neoSchema = new Neo4jGraphQL({
    typeDefs,
    driver,
    plugins: {
        auth: new Neo4jGraphQLAuthJWKSPlugin({
            jwksEndpoint: "https://dev-wjhxa0twv4r2j4yf.us.auth0.com/.well-known/jwks.json",
        }),
    },
});

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
        context: ({ req }) => ({ req }),
    });
    server.listen().then(({ url }) => {
        console.log(`GraphQL server ready at ${url}`);
    });
});
