import { BuilderComponent, builder } from '@builder.io/react';

import "../builder-registry";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default function Page() {
  return <BuilderComponent model="symbol" />
}