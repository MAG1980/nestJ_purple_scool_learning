import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { PreviewModule } from './preview/preview.module';

@Module({
  imports: [AuthModule, TopPageModule, ProductModule, PreviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
