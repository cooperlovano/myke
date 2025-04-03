import React, { useState } from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../builder-registry";
import DocsNavigation, { DocsNavigationButtons } from '@/components/DocsNavigation/DocsNavigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { navigationItems } from '@/components/DocsNavigation/DocsNavigation';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

// ✅ Ensure Next.js correctly detects dynamic paths
export async function getStaticPaths() {

  const pages = await builder.getAll("documentation-page", {
    fields: "data.url",
    options: { noTargeting: true },
  });


  const paths = pages
    .map((page) => String(page.data?.url))
    .filter((url) => url.startsWith("/docs/")) // Ensure only valid docs pages are used
    .map((url) => {
      // Ensure Next.js understands the [...page] structure
      const cleanedPath = url.replace(/^\/docs\//, "").split("/");
      return { params: { page: cleanedPath } };
    });


  return {
    paths,
    fallback: "blocking", // Dynamically generate missing pages
  };
}


// ✅ Improved debugging in getStaticProps
export const getStaticProps = async ({ params, locale }) => {

  // Ensure `params.page` is always an array
  const pagePath = Array.isArray(params?.page) ? params.page.join("/") : "";

  // Construct the full URL path
  const urlPath = `/${locale}/docs/${pagePath}`;

  // Fetch from Builder.io
  const page = await builder
    .get("documentation-page", {
      userAttributes: {
        urlPath,
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
};



// Define the Page component
export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // Function to find the title based on the current path
  const findTitle = (path) => {
    for (let item of navigationItems) {
      if (item.url === path) return item.title;
      if (item.subItems) {
        for (let subItem of item.subItems) {
          if (subItem.url === path) return subItem.title;
        }
      }
    }
    return "Default Title"; // Default title if not found
  };

  const title = findTitle(router.asPath);

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>MYKE - {title}</title>
      </Head>
      <Navbar mode={"dark"} />
      <div className="w-full dark-mode">
        <div className="flex">
          <div className="min-h-[90vh] max-w-screen-xl w-full p-4 mx-auto flex sm:flex-row flex-col">
            <div className="sm:w-[250px] hidden sm:block w-full shrink-0 pt-4 h-full pr-4">
              <div className="sticky top-4 mb-4 mt-2">
                <DocsNavigation />
              </div>
            </div>
            <div className="flex-1">
              <BuilderComponent model="documentation-page" content={page || undefined} />
              <div className="mt-8 mb-4">
                <DocsNavigationButtons />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export function MobileNavDocs() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={(bool) => setIsOpen(bool)}>
        <SheetTrigger className="h-full grid items-center">
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="overflow-scroll">
          <div className="mb-8 -mt-3">Dokumentation</div>
          <DocsNavigation setIsOpen={setIsOpen} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
