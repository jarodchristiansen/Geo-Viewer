// assetTypes.js
import { gql } from "apollo-server-micro";

export const assetTypeDefs = gql`
  type Asset {
    id: ID
    symbol: String
    name: String
    block_time_in_minutes: String
    image: String
    favorite_count: Float
    current_price: Float
    market_cap: Float
    market_cap_rank: Float
    fully_diluted_valuation: Float
    circulating_supply: Float
    total_supply: Float
    ath: Float
    ath_change_percentage: Float
    ath_date: Date
    atl: Float
    atl_change_percentage: Float
    atl_date: Date
  }

  type LunarAssetDetails {
    asset_id: Int
    time: Int
    open: Float
    close: Float
    high: Float
    low: Float
    volume: Float
    market_cap: Float
    price_score: Float
    correlation_rank: Float
    galaxy_score: Float
    volatility: Float
    alt_rank: Float
    alt_rank_3Floatd: Float
    alt_rank_hour_average: Float
    market_cap_rank: Float
    percent_change_24h_rank: Float
    volume_24h_rank: Float
    price_btc: Float
    market_cap_global: Float
    market_dominance: Float
    percent_change_24h: Float
  }

  type CryptoCompareHistory {
    priceData: [PriceDetails]
    blockchainData: [BlockchainDataDetails]
  }

  type GeckoHistory {
    time: Float
    high: Float
    low: Float
    open: Float
    volumefrom: Float
    volumeto: Float
    close: Float
    conversionType: String
    conversionSymbol: String
  }

  type PriceDetails {
    time: Float
    high: Float
    low: Float
    open: Float
    volumefrom: Float
    volumeto: Float
    close: Float
    conversionType: String
    conversionSymbol: String
  }

  type BlockchainDataDetails {
    symbol: String
    time: Int
    zero_balance_addresses_all_time: Float
    unique_addresses_all_time: Float
    new_addresses: Float
    active_addresses: Float
    transaction_count: Float
    transaction_count_all_time: Float
    large_transaction_count: Float
    average_transaction_value: Float
    block_height: Float
    hashrate: Float
    difficulty: Float
    block_time: Float
    block_size: Float
    current_supply: Float
  }

  type AssetFinancialDetails {
    symbol: String
    id: ID
    name: String
    price: Float
    price_btc: Float
    market_cap: Float
    percent_change_24h: Float
    percent_change_7d: Float
    percent_change_3Floatd: Float
    volume_24h: Float
    max_supply: Float
    categories: String
    timeSeries: [LunarAssetDetails]
  }

  type TopAsset {
    id: String
    symbol: String
    name: String
    favorite_count: Float
  }

  type Balance {
    balances: [BalancesObject]
  }

  type BalancesObject {
    symbol: String
    balance: Float
    ticker: String
    usd: Float
  }

  type PriceObject {
    symbol: String
    info: Float
  }

  type GeckoAssetDetails {
    id: String
    symbol: String
    name: String
    block_time_in_minutes: Float
    hashing_algorithm: String
    categories: [String]
    genesis_date: String
    sentiment_votes_up_percentage: Float
    sentiment_votes_down_percentage: Float
    market_cap_rank: Float
    coingecko_rank: Float
    coingecko_score: Float
    developer_score: Float
    community_score: Float
    liquidity_score: Float
    public_interest_score: Float
    description: AssetGeckoDescription
    community_data: GeckoCommunityData
    devloper_data: GeckoDeveloperData
    favorite_count: Float
  }

  type AssetGeckoDescription {
    en: String
  }

  type GeckoCommunityData {
    twitter_followers: Float
    reddit_average_posts_48h: Float
    reddit_average_comments_48h: Float
    reddit_subscribers: Float
    reddit_accounts_active_48h: Float
    telegram_channel_user_count: Float
  }

  type GeckoDeveloperData {
    forks: Float
    stars: Float
    subscribers: Float
    pull_requests_merged: Float
    pull_request_contributors: Float
    code_additions_deletions_4_weeks: CodeAdditionType
    commit_count_4_weeks: Float
  }

  type AssetPairResponse {
    pairData: [AssetPairs24Hours]
  }

  type AssetPairs24Hours {
    SYMBOL: String
    SUPPLY: Float
    MKTCAPPENALTY: Float
    FULLNAME: String
    NAME: String
    ID: String
    VOLUME24HOURTO: Float
  }
`;
