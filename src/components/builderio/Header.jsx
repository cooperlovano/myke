import Link from 'next/link';
import React, { useState } from "react";
import { Button } from '../ui/button';

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

export const aspectRatiosDesktop = {
    "square": "sm:aspect-[1/1]",
    "3:2": "sm:aspect-[3/2]",
    "2:3": "sm:aspect-[2/3]",
    "4:3": "sm:aspect-[4/3]",
    "16:9": "sm:aspect-[16/9]",
    "16:10": "sm:aspect-[16/10]",
    "21:9": "sm:aspect-[21/9]",
    "21:10": "sm:aspect-[21/10]",
    "32:9": "sm:aspect-[32/9]",
    "48:9": "sm:aspect-[48/9]",
}

export const aspectRatiosMobile = {
    "square": "aspect-[1/1]",
    "3:2": "aspect-[3/2]",
    "2:3": "aspect-[2/3]",
    "4:3": "aspect-[4/3]",
    "16:9": "aspect-[16/9]",
    "16:10": "aspect-[16/10]",
    "21:9": "aspect-[21/9]",
    "21:10": "aspect-[21/10]",
    "32:9": "aspect-[32/9]",
    "48:9": "aspect-[48/9]",
}

const aspectVariants = cva(
    " overflow-hidden bg-neutral-900 rounded-xl text-neutral-100",
    {
        variants: {
            aspectRatioDesktop: aspectRatiosDesktop,
        },
        defaultVariants: {
            "variant": "aspect-[16/9]",
        },
    }
)

function Header(props){
    const {aspectRatioDesktop, aspectRatioMobile, image, title, subTitle, primaryButton, secondaryButton} = props;
    return (
        <div className={cn(aspectVariants({aspectRatioDesktop, aspectRatioMobile}))}>
            <div className='flex flex-col sm:flex-row h-full'>
                <div className='flex-1 sm:h-full grid items-center justify-start sm:justify-center order-2 sm:order-1'>
                    <div className='sm:p-8 p-4 py-8 max-w-xl'>
                        <h1 className='mb-2 leading-tight'>{title}</h1>
                        <p className='mb-8'>{subTitle}</p>
                        <div className='flex flex-wrap gap-4'>
                            {primaryButton?.url && <Button variant={"secondary"}>
                                <Link href={primaryButton?.url || "#"}>{primaryButton?.label}</Link>
                            </Button>}
                            {secondaryButton?.url && <Button variant={"outline"} className="text-white bg-transparent hover:bg-transparent hover:text-white hover:opacity-70">
                                <Link href={secondaryButton?.url || "#"}>{secondaryButton?.label}</Link>
                            </Button>}
                        </div>
                    </div>
                </div>
                <div className='sm:flex-1 h-full sm:order-2 order-1'>
                    <div className='sm:h-full w-full overflow-hidden'>
                        <img src={image + "?width=700"} alt={title} className='object-cover h-full' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;