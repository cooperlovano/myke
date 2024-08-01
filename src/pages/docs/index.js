import React from 'react';
import { useRouter } from 'next/router';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import DocsNavigation from '@/components/DocsNavigation/DocsNavigation';
import '../../builder-registry';

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

// Define a function that fetches the Builder
// content for a given page
export const getStaticProps = async ({ params }) => {
  // Fetch the builder content for the given page
  const page = await builder
    .get('documentation-page', {
      userAttributes: {
        urlPath: '/docs/' + (params?.page?.join('/') || ''),
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

export default function Page({ page }) {
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
        <title>MYKE - {page?.data?.title}</title>
      </Head>
      <Navbar mode={'dark'} />
      {/* Render the Builder page */}
      <div className='w-full dark-mode'>
        <div className='flex'>
          <div className='min-h-[90vh] max-w-screen-xl w-full p-4 mx-auto flex sm:flex-row flex-col'>
            <div className='sm:w-[250px] w-full shrink-0 pt-4 max-h-[90vh] overflow-scroll '>
              <DocsNavigation />
            </div>
            <div className='flex-1'>
              <BuilderComponent model='documentation-page' content={page || undefined} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
