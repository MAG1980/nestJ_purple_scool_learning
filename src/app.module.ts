import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ReviewController } from './review/review.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { MoviesModule } from './movies/movies.module';
import { TagsModule } from './tags/tags.module';
import { DatabaseModule } from './database/database.module';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '@app/constants/constants';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    AuthModule,
    TopPageModule,
    ProductModule,
    ReviewModule,
    MoviesModule,
    TagsModule,
    UserModule,
  ],
  controllers: [AppController, ReviewController],
  providers: [AppService],
})
export class AppModule {
  constructor(@Inject(DATA_SOURCE) private readonly database: DataSource) {}
}
