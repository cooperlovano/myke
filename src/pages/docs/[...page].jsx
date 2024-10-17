import React, { useState} from "react";
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

// Define a function that fetches the Builder
// content for a given page
export const getStaticProps = async ({ params }) => {
  // console.log("/docs/" + (params?.page?.join("/") || ""))
  // Fetch the builder content for the given page
  const page = await builder
    .get("documentation-page", {
      userAttributes: {
        urlPath: "/docs/" + (params?.page?.join("/") || ""),
      },
    })
    .toPromise();

  // Return the page content as props
  return {
    props: {
      page: page || null,
    },
    // Revalidate the content every 5 seconds
    revalidate: 5,
  };
};

// Define a function that generates the
// static paths for all pages in Builder
export async function getStaticPaths() {
  // Get a list of all pages in Builder
  const pages = await builder.getAll("documentation-page", {
    // We only need the URL field
    fields: "data.url",
    options: { noTargeting: true },
  });


  // Generate the static paths for all pages in Builder
  return {
    paths: pages
      .map((page) => String(page.data?.url))
      .filter((url) => url !== "/docs/"),
    fallback: "blocking",
  };
}

// Define the Page component
export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // console.log(navigationItems)

  // console.log(router)

  // Function to find the title based on the current path
  const findTitle = (path) => {
    // Search in navigation items
    for (let item of navigationItems) {
      if (item.url === path) {
        return item.title;
      }
      // Check subItems if they exist
      if (item.subItems) {
        for (let subItem of item.subItems) {
          if (subItem.url === path) {
            return subItem.title;
          }
        }
      }
    }
    return 'Default Title'; // Default title if not found
  };

  const title = findTitle(router.asPath);


  // If the page content is not available
  // and not in preview mode, show a 404 error page
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }


  // If the page content is available, render
  // the BuilderComponent with the page content
  return (
    <>
      <Head>
        <title>MYKE - {title}</title>
      </Head>
      <Navbar mode={"dark"}/>
      {/* Render the Builder page */}
      <div className='w-full dark-mode'>
        <div className='flex'>
          <div className='min-h-[90vh] max-w-screen-xl w-full p-4 mx-auto flex sm:flex-row flex-col'>
            <div className='sm:w-[250px] hidden sm:block w-full shrink-0 pt-4 h-fulll pr-4'>
              <div className="sticky top-4 mb-4 mt-2">
                <DocsNavigation />
              </div>
            </div>
            {/* <div className='block sm:hidden sticky top-4 z-40'><MobileNav /></div> */}
            <div className='flex-1'>
              <BuilderComponent model="documentation-page" content={page || undefined} />
              <div className='mt-8 mb-4'>
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

export function MobileNavDocs(){
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Sheet open={isOpen} onOpenChange={(bool) => setIsOpen(bool)}>
        <SheetTrigger className='h-full grid items-center'>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="overflow-scroll">
          <div className='mb-8 -mt-3'>Dokumentation</div>
          <DocsNavigation setIsOpen={setIsOpen}/>
        </SheetContent>
      </Sheet>

    </div>
  )
}
