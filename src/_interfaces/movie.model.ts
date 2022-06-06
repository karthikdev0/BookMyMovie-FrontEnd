export interface Movie {
    id: number,
    title: string,
    ratings: number,
    description: string,
    posterImgPath :string,
    releaseDate:Date,
    tags:string,
    isDeleted:boolean
}