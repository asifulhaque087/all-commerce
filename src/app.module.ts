import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { ProductsModule } from './products/products.module';
import {
  Color,
  Combination,
  CombinationOption,
  Option,
  Product,
  ProductColor,
  ProductVariationOption,
  Variation,
} from './products/entities/product.entity';
import { ColorsModule } from './colors/colors.module';
import { AttributesModule } from './attributes/attributes.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      // entities: [__dirname + '/../**/**.enitity{.ts,.js}'],
      // entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
      // entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],

      entities: [
        Category,
        Product,
        Variation,
        Option,
        ProductVariationOption,
        Color,
        ProductColor,
        Combination,
        CombinationOption,
      ],

      synchronize: true,
    }),

    CategoriesModule,

    ProductsModule,

    ColorsModule,

    AttributesModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
