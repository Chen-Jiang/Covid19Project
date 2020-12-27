import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseModule } from './case/case.module';

@Module({
  imports: [
      MongooseModule.forRoot('mongodb://localhost/covidproject',
          {useNewUrlParser: true}),
      CaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
