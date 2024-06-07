import { builder, Builder } from '@builder.io/react';
import dynamic from 'next/dynamic';

const aspectRatios = [
  'square',
  '3:2',
  '4:3',
  '16:9',
  '16:10',
  '21:9',
  '21:10',
  '32:9',
  '48:9',
  '2:3',
];

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

Builder.registerComponent(
  dynamic(() => import('./components/Counter/Counter')),
  {
    name: 'Counter',
  }
);

Builder.registerComponent(
  dynamic(() => import('./components/builderio/Header')),
  {
    name: 'Header',
    inputs: [
      { name: 'aspectRatioDesktop', type: 'string', defaultValue: '16:9', enum: aspectRatios },
      { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'png', 'webp'] },
      { name: 'title', type: 'string' },
      { name: 'subTitle', type: 'string' },
      {
        name: 'primaryButton',
        type: 'object',
        subFields: [
          { name: 'label', type: 'string' },
          { name: 'url', type: 'string' },
        ],
      },
      {
        name: 'secondaryButton',
        type: 'object',
        subFields: [
          { name: 'label', type: 'string' },
          { name: 'url', type: 'string' },
        ],
      },
    ],
  }
);
