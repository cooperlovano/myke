import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import builder from "../../builder"; // import your builder instance
import DefaultErrorPage from "next/error";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "../builder-registry";

// Define a function that fetches the Builder content for a given page
export const getStaticProps = async ({ params }) => {
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || ""),
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

// Define a function that generates the static paths for all pages in Builder
export async function getStaticPaths() {
  const pages = await builder.getAll("page", {
    fields: "data.url",
    options: { noTargeting: true },
  });

  return {
    paths: pages
      .map((page) => String(page.data?.url))
      .filter((url) => url !== "/"),
    fallback: "blocking",
  };
}

// Define the Page component
export default function Page({ page }) {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>MYKE - {page?.data?.title}</title>
      </Head>
      <Navbar mode="light" />
      <div className="min-h-[90vh] max-w-screen-xl p-4 mx-auto">
        <BuilderComponent model="page" content={page || undefined} />
      </div>
      <Footer />
    </>
  );
}
