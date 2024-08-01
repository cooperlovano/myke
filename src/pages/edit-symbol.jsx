import { BuilderComponent, builder } from '@builder.io/react';

import "../builder-registry";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function Page() {
  return (
    <div className='min-h-[90vh] max-w-screen-xl p-4 mx-auto'>
        <BuilderComponent model="symbol" />
    </div>
    )
}