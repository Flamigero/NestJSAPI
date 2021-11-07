import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IFeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
    constructor(private feedService: FeedService) {}

    @Get()
    findAll(): Observable<IFeedPost[]> {
        return this.feedService.findAllPosts();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Observable<IFeedPost> {
        return this.feedService.findOne(id);
    }

    @Post()
    create(@Body() feedPost: IFeedPost): Observable<IFeedPost> {
        return this.feedService.createPost(feedPost);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() feedPost: IFeedPost,
    ): Observable<UpdateResult> {
        return this.feedService.updatePost(id, feedPost);
    }

    @Delete(':id')
    delete(@Param('id') id: number): Observable<DeleteResult> {
        return this.feedService.deletePost(id);
    }
}
