import { firestore } from 'firebase';

export interface RocketRanking {
    /** This property represents the RocketRanking Document-Id ... */
    id: string;
    rankingDate: firestore.Timestamp;
    rankingDateAsStr: string;
    winnerId: string;
    players: RocketRankingPlayerData[]
}

export interface RocketRankingPlayerData {
        uid: string;
        points: number;
        badPoints: number;
        name: string;
}

