'use client';

import ProductsService from '@/utils/supabase/services/products';
import ToolCardEffect from '@/components/ui/ToolCardEffect/ToolCardEffect';
import { ProductType } from '@/type';
// import { shuffleToolsBasedOnDate } from '@/utils/helpers';
import { createBrowserClient } from '@/utils/supabase/browser';
// import CountdownPanel from '@/components/ui/CountdownPanel';
import TechFinder from '@/components/ui/TechFinder';
import { useEffect, useState } from 'react';
import SkeletonToolCard from '@/components/ui/Skeletons/SkeletonToolCard';
import MailBox from '@/components/ui/MailBox/MailBox';

const emails = [
	{
    "id": 0,
		"from": "Maxime Preaux",
		"address": "maxime@codepen.io",
		"time": "2016-10-07 15:35:14",
		"message": "This is my first attempt at using React.\nDuis cursus, diam at pretium aliquet, metus urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras",
		"subject": "Messing with React.js",
		"tag": "inbox",
		"read": "false"
	},
	{
		"id": 1,
    "from": "Dribbble",
		"address": "digest@dribbble.com",
		"time": "2016-05-09 14:23:54",
		"message": "Here are the latest shots from Dribbblers you follow! Nec mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut eros non enim commodo hendrerit. Donec porttitor tellus non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien,",
		"subject": "Dribbble Digest",
		"tag": "inbox",
		"read": "false"
	}
];

