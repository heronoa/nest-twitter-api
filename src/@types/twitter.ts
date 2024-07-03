export interface IMe {
  user: IUser;
}

export interface IUser {
  v1: V1;
  v2: V2;
}

export interface V1 {
  id: number;
  id_str: string;
  name: string;
  screen_name: string;
  location: string;
  description: string;
  url: string;
  entities: V1Entities;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  created_at: string;
  favourites_count: number;
  utc_offset: null;
  time_zone: null;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang: null;
  status: Status;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: null;
  profile_background_image_url_https: null;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: boolean;
  follow_request_sent: boolean;
  notifications: boolean;
  translator_type: string;
  withheld_in_countries: any[];
  suspended: boolean;
  needs_phone_verification: boolean;
}

export interface V1Entities {
  url: Description;
  description: Description;
}

export interface Description {
  urls: URL[];
}

export interface URL {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

export interface Status {
  created_at: string;
  id: number;
  id_str: string;
  full_text: string;
  truncated: boolean;
  display_text_range: number[];
  entities: StatusEntities;
  source: string;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  retweeted_status: RetweetedStatus;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  lang: string;
}

export interface StatusEntities {
  hashtags: any[];
  symbols: any[];
  user_mentions: UserMention[];
  urls: URL[];
  media?: Media[];
}

export interface Media {
  id: number;
  id_str: string;
  indices: number[];
  media_url: string;
  media_url_https: string;
  url: string;
  display_url: string;
  expanded_url: string;
  type: string;
  sizes: Sizes;
}

export interface Sizes {
  thumb: Large;
  small: Large;
  medium: Large;
  large: Large;
}

export interface Large {
  w: number;
  h: number;
  resize: Resize;
}

export enum Resize {
  Crop = 'crop',
  Fit = 'fit',
}

export interface UserMention {
  screen_name: string;
  name: string;
  id: number;
  id_str: string;
  indices: number[];
}

export interface RetweetedStatus {
  created_at: string;
  id: number;
  id_str: string;
  full_text: string;
  truncated: boolean;
  display_text_range: number[];
  entities: StatusEntities;
  extended_entities: ExtendedEntities;
  source: string;
  in_reply_to_status_id: null;
  in_reply_to_status_id_str: null;
  in_reply_to_user_id: null;
  in_reply_to_user_id_str: null;
  in_reply_to_screen_name: null;
  geo: null;
  coordinates: null;
  place: null;
  contributors: null;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  lang: string;
}

export interface ExtendedEntities {
  media: Media[];
}

export interface V2 {
  data: IDataV2;
}

export interface IDataV2 {
  id: string;
  name: string;
  username: string;
}

export interface ITweets {
  data: ITweetData[];
  meta: Meta;
}

export interface ITweetData {
  edit_history_tweet_ids: string[];
  id: string;
  text: string;
}

export interface Meta {
  newest_id: string;
  oldest_id: string;
  result_count: number;
}
