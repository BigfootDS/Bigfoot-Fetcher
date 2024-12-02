// import dotenv from "dotenv";
// dotenv.config();
import Bowser from "bowser"; // TypeScript
import MyUaParser from "my-ua-parser";
import os from "node:os";

// Good:
// console.log(process.env.npm_package_config_bigfootds_game);
// Junk:
// console.log(process.env.npm_package_bigfootds_game);
// console.log(process.env.npm_package_testo);
// console.log(process.env.npm_package_scripts_start)

export function fetcher(requestTarget: RequestInfo | URL, options?: RequestInit){
	const defaultHeaders: HeadersInit = options ? new Headers(options.headers) : new Headers();
    let bigfootDSConfigData: BigfootDSConfig = {}
    if (typeof self === 'undefined') { 
        /* neither web window nor web worker, must be node environment */ 
        bigfootDSConfigData = getInfoViaNode();
    } else {
        // global "window" object is available, must be a browser
        bigfootDSConfigData = getInfoViaBrowser();
    }

    // console.log(JSON.stringify(bigfootDSConfigData));


    (Object.keys(bigfootDSConfigData) as Array<keyof BigfootDSConfig>).forEach((key) => {
        if (bigfootDSConfigData[key]){
            defaultHeaders.set(key, bigfootDSConfigData[key]);
        }
    });

    let localOptions = options ? options : {headers: defaultHeaders};
    if (options) {
        localOptions.headers = {...options.headers, ...defaultHeaders}
    }

	return fetch(requestTarget, localOptions);
}

function getInfoViaBrowser(){
    const browser = Bowser.getParser(window.navigator.userAgent);
    const bowserResult = browser.getResult();
    const userAgentParsed = MyUaParser(window.navigator.userAgent);

    let result: BigfootDSConfig = {
        browserEngineName: 
            bowserResult.engine.name ||
            userAgentParsed.engine.name,
        browserEngineVersion: 
            bowserResult.engine.version || 
            userAgentParsed.engine.version,
        browserName: 
            bowserResult.browser.name || 
            userAgentParsed.browser.name,
        browserVersion: 
            bowserResult.browser.version ||
            userAgentParsed.browser.version,
        osName: 
            bowserResult.os.name ||
            userAgentParsed.os.name,
        osVersion: 
            userAgentParsed.os.version|| 
            bowserResult.os.version,
        osVersionName: 
            userAgentParsed.os.version || 
            bowserResult.os.versionName,
        platformType: 
            process.env.npm_package_config_bigfootds_platformType ||
            process.env.npm_package_platformType ||
            process.env.platformType || 
            process.env.PLATFORMTYPE || 
            process.env.PLATFORM_TYPE || 
            process.env.REACT_APP_PLATFORM_TYPE || 
            process.env.REACT_APP_PLATFORMTYPE ||
            process.env.VITE_PLATFORM_TYPE || 
            process.env.VITE_PLATFORMTYPE ||
            bowserResult.platform.type,
        platformName:
            process.env.npm_package_config_bigfootds_platformName ||
            process.env.npm_package_platformName ||
            process.env.platformName || 
            process.env.PLATFORMNAME || 
            process.env.PLATFORM_NAME || 
            process.env.REACT_APP_PLATFORM_NAME || 
            process.env.REACT_APP_PLATFORMNAME ||
            process.env.VITE_PLATFORM_NAME || 
            process.env.VITE_PLATFORMNAME,
        productName:
            process.env.npm_package_config_bigfootds_productName ||
            process.env.npm_package_productName ||
            process.env.productName || 
            process.env.PRODUCTNAME || 
            process.env.PRODUCT_NAME || 
            process.env.REACT_APP_PRODUCT_NAME || 
            process.env.REACT_APP_PRODUCTNAME ||
            process.env.VITE_PRODUCT_NAME || 
            process.env.VITE_PRODUCTNAME,
    }

    return result;
}

function getInfoViaNode(){

    let result: BigfootDSConfig = {
        osName: 
            os.type(),
        osVersion: 
            os.release(),
        platformType: 
            process.env.npm_package_config_bigfootds_platformType ||
            process.env.npm_package_platformType ||
            process.env.platformType || 
            process.env.PLATFORMTYPE || 
            process.env.PLATFORM_TYPE || 
            process.env.REACT_APP_PLATFORM_TYPE || 
            process.env.REACT_APP_PLATFORMTYPE ||
            process.env.VITE_PLATFORM_TYPE || 
            process.env.VITE_PLATFORMTYPE,
        platformName:
            process.env.npm_package_config_bigfootds_platformName ||
            process.env.npm_package_platformName ||
            process.env.platformName || 
            process.env.PLATFORMNAME || 
            process.env.PLATFORM_NAME || 
            process.env.REACT_APP_PLATFORM_NAME || 
            process.env.REACT_APP_PLATFORMNAME ||
            process.env.VITE_PLATFORM_NAME || 
            process.env.VITE_PLATFORMNAME,
        productName:
            process.env.npm_package_config_bigfootds_productName ||
            process.env.npm_package_productName ||
            process.env.productName || 
            process.env.PRODUCTNAME || 
            process.env.PRODUCT_NAME || 
            process.env.REACT_APP_PRODUCT_NAME || 
            process.env.REACT_APP_PRODUCTNAME ||
            process.env.VITE_PRODUCT_NAME || 
            process.env.VITE_PRODUCTNAME,
    }

    return result;
}


interface BigfootDSConfig {
    // Set in package.json, access with properties like `process.env.npm_package_config_bigfootds_productName`:
	productName?: string // also retrievable as environment variable

    // Retrievable via Bowser NPM package:
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

// In a browser with a correct meta HTML tag, this natively gets some device info: 
// await navigator.userAgentData.getHighEntropyValues(["architecture","bitness","formFactor","fullVersionList","model","platformVersion","uaFullVersion","wow64"])
/*
{
    "architecture": "x86",
    "bitness": "64",
    "brands": [
        {
            "brand": "Google Chrome",
            "version": "131"
        },
        {
            "brand": "Chromium",
            "version": "131"
        },
        {
            "brand": "Not_A Brand",
            "version": "24"
        }
    ],
    "fullVersionList": [
        {
            "brand": "Google Chrome",
            "version": "131.0.6778.86"
        },
        {
            "brand": "Chromium",
            "version": "131.0.6778.86"
        },
        {
            "brand": "Not_A Brand",
            "version": "24.0.0.0"
        }
    ],
    "mobile": false,
    "model": "",
    "platform": "Windows",
    "platformVersion": "15.0.0",
    "uaFullVersion": "131.0.6778.86",
    "wow64": false
}
*/
// There is a quirk on Windows 11; it must be detected in a certain way!
// https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11

// ElectronJS can set a user agent like so:
// https://stackoverflow.com/questions/35672602/how-to-set-electron-useragent

// Set environment variables in GitHub Actions workflows like so:
// https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables