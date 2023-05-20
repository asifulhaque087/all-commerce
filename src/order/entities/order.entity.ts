import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Variation } from 'src/variations/entities/variation.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => Int)
  itemsPrice: number;

  @Column()
  @Field((type) => Int)
  taxPrice: number;

  @Column()
  @Field((type) => Int)
  totalPrice: number;

  // shipping details
  @Column()
  @Field()
  shippingAddress: string;

  @Column()
  @Field()
  shippingNumber: string;

  // payment details
  @Column()
  @Field()
  paymentMethod: string;

  // payment result namer kichu akta ase. remember checking out this later here

  @Column()
  @Field((type) => Int)
  shippingPrice: number;

  @Column()
  @Field((type) => Boolean)
  isPaid: boolean;

  @Column()
  @Field((type) => Date)
  paidAt: Date;

  @Column()
  @Field((type) => Boolean)
  isDelivered: boolean;

  @Column()
  @Field((type) => Date)
  deliveredAt: Date;

  @OneToMany((type) => OrderProduct, (op) => op.order)
  @Field((type) => [OrderProduct])
  orderItems: OrderProduct[];
}

// OrderProduct
@ObjectType()
@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @Field((type) => Order)
  order: Order;

  @ManyToOne(() => Variation, (order) => order.orders)
  @Field((type) => Variation)
  variation: Variation;
}
