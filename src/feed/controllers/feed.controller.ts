import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/modules/auth.role.enum';
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

    @Roles(Role.ADMIN, Role.PREMIUM)
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() feedPost: IFeedPost, @Req() {user}): Observable<IFeedPost> {
        return this.feedService.createPost(feedPost, user);
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
