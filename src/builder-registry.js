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
  dynamic(() => import('./components/builderio/Text')),
  {
    name: 'CustomText',
    inputs: [{ name: 'content', type: 'html' }],
  }
);

Builder.registerComponent(
  dynamic(() => import('./components/builderio/FaqPanel')),
  {
    name: 'FAQ Panel',
    inputs: [
      { name: 'headline', type: 'string' },
      {
        name: 'questions',
        type: 'list',
        subFields: [
          { name: 'title', type: 'string' },
          { name: 'content', type: 'html' },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import('./components/builderio/Carousel')),
  {
    name: 'Carousel',
    canHaveChildren: true,
    inputs: [
      { name: 'headline', type: 'string' },
      { name: 'isCarousel', type: 'boolean' },
      {
        name: 'basisDesktop',
        type: 'string',
        defaultValue: '1/3',
        enum: ['1/3', '1/2', '2/3', 'full'],
      },
      {
        name: 'basisMobile',
        type: 'string',
        defaultValue: '1/3',
        enum: ['1/3', '1/2', '2/3', 'full'],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import('./components/builderio/ImageWithButton')),
  {
    name: 'ImageWithButton',
    inputs: [
      { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'png', 'webp'] },
      { name: 'imageOpacity', type: 'number', defaultValue: 1, max: 1, min: 0 },
      { name: 'headline', type: 'string' },
      {
        name: 'button',
        type: 'object',
        subFields: [
          { name: 'label', type: 'string' },
          { name: 'url', type: 'string' },
          { name: 'buttonType', type: 'string', enum: ['primary', 'secondary'] },
        ],
      },
      { name: 'aspectRatioDesktop', type: 'string', defaultValue: '16:9', enum: aspectRatios },
      { name: 'aspectRatioMobile', type: 'string', defaultValue: '16:9', enum: aspectRatios },
    ],
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
