import { IUser } from "src/auth/modules/auth.user.interface";

export interface IFeedPost {
    id?: number;
    body?: string;
    createdAt?: Date;
    author?: IUser;
}