import { Time } from "@angular/common";

export interface theatreDetails {
    theatreId: number,
    theatreName: string,
    theatreCity: string,
    movieId: number,
    theatreMovieId: number,
    totalSeatCount: number,
    silverSeatCount: number,
    goldSeatCount: number,
    platinumSeatCount: number,
    silverSeatPrice: number,
    goldSeatPrice: number,
    platinumSeatPrice: number,
    fromDate:Date,
    toDate:Date,
    screenId: number,
    screenName: string,
    screeFromTime: Date,
    screenToTime: Date,
    screenDate: string
}