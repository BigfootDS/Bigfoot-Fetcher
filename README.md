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

```js
app.get("/headers", (request, response) => {
    response.json({result: JSON.stringify(request.headers)});
})

bigfootFetcher("http://localhost:3030/headers")
    .then(async (response) => {return await response.json()})
    .then((data) => {
        console.log("Returned headers:");
        console.log(data);
    });
```

```
Returned headers:
{
  result: '{"host":"localhost:3030","connection":"keep-alive","osname":"Linux","osversion":"5.15.0-125-generic","platformname":"API","platformtype":"api","productname":"@bigfootds/ms-auth","accept":"*/*","accept-language":"*","sec-fetch-mode":"cors","user-agent":"node","accept-encoding":"gzip, deflate"}'
}
```

Note that the headers above are populated by some default request headers as well as the "Bigfoot Fetcher" headers, which come from a `package.json` contents like this:

```json
{
    "name": "@bigfootds/ms-auth",
     "version": "1.0.1",
    "description": "Core authentication & IAM services for BigfootDS & its various games and products.",
    "config":{
        "bigfootds":{
            "platformType":"api",
            "platformName":"API",
            "productName":"@bigfootds/ms-auth"
        }
    },
}
```


These headers are added to all fetch requests that use this package's fetcher function:


```typescript
interface BigfootDSConfig {
	productName?: string 
    browserName?: string,
    browserVersion?: string,
    browserEngineName?: string,
    browserEngineVersion?: string,
    osName?: string,
    osVersion?: string,
    osVersionName?: string,
    platformType?: string, 
    platformName?: string 
}
```

Whether or not they are actually added depends on if they have value, and they don't all have value on all platforms. e.g. no browser properties in the NodeJS environment!