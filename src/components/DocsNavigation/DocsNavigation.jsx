import React, { useState } from "react";
import { useRouter } from "next/router";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "../ui/accordion";
import Link from "next/link";
import translations from "@/lib/translations";

// Navigation structure
export const navigationItems = [
  { key: "start", url: "/docs/willkommen" },
  { key: "introduction", url: "/docs/einleitung" },
  { key: "what_we_did", url: "/docs/das-haben-wir-gemacht" },
  {
    key: "accounts",
    url: "/docs/accounts",
    subItems: [
      { key: "alex", url: "/docs/alex-new-mindset" },
      { key: "wohin", url: "/docs/wohin-von-hier" },
      { key: "donk", url: "/docs/don-k" },
      { key: "other_accounts", url: "/docs/andere-accounts" },
    ],
  },
  { key: "what_we_learned", url: "/docs/das-haben-wir-gelernt" },
  { key: "team", url: "/docs/team-und-forderer" },
];

const getLocalizedNavigation = (locale) => {
  return navigationItems.map((item) => ({
    ...item,
    title: translations[locale]?.navigation?.[item.key] ?? item.title,
    subItems: item.subItems?.map((subItem) => ({
      ...subItem,
      title: translations[locale]?.navigation?.[subItem.key] ?? subItem.title,
    })),
  }));
};

function DocsNavigation({ setIsOpen }) {
  const router = useRouter();
  const { locale, asPath } = router;
  const localizedNavigation = getLocalizedNavigation(locale);

  return (
    <div>
      <Accordion collapsible type="single">
        {localizedNavigation.map((item, index) => {
          const isActive = asPath === item.url;
          return (
            <AccordionItem
              className={`${item.subItems ? "border-b mb-4 border-t border-neutral-500" : "border-none"}`}
              value={item.title}
              key={index}
            >
              {item.subItems && (
                <AccordionTrigger className="pb-0 text-base">{item.title}</AccordionTrigger>
              )}
              {item.subItems ? (
                <AccordionContent>
                  <ul className="flex flex-col gap-3 pl-4 mb-4">
                    {item.subItems.map((subItem) => {
                      const isSubActive = asPath === subItem.url;
                      return (
                        <li onClick={() => setIsOpen && setIsOpen(false)} key={subItem.url}>
                          <Link
                            className={`opacity-60 flex items-center gap-2 ${isSubActive ? "text-white" : ""}`}
                            href={subItem.url}
                          >
                            {isSubActive && <div className="w-2 h-2 rounded-full bg-white" />}
                            {subItem.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              ) : (
                <Link
                  onClick={() => setIsOpen && setIsOpen(false)}
                  className={`block pb-4 font-bold cursor-pointer flex items-center gap-2 ${
                    isActive ? "text-white" : ""
                  }`}
                  href={item.url}
                >
                  {isActive && <div className="w-2 h-2 rounded-full bg-white" />}
                  {item.title}
                </Link>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}

export default DocsNavigation;
