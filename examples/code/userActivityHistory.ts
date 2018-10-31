import query from '../queries/UserActivityHistory.gql'
import { queryAnilist, User } from 'index';

const userActivityHistory = async (userId : number): Promise<User> => queryAnilist({ query, variables: { userId } });
