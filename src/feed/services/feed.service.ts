import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { IFeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository: Repository<FeedPostEntity>
    ) {}

    findAllPosts(): Observable<IFeedPost[]> {
        return from(this.feedPostRepository.find());
    }

    findOne(id): Observable<IFeedPost> {
        return from(this.feedPostRepository.findOne({id}));
    }

    async findPosts(take: number, skip: number): Promise<{posts, number}> {
        const [posts, number] = await this.feedPostRepository.findAndCount({take, skip});
        return {
            posts,
            number: posts.length
        };
    }

    createPost(feedPost: IFeedPost): Observable<IFeedPost> {
        return from(this.feedPostRepository.save(feedPost));
    }

    updatePost(id: number, feedPost: IFeedPost): Observable<UpdateResult> {
        return from(this.feedPostRepository.update(id, feedPost));
    }

    deletePost(id: number): Observable<DeleteResult> {
        return from(this.feedPostRepository.delete(id));
    }
}
