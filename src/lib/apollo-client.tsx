import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

const httpLink = createHttpLink({
  uri: "https://graphql-api-brown.vercel.app/api/graphql",
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          findBrandModels: {
            keyArgs: ["id", "sortBy"],
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            },
          },
        },
      },
    },
  }),
})
