import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Constants } from "@/public/constants/constants";
import { Input } from "../ui/input";
import Styles from "@/public/styles/global.module.css";
import { Button } from "../ui/button";
import api from "@/public/constants/api";
import { toast } from "sonner";

interface ProductImage {
  id: number;
  images: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  status: string;
  description: string;
  brand: number;
  category: number;
  created_at: string;
  image: string;
  images: ProductImage[];
  rating: number;
  stock:number;
  is_wishlist:boolean;
}
interface ProductProps {
  Products: Product;
  setOnSuccess: (value: boolean | ((prev: boolean) => boolean)) => void;

}

export function ProductfullWidth({ Products,setOnSuccess }: ProductProps) {
  const images = Products?.images;
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImages] = React.useState(images[0]);
  const handleImageClick = (image: ProductImage) => {
    setSelectedImages(image);
  };
  const [Quantity, setQuantity] = React.useState(1);

  const ChangeQuantity = (value: string) => {
    if (value === "increment"&& Quantity<Products.stock) setQuantity((prev) => prev + 1);

    if (value === "decrement" && Quantity > 1) setQuantity((prev) => prev - 1);
  };
  const addToCart = () => {
    toast.dismiss()
    api
      .post(Constants.cart, 
        {
          cart_product: Products.id,
          quantity: Quantity,
        },
      )
      .then((res) => {
        console.log(res, "checkresponse");
        if (res.data.status === 1) {
          toast.success(res.data.message);
        } else {
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.log(error);
      });
  };
  const Addtowishlist=()=>{
    toast.dismiss()
    api.post(Constants.wishlist,{
      product:Products.id
    }).then((res)=>{
      if(res.data.status===1){
        toast.success(res.data.message)
        setOnSuccess((prev)=>!prev)
      }
      else{
        toast.error(res.data.message)
      }
    }).catch((error)=>{
      console.log(error.response.data.message)
      if(error.response.data.message){
        toast.error(error.response.data.message)
      }else{
      toast.error("Some Error Occured !")
      }
    })
  }
  const Removefromwishlist=()=>{
    toast.dismiss()
    api.delete(Constants.wishlist,{params:{
      product:Products.id
    }
     
    }).then((res)=>{
      if(res.data.status===1){
        toast.success(res.data.message)
        setOnSuccess((prev)=>!prev)
      }
      else{
        toast.error(res.data.message)
      }
    }).catch((error)=>{
      console.log(error.response.data.message)
      if(error.response.data.message){
        toast.error(error.response.data.message)
      }else{
      toast.error("Some Error Occured !")
      }
    })
  }

  console.log(Products, "checksingleproduct");
  return (
    <div className="w-10/12 mx-auto h-auto">
      <div className="flex mt-20 ">
        <div className="">
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            className="w-full max-w-xs"
          >
            <CarouselContent className="-mt-1 h-[483px]">
              {images.map((value, index) => (
                <CarouselItem
                  key={index}
                  className="pt-1 md:basis-1/4 lg:basis-1/3"
                  onClick={() => handleImageClick(value)}
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex items-center justify-center p-6">
                        <Image
                          src={`${Constants.PORT}${value.images}`}
                          width={100}
                          height={100}
                          alt="image"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <Carousel ref={carouselRef} className="w-1/3 lg:ml-28 md:ml-3">
          {" "}
          <CarouselContent>
            {/* {images.map((value, index) => ( */}
            <CarouselItem key={1}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect- square items-center justify-center p-6">
                    <img
                      src={`${Constants.PORT}${selectedImage?.images}`}
                      alt="image"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            {/* ))} */}
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
        <div className="ml-16">
          <h3 className="text-3xl font-semibold ">Samsung Galaxy S24</h3>
          <div className="flex mt-3">
            <s className="text-xl  font-light">$155.00</s>{" "}
            <p className="text-xl ml-4  font-semibold ">$135.00</p>
          </div>
          <p className="w-[27vw] mt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            ad eius repudiandae sunt quam nulla soluta expedita? Cupiditate iste
            hic, beatae harum earum laborum fugit, provident, esse debitis at
            sed?
          </p>
          <div className="flex items-center mt-4">
            {Products.stock>0?<>
              <svg
              onClick={() => {
                ChangeQuantity("decrement");
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-10 mr-2 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
                clipRule="evenodd"
              />
            </svg>

            <Input
              className={`w-1/6 ${Styles.no_spinner} text-center `}
              type="number"
              // placeholder="Enter a 3-digit number"
              min="1"
              max="999"
              onChange={(e) => {
                if (e.target.value.length > 3) {
                  e.target.value = e.target.value.slice(0, 3);
                }
              }}
              value={Quantity}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-10 ml-2 cursor-pointer"
              onClick={() => {
                ChangeQuantity("increment");
              }}
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clipRule="evenodd"
              />
            </svg>
            <Button
              className="ml-2"
              onClick={() => {
                addToCart();
              }}
            >
              Add To Cart
            </Button>
            </>:<p>Out of Stock</p>}
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${Products.is_wishlist?"black":"none"}`}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-10 ml-2 cursor-pointer"
              onClick={()=>{
                Products.is_wishlist?
                Removefromwishlist():
                Addtowishlist()
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
