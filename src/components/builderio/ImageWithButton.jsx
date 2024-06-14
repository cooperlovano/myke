import React, { useState } from "react";
import Link from 'next/link';

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

import { aspectRatiosDesktop, aspectRatiosMobile } from './Header';
import { Button } from '../ui/button';

const aspectVariants = cva(
    "relative overflow-hidden bg-neutral-900 rounded-xl text-neutral-100",
    {
        variants: {
            aspectRatioDesktop: aspectRatiosDesktop,
            aspectRatioMobile: aspectRatiosMobile,
        },
        defaultVariants: {
            "variant": "aspect-[16/9]",
        },
    }
)

function ImageWithButton(props){
    const {
        image, 
        button =  {
            label : "",
            url : null,
            buttonType : "primary"
        }, 
        aspectRatioDesktop, 
        aspectRatioMobile, 
        imageOpacity = 1,
        headline 
    } = props

    return (
        <div className='w-full group cursor-pointer'>
            <Link href={button.url ? button.url : "/#"}>
            <div className={cn(aspectVariants({aspectRatioDesktop, aspectRatioMobile}))}>
                <img style={{opacity: imageOpacity}} className='group-hover:scale-105 duration-300 transform-gpu absolute object-cover h-full w-full' src={image} />
                <div className='h-full w-full absolute'>   
                    <div className='max-w-x h-full mx-auto flex flex-col p-4'>
                        <div className='grow grid items-center justify-center'>
                            <div className='text-3xl sm:text-5xl font-neue-haas-grotesk italic font-bold text-center w-full'>{headline}</div>
                        </div>
                        <div className='text-center'>
                            {button?.url && <Link href={button.url}><Button variant={button?.buttonType}>{button?.label} </Button></Link>}
                        </div>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default ImageWithButton;