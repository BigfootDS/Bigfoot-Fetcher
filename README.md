# @bigfootds/Bigfoot-Fetcher

JavaScript fetch override for cohesive, consistent usage across various BigfootDS projects.

Note that this package, while publicly available and MIT-licensed, is **not** intended for public contribution/collaboration. We just need an easy way to consolidate some functionality that will be reused across multiple projects, and an NPM package is a nice, easy way to do that.

## Installation

`npm install @bigfootds/bigfoot-fetcher`

## Usage

Import the package as:

```js
const bigfootFetcher = require("@bigfootds/bigfoot-fetcher");
```

Or:

```js
import bigfootFetcher from "@bigfootds/bigfoot-fetcher";
```


Then, use `bigfootFetcher` in place of any fetch function calls. It's a wrapper around fetch!

## More Info

These headers are added to all fetch requests that use this package's fetcher function:


```typescript
interface BigfootDSConfig {
    // Set in environment variables or package.json, access with properties like `process.env.npm_package_config_bigfootds_productName`:
	productName?: string // also retrievable as environment variable

    // Retrievable via Bowser or "My User Agent Parser" NPM packages, or environment variables:
    browserName?: string,
    browserVersion?: string,
    browserEngineName?: string,
    browserEngineVersion?: string,
    osName?: string,
    osVersion?: string,
    osVersionName?: string,
    platformType?: string, // also retrievable as environment variable

    // Retrievable as environment variables:
    platformName?: string // set as environment variable, preferably at build time in a GitHub Action workflow
}
```

The `package.json` file of a project using this package should include a config object like this:

```json
"config": {
    "bigfootds": {
        "productName": "Game Name Goes Here",
        "platformName": "Steam Deck or other platform determined at build time"
    }
},
```