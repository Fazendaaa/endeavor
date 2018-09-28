import { DocumentNode } from 'graphql';
import { IncomingMessage } from 'http';
import { request } from 'https';

export enum MediaRankType {
    RATED,
    POPULAR
}

export enum MediaListStatus {
    PAUSED,
    CURRENT,
    DROPPED,
    PLANNING,
    COMPLETED,
    REPEATING
}

export enum StaffLanguage {
    KOREAN,
    FRENCH,
    GERMAN,
    HEBREW,
    ENGLISH,
    ITALIAN,
    SPANISH,
    JAPANESE,
    HUNGARIAN,
    PORTUGUESE
}

export enum UserTitleLanguage {
    NATIVE,
    ROMAJI,
    ENGLISH,
    ROMAJI_STYLISED,
    NATIVE_STYLISED,
    ENGLISH_STYLISED
}

export enum ScoreFormat {
    POINT_3,
    POINT_S,
    POINT_10,
    POINT_100,
    POINT_10_DECIMAL
}

export enum NotificationType {
    FOLLOWING,
    AIRING,
    THREAD_LIKE,
    ACTIVITY_LIKE,
    ACTIVITY_REPLY,
    ACTIVITY_MESSAGE,
    ACTIVITY_MENTION,
    THREAD_SUBSCRIBED,
    THREAD_COMMENT_LIKE,
    ACTIVITY_REPLY_LIKE,
    THREAD_COMMENT_REPLY,
    THREAD_COMMENT_MENTION
}

export enum ActivityType {
    TEXT,
    MESSAGE,
    ANIME_LIST,
    MEDIA_LIST,
    MANGA_LIST
}

export enum ActivityUnion {
    TextActivity,
    ListActivity,
    MessageActivity
}

export enum NotificationUnion {
    AiringNotification,
    FollowingNotification,
    ThreadLikeNotification,
    ActivityLikeNotification,
    ActivityReplyNotification,
    ActivityMessageNotification,
    ActivityMentionNotification,
    ActivityReplyLikeNotification,
    ThreadCommentLikeNotification,
    ThreadCommentReplyNotification,
    ThreadCommentMentionNotification,
    ThreadCommentSubscribedNotification
}

export enum ReviewRating {
    NO_VOTE,
    UP_VOTE,
    DOWN_VOTE
}

export enum CharacterRole {
    MAIN,
    SUPPORTING,
    BACKGROUND
}

export enum MediaSeason {
    FALL,
    WINTER,
    SPRING,
    SUMMER
}

export enum MediaType {
    ANIME,
    MANGA
}

export enum MediaFormat {

}

export enum MediaStatus {

}

export enum MediaSort {
    ID,
    TYPE,
    SCORE,
    FORMAT,
    STATUS,
    ID_DESC,
    VOLUMES,
    DURATION,
    TRENDING,
    EPISODES,
    END_DATE,
    CHAPTERS,
    TYPE_DESC,
    POPULARITY,
    START_DATE,
    SCORE_DESC,
    UPDATED_AT,
    FORMAT_DESC,
    STATUS_DESC,
    TITLE_ROMAJI,
    TITLE_NATIVE,
    VOLUMES_DESC,
    SEARCH_MATCH,
    CHAPTERS_DESC,
    TRENDING_DESC,
    TITLE_ENGLISH,
    EPISODES_DESC,
    DURATION_DESC,
    END_DATE_DESC,
    START_DATE_DESC,
    POPULARITY_DESC,
    UPDATED_AT_DESC,
    TITLE_ROMAJI_DESC,
    TITLE_NATIVE_DESC,
    TITLE_ENGLISH_DESC
}

export enum MediaRelation {
    OTHER,
    PARENT,
    SEQUEL,
    PREQUEL,
    SUMMARY,
    SPIN_OFF,
    CHARACTER,
    SIDE_STORY,
    ADAPTATION,
    ALTERNATIVE
}

export type CountryCode = string;

export interface AnilistGraphQL {
    query: string | DocumentNode;
    variables?: object;
}

export interface ErrorPosition {
    line: number;
    column: number;
}

export interface AnilistError {
    data: null;
    errors: {
        status: number;
        score: string[];
        message: string;
        locations: ErrorPosition[];
        validation: {
            id: string[];
        };
    };
}

export interface TextActivity {
    readonly id: number;
    readonly user: User;
    readonly text: string;
    readonly likes: User[];
    readonly userId: number;
    readonly siteUrl: string;
    readonly createdAt: number;
    readonly type: ActivityType;
    readonly replyCount: number;
    readonly replies: ActivityReply[];
}

export interface ListActivity {
    readonly id: number;
    readonly user: User;
    readonly media: Media;
    readonly likes: User[];
    readonly userId: number;
    readonly status: string;
    readonly siteUrl: string;
    readonly progress: string;
    readonly createdAt: number;
    readonly type: ActivityType;
    readonly replyCount: number;
    readonly replies: ActivityReply[];
}

export interface MessageActivity {
    readonly id: number;
    readonly likes: User[];
    readonly message: string;
    readonly siteUrl: string;
    readonly recipient: User;
    readonly messenger: User;
    readonly createdAt: number;
    readonly type: ActivityType;
    readonly replyCount: number;
    readonly recipientId: number;
    readonly messengerId: number;
    readonly replies: ActivityReply[];
}

export interface AiringNotification {
    readonly id: number;
    readonly media: Media;
    readonly animeId: number;
    readonly episode: number;
    readonly contexts: string[];
    readonly createdAt: number;
    readonly type: NotificationType;
}

export interface FollowingNotification {
    readonly user: User;
    readonly id: number;
    readonly userId: number;
    readonly context: string;
    readonly createdAt: number;
    readonly type: NotificationType;
}

export interface ThreadLikeNotification {
    readonly id: number;
    readonly user: User;
    readonly thread: Thread;
    readonly userId: number;
    readonly context: string;
    readonly threadId: number;
    readonly createdAt: number;
    readonly type: NotificationType;
    readonly comment: ThreadComment;
}

interface ActivityBase {
    readonly id: number;
    readonly user: User;
    readonly userId: number;
    readonly context: string;
    readonly createdAt: number;
    readonly activityId: number;
    readonly type: NotificationType;
}

interface ActivityUnionBase extends ActivityBase {
    readonly activity: ActivityUnion;
} 

export interface ActivityMessageNotification extends ActivityBase {
    readonly message: MessageActivity;
}

export interface ActivityLikeNotification extends ActivityUnionBase { }

export interface ActivityReplyNotification extends ActivityUnionBase { }

export interface ActivityMentionNotification extends ActivityUnionBase { }

export interface ActivityReplyLikeNotification extends ActivityUnionBase { }

export interface ActivityReply {
    readonly id: number;
    readonly user: User;
    readonly text: string;
    readonly likes: User[];
    readonly userId: number;
    readonly createdAt: number;
    readonly activityId: number;
}

interface ThreadBase {
    readonly id: number;
    readonly user: User;
    readonly thread: Thread;
    readonly userId: number;
    readonly context: string;
    readonly createdAt: number;
    readonly commentId: number;
    readonly type: NotificationType;
    readonly comment: ThreadComment;
};

export interface ThreadCommentLikeNotification extends ThreadBase { }

export interface ThreadCommentReplyNotification extends ThreadBase { }

export interface ThreadCommentMentionNotification extends ThreadBase { }

export interface ThreadCommentSubscribedNotification extends ThreadBase { }

export interface Page {
    readonly users: User[];
    readonly media: Media[];
    readonly staff: Staff[];
    readonly studios: Studio[];
    readonly threads: Thread[];
    readonly reviews: Review[];
    readonly followers: User[];
    readonly following: User[];
    readonly pageInfo: PageInfo;
    readonly mediaList: MediaList[];
    readonly characters: Character[];
    readonly mediaTrends: MediaTrend[];
    readonly activities: ActivityUnion[];
    readonly activityReplies: ActivityReply[];
    readonly AiringSchedule: AiringSchedule[];
    readonly notifications: NotificationUnion[];
}

export interface FuzzyDate {
    readonly day: number;
    readonly year: number;
    readonly month: number;
}

export interface CharacterName {
    readonly last: string;
    readonly first: string;
    readonly native: string;
    readonly alternative: string[];
}

export interface CharacterImage {
    readonly large: string;
    readonly medium: string;
}

export interface Character {
    readonly id: number;
    readonly siteUrl: string;
    readonly name: CharacterName;
    readonly description: string;
    readonly isFavourite: boolean;
    readonly image: CharacterImage;
    readonly media: MediaConnection;
}

export interface CharacterEdge {
    readonly id: number;
    readonly media: Media[];
    readonly node: Character;
    readonly role: CharacterRole;
    readonly voiceActors: Staff[];
    readonly favouriteOrder: number;
}

export interface CharacterConnection {
    readonly nodes: Character[];
    readonly pageInfo: PageInfo;
    readonly edges: CharacterEdge[];
}

export interface StaffName {
    readonly last: string;
    readonly first: string;
    readonly native: string;
}

export interface StaffImage {
    readonly large: string;
    readonly medium: string;
}

export interface Staff {
    readonly id: number;
    readonly name: StaffName;
    readonly siteUrl: string;
    readonly image: StaffImage;
    readonly description: string;
    readonly isFavourite: boolean;
    readonly language: StaffLanguage;
    readonly staffMedia: MediaConnection;
    readonly characters: CharacterConnection;
}

export interface StaffEdge {
    readonly id: number;
    readonly node: Staff;
    readonly role: string;
    readonly favouriteOrder: number;
}

export interface StaffConnection {
    readonly nodes: Staff[];
    readonly edges: StaffEdge[];
    readonly pageInfo: PageInfo;
}

export interface StudioEdge {
    readonly id: number;
    readonly node: Studio;
    readonly isMain: boolean;
    readonly favouriteOrder: number;
}

export interface StudioConnection {
    readonly nodes: Studio[];
    readonly pageInfo: PageInfo;
    readonly edges: StudioEdge[];
}

export interface AiringSchedule {
    readonly id: number;
    readonly media: Media;
    readonly episode: number;
    readonly mediaId: number;
    readonly airingAt: number;
    readonly timeUntilAiring: number;
}

export interface Review {
    readonly id: number;
    readonly user: User;
    readonly media: Media;
    readonly body: string;
    readonly score: number;
    readonly userId: number;
    readonly rating: number;
    readonly summary: string;
    readonly mediaId: number;
    readonly siteUrl: string;
    readonly createdAt: number;
    readonly updatedAt: number;
    readonly private: boolean;
    readonly mediaType: MediaType;
    readonly ratingAmount: number;
    readonly userRating: ReviewRating;
}

export interface ReviewEdge {
    readonly node: Review;
}

export interface ReviewConnection {
    readonly nodes: Review[];
    readonly pageInfo: PageInfo;
    readonly edges: ReviewEdge[];
}

export interface ScoreDistribution {
    readonly score: number;
    readonly amount: number;
}

export interface StatusDistribution {
    readonly amount: number;
    readonly status: MediaListStatus;
}

export interface MediaTitle {
    readonly romaji: string;
    readonly native: string;
    readonly english: string;
}

export interface MediaTag {
    readonly id: number;
    readonly rank: number;
    readonly title: string;
    readonly isAdult: boolean;
    readonly category: string;
    readonly description: string;
    readonly isMediaSpoiler: boolean;
    readonly isGeneralSpoiler: boolean;
}

export interface MediaCoverImage {
    readonly large: string;
    readonly medium: string;
}

export interface MediaConnection {
    readonly nodes: Media[];
    readonly edges: MediaEdge[];
    readonly pageInfo: PageInfo;
}

export interface MediaEdge {
    readonly id: number;
    readonly node: Media;
    readonly staffRole: string;
    readonly voiceActors: Staff[];
    readonly isMainStudio: boolean;
    readonly favouriteOrder: number;
    readonly characters: Character[];
    readonly relationType: MediaRelation;
    readonly characterRole: CharacterRole;
}

export interface MediaTrend {
    readonly date: number;
    readonly media: Media;
    readonly mediaId: number;
    readonly episode: number;
    readonly trending: number;
    readonly releasing: boolean;
    readonly popularity: number;
    readonly inProgress: number;
    readonly averageScore: number;
}

export interface MediaTrendConnection {
    readonly nodes: Media[];
    readonly edges: MediaEdge[];
    readonly pageInfo: PageInfo;
}

export interface MediaExternalLink {
    readonly id: number;
    readonly url: string;
    readonly site: string;
}

export interface MediaStreamingEpisode {
    readonly url: string;
    readonly site: string;
    readonly title: string;
    readonly thumbnail: string;
}

export interface MediaRank {
    readonly id: number;
    readonly year: number;
    readonly rank: number;
    readonly context: string;
    readonly allTime: boolean;
    readonly type: MediaRankType;
    readonly season: MediaSeason;
    readonly format: MediaFormat;
}

