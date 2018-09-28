import query from '../queries/title.gql';
import { queryAnilist, Media } from 'index';

const animeTitle = async (search: string): Promise<Media> => <Media> await queryAnilist({ query, variables: { search, type: 'ANIME' } });

const mangaTitle = async (search: string): Promise<Media> => <Media> await queryAnilist({ query, variables: { search, type: 'MANGA' } });
