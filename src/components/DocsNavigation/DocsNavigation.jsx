import React, { useState} from 'react';
import { useRouter } from 'next/router';
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from '../ui/accordion';
import Link from 'next/link';

export const navigationItems = [
    {
        title: 'Einleitung',
        url: '/docs/einleitung'
    },
    {
        title: 'Team',
        url: '/docs/team'
    },
    {
        title: 'Förderer',
        url: '/docs/foerderer'
    },
    {
        title: 'Experten',
        url: '/docs/experten', 
        subItems: [
            {
                title: 'Psychologie',
                url: '/docs/psychologie'
            },
            {
                title: 'Kritische Männlichkeitsforschung',
                url: '/docs/kritische-maennlichkeitsforschung'
            }, 
            {
                title: 'Soziologie',
                url: '/docs/soziologie'
            },
            {
                title: 'Journalismus',
                url: '/docs/journalismus'
            }, 
            {
                title: "Social Media",
                url: '/docs/social-media'
            }
        ]
    },
    {
        title: 'Über Männlichkeit',
        url: '/docs/maennlichkeit',
        subItems: [
            {
                title: 'Status Quo',
                url: '/docs/status-quo'
            },
            {
                title: 'Maskulinismus',
                url: '/docs/maskulinismus'
            },
            {
                title: 'Unser Ansatz',
                url: '/docs/unser-ansatz'
            },
        ]
    },
    {
        title: 'TikTok Accounts',
        url: '/docs/tik-tok-accounts', 
        subItems: [
            {
                title: "Cringe Tok",
                url: '/docs/cringe-tok'
            },
            {
                title: "Küche und Konsens",
                url: '/docs/kueche-und-konsens'
            },
            {
                title: "Alex (Coach)",
                url: '/docs/alex-coach'
            },
            {
                title: "Mufasa",
                url: '/docs/mufasa'
            },
            {
                title: "Wohin von hier?",
                url: '/docs/wohin-von-hier'
            },
            {
                title: "Blumen für Männer",
                url: '/docs/blumen-fuer-meanner'
            }
        ]
    },
    {
        title: "Nachbauen",
        url: '/docs/nachbauen',
        subItems: [
            {
                title: "Wie kann ich mitmachen?",
                url: '/docs/wie-kann-ich-mitmachen'
            }, 
            {
                title: "Wie geht Viralität?",
                url: '/docs/wie-geht-viralitaet'
            },
            {
                title: 'Die "richtige" Ansprache',
                url: '/docs/die-ansprache'
            }, 
            {
                title: 'Videoaufbau',
                url: '/docs/videoaufbau'
            },
            {
                title: 'Call To Action',
                url: '/docs/call-to-action'
            }
        ]
    }
    
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

function DocsNavigation(){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className=''>
            <Accordion collapsible type='multiple'>
            {navigationItems.map((item, index) => (
                    <AccordionItem className={`${item.subItems ? "border-b-0 border-t border-neutral-500" : "border-none"} `} value={item.title} key={index}>
                        {item.subItems && <AccordionTrigger className="pb-0  text-base">{item.title}</AccordionTrigger>}
                        <AccordionContent>
                            <ul className='flex flex-col gap-3 pl-4 mb-4'>
                                {item.subItems?.map((subItem, subIndex) => (
                                    <li className='' key={subItem.url}>
                                        <Link className='opacity-60' onClick={() => setIsOpen(false)} href={subItem.url}>
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