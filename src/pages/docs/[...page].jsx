import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../builder-registry";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

// Define a function that fetches the Builder
// content for a given page
export const getStaticProps = async ({ params }) => {
  console.log("/docs/" + (params?.page?.join("/") || ""))
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
        <title>{page?.data?.title}</title>
      </Head>
      <Navbar />
      {/* Render the Builder page */}
      <div className='min-h-[90vh] max-w-screen-xl p-4 mx-auto'>
        <BuilderComponent model="documentation-page" content={page || undefined} />
      </div>

      <Footer />
    </>
  );
}