export interface MediaStats {
    readonly scoreDistribution: ScoreDistribution[];
    readonly statusDistribution: StatusDistribution[];
}

export interface MediaList {
    readonly id: number;
    readonly user: User;
    readonly media: Media;
    readonly notes: string;
    readonly score: number;
    readonly repeat: number;
    readonly userId: number;
    readonly mediaId: number;
    readonly private: boolean;
    readonly priority: number;
    readonly progress: number;
    readonly updatedAt: number;
    readonly createdAt: number;
    readonly customLists: object;
    readonly startedAt: FuzzyDate;
    readonly completedAt: FuzzyDate;
    readonly advancedScores: object;
    readonly status: MediaListStatus;
    readonly progressVolumes: number;
    readonly hiddenFromStatusLists: boolean;
}

export interface MediaListGroup {
    readonly name: string;
    readonly entries: MediaList[];
    readonly isCustomList: boolean;
    readonly status: MediaListStatus;
    readonly isSplitCompletedList: boolean;
}

export interface MediaListCollection {
    readonly user: User;
    readonly lists: MediaListGroup[];
}

export interface MediaListTypeOptions {
    readonly customList: string[];
    readonly sectionOrder: string[];
    readonly advancedScoring: string[];
    readonly advancedScoringEnabled: boolean;
    readonly splitCompletedSectionByFormat: boolean;
}

export interface MediaListOptions {
    readonly rowOrder: string;
    readonly useLegacyLists: boolean;
    readonly scoreFormat: ScoreFormat;
    readonly animeList: MediaListTypeOptions;
    readonly mangaList: MediaListTypeOptions;
}

export interface Media {
    readonly id: number;
    readonly idMal: number;
    readonly tags: MediaTag;
    readonly type: MediaType;
    readonly hashtag: string;
    readonly volumes: number;
    readonly siteUrl: string;
    readonly genres: string[];
    readonly isAdult: boolean;
    readonly episodes: number;
    readonly duration: number;
    readonly chapters: number;
    readonly trending: number;
    readonly modNotes: string;
    readonly stats: MediaStats;
    readonly title: MediaTitle;
    readonly meanScore: number;
    readonly updatedAt: number;
    readonly endDate: FuzzyDate;
    readonly synonyms: string[];
    readonly popularity: number;
    readonly format: MediaFormat;
    readonly status: MediaStatus;
    readonly season: MediaSeason;
    readonly source: MediaSource;
    readonly bannerImage: string;
    readonly isLicensed: boolean;
    readonly description: string;
    readonly startDate: FuzzyDate;
    readonly isFavourite: boolean;
    readonly averageScore: number;
    readonly rankings: MediaRank[];
    readonly staff: StaffConnection;
    readonly reviews: ReviewConnection;
    readonly mediaListEntry: MediaList;
    readonly studios: StudioConnection;
    readonly relations: MediaConnection;
    readonly coverImage: MediaCoverImage;
    readonly trends: MediaTrendConnection;
    readonly countryOfOrigin: CountryCode;
    readonly autoCreateForumThread: boolean;
    readonly characters: CharacterConnection;
    readonly externalLinks: MediaExternalLink;
    readonly nextAiringEpisode: AiringSchedule[];
    readonly streamingEpisodes: MediaStreamingEpisode[];
}

export interface Favourites {
    readonly anime: MediaConnection;
    readonly manga: MediaConnection;
    readonly staff: StaffConnection;
    readonly studios: StudioConnection;
    readonly characters: CharacterConnection;
}

export interface ListScoreStats {
    readonly meanScore: number;
    readonly standardDeviation: number;
}

export interface GenreStats {
    readonly genre: string;
    readonly amount: number;
    readonly meanScore: number;
    readonly timeWatched: number;
}

export interface TagStats {
    readonly tag: MediaTag;
    readonly amount: number;
    readonly meanScore: number;
    readonly timeWatched: number;
}

export interface StaffStats {
    readonly staff: Staff;
    readonly amount: number;
    readonly meanScore: number;
    readonly timeWatched: number;
}

export interface StudiosStats {
    readonly studio: Studio;
    readonly amount: number;
    readonly meanScore: number;
    readonly timeWatched: number;
}

export interface Studio {
    readonly id: number;
    readonly name: string;
    readonly siteUrl: string;
    readonly isFavourite: boolean;
    readonly media: MediaConnection;
}

