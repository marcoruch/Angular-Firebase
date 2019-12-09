import { firestore } from 'firebase';

export interface RocketRanking {
    /** This property represents the RocketRanking Document-Id ... */
    id: string;
    rankingDate: firestore.Timestamp;
    winnerId: string;
    players: RocketRankingPlayerData[]
}

export interface RocketRankingPlayerData {
        uid: string;
        points: number;
        name: string;
}

