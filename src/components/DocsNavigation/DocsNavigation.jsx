import React, { useState} from 'react';
import { useRouter } from 'next/router';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '../ui/accordion';
import Link from 'next/link';

export const navigationItems = [
    {
        title: 'Start',
        url: '/docs'
    },
    {
        title: 'Einleitung',
        url: '/docs/einleitung'
    },
    {
        title: 'Das haben wir gemacht',
        url: '/docs/das-haben-wir-gemacht'
    },
    {
        title: 'Accounts',
        url: '/docs/accounts',
        subItems: [
            {
                title: '@alex.new.mindset',
                url: '/docs/alex-new-mindset'
            },
            {
                title: '@wohin_von_hier',
                url: '/docs/wohin-von-hier'
            },
            {
                title: '@donk507',
                url: '/docs/don-k'
            },
            {
                title: 'Andere Accounts',
                url: '/docs/andere-accounts'
            },
        ]
    },
    {
        title: 'Das haben wir gelernt',
        url: '/docs/das-haben-wir-gelernt'
    },
    {
        title: 'Team und Förderer',
        url: '/docs/team-und-forderer'
    },
    
];

const flattenNavigation = (items) => {
    return items.reduce((acc, item) => {
        if (item.subItems) {
            acc.push(...item.subItems);
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
};

const flattenedNavigation = flattenNavigation(navigationItems);

const findNavigationLinks = (currentUrl) => {
    const currentIndex = flattenedNavigation.findIndex(item => item.url === currentUrl);
    const previousItem = currentIndex > 0 ? flattenedNavigation[currentIndex - 1] : null;
    const nextItem = currentIndex < flattenedNavigation.length - 1 ? flattenedNavigation[currentIndex + 1] : null;

    return {
        previous: previousItem ? previousItem : null,
        next: nextItem ? nextItem : null
    };
};

export function DocsNavigationButtons(){
    const router = useRouter();
    const currentUrl = router.asPath;

    const navigationLinks = findNavigationLinks(currentUrl);

    return (
        <div className='max-w-xl w-full grid grid-cols-2 gap-4 mx-auto gap-4'>
            {navigationLinks.previous ? (
                <Link className='rounded shrink-0 border border-neutral-500 block p-2' href={navigationLinks.previous?.url}>
                    <div>
                        <div className='text-xs opacity-50'>Vorherige Seite</div>
                        <div>{navigationLinks.previous?.title}</div>
                    </div>
                </Link>
            ): <div className='w-1/2'></div>}
            {navigationLinks.next ? (
                <Link className='rounded border border-neutral-500 block p-2 shrink-0' href={navigationLinks.next?.url}>
                    <div>
                        <div className='text-xs opacity-50'>Nächste Seite</div>
                        <div>{navigationLinks.next?.title}</div>
                    </div>
                </Link>
            ) : <div className=''></div>}
        </div>
    );
};

function DocsNavigation({setIsOpen}){


    return (
        <div className=''>
            <Accordion collapsible type='single'>
            {navigationItems.map((item, index) => (
                    <AccordionItem className={`${item.subItems ? "border-b mb-4 border-t border-neutral-500" : "border-none"} `} value={item.title} key={index}>
                        {item.subItems && <AccordionTrigger className="pb-0  text-base">{item.title}</AccordionTrigger>}
                        <AccordionContent>
                            <ul className='flex flex-col gap-3 pl-4 mb-4'>
                                {item.subItems?.map((subItem, subIndex) => (
                                    <li onClick={() => setIsOpen(false)} className='' key={subItem.url}>
                                        <Link className='opacity-60'  href={subItem.url}>
                                            {subItem.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                        {!item.subItems &&
                        <Link onClick={() => setIsOpen(false)} className='block pb-4 font-bold cursor-pointer' href={item.url}>{item.title}</Link>}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default DocsNavigation