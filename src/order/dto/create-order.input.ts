import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int, { description: 'price for products' })
  itemsPrice: number;

  @Field(() => Int)
  taxPrice: number;

  @Field(() => Int)
  totalPrice: number;

  @Field(() => Int)
  shippingPrice: number;

  @Field(() => String, { description: 'address for shipping' })
  shippingAddress: string;

  @Field(() => String, { description: 'number for shipping' })
  shippingNumber: string;

  @Field(() => String, { description: 'payment method name for order' })
  paymentMethod: string;

  @Field(() => [Int])
  orderItems: number[];
}
