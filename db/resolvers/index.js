import { NewsFeedResolver } from "./newsfeed";
import { UserResolver } from "./user";

const Product = require("../models/product");

import { dateScalar } from "../scalars";

const resolvers = {
  Date: dateScalar,

  Query: {
    ...NewsFeedResolver,
    ...UserResolver.queries,
  },

  Mutation: {
    ...UserResolver.mutations,
  },
};

module.exports = resolvers;