const products = [
  {
      "product": {
          "id": 468,
          "created_at": "2023-11-21T08:11:13.030015+00:00",
          "updated_at": "2023-11-21T08:11:13.030015+00:00",
          "name": "BuildShip",
          "slug": "buildship",
          "description": "BuildShip is a low-code visual backend builder with AI. Create APIs, scheduled jobs and connect with any database, AI model or tools. Start fast with 100s of pre-built nodes, workflow templates or generate your own node with AI. Extend with custom code in JS, use any NPM and deploy in one click.",
          "slogan": "AI-Powered Drag and Drop Visual Backend Builder",
          "comments_count": 0,
          "pricing_type": 1,
          "github_url": "https://github.com/rowyio/buildship/",
          "demo_url": "https://buildship.com/",
          "asset_urls": [
              "https://mars-images.imgix.net/1700554158895-1700554146342PH-0.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700554191042-1700554179926PH-1.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700554225182-1700554219495PH-3.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700554244572-1700554238772PH-2.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700554260847-1700554249832PH-7.png?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1700554061741-1700554060266Mark_White_Circle.png?auto=compress&fit=max&w=128",
          "votes_count": 112,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "927e80a2-08e0-44fc-b64e-4e5ec8b65f91",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "https://www.youtube.com/watch?v=K6pCM2wIO4Q",
          "views_count": 5530,
          "week": 48
      },
      "product_pricing_types": {
          "id": 1,
          "created_at": "2023-05-24T19:17:02.617+00:00",
          "updated_at": "2023-05-24T19:17:02.617+00:00",
          "title": "Free"
      },
      "product_categories": [
          {
              "id": 10,
              "created_at": "2023-09-20T23:18:04.642492+00:00",
              "updated_at": "2023-09-20T23:18:04.642492+00:00",
              "name": "AI"
          },
          {
              "id": 13,
              "created_at": "2023-09-20T23:19:01.923421+00:00",
              "updated_at": "2023-09-20T23:19:01.923421+00:00",
              "name": "NoCode"
          },
          {
              "id": 16,
              "created_at": "2023-09-20T23:19:39.222635+00:00",
              "updated_at": "2023-09-20T23:19:39.222635+00:00",
              "name": "API"
          },
          {
              "id": 17,
              "created_at": "2023-09-20T23:19:47.741062+00:00",
              "updated_at": "2023-09-20T23:19:47.741062+00:00",
              "name": "DB"
          },
          {
              "id": 30,
              "created_at": "2023-09-25T12:45:48.427201+00:00",
              "updated_at": "2023-09-25T12:45:48.427201+00:00",
              "name": "Workflow automation"
          }
      ],
      "profile_name": "Harini Janakiraman",
      "profile_id": "927e80a2-08e0-44fc-b64e-4e5ec8b65f91"
  },
  {
      "product": {
          "id": 470,
          "created_at": "2023-11-22T13:00:33.696396+00:00",
          "updated_at": "2023-11-22T13:00:33.696396+00:00",
          "name": "zippystarter",
          "slug": "zippystarter",
          "description": "Launch MDX blogs, landing pages, portfolios, and more. ZippyStarter combines premium Tailwind templates with contentLayer, MDX & Next.js 14 app router, and a range of re-usable layouts and components that you can remix and build more websites with.\n\nBlazing fast, SEO optimised, deals with config and setup headaches, includes a CLI for blog posts. ",
          "slogan": "Ship blogs, portfolios & landing pages in a flash",
          "comments_count": 0,
          "pricing_type": 3,
          "github_url": "",
          "demo_url": "zippystarter.com",
          "asset_urls": [
              "https://mars-images.imgix.net/1700657835971-1700657834223home.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700657857270-1700657855989portfolio.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700657867838-1700657866022landing.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700657878961-1700657878488dobroslav.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700657897486-1700657895644blog.png?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1700656351990-1700656351674favicon.png?auto=compress&fit=max&w=128",
          "votes_count": 104,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "d8757b51-5661-4789-84c4-8c0d4f7e2f32",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "https://youtu.be/Wc24zrkq-es?si=MIQzA3b7WoYSZ8cW",
          "views_count": 4465,
          "week": 48
      },
      "product_pricing_types": {
          "id": 3,
          "created_at": "2023-05-24T19:17:29.616314+00:00",
          "updated_at": "2023-05-24T19:17:29.616314+00:00",
          "title": "One time fee"
      },
      "product_categories": [
          {
              "id": 12,
              "created_at": "2023-09-20T23:18:46.483396+00:00",
              "updated_at": "2023-09-20T23:18:46.483396+00:00",
              "name": "Code"
          },
          {
              "id": 21,
              "created_at": "2023-09-20T23:20:36.297496+00:00",
              "updated_at": "2023-09-20T23:20:36.297496+00:00",
              "name": "Marketing"
          },
          {
              "id": 23,
              "created_at": "2023-09-20T23:20:54.839656+00:00",
              "updated_at": "2023-09-20T23:20:54.839656+00:00",
              "name": "Framework"
          },
          {
              "id": 33,
              "created_at": "2023-09-26T06:02:17.57196+00:00",
              "updated_at": "2023-09-26T06:02:17.57196+00:00",
              "name": "Tailwind CSS"
          },
          {
              "id": 34,
              "created_at": "2023-09-27T06:44:17.212365+00:00",
              "updated_at": "2023-09-27T06:44:17.212365+00:00",
              "name": "Boilerplate"
          }
      ],
      "profile_name": "Morgan Feeney",
      "profile_id": "d8757b51-5661-4789-84c4-8c0d4f7e2f32"
  },
  {
      "product": {
          "id": 469,
          "created_at": "2023-11-21T17:58:22.187624+00:00",
          "updated_at": "2023-11-21T17:58:22.187624+00:00",
          "name": "Shipixen",
          "slug": "shipixen",
          "description": "An app to generate customized boilerplates for your product. Or blog. Or any website. We generate it & deploy it to Vercel ― you get the code. Seo optimized. Sitemap. Blog. Search. Tags. Rss. Next.js 14. Typescript. Themed Tailwind + shadcn UI & more!",
          "slogan": "Make customized boilerplates & deploy to Vercel with a click",
          "comments_count": 0,
          "pricing_type": 3,
          "github_url": "",
          "demo_url": "https://shipixen.com",
          "asset_urls": [
              "https://mars-images.imgix.net/1700589471980-17005894713601.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700589475001-17005894747442.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700589477857-17005894775473.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700589481080-17005894808164.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700589483830-17005894836345.png?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1700589234232-1700589233528favicon.png?auto=compress&fit=max&w=128",
          "votes_count": 41,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "32cee367-d681-4dfd-bc97-a73e6be1d36b",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "",
          "views_count": 4612,
          "week": 48
      },
      "product_pricing_types": {
          "id": 3,
          "created_at": "2023-05-24T19:17:29.616314+00:00",
          "updated_at": "2023-05-24T19:17:29.616314+00:00",
          "title": "One time fee"
      },
      "product_categories": [
          {
              "id": 12,
              "created_at": "2023-09-20T23:18:46.483396+00:00",
              "updated_at": "2023-09-20T23:18:46.483396+00:00",
              "name": "Code"
          },
          {
              "id": 21,
              "created_at": "2023-09-20T23:20:36.297496+00:00",
              "updated_at": "2023-09-20T23:20:36.297496+00:00",
              "name": "Marketing"
          },
          {
              "id": 33,
              "created_at": "2023-09-26T06:02:17.57196+00:00",
              "updated_at": "2023-09-26T06:02:17.57196+00:00",
              "name": "Tailwind CSS"
          },
          {
              "id": 34,
              "created_at": "2023-09-27T06:44:17.212365+00:00",
              "updated_at": "2023-09-27T06:44:17.212365+00:00",
              "name": "Boilerplate"
          }
      ],
      "profile_name": "Dan Mindru",
      "profile_id": "32cee367-d681-4dfd-bc97-a73e6be1d36b"
  },
  {
      "product": {
          "id": 340,
          "created_at": "2023-10-02T16:06:33.690149+00:00",
          "updated_at": "2023-10-02T16:06:33.690149+00:00",
          "name": "daisyUI",
          "slug": "daisyui",
          "description": "daisyUI adds component class names to Tailwind CSS so you can make beautiful websites faster than ever.",
          "slogan": "The most popular component library for Tailwind CSS",
          "comments_count": 0,
          "pricing_type": 1,
          "github_url": "https://github.com/saadeghi/daisyui",
          "demo_url": "https://daisyui.com/",
          "asset_urls": [
              "https://mars-images.imgix.net/1696262547866-w.png1696262546827?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1696262603347-Screenshot-2023-10-02-at-19.03.15.png1696262602600?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1696262710158-Screenshot-2023-10-02-at-19.05.01.png1696262709556?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1696262785894-Screenshot-2023-10-02-at-19.06.18.png1696262785403?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1696262272681-favicon-1024.png1696262271886?auto=compress&fit=max&w=128",
          "votes_count": 22,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "925fd4d7-e96c-4481-814c-f52eebed2b4a",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "",
          "views_count": 3862,
          "week": 48
      },
      "product_pricing_types": {
          "id": 1,
          "created_at": "2023-05-24T19:17:02.617+00:00",
          "updated_at": "2023-05-24T19:17:02.617+00:00",
          "title": "Free"
      },
      "product_categories": [
          {
              "id": 3,
              "created_at": "2023-05-24T20:16:20.803159+00:00",
              "updated_at": "2023-05-24T20:16:20.803159+00:00",
              "name": "UI Library"
          }
      ],
      "profile_name": "Pouya Saadeghi",
      "profile_id": "925fd4d7-e96c-4481-814c-f52eebed2b4a"
  },
  {
      "product": {
          "id": 329,
          "created_at": "2023-09-28T12:11:47.877379+00:00",
          "updated_at": "2023-09-28T12:11:47.877379+00:00",
          "name": "Radix Vue",
          "slug": "radix-vue",
          "description": "Vue port of Radix UI Primitives. An open-source UI component library for building high-quality, accessible design systems and web apps.",
          "slogan": "Build your Vue components with well-designed primitive, and not from the ground up! ",
          "comments_count": 0,
          "pricing_type": 1,
          "github_url": "https://github.com/radix-vue/radix-vue",
          "demo_url": "https://www.radix-vue.com/",
          "asset_urls": [
              "https://mars-images.imgix.net/1695903023777-radix-vue-(1).png1695903021968?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1695902939652-Frame-16.png1695902938817?auto=compress&fit=max&w=128",
          "votes_count": 17,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "d6bb31f0-cf4a-457d-b6d7-2a028fd163a5",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "",
          "views_count": 3786,
          "week": 48
      },
      "product_pricing_types": {
          "id": 1,
          "created_at": "2023-05-24T19:17:02.617+00:00",
          "updated_at": "2023-05-24T19:17:02.617+00:00",
          "title": "Free"
      },
      "product_categories": null,
      "profile_name": "zernonia",
      "profile_id": "d6bb31f0-cf4a-457d-b6d7-2a028fd163a5"
  },
  {
      "product": {
          "id": 472,
          "created_at": "2023-11-24T09:45:08.050898+00:00",
          "updated_at": "2023-11-24T09:45:08.050898+00:00",
          "name": "Moonship",
          "slug": "moonship",
          "description": "Moonship offers a Heroku-like experience on your AWS account. Built on technologies like AWS SDK & Docker, Moonship features automated deployments, autoscaling, secure storage for env variables, & real-time logs. It's ideal for developers seeking a hassle-free, secure, & scalable deployment solution",
          "slogan": "Automated deployments on your AWS - in minutes!",
          "comments_count": 0,
          "pricing_type": 2,
          "github_url": "",
          "demo_url": "https://moonship.app",
          "asset_urls": [
              "https://mars-images.imgix.net/1700818447563-1700818446526moonship-teaser.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1700818454728-1700818453771moonship-screenshot.png?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1700818691552-1700818690743moonship-logo-white.png?auto=compress&fit=max&w=128",
          "votes_count": 13,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "53ece09f-e1b4-41d0-afc7-087e01c4ecb9",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "https://youtu.be/ArfMA16SR84",
          "views_count": 2860,
          "week": 48
      },
      "product_pricing_types": {
          "id": 2,
          "created_at": "2023-05-24T19:17:15.016883+00:00",
          "updated_at": "2023-05-24T19:17:15.016883+00:00",
          "title": "Subscription"
      },
      "product_categories": [
          {
              "id": 9,
              "created_at": "2023-09-20T23:17:54.207021+00:00",
              "updated_at": "2023-09-20T23:17:54.207021+00:00",
              "name": "DevOps"
          },
          {
              "id": 20,
              "created_at": "2023-09-20T23:20:21.674982+00:00",
              "updated_at": "2023-09-20T23:20:21.674982+00:00",
              "name": "Hosting"
          },
          {
              "id": 30,
              "created_at": "2023-09-25T12:45:48.427201+00:00",
              "updated_at": "2023-09-25T12:45:48.427201+00:00",
              "name": "Workflow automation"
          }
      ],
      "profile_name": "Neha Gehani",
      "profile_id": "53ece09f-e1b4-41d0-afc7-087e01c4ecb9"
  },
  {
      "product": {
          "id": 330,
          "created_at": "2023-09-28T13:48:15.424491+00:00",
          "updated_at": "2023-09-28T13:48:15.424491+00:00",
          "name": "PlaceKit",
          "slug": "placekit",
          "description": "✨ A single API with a worldwide addresses catalog\n💳 Transparent per-request pricing with a 10k monthly free plan\n⚡️ Blazing fast, typo-tolerant and high-relevance search powered by Algolia\n📦 JS & React Autocomplete lightweight\n🚚 Reduce miss-shipments with address validation\n🌍 High-precision country boundaries\n👅 Multilingual",
          "slogan": "🌎 Worldwide Address Autocomplete",
          "comments_count": 0,
          "pricing_type": 1,
          "github_url": "https://github.com/placekit/autocomplete-js",
          "demo_url": "https://placekit.io/",
          "asset_urls": [
              "https://mars-images.imgix.net/1695907744260-express-checkout-placekit.gif1695907743991?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695907832159-dev-tool.png1695907832030?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695907852167-gallery-3.png1695907852013?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695908023755-german-lang.png1695908023652?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695908067866-gallery-5.png1695908067766?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1695906760474-placekit-profile.png1695906760395?auto=compress&fit=max&w=128",
          "votes_count": 9,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "c1cf29a8-f907-43cf-9a9c-e73d98c16ebf",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "",
          "views_count": 2626,
          "week": 48
      },
      "product_pricing_types": {
          "id": 1,
          "created_at": "2023-05-24T19:17:02.617+00:00",
          "updated_at": "2023-05-24T19:17:02.617+00:00",
          "title": "Free"
      },
      "product_categories": [
          {
              "id": 3,
              "created_at": "2023-05-24T20:16:20.803159+00:00",
              "updated_at": "2023-05-24T20:16:20.803159+00:00",
              "name": "UI Library"
          },
          {
              "id": 16,
              "created_at": "2023-09-20T23:19:39.222635+00:00",
              "updated_at": "2023-09-20T23:19:39.222635+00:00",
              "name": "API"
          }
      ],
      "profile_name": "Raphaël Daguenet",
      "profile_id": "c1cf29a8-f907-43cf-9a9c-e73d98c16ebf"
  },
  {
      "product": {
          "id": 198,
          "created_at": "2023-09-07T02:29:29.079326+00:00",
          "updated_at": "2023-09-07T02:29:29.079326+00:00",
          "name": "Visual Backend",
          "slug": "visual-backend",
          "description": "Visual Backend is a desktop app that optimises the Python FastAPI dev workflow by allowing you to generate code & scaffolding for all the essentials in a backend - endpoint handlers, auth and CI/CD. Quickly connect your AI/ML service to a REST API today. \n\nP.S. Also supports Node.js Express for those who prefer that!\n\n",
          "slogan": "Build a FastAPI backend for your AI/ML service in minutes",
          "comments_count": 0,
          "pricing_type": 2,
          "github_url": "https://github.com/vbackend/visual-backend",
          "demo_url": "https://visual-backend.com",
          "asset_urls": [
              "https://mars-images.imgix.net/1701086149320-1701086142960Screenshot-2023-11-27-at-11.55.28.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1701086166756-1701086166393additional_img1.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1701086189242-1701086188921additional_img2.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1701086254366-1701086254019additional_img3.png?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1694052955853-icon_v4@2x.png1694052954182?auto=compress&fit=max&w=128",
          "votes_count": 7,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "6c9cdc33-0944-457c-bbe1-5dd3d28f9c61",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "https://www.youtube.com/watch?v=Va_sKxRIq3Q&feature=youtu.be",
          "views_count": 2787,
          "week": 48
      },
      "product_pricing_types": {
          "id": 2,
          "created_at": "2023-05-24T19:17:15.016883+00:00",
          "updated_at": "2023-05-24T19:17:15.016883+00:00",
          "title": "Subscription"
      },
      "product_categories": [
          {
              "id": 19,
              "created_at": "2023-09-20T23:20:09.232035+00:00",
              "updated_at": "2023-09-20T23:20:09.232035+00:00",
              "name": "Helpers"
          },
          {
              "id": 30,
              "created_at": "2023-09-25T12:45:48.427201+00:00",
              "updated_at": "2023-09-25T12:45:48.427201+00:00",
              "name": "Workflow automation"
          },
          {
              "id": 34,
              "created_at": "2023-09-27T06:44:17.212365+00:00",
              "updated_at": "2023-09-27T06:44:17.212365+00:00",
              "name": "Boilerplate"
          }
      ],
      "profile_name": "John Yeo",
      "profile_id": "6c9cdc33-0944-457c-bbe1-5dd3d28f9c61"
  },
  {
      "product": {
          "id": 320,
          "created_at": "2023-09-26T21:00:35.014729+00:00",
          "updated_at": "2023-09-26T21:00:35.014729+00:00",
          "name": "OpenMeter Cloud",
          "slug": "openmeter-cloud",
          "description": "Scalable usage metering for AI and DevOps companies. OpenMeter provides accurate billing integrations, real-time customer dashboards, and usage limit enforcement. Available as Open Source and managed Cloud.",
          "slogan": "Usage Metering for Engineers",
          "comments_count": 0,
          "pricing_type": 1,
          "github_url": "https://github.com/openmeterio/openmeter",
          "demo_url": "https://openmeter.io",
          "asset_urls": [
              "https://mars-images.imgix.net/1701381508282-1701381506736PH_000_HubCover.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1701381522524-1701381521019PH_003_Accurate.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1701381532311-1701381530857PH_004_Integrate.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1701381541072-1701381539620PH_005_Prevent.png?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1695761926645-39c10d257734364f1a6e46491b11bcd8a04359e0.png1695761924904?auto=compress&fit=max&w=128",
          "votes_count": 6,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "fd0528df-493b-4080-b3d2-3355a6e73c88",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "",
          "views_count": 2593,
          "week": 48
      },
      "product_pricing_types": {
          "id": 1,
          "created_at": "2023-05-24T19:17:02.617+00:00",
          "updated_at": "2023-05-24T19:17:02.617+00:00",
          "title": "Free"
      },
      "product_categories": [
          {
              "id": 8,
              "created_at": "2023-09-20T23:17:01.109272+00:00",
              "updated_at": "2023-09-20T23:17:01.109272+00:00",
              "name": "Open Source"
          },
          {
              "id": 9,
              "created_at": "2023-09-20T23:17:54.207021+00:00",
              "updated_at": "2023-09-20T23:17:54.207021+00:00",
              "name": "DevOps"
          },
          {
              "id": 14,
              "created_at": "2023-09-20T23:19:15.640065+00:00",
              "updated_at": "2023-09-20T23:19:15.640065+00:00",
              "name": "Analytics"
          }
      ],
      "profile_name": "Peter Marton",
      "profile_id": "fd0528df-493b-4080-b3d2-3355a6e73c88"
  },
  {
      "product": {
          "id": 341,
          "created_at": "2023-10-02T16:54:59.086133+00:00",
          "updated_at": "2023-10-02T16:54:59.086133+00:00",
          "name": "The SaaS Factory Boilerplate",
          "slug": "the-saas-factory-boilerplate",
          "description": "Level up your SaaS development with The SaaS Factory Boilerplates. Get a solid foundation in React, GraphQL, Apollo, Prisma, Tailwind CSS, and Node.js. In addition to the basic kit, we offer advanced SaaS kits, ready for you to add your branding and ideas",
          "slogan": "Boost your SaaS development with ready-to-use starter kits",
          "comments_count": 0,
          "pricing_type": 2,
          "github_url": "",
          "demo_url": "https://thesaasfactory.dev",
          "asset_urls": [
              "https://mars-images.imgix.net/1696265635464-Build-your-next-saas.png1696265559679?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1696265641922-boilerplate-demo.thesaasfactory.dev_-(2).png1696265566034?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1696265656412-boilerplate-demo.thesaasfactory.dev_-(3).png1696265580318?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1696265661092-boilerplate-demo.thesaasfactory.dev_.png1696265584992?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1696265666489-boilerplate-demo.thesaasfactory.dev_admin-(2).png1696265590821?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1696265502370-logo.png1696265426158?auto=compress&fit=max&w=128",
          "votes_count": 5,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "9677c4b2-ecc2-4a63-9d41-229af36615d8",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "",
          "views_count": 1986,
          "week": 48
      },
      "product_pricing_types": {
          "id": 2,
          "created_at": "2023-05-24T19:17:15.016883+00:00",
          "updated_at": "2023-05-24T19:17:15.016883+00:00",
          "title": "Subscription"
      },
      "product_categories": [
          {
              "id": 34,
              "created_at": "2023-09-27T06:44:17.212365+00:00",
              "updated_at": "2023-09-27T06:44:17.212365+00:00",
              "name": "Boilerplate"
          }
      ],
      "profile_name": "Royler Marichal Carrazana",
      "profile_id": "9677c4b2-ecc2-4a63-9d41-229af36615d8"
  },
  {
      "product": {
          "id": 412,
          "created_at": "2023-10-20T10:21:54.098127+00:00",
          "updated_at": "2023-10-20T10:21:54.098127+00:00",
          "name": "Config.tips",
          "slug": "configtips",
          "description": "Config.tips is your source for discovering, sharing, and streamlining config files. Join the open-source community and level up your development with expert tips and hacks!",
          "slogan": "Simple shareable config tips for developers",
          "comments_count": 0,
          "pricing_type": 1,
          "github_url": "https://github.com/CircleCI-Public/Config.Tips",
          "demo_url": "https://config.tips/",
          "asset_urls": [
              "https://mars-images.imgix.net/1697797288168-1697797287747Photo-1.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1697797291497-1697797291253Photo-2.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1697797295009-1697797294779Photo-3.png?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1697797300712-1697797299782Photo-4.png?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1697796500831-1697796500347ezgif.com-gif-maker-(1).gif?auto=compress&fit=max&w=128",
          "votes_count": 4,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "6d348c66-395b-4685-a234-1dbf33708033",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "https://www.youtube.com/watch?v=xsf3ZpHlB6A",
          "views_count": 1789,
          "week": 48
      },
      "product_pricing_types": {
          "id": 1,
          "created_at": "2023-05-24T19:17:02.617+00:00",
          "updated_at": "2023-05-24T19:17:02.617+00:00",
          "title": "Free"
      },
      "product_categories": [
          {
              "id": 8,
              "created_at": "2023-09-20T23:17:01.109272+00:00",
              "updated_at": "2023-09-20T23:17:01.109272+00:00",
              "name": "Open Source"
          }
      ],
      "profile_name": "Alexandre",
      "profile_id": "6d348c66-395b-4685-a234-1dbf33708033"
  },
  {
      "product": {
          "id": 331,
          "created_at": "2023-09-29T08:23:57.830184+00:00",
          "updated_at": "2023-09-29T08:23:57.830184+00:00",
          "name": "Contento ",
          "slug": "contento-",
          "description": "Contento is a Headless CMS - built specifically for websites. This simple assumption means the feature set, workflow and product roadmap are all optimised for managing and maintaining a website. Features include visual preview, URL management, SEO, image optimization and an emphasis on reusability.",
          "slogan": "The Only Headless CMS Focused 100% on Websites",
          "comments_count": 0,
          "pricing_type": 1,
          "github_url": "",
          "demo_url": "https://www.contento.io/",
          "asset_urls": [
              "https://mars-images.imgix.net/1695975442770-assetsgrid_light.jpg1695975440383?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695975457167-livepreview_dark.jpg1695975455439?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695975473931-contenttypeeditor_light.jpg1695975473166?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1695975356545-Contento_Symbol_Black.png1695975356233?auto=compress&fit=max&w=128",
          "votes_count": 3,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "5c3b7401-fe1e-4079-926a-02168b3361bc",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "https://www.youtube.com/watch?v=PXh1FV4cZIc",
          "views_count": 1514,
          "week": 48
      },
      "product_pricing_types": {
          "id": 1,
          "created_at": "2023-05-24T19:17:02.617+00:00",
          "updated_at": "2023-05-24T19:17:02.617+00:00",
          "title": "Free"
      },
      "product_categories": null,
      "profile_name": "Alan Gleeson",
      "profile_id": "5c3b7401-fe1e-4079-926a-02168b3361bc"
  },
  {
      "product": {
          "id": 332,
          "created_at": "2023-09-29T14:10:59.391076+00:00",
          "updated_at": "2023-09-29T14:10:59.391076+00:00",
          "name": "MetricsWave 🌊",
          "slug": "metricswave-",
          "description": "Don't compromise your visitor. We provide easy to use and respectful website analytics, but configurable. Create your own events, dashboards, funnels, and more.",
          "slogan": "Best Google Analytics alternative for Your Product.",
          "comments_count": 0,
          "pricing_type": 1,
          "github_url": "",
          "demo_url": "https://metricswave.com/",
          "asset_urls": [
              "https://mars-images.imgix.net/1695996627057-SCR-20230929-nleb.png1695996626482?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695996652667-SCR-20230929-nljb.png1695996652206?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695996739546-SCR-20230929-nlvv.png1695996739074?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695996761793-SCR-20230929-nlzz.png1695996761344?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1695996497821-MetricsWave-Logo.png1695996496857?auto=compress&fit=max&w=128",
          "votes_count": 3,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "b18e0f47-2020-4367-8d23-5b23bb4e6396",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "",
          "views_count": 1890,
          "week": 48
      },
      "product_pricing_types": {
          "id": 1,
          "created_at": "2023-05-24T19:17:02.617+00:00",
          "updated_at": "2023-05-24T19:17:02.617+00:00",
          "title": "Free"
      },
      "product_categories": [
          {
              "id": 14,
              "created_at": "2023-09-20T23:19:15.640065+00:00",
              "updated_at": "2023-09-20T23:19:15.640065+00:00",
              "name": "Analytics"
          }
      ],
      "profile_name": "Víctor Falcón",
      "profile_id": "b18e0f47-2020-4367-8d23-5b23bb4e6396"
  },
  {
      "product": {
          "id": 327,
          "created_at": "2023-09-28T07:55:36.114101+00:00",
          "updated_at": "2023-09-28T07:55:36.114101+00:00",
          "name": "THORN",
          "slug": "thorn",
          "description": "Key Features:\n\n* GPT-4 Powered Article Editor\n* Collaboration & Synchronization\n* AI Assisted Writing\n* Customizable & Privacy-focused\n* Effortless Text Creation\n* One-Stop Website Builder\n* Performance & Cost Efficiency\n* Custom Domain & Global Reach",
          "slogan": "All You Need To Power Personal Writing and Website Building",
          "comments_count": 0,
          "pricing_type": 2,
          "github_url": "",
          "demo_url": "https://thorn.so",
          "asset_urls": [
              "https://mars-images.imgix.net/1695887492945-CleanShot-2023-09-26-at-15.40.33@2x.png1695887482174?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695887513713-CleanShot-2023-09-26-at-15.43.27@2x.png1695887500360?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695887532075-CleanShot-2023-09-26-at-15.46.06@2x.png1695887524282?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695887544113-CleanShot-2023-09-26-at-15.46.35@2x-(1).png1695887541996?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695887556817-CleanShot-2023-09-26-at-15.58.01@2x.png1695887549885?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1695887460765-thorn-(1).png1695887459126?auto=compress&fit=max&w=128",
          "votes_count": 1,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "94d1a2d3-a614-400d-959b-7b7f2b702e2f",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "",
          "views_count": 1592,
          "week": 48
      },
      "product_pricing_types": {
          "id": 2,
          "created_at": "2023-05-24T19:17:15.016883+00:00",
          "updated_at": "2023-05-24T19:17:15.016883+00:00",
          "title": "Subscription"
      },
      "product_categories": null,
      "profile_name": "Alecyrus",
      "profile_id": "94d1a2d3-a614-400d-959b-7b7f2b702e2f"
  },
  {
      "product": {
          "id": 323,
          "created_at": "2023-09-27T12:26:21.545637+00:00",
          "updated_at": "2023-09-27T12:26:21.545637+00:00",
          "name": "IntelliPlugin",
          "slug": "intelliplugin",
          "description": "Leverage our AI-powered plugin to generate custom-made WordPress plugins, without writing a single line of code.",
          "slogan": "The Future of WordPress Plugin Development",
          "comments_count": 0,
          "pricing_type": 3,
          "github_url": "",
          "demo_url": "https://intelliplugin.com/",
          "asset_urls": [
              "https://mars-images.imgix.net/1695817547814-4EF0A4FF-6188-4B99-B672-A69F0DCF76F8.png1695817546224?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695817559528-997DCD9D-7857-44AD-A1AA-B979BA85CD3E.png1695817557617?auto=compress&fit=max&w=750",
              "https://mars-images.imgix.net/1695817572483-B893BBF1-DAF7-48F7-9663-F67F30FBF620.png1695817571244?auto=compress&fit=max&w=750"
          ],
          "launch_date": "2023-11-28",
          "is_draft": false,
          "logo_url": "https://mars-images.imgix.net/1695817418955-D7389544-44A1-496A-8FAB-2D2F4515D23C.png1695817416501?auto=compress&fit=max&w=128",
          "votes_count": 0,
          "deleted": false,
          "deleted_at": null,
          "owner_id": "526a2e2a-9ba4-4828-bdbb-0d2fad962a5c",
          "launch_start": "2023-11-28T00:00:00+00:00",
          "launch_end": "2023-12-04T23:59:59+00:00",
          "launch_description": null,
          "demo_video_url": "",
          "views_count": 1792,
          "week": 48
      },
      "product_pricing_types": {
          "id": 3,
          "created_at": "2023-05-24T19:17:29.616314+00:00",
          "updated_at": "2023-05-24T19:17:29.616314+00:00",
          "title": "One time fee"
      },
      "product_categories": [
          {
              "id": 10,
              "created_at": "2023-09-20T23:18:04.642492+00:00",
              "updated_at": "2023-09-20T23:18:04.642492+00:00",
              "name": "AI"
          }
      ],
      "profile_name": "Dalton Edwards",
      "profile_id": "526a2e2a-9ba4-4828-bdbb-0d2fad962a5c"
  }
];

export default function Home() {
  const today = new Date();
  const productService = new ProductsService(createBrowserClient());
  const [launchWeeks, setLaunchWeeks] = useState([]);
  const [weeklyWinners, setWeeklyWinners] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const week = await productService.getWeekNumber(today, 2);
      const [launchWeeks, weeklyWinners] = await Promise.all([
        productService.getPrevLaunchWeeks(today.getFullYear(), 2, week, 1),
        productService.getWeeklyWinners(week),
      ]);
      setLaunchWeeks(launchWeeks as any);
      // setWeeklyWinners(weeklyWinners as any);
      setWeeklyWinners(products);
      setLoading(false);
    };
    fetchData();
  }, []);

  function weekTools(group) {
    return (
      <>
        <div className="mt-3 text-slate-400 text-sm">This week's tools</div>
        <div className="mt-3 text-slate-400 text-sm">
          ❗ Vote for your favorite <b className="text-orange-400">↳</b>
        </div>
        <ul className="mt-3 divide-y divide-slate-800/60">
          {group.products.map((product, idx) => (
            <ToolCardEffect key={idx} tool={product as ProductType} />
          ))}
        </ul>
      </>
    );
  }

  function prevWeekTools(group) {
    return (
      <>
        <div className="mt-3 text-white text-sm">Previous week winners 👑</div>
        <ul className="mt-3 divide-y divide-slate-800/60">
          {group.products.slice(0, 3).map((product, idx) => (
            <ToolCardEffect key={idx} tool={product as ProductType} />
          ))}
        </ul>
      </>
    );
  }

  function weekWinnerTools(products) {
    return (
      <>
        <div className="mt-3 text-white text-sm">Previous weeks winners 👑</div>
        <ul className="mt-3 divide-y divide-slate-800/60">
          {products.map((product, idx) => (
            <ToolCardEffect key={idx} tool={product as ProductType} />
          ))}
        </ul>
      </>
    );
  }

  return (
    <section className="max-w-4xl mt-5 lg:mt-10 mx-auto px-4 md:px-8">
      <MailBox emails={emails}/>
      {/* <TechFinder /> */}
      {isLoading ? (
        <div className="mt-14">
          <div>
            <div className="w-24 h-3 rounded-full bg-slate-700 animate-pulse"></div>
            <div className="w-32 h-3 mt-2 rounded-full bg-slate-700 animate-pulse"></div>
          </div>
          <ul className="mt-5 space-y-4">
            {Array(25)
              .fill('')
              .map((item, idx) => (
                <SkeletonToolCard key={idx} />
              ))}
          </ul>
        </div>
      ) : (
        <div className="mt-10 mb-12">
          {launchWeeks.map((group, index) => (index > 0 ? prevWeekTools(group) : weekTools(group)))}
          {weekWinnerTools(weeklyWinners)}
        </div>
      )}
    </section>
  );
}
