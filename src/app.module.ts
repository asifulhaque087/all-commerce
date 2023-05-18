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
  Product,
  ProductAttributeValue,
  ProductColor,
} from './products/entities/product.entity';
import { ColorsModule } from './colors/colors.module';
import { AttributesModule } from './attributes/attributes.module';
import { AttributeValuesModule } from './attribute-values/attribute-values.module';
import { VariationsModule } from './variations/variations.module';
import { Attribute } from './attributes/entities/attribute.entity';
import { AttributeValue } from './attribute-values/entities/attribute-value.entity';
import { Color } from './colors/entities/color.entity';
import {
  Variation,
  VariationValue,
} from './variations/entities/variation.entity';
import { UsersModule } from './users/users.module';

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
        Attribute,
        AttributeValue,
        ProductAttributeValue,
        Color,
        ProductColor,
        Variation,
        VariationValue,
      ],

      synchronize: true,
    }),

    CategoriesModule,
    ProductsModule,
    ColorsModule,
    AttributesModule,
    AttributeValuesModule,
    VariationsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
