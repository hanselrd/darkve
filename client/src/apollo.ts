import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

export let subscriptionClient: SubscriptionClient;

const subscriptionClientOptions = {
  reconnect: true,
  connectionParams: () => ({
    authorization: () => 'authToken'
  })
};

// if (process.env.NODE_ENV !== 'production') {
subscriptionClient = new SubscriptionClient(
  'ws://localhost:4000/graphql',
  subscriptionClientOptions
);
// }

const wsLink = new WebSocketLink(subscriptionClient);

export const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
});
