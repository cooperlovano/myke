import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import DocsNavigation, { DocsNavigationButtons } from "@/components/DocsNavigation/DocsNavigation";
import "../../builder-registry";

// 1. Initialize Builder with your API key
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function getStaticProps({ locale }) {

  // If default locale is 'de'
  const urlPath = locale === "de" ? "/docs" : `/${locale}/docs`;

  const page = await builder
    .get("documentation-page", {
      userAttributes: { urlPath },
    })
    .toPromise();


  if (!page) {
    return { notFound: true };
  }

  return {
    props: { page },
    revalidate: 5,
  };
}


// 3. Render the /docs page
export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  // If there's no content and not previewing, show a 404
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>MYKE - Dokumentation</title>
      </Head>
      <Navbar mode="dark" />

      <div className="w-full dark-mode">
        <div className="flex">
          <div className="min-h-[90vh] max-w-screen-xl w-full p-4 mx-auto flex sm:flex-row flex-col">
            {/* Left Nav */}
            <div className="sm:w-[250px] w-full shrink-0 pt-4 max-h-[90vh] overflow-y-auto overflow-x-hidden h-full hidden sm:block">
              <DocsNavigation setIsOpen={() => {}} />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Renders the entire Builder page */}
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
