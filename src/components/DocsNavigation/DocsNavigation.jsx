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
  return navigationItems.map((item) => {
    const localizedItem = {
      ...item,
      title: translations[locale]?.navigation?.[item.key] ?? item.title,
      url: `/${locale}${item.url}`.replace(/\/{2,}/g, "/"), // Prefix top-level
    };

    if (item.subItems?.length > 0) {
      localizedItem.subItems = item.subItems.map((subItem) => ({
        ...subItem,
        title: translations[locale]?.navigation?.[subItem.key] ?? subItem.title,
        url: `/${locale}${subItem.url}`.replace(/\/{2,}/g, "/"), // Prefix subs
      }));
    }

    return localizedItem;
  });
};



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

const findNavigationLinks = (currentUrl, navItems, locale) => {
  const localizedNav = navItems.map((item) => ({
    ...item,
    url: `/${locale}${item.url}`.replace(/\/{2,}/g, "/"),
  }));

  const flattenedNavigation = flattenNavigation(localizedNav);
  const formattedCurrentUrl = `/${locale}${currentUrl}`.replace(/\/{2,}/g, "/");
  const currentIndex = flattenedNavigation.findIndex((item) => item.url === formattedCurrentUrl);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previousItem = currentIndex > 0 ? flattenedNavigation[currentIndex - 1] : null;
  const nextItem = currentIndex < flattenedNavigation.length - 1 ? flattenedNavigation[currentIndex + 1] : null;

  return {
    previous: previousItem || null,
    next: nextItem || null,
  };
};

export function DocsNavigationButtons() {
  const router = useRouter();
  const { locale } = router;
  const currentUrl = router.asPath;
  const navigationLinks = findNavigationLinks(currentUrl, getLocalizedNavigation(locale), locale);

  return (
    <div className="max-w-xl w-full grid grid-cols-2 gap-4 mx-auto">
      {navigationLinks.previous ? (
        <Link className="rounded shrink-0 border border-neutral-500 block p-2" href={navigationLinks.previous.url}>
          <div>
            <div className="text-xs opacity-50">
              {translations[locale]?.buttons?.previous ?? translations["en"].buttons.previous}
            </div>
            <div>{navigationLinks.previous.title}</div>
          </div>
        </Link>
      ) : (
        <div className="w-1/2"></div>
      )}
      {navigationLinks.next ? (
        <Link className="rounded border border-neutral-500 block p-2 shrink-0" href={navigationLinks.next.url}>
          <div>
            <div className="text-xs opacity-50">
              {translations[locale]?.buttons?.next ?? translations["en"].buttons.next}
            </div>
            <div>{navigationLinks.next.title}</div>
          </div>
        </Link>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
}

function DocsNavigation({ setIsOpen }) {
  const router = useRouter();
  const { locale, asPath } = router;
  const localizedNavigation = getLocalizedNavigation(locale);

  return (
    <div>
      <Accordion collapsible type="single">
        {localizedNavigation.map((item) => {
          const isActive = asPath === item.url;
  
          const hasSubItems = item.subItems && item.subItems.length > 0;
  
          return (
            <AccordionItem
              key={item.key}
              value={item.key}
              className={`${hasSubItems ? "border-b mb-4 border-t border-neutral-500" : "border-none"}`}
            >
              {hasSubItems ? (
                <>
                  <AccordionTrigger className="pb-0 text-base">{item.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-3 pl-4 mb-4">
                      {item.subItems.map((subItem) => {
                        const isSubActive = asPath === subItem.url;
                        return (
                          <li onClick={() => setIsOpen && setIsOpen(false)} key={subItem.key}>
                            <Link
                              href={subItem.url}
                              className={`opacity-60 flex items-center gap-2 ${
                                isSubActive ? "text-white" : ""
                              }`}
                            >
                              {isSubActive && <div className="w-2 h-2 rounded-full bg-white" />}
                              {subItem.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </AccordionContent>
                </>
              ) : (
                <Link
                  onClick={() => setIsOpen && setIsOpen(false)}
                  href={item.url}
                  className={`block pb-4 font-bold cursor-pointer flex items-center gap-2 ${
                    isActive ? "text-white" : ""
                  }`}
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
