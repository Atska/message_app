import queriesResolver from "./queries";
import mutationResolver from "./mutations";

export default {
  Query: {
    ...queriesResolver.Query,
  },
  Mutation: {
    ...mutationResolver.Mutation,
  },
};
