"use client";
import Link from 'next/link';
import React, { useState } from "react";
import { Button } from '../ui/button';
import { cn } from "@/lib/utils"
import { NavigationMenu, NavigationMenuContent, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { List, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const menuItems = [
    {
        title: 'Über uns',
        subItems: [
            {
                title: 'Unser Team',
                subTitle: 'Wer steckt hinter MYKE?',
                url: '/team'
            },
            {
                title: 'Unsere Mission',
                subTitle: 'Was ist unsere Mission?',
                url: '/mission'
            },
            {
                title: 'Förderer',
                subTitle: 'Wer sind unsere Förderer?',
                url: '/feorderer'
            }
        ]
    },
    {
        title: 'Dokumentation',
        // previewSection: {
        //     title: 'Dokumentation',
        //     subTitle: 'Über unsere Forschungsergebnisse',
        //     url: '/docs'
        // },
        subItems: [
            {
                title: 'Einleitung',
                subTitle: 'Was soll das Projekt erreichen?',
                url: '/docs/introduction'
            },
            {
                title: 'Männlichkeit',
                subTitle: 'Wo fangen wir an?',
                url: '/docs/status-quo'
            },
            {
                title: 'Nachbauen',
                subTitle: 'Wie kann ich mitmachen?',
                url: '/docs/build'
            },
            {
                title: 'Alles ansehen',
                subTitle: 'gesamte Dokumentation anzeigen',
                url: '/docs'
            },
        ]
    },
    {
        title: 'FAQ',
        url: "/faq"
    },
]

function Navbar() {
    return (
        <div className='bg-white'>
            <nav className='flex justify-between max-w-screen-xl mx-auto p-4 items-center'>
                <div className='shrink-0 flex gap-4 items-center'>
                    <div className='sm:hidden block'><MobileMenu /></div>
                    <Link href='/'>
                        <img className='h-6' src='/myke_logo_dark.png' alt="MYKE Logo"/>
                    </Link>
                </div>
                <div className='flex gap-6 items-center'>
                    <div className='gap-12 hidden sm:flex'>
                        <DektopMenu />
                    </div>
                    <Button size="sm"><Link href="/action-guide">Action Guide</Link></Button>
                </div>
            </nav>
        </div>
    );
}

function MobileMenu(){
    return (
        <Sheet>
            <SheetTrigger className='flex items-center'>
                <Menu size={24} />
            </SheetTrigger>
            <SheetContent side={'left'} className="pt-4">
                <div>
                    <Link href='/'>
                        <img className='h-6' src='/myke_logo_dark.png' alt="MYKE Logo"/>
                    </Link>
                </div>
                <div className='mt-8'>
                <Accordion type='single' collapsible>
                    {menuItems.map((item, index) => (
                        <AccordionItem value={item.title} key={index}>
                            {item.subItems && <AccordionTrigger className="pb-0">{item.title}</AccordionTrigger>}
                            <AccordionContent>
                                <ul className='flex flex-col gap-3 pl-4 mb-4'>
                                    {item.subItems?.map((subItem, subIndex) => (
                                        <li className='text-xl' key={subItem.url}>
                                            <Link href={subItem.url}>
                                                {subItem.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                            {!item.subItems &&
                                <Link className='block py-4 font-bold text-xl' href={item.url}>{item.title}</Link>}
                        </AccordionItem>
                    ))}
                </Accordion>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function DektopMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {menuItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                        {item.subItems && <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>}
                        {item.subItems && <NavigationMenuContent>
                            <ul className={`grid gap-3 p-4 ${item.previewSection ? "lg:grid-cols-[.75fr_1fr] md:w-[400px] lg:w-[500px]" : "md:w-[300px]"} `}>
                                {item.previewSection && 
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <a
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b bg-neutral-200 from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                href="/"
                                            >

                                                <div className="mb-2 mt-4 text-lg font-medium">
                                                    {item?.previewSection?.title}
                                                </div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    {item?.previewSection?.subTitle}
                                                </p>
                                            </a>
                                        </NavigationMenuLink>
                                    </li>}
                                <div>
                                {item.subItems?.map((subItem, subIndex) => (
                                    <ListItem key={subIndex} title={subItem.title} href={subItem.url}>{subItem.subTitle}</ListItem>
                                ))}
                                </div>
                            </ul>
                        </NavigationMenuContent>}
                        {!item.subItems && 
                            <Link href={item.url} legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>    
                                    {item.title}
                                </NavigationMenuLink>
                            </Link>
                        }
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block hover:opacity-70 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 opacity-80 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
});

export default Navbar;