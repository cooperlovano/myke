import Link from 'next/link';
import React, { useState } from "react";
import { Button } from '../ui/button';

const menuItems = [
    {
        title: "Action Guide",
        subItems: [
            {
                title: "Du brauchst Hilfe?",
                url: "/action-guide"
            },
            {
                title: "Beratungsstellen",
                url: "/beratungsstellen"
            }
            // {
            //     title: "Was tun bei Gewalt?",
            //     url: "/gewalt"
            // },
            // {
            //     title: "Was tun bei Einsamkeit?",
            //     url: "/einsamkeit"
            // },
            // {
            //     title: "Was tun bei Hilflosigkeit?",
            //     url: "/hilflosigkeit"
            // },
        ]
    },
    {
        title: "Über uns",
        subItems: [
            {
                title: "Team",
                url: "/team"
            },
            {
                title: "Mission",
                url: "/mission"
            },
            {
                title: "Förderer",
                url: "/forderer"
            },
            {
                title: "TikTok Accounts",
                url: "/tiktok-accounts"
            }
            // {
            //     title: "Expert:innen",
            //     url: "/expert-innen"
            // }
        ]
    },
    // {
    //     title: "Dokumentation",
    //     subItems: [
    //         {
    //             title: "Dokumentation ansehen",
    //             url: "/docs"
    //         },
    //         {
    //             title: "Untersuchung",
    //             url: "/docs/untersuchung"
    //         },
    //         {
    //             title: "Ergebnisse",
    //             url: "/docs/ergebnisse"
    //         },
    //         {
    //             title: "Accounts",
    //             url: "/docs/accounts"
    //         },
    //         {
    //             title: "Nachbauen",
    //             url: "/docs/build"
    //         }
    //     ]
    // },
    {
        title: "Rechtliches",
        subItems: [
            {
                title: "Impressum",
                url: "/impressum"
            },
            // {
            //     title: "Kontakt",
            //     url: "/contact"
            // },
            // {
            //     title: "Privatssphäre",
            //     url: "/privacy"
            // },
        ]
    }
]

function Footer() {

    function getCurrentYear() {
        return new Date().getFullYear();
    }
    return (
        <div>
            <footer className='bg-neutral-800 text-white py-12'>
                <div className='max-w-screen-xl mx-auto p-4 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 py-'>
                    {menuItems.map((item, index) => (
                        <div key={index} className='mb-4'>
                            <span className='font-bold block mb-4'>{item.title}</span>
                            <ul className='list-none flex flex-col gap-2 opacity-80'>
                                {item.subItems.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                        <Link passHref legacyBehavior href={subItem.url}>
                                            <a className='text-white hover:text-primary-500'>{subItem.title}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className='max-w-screen-xl mx-auto p-4 flex gap-4'>
                    <a target='_blank' href='https://www.kulturstiftung-des-bundes.de/de'>
                        <div>
                            <span className='text-xs'>Gefördert durch</span>
                            <img className='sm:h-20 h-14 m-4' src="Logo_KSB_SW_JPG.jpg"/>
                        </div>
                    </a>

                    <div>
                        <span className='text-xs'>Gefördert von</span>
                        <img className='sm:h-20 h-14 m-4' src="BKM_2017_WebSVG_de.svg"/>
                    </div>

                </div>
                <div className='max-w-screen-xl mx-auto p-4'>&copy; MYKE {getCurrentYear()} - eine Produktion des onlinetheater.live</div>
            </footer>
        </div>
    )
}

export default Footer;