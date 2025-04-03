"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import translations from "@/lib/translations";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { List, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { MobileNavDocs } from "@/pages/docs/[...page]";

// ✅ Hardcoded menu items (do not require translations)
const menuItems = [
  {
    title: "Über uns",
    subItems: [
      { title: "Unser Team", url: "/team" },
      { title: "Unsere Mission", url: "/mission" },
      { title: "TikTok Accounts", url: "/tiktok-accounts" },
      { title: "Dokumentation", url: "/docs" },
    ],
  },
  { title: "FAQ", url: "/faq" },
];

function Navbar({ mode }) {
  const router = useRouter();
  const { pathname, locale } = router;
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Use translations only inside `/docs`
  const t = pathname.startsWith("/docs") ? translations[locale] || translations["de"] : null;

  // ✅ Handle Locale Change
  const handleLocaleChange = (newLocale) => {
    console.log("🔹 BEFORE CHANGE");
    console.log("➡️ Current Pathname:", pathname);
  
    // Extract segments from pathname
    let pathSegments = pathname.split("/").filter(Boolean);
    console.log("🔍 Path Segments (Before Filtering):", pathSegments);

    // If the first segment is a locale, remove it
    if (["en", "df", "de"].includes(pathSegments[0])) {
        pathSegments.shift();
    }

    // Construct new localized path
    let newPath = newLocale === "de" 
        ? `/${pathSegments.join("/")}`  // German stays default
        : `/${newLocale}/${pathSegments.join("/")}`;

    console.log("✅ New Locale Path:", newPath);

    // Ensure query parameters are correctly passed for dynamic `[...page]` routes
    const queryParams = router.query.page ? { page: router.query.page } : {};

    // Push the new localized route with query params
    router.push(
        { pathname: newPath, query: queryParams },
        undefined,
        { locale: newLocale }
    ).then(() => {
        router.reload(); // Force refresh if Next.js doesn’t update dynamically
    });
};





  return (
    <div className={mode === "light" ? "bg-white" : "bg-neutral-900 text-white"}>
      <nav className="flex justify-between max-w-screen-xl mx-auto p-4 items-center">
        <div className="shrink-0 flex gap-4 items-center">
          <Link href="/">
            <img className="h-6" src={mode === "light" ? "/myke_logo_dark.png" : "/myke_logo_light.png"} alt="MYKE Logo" />
          </Link>
        </div>

        <div className="flex gap-6 items-center">
          {!pathname.startsWith("/docs") && (
            <div className="gap-12 hidden sm:flex">
              <DesktopMenu />
            </div>
          )}

          {pathname.startsWith("/docs") ? (
            <>
              <Button variant={mode === "light" ? "default" : "secondary"} size="sm">
                <Link href="/">zu myke.fyi</Link>
              </Button>

              {/* ✅ Language Dropdown */}
              <div className="relative">
  <Button
    variant={mode === "light" ? "custom-light" : "custom-dark"}
    size="sm"
    onClick={() => setDropdownOpen(!isDropdownOpen)}
    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-white border border-gray-400 dark:border-neutral-500"
  >
     {t?.language_label}: <strong>{locale === "df" ? "Einfaches Deutsch" : locale.toUpperCase()}</strong>
  </Button>
  {isDropdownOpen && (
    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-neutral-800 border rounded-md shadow-lg z-50">
      <ul className="py-2 text-gray-700 dark:text-gray-300">
        <li>
          <button onClick={() => handleLocaleChange("de")} className="block px-4 py-2 w-full text-left hover:bg-gray-200 dark:hover:bg-neutral-700">
            🇩🇪 Deutsch
          </button>
        </li>
        <li>
          <button onClick={() => handleLocaleChange("en")} className="block px-4 py-2 w-full text-left hover:bg-gray-200 dark:hover:bg-neutral-700">
            🇬🇧 English
          </button>
        </li>
        <li>
          <button onClick={() => handleLocaleChange("df")} className="block px-4 py-2 w-full text-left hover:bg-gray-200 dark:hover:bg-neutral-700">
            🟢 Einfaches Deutsch
          </button>
        </li>
      </ul>
    </div>
  )}
</div>


            </>
          ) : (
            <Button variant={mode === "light" ? "default" : "secondary"} size="sm">
              <Link href="/beratungsstellen">Action Guide</Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}

// ✅ Desktop Menu with "Über uns" & FAQ
function DesktopMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.subItems && <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>}
            {item.subItems && (
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[300px]">
                  {item.subItems.map((subItem, subIndex) => (
                    <ListItem key={subIndex} title={subItem.title} href={subItem.url} />
                  ))}
                </ul>
              </NavigationMenuContent>
            )}
            {!item.subItems && (
              <Link href={item.url} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>{item.title}</NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// ✅ Mobile Menu with "Über uns" & FAQ
function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={(bool) => setIsOpen(bool)}>
      <SheetTrigger className="flex items-center">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent side="left" className="pt-4">
        <div>
          <Link onClick={() => setIsOpen(false)} href="/">
            <img className="h-6" src="/myke_logo_dark.png" alt="MYKE Logo" />
          </Link>
        </div>
        <div className="mt-8">
          <Accordion type="single" collapsible>
            {menuItems.map((item, index) => (
              <AccordionItem value={item.title} key={index}>
                {item.subItems && <AccordionTrigger className="pb-0">{item.title}</AccordionTrigger>}
                <AccordionContent>
                  <ul className="flex flex-col gap-3 pl-4 mb-4">
                    {item.subItems?.map((subItem, subIndex) => (
                      <li className="text-xl" key={subItem.url}>
                        <Link onClick={() => setIsOpen(false)} href={subItem.url}>
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
                {!item.subItems && (
                  <Link onClick={() => setIsOpen(false)} className="block py-4 font-bold text-xl" href={item.url}>
                    {item.title}
                  </Link>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ✅ FIXED: Define ListItem (Previously Missing)
const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link ref={ref} className={navigationMenuTriggerStyle()} {...props}>
          <div className="text-sm font-medium">{title}</div>
          <p className="text-sm text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

export default Navbar;
