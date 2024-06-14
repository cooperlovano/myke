import React, { useState } from "react";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import { BuilderBlocks } from '@builder.io/react';

const itemVariants = cva(
    "pr-4 -pl-2", 
    {
        variants: {
            basisDesktop: {
                "1/3": "sm:basis-1/3",
                "1/2": "sm:basis-1/2",
                "2/3": "sm:basis-2/3",
                "full": "sm:w-full",
            },
            basisMobile: {
                "1/3": "basis-1/3",
                "1/2": "basis-1/2",
                "2/3": "basis-2/3",
                "full": "w-full",
            }
        },
        defaultVariants: {
            "variant": "basis-1/3",
        },
    }
)

function CarouselWrapper(props){
    const {isCarousel, headline, builderBlock: {children}, basisDesktop, basisMobile} = props;


    return (
        <div className='w-full '>
            <div className='mb-0'>
                <h2 className='mb-0'>{headline}</h2>
            </div>
            <div className='-mx-4'>
                <Carousel className="">
                    <CarouselContent className="pr-24 pl-8 sm:pr-0">
                        {children.map((child, index) => (
                            <CarouselItem className={cn(itemVariants({basisDesktop, basisMobile}))} key={index}>
                                <div >
                                    <BuilderBlocks blocks={[child]} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    )
}

export default CarouselWrapper;