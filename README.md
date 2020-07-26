# gatsby-remark-autolink-paragraphs

Adds GitHub-style hover links to _paragraphs_ in your markdown files when they're rendered.

_Wait, why would I want to do that?_

You probably wouldn't; you'd probably use [headers](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/) like a normal person. But let's say you had a _very_ long text that was broken up into paragraphs but but did _not_ have headers, and you wanted to allow linking to specific grafs within that text.

This plugin is a modified version of [gatsby-remark-autolink-headers](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/). This is a sub-plugin for `gatsby-transformer-remark`. As demoed below, add this plugin to the options of `gatsby-transformer-remark`.

## Install

`npm install --save gatsby-remark-autolink-paragraphs`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-paragraphs`],
      },
    },
  ],
}
```

Note: if you are using `gatsby-remark-prismjs`, make sure that it’s listed after this plugin. Otherwise, you might face an issue described here: https://github.com/gatsbyjs/gatsby/issues/5764.

```javascript
// good
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      `gatsby-remark-autolink-paragraphs`,
      `gatsby-remark-prismjs`,
    ],
  },
}

// bad
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      `gatsby-remark-prismjs`, // should be placed after `gatsby-remark-autolink-paragraphs`
      `gatsby-remark-autolink-paragraphs`,
    ],
  },
}
```

## Options

- `offsetY`: Signed integer. Vertical offset value in pixels (optional)
- `icon`: SVG shape inside a template literal or boolean `false`. Set your own svg or disable icon (optional)
- `className`: String. Set your own class for the anchor (optional)
- `maintainCase`: Boolean. Maintains the case for markdown paragraph (optional)
- `removeAccents`: Boolean. Remove accents from generated headings IDs (optional)
- `enableCustomId`: Boolean. Enable custom paragraph IDs with `{#id}` (optional)
- `isIconAfterParagraph`: Boolean. Enable the anchor icon to be inline at the end of the header text (optional)
- `elements`: String array. Specify which type of paragraph tags to link (optional)

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-paragraphs`,
            options: {
              offsetY: `100`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `custom-class`,
              maintainCase: true,
              removeAccents: true,
              isIconAfterParagraph: true,
              elements: [`p`],
            },
          },
        ],
      },
    },
  ],
}
```