export interface YearStats {
    readonly year: number;
    readonly amount: number;
    readonly meanScore: number;
}

export interface FormatStats {
    readonly amount: number;
    readonly format: MediaFormat;
}

export interface UserAvatar {
    readonly large: string;

    readonly medium: string;
}
export interface UserOptions {
    readonly profileColor: 'blue' | 'purple' | 'pink' | 'orange' | 'red' | 'green' | 'gray';
    readonly displayAdultContent: boolean;
    readonly airingNotifications: boolean;
    readonly titleLanguage: UserTitleLanguage;
}

export interface UserActivityHistory {
    readonly date: number;
    readonly level: number;
    readonly amount: number;
}

export interface UserStats {
    readonly watchedTime: number;
    readonly chaptersRead: number;
    readonly favouredTags: TagStats[];
    readonly favouredYears: YearStats[];
    readonly favouredActors: StaffStats[];
    readonly favouredGenres: GenreStats[];
    readonly favouredFormats: FormatStats[];
    readonly favouredStudios: StudiosStats[];
    readonly animeListScores: ListScoreStats;
    readonly mangaListScores: ListScoreStats;
    readonly favouredGenresOverview: GenreStats[];
    readonly activityHistory: UserActivityHistory[];
    readonly animeScoreDistribution: ScoreDistribution[];
    readonly mangaScoreDistribution: ScoreDistribution[];
    readonly animeStatusDistribution: StatusDistribution[];
    readonly mangaStatusDistribution: StatusDistribution[];
}

export interface User {
    readonly id: number;
    readonly name: string;
    readonly about: string;
    readonly siteUrl: string;
    readonly stats: UserStats;
    readonly updatedAt: number;
    readonly avatar: UserAvatar;
    readonly donatorTier: number;
    readonly bannerImage: string;
    readonly options: UserOptions;
    readonly isFollowing: boolean;
    readonly favourites: Favourites;
    readonly moderatorStatus: string;
    readonly unreadNotificationCount: number;
    readonly mediaListOptions: MediaListOptions;
}

export interface ThreadCategory {
    readonly id: number;
    readonly name: string;
}

export interface PageInfo {
    readonly total: number;
    readonly perPage: number;
    readonly lastPage: number;
    readonly currentPage: number;
    readonly hasNextPage: boolean;
}

export interface ParsedMarkdown {
    readonly html: string;
}

export interface ThreadComment {
    readonly id: number;
    readonly user: User;
    readonly likes: User[];
    readonly userId: number;
    readonly comment: string;
    readonly siteUrl: string;
    readonly threadId: number;
    readonly createdAt: number;
    readonly updatedAt: number;
    readonly childComments: object;
}

export interface Thread {
    readonly id: number;
    readonly user: User;
    readonly body: string;
    readonly likes: User[];
    readonly title: string;
    readonly userId: number;
    readonly siteUrl: string;
    readonly isLocked: boolean;
    readonly isSticky: boolean;
    readonly viewCount: number;
    readonly createdAt: number;
    readonly updatedAt: number;
    readonly repliedAt: number;
    readonly replyCount: number;
    readonly replyUserId: number;
    readonly isSubscribed: boolean;
    readonly replyCommentId: number;
    readonly mediaCategories: Media[];
    readonly categories: ThreadCategory[];
}

export type AnilistResponse = Media |
                              User;

const handleResponse = (resolve: (data: AnilistResponse) => void, reject: (data: AnilistError) => void, response: IncomingMessage): void => {
    let chunk = '';
    const { statusCode } = response;

    response.setEncoding('utf8')
        .on('error', reject)
        .on('uncaughtException', reject)
        .on('data', (data: string) => chunk += data)
        .on('end', () => {
            const result = JSON.parse(chunk);

            (200 !== statusCode) ? reject(result) : resolve(result);
        });
};

export const queryAnilist = (search: AnilistGraphQL): Promise<AnilistResponse> => {
    return new Promise((resolve: (data: AnilistResponse) => void, reject: (data: Error | AnilistError) => void) => {
        const post = request({
            method: 'POST',
            rejectUnauthorized: false,
            hostname: 'graphql.anilist.co',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const curriedHandleResponse = ((response: IncomingMessage) => handleResponse(resolve, reject, response));

        post.write(JSON.stringify(search));
        post.on('error', () => reject(new Error('Request error')));
        post.on('response', curriedHandleResponse);
        post.end();
    });
};
