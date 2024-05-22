// CartSlide.tsx
"use client";

import { RootState } from "@/app/store/store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalProducts,
  selectTotalProductsPriceInCents,
} from "@/app/store/selectors";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { addProduct, decrementProduct } from "@/app/store/cartSlice";
import { CartItemType } from "@/app/store/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import Map from "../_components/Map";

const page = () => {
  return (
    <Carousel opts={{ watchDrag: false }}>
      <CarouselContent>
        <CarouselItem>
          <SecondCarouselItem />
        </CarouselItem>

        <CarouselItem>
          <FirstCarouselItem />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default page;

const FirstCarouselItem = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalProducts = useSelector(selectTotalProducts);
  const totalProductsPirceInCents = useSelector(
    selectTotalProductsPriceInCents
  );

  return (
    <div className="flex justify-between items-center h-[80vh]">
      <Card className="w-[40%] h-full">
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>

        <CardContent className="w-full flex flex-col min-sm:max-w-sm flex-grow max-h-[70vh]">
          {cartItems.length > 0 ? (
            <div className="w-full flex flex-col flex-grow justify-center overflow-auto">
              <div className="pr-10 flex flex-col flex-grow overflow-y-auto scrollbar-thin scrollbar-corner-rounded-md">
                {cartItems.map((item) => (
                  <CartItem item={item} />
                ))}
              </div>

              <div className="font-bold text-xl flex flex-col">
                <p className="mb-4">{`Total: $${(
                  totalProductsPirceInCents / 100
                ).toLocaleString()}`}</p>
              </div>
            </div>
          ) : (
            <p>No items</p>
          )}
        </CardContent>
      </Card>

      <Card className="flex flex-col w-[55%] space-y-5 bg-slate-100 rounded-lg h-full p-16">
        <CardTitle>Order Summary</CardTitle>

        <CardContent className="flex flex-col justify-between flex-grow">
          <div className="flex flex-col space-y-3">
            {cartItems.map((item) => (
              <div className="flex justify-between items-center">
                <p>{`${item.name} x${item.quantity}`}</p>

                <p className="font-bold">{`$ ${(
                  (item.priceInCents * item.quantity) /
                  100
                ).toLocaleString()}`}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p>Subtotal</p>

              <p className="font-bold">{`$${(
                totalProductsPirceInCents / 100
              ).toLocaleString()}`}</p>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <p>Delivery Fee</p>

              <p className="font-bold">$2</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-bold ">{`Total: $ ${(
              (totalProductsPirceInCents + 200) /
              100
            ).toLocaleString()}`}</p>

            <Button className="bg-sky-500 text-white hover:bg-sky-400">
              Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CartItem = ({ item }: { item: CartItemType }) => {
  const dispatch = useDispatch();

  return (
    <div key={item.id} className="">
      <div className="flex justify-between items-center my-4">
        <div className=" flex">
          <div className="flex flex-shrink-0 relative mr-2 w-20 aspect-square rounded-lg overflow-hidden">
            <Image
              src={item.imagePath}
              alt={item.id}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-bold">{item.name}</p>
            <p className="opacity-70">{`$ ${(
              item.priceInCents / 100
            ).toLocaleString()}`}</p>
          </div>
        </div>

        <div className="flex flex-col w-[30%]">
          <div className="flex justify-between items-center border-[1px] rounded-lg w-full overflow-hidden">
            <Button
              variant="outline"
              size="sm"
              className="border-0 text-xl"
              onClick={() => {
                dispatch(decrementProduct(item.id));
              }}
            >
              -
            </Button>
            <p>{item.quantity}</p>
            <Button
              variant="outline"
              size="sm"
              className="border-0 text-xl"
              onClick={() => {
                dispatch(addProduct(item));
              }}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <Separator />
    </div>
  );
};

const SecondCarouselItem = () => {
  return (
    <div className="h-[80vh] w-full bg-slate-100 rounded-lg">
      <form className="w-full h-full flex justify-between p-10">
        <div className="flex flex-col w-[45%]">
          <h2 className="text-2xl font-bold mb-5">Client Info</h2>

          <div className=" space-y-4 flex flex-col h-full justify-between">
            <div className="flex justify-between items-center">
              <Input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="w-[45%]"
              />
              <Input
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="w-[45%]"
              />
            </div>

            <Input type="text" placeholder="Phone number" name="phonenumber" />
            <Input
              type="text"
              placeholder="Re-Type Phone number"
              name="rephonenumber"
            />

            <Input type="email" placeholder="E-Mail" name="email" />

            <Input
              type="text"
              placeholder="Address, ex: District, City, Street, Apartment"
              name="address"
            />

            <div className="bg-slate-200 rounded-lg flex justify-center items-center flex-grow py-5">
              <ul className="list-inside list-disc space-y-4 h-full ">
                <li>
                  By making an account, you can have your information
                  auto-inputed
                </li>

                <li>Delivery time ranges from 2 to 3 hours</li>

                <li>
                  DELIVERY IS ONLY AVAILABLE IN BEIRUT AND SURROUNDING AREAS
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-[45%] flex flex-col justify-between items-center">
          <div className="w-full h-[90%]">{/* <Map /> */}</div>

          <CarouselNext
            size="default"
            text="Continue"
            className="static opacity-100 text-center w-full h-auto p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-400 hover:text-white "
          />
        </div>
      </form>
    </div>
  );
};
