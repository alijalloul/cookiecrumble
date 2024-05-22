"use client";

import { addProduct } from "@/app/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import React from "react";
import { useDispatch } from "react-redux";

const AddCartButton = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        dispatch(addProduct(product));
      }}
      size="lg"
      className="w-[40%]"
    >
      Add Cart
    </Button>
  );
};

export default AddCartButton;
