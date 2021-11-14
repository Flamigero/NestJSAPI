import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IFeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@ApiTags('feed')
@Controller('feed')
@UseGuards(JwtGuard)
export class FeedController {
    constructor(private feedService: FeedService) {}

    /*
    @Get()
    findAll(): Observable<IFeedPost[]> {
        return this.feedService.findAllPosts();
    }
    */

    @Get()
    findSelected(
        @Query('take') take: number = 1,
        @Query('skip') skip: number = 1, 
    ): Promise<{posts, number}> {
        take = take > 20 ? 20 : take;
        return this.feedService.findPosts(take, skip);
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
