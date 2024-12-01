
console.log(process.env.npm_package_config_bigfootds_game);
console.log(process.env.npm_package_testo);
console.log(process.env.npm_package_scripts_start)

export default function fetcher(requestTarget: RequestInfo | URL, options: RequestInit){
	const defaultHeaders: HeadersInit = new Headers(options.headers);
	defaultHeaders.set("browserName", "")
	return fetch(requestTarget);
}

function updateOptions(options: RequestInit) {
	const updated: BigfootFetchOptions = {...options};
	if (localStorage.jwt) {
		updated.headers = {
		  ...updated.headers,
		  Authorization: `Bearer ${localStorage.jwt}`,
		};
	  }
	return updated;
}

interface BigfootFetchOptions extends Omit<RequestInit, "headers"> {
	headers?: any;
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