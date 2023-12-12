// runtime can't be in strict mode because a global variable is assign and maybe created.
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([[826],{

/***/ 210:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ next_middleware_loaderabsolutePagePath_private_next_root_dir_2Fmiddleware_ts_page_2Fmiddleware_rootDir_C_3A_5CUsers_5CUSER_5CDesktop_5Cdevhunt_matchers_W10_3D_preferredRegion_middlewareConfig_eyJtYXRjaGVycyI6W119_)
});

// NAMESPACE OBJECT: ./middleware.ts
var middleware_namespaceObject = {};
__webpack_require__.r(middleware_namespaceObject);
__webpack_require__.d(middleware_namespaceObject, {
  config: () => (config),
  middleware: () => (middleware)
});

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/globals.js
async function registerInstrumentation() {
    if ("_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && _ENTRIES.middleware_instrumentation.register) {
        try {
            await _ENTRIES.middleware_instrumentation.register();
        } catch (err) {
            err.message = `An error occurred while loading instrumentation hook: ${err.message}`;
            throw err;
        }
    }
}
let registerInstrumentationPromise = null;
function ensureInstrumentationRegistered() {
    if (!registerInstrumentationPromise) {
        registerInstrumentationPromise = registerInstrumentation();
    }
    return registerInstrumentationPromise;
}
function getUnsupportedModuleErrorMessage(module) {
    // warning: if you change these messages, you must adjust how react-dev-overlay's middleware detects modules not found
    return `The edge runtime does not support Node.js '${module}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
}
function __import_unsupported(moduleName) {
    const proxy = new Proxy(function() {}, {
        get (_obj, prop) {
            if (prop === "then") {
                return {};
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        construct () {
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        },
        apply (_target, _this, args) {
            if (typeof args[0] === "function") {
                return args[0](proxy);
            }
            throw new Error(getUnsupportedModuleErrorMessage(moduleName));
        }
    });
    return new Proxy({}, {
        get: ()=>proxy
    });
}
function enhanceGlobals() {
    // The condition is true when the "process" module is provided
    if (process !== __webpack_require__.g.process) {
        // prefer local process but global.process has correct "env"
        process.env = __webpack_require__.g.process.env;
        __webpack_require__.g.process = process;
    }
    // to allow building code that import but does not use node.js modules,
    // webpack will expect this function to exist in global scope
    Object.defineProperty(globalThis, "__import_unsupported", {
        value: __import_unsupported,
        enumerable: false,
        configurable: false
    });
    // Eagerly fire instrumentation hook to make the startup faster.
    void ensureInstrumentationRegistered();
}
enhanceGlobals(); //# sourceMappingURL=globals.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/error.js
class PageSignatureError extends Error {
    constructor({ page }){
        super(`The middleware "${page}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
    }
}
class RemovedPageError extends Error {
    constructor(){
        super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
    }
}
class RemovedUAError extends Error {
    constructor(){
        super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
    }
} //# sourceMappingURL=error.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/utils.js
/**
 * Converts a Node.js IncomingHttpHeaders object to a Headers object. Any
 * headers with multiple values will be joined with a comma and space. Any
 * headers that have an undefined value will be ignored and others will be
 * coerced to strings.
 *
 * @param nodeHeaders the headers object to convert
 * @returns the converted headers object
 */ function fromNodeOutgoingHttpHeaders(nodeHeaders) {
    const headers = new Headers();
    for (let [key, value] of Object.entries(nodeHeaders)){
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (let v of values){
            if (typeof v === "undefined") continue;
            if (typeof v === "number") {
                v = v.toString();
            }
            headers.append(key, v);
        }
    }
    return headers;
}
/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.
  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.
  
  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/ function splitCookiesString(cookiesString) {
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
/**
 * Converts a Headers object to a Node.js OutgoingHttpHeaders object. This is
 * required to support the set-cookie header, which may have multiple values.
 *
 * @param headers the headers object to convert
 * @returns the converted headers object
 */ function toNodeOutgoingHttpHeaders(headers) {
    const nodeHeaders = {};
    const cookies = [];
    if (headers) {
        for (const [key, value] of headers.entries()){
            if (key.toLowerCase() === "set-cookie") {
                // We may have gotten a comma joined string of cookies, or multiple
                // set-cookie headers. We need to merge them into one header array
                // to represent all the cookies.
                cookies.push(...splitCookiesString(value));
                nodeHeaders[key] = cookies.length === 1 ? cookies[0] : cookies;
            } else {
                nodeHeaders[key] = value;
            }
        }
    }
    return nodeHeaders;
}
/**
 * Validate the correctness of a user-provided URL.
 */ function validateURL(url) {
    try {
        return String(new URL(String(url)));
    } catch (error) {
        throw new Error(`URL is malformed "${String(url)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, {
            cause: error
        });
    }
} //# sourceMappingURL=utils.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/fetch-event.js

const responseSymbol = Symbol("response");
const passThroughSymbol = Symbol("passThrough");
const waitUntilSymbol = Symbol("waitUntil");
class FetchEvent {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(_request){
        this[waitUntilSymbol] = [];
        this[passThroughSymbol] = false;
    }
    respondWith(response) {
        if (!this[responseSymbol]) {
            this[responseSymbol] = Promise.resolve(response);
        }
    }
    passThroughOnException() {
        this[passThroughSymbol] = true;
    }
    waitUntil(promise) {
        this[waitUntilSymbol].push(promise);
    }
}
class NextFetchEvent extends FetchEvent {
    constructor(params){
        super(params.request);
        this.sourcePage = params.page;
    }
    /**
   * @deprecated The `request` is now the first parameter and the API is now async.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ get request() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    /**
   * @deprecated Using `respondWith` is no longer needed.
   *
   * Read more: https://nextjs.org/docs/messages/middleware-new-signature
   */ respondWith() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
} //# sourceMappingURL=fetch-event.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/i18n/detect-domain-locale.js
function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems) return;
    if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems){
        var _item_domain, _item_locales;
        // remove port if present
        const domainHostname = (_item_domain = item.domain) == null ? void 0 : _item_domain.split(":")[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || ((_item_locales = item.locales) == null ? void 0 : _item_locales.some((locale)=>locale.toLowerCase() === detectedLocale))) {
            return item;
        }
    }
} //# sourceMappingURL=detect-domain-locale.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/remove-trailing-slash.js
/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */ function removeTrailingSlash(route) {
    return route.replace(/\/$/, "") || "/";
} //# sourceMappingURL=remove-trailing-slash.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/parse-path.js
/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ function parsePath(path) {
    const hashIndex = path.indexOf("#");
    const queryIndex = path.indexOf("?");
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : "",
            hash: hashIndex > -1 ? path.slice(hashIndex) : ""
        };
    }
    return {
        pathname: path,
        query: "",
        hash: ""
    };
} //# sourceMappingURL=parse-path.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-prefix.js

/**
 * Adds the provided prefix to the given path. It first ensures that the path
 * is indeed starting with a slash.
 */ function addPathPrefix(path, prefix) {
    if (!path.startsWith("/") || !prefix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-path-suffix.js

/**
 * Similarly to `addPathPrefix`, this function adds a suffix at the end on the
 * provided path. It also works only for paths ensuring the argument starts
 * with a slash.
 */ function addPathSuffix(path, suffix) {
    if (!path.startsWith("/") || !suffix) {
        return path;
    }
    const { pathname, query, hash } = parsePath(path);
    return "" + pathname + suffix + query + hash;
} //# sourceMappingURL=add-path-suffix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/path-has-prefix.js

/**
 * Checks if a given path starts with a given prefix. It ensures it matches
 * exactly without containing extra chars. e.g. prefix /docs should replace
 * for /docs, /docs/, /docs/a but not /docsss
 * @param path The path to check.
 * @param prefix The prefix to check against.
 */ function pathHasPrefix(path, prefix) {
    if (typeof path !== "string") {
        return false;
    }
    const { pathname } = parsePath(path);
    return pathname === prefix || pathname.startsWith(prefix + "/");
} //# sourceMappingURL=path-has-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/add-locale.js


/**
 * For a given path and a locale, if the locale is given, it will prefix the
 * locale. The path shouldn't be an API path. If a default locale is given the
 * prefix will be omitted if the locale is already the default locale.
 */ function addLocale(path, locale, defaultLocale, ignorePrefix) {
    // If no locale was given or the locale is the default locale, we don't need
    // to prefix the path.
    if (!locale || locale === defaultLocale) return path;
    const lower = path.toLowerCase();
    // If the path is an API path or the path already has the locale prefix, we
    // don't need to prefix the path.
    if (!ignorePrefix) {
        if (pathHasPrefix(lower, "/api")) return path;
        if (pathHasPrefix(lower, "/" + locale.toLowerCase())) return path;
    }
    // Add the locale prefix to the path.
    return addPathPrefix(path, "/" + locale);
} //# sourceMappingURL=add-locale.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/format-next-pathname-info.js




function formatNextPathnameInfo(info) {
    let pathname = addLocale(info.pathname, info.locale, info.buildId ? undefined : info.defaultLocale, info.ignorePrefix);
    if (info.buildId || !info.trailingSlash) {
        pathname = removeTrailingSlash(pathname);
    }
    if (info.buildId) {
        pathname = addPathSuffix(addPathPrefix(pathname, "/_next/data/" + info.buildId), info.pathname === "/" ? "index.json" : ".json");
    }
    pathname = addPathPrefix(pathname, info.basePath);
    return !info.buildId && info.trailingSlash ? !pathname.endsWith("/") ? addPathSuffix(pathname, "/") : pathname : removeTrailingSlash(pathname);
} //# sourceMappingURL=format-next-pathname-info.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/get-hostname.js
/**
 * Takes an object with a hostname property (like a parsed URL) and some
 * headers that may contain Host and returns the preferred hostname.
 * @param parsed An object containing a hostname property.
 * @param headers A dictionary with headers containing a `host`.
 */ function getHostname(parsed, headers) {
    // Get the hostname from the headers if it exists, otherwise use the parsed
    // hostname.
    let hostname;
    if ((headers == null ? void 0 : headers.host) && !Array.isArray(headers.host)) {
        hostname = headers.host.toString().split(":")[0];
    } else if (parsed.hostname) {
        hostname = parsed.hostname;
    } else return;
    return hostname.toLowerCase();
} //# sourceMappingURL=get-hostname.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/i18n/normalize-locale-path.js
/**
 * For a pathname that may include a locale from a list of locales, it
 * removes the locale from the pathname returning it alongside with the
 * detected locale.
 *
 * @param pathname A pathname that may include a locale.
 * @param locales A list of locales.
 * @returns The detected locale and pathname without locale
 */ function normalizeLocalePath(pathname, locales) {
    let detectedLocale;
    // first item will be empty string from splitting at first char
    const pathnameParts = pathname.split("/");
    (locales || []).some((locale)=>{
        if (pathnameParts[1] && pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
            detectedLocale = locale;
            pathnameParts.splice(1, 1);
            pathname = pathnameParts.join("/") || "/";
            return true;
        }
        return false;
    });
    return {
        pathname,
        detectedLocale
    };
} //# sourceMappingURL=normalize-locale-path.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/remove-path-prefix.js

/**
 * Given a path and a prefix it will remove the prefix when it exists in the
 * given path. It ensures it matches exactly without containing extra chars
 * and if the prefix is not there it will be noop.
 *
 * @param path The path to remove the prefix from.
 * @param prefix The prefix to be removed.
 */ function removePathPrefix(path, prefix) {
    // If the path doesn't start with the prefix we can return it as is. This
    // protects us from situations where the prefix is a substring of the path
    // prefix such as:
    //
    // For prefix: /blog
    //
    //   /blog -> true
    //   /blog/ -> true
    //   /blog/1 -> true
    //   /blogging -> false
    //   /blogging/ -> false
    //   /blogging/1 -> false
    if (!pathHasPrefix(path, prefix)) {
        return path;
    }
    // Remove the prefix from the path via slicing.
    const withoutPrefix = path.slice(prefix.length);
    // If the path without the prefix starts with a `/` we can return it as is.
    if (withoutPrefix.startsWith("/")) {
        return withoutPrefix;
    }
    // If the path without the prefix doesn't start with a `/` we need to add it
    // back to the path to make sure it's a valid path.
    return "/" + withoutPrefix;
} //# sourceMappingURL=remove-path-prefix.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/get-next-pathname-info.js



function getNextPathnameInfo(pathname, options) {
    var _options_nextConfig;
    const { basePath, i18n, trailingSlash } = (_options_nextConfig = options.nextConfig) != null ? _options_nextConfig : {};
    const info = {
        pathname,
        trailingSlash: pathname !== "/" ? pathname.endsWith("/") : trailingSlash
    };
    if (basePath && pathHasPrefix(info.pathname, basePath)) {
        info.pathname = removePathPrefix(info.pathname, basePath);
        info.basePath = basePath;
    }
    let pathnameNoDataPrefix = info.pathname;
    if (info.pathname.startsWith("/_next/data/") && info.pathname.endsWith(".json")) {
        const paths = info.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
        const buildId = paths[0];
        info.buildId = buildId;
        pathnameNoDataPrefix = paths[1] !== "index" ? "/" + paths.slice(1).join("/") : "/";
        // update pathname with normalized if enabled although
        // we use normalized to populate locale info still
        if (options.parseData === true) {
            info.pathname = pathnameNoDataPrefix;
        }
    }
    // If provided, use the locale route normalizer to detect the locale instead
    // of the function below.
    if (i18n) {
        let result = options.i18nProvider ? options.i18nProvider.analyze(info.pathname) : normalizeLocalePath(info.pathname, i18n.locales);
        info.locale = result.detectedLocale;
        var _result_pathname;
        info.pathname = (_result_pathname = result.pathname) != null ? _result_pathname : info.pathname;
        if (!result.detectedLocale && info.buildId) {
            result = options.i18nProvider ? options.i18nProvider.analyze(pathnameNoDataPrefix) : normalizeLocalePath(pathnameNoDataPrefix, i18n.locales);
            if (result.detectedLocale) {
                info.locale = result.detectedLocale;
            }
        }
    }
    return info;
} //# sourceMappingURL=get-next-pathname-info.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/next-url.js




const REGEX_LOCALHOST_HOSTNAME = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
function parseURL(url, base) {
    return new URL(String(url).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"), base && String(base).replace(REGEX_LOCALHOST_HOSTNAME, "localhost"));
}
const Internal = Symbol("NextURLInternal");
class NextURL {
    constructor(input, baseOrOpts, opts){
        let base;
        let options;
        if (typeof baseOrOpts === "object" && "pathname" in baseOrOpts || typeof baseOrOpts === "string") {
            base = baseOrOpts;
            options = opts || {};
        } else {
            options = opts || baseOrOpts || {};
        }
        this[Internal] = {
            url: parseURL(input, base ?? options.base),
            options: options,
            basePath: ""
        };
        this.analyze();
    }
    analyze() {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig, _this_Internal_domainLocale, _this_Internal_options_nextConfig_i18n1, _this_Internal_options_nextConfig1;
        const info = getNextPathnameInfo(this[Internal].url.pathname, {
            nextConfig: this[Internal].options.nextConfig,
            parseData: !undefined,
            i18nProvider: this[Internal].options.i18nProvider
        });
        const hostname = getHostname(this[Internal].url, this[Internal].options.headers);
        this[Internal].domainLocale = this[Internal].options.i18nProvider ? this[Internal].options.i18nProvider.detectDomainLocale(hostname) : detectDomainLocale((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.domains, hostname);
        const defaultLocale = ((_this_Internal_domainLocale = this[Internal].domainLocale) == null ? void 0 : _this_Internal_domainLocale.defaultLocale) || ((_this_Internal_options_nextConfig1 = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n1 = _this_Internal_options_nextConfig1.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n1.defaultLocale);
        this[Internal].url.pathname = info.pathname;
        this[Internal].defaultLocale = defaultLocale;
        this[Internal].basePath = info.basePath ?? "";
        this[Internal].buildId = info.buildId;
        this[Internal].locale = info.locale ?? defaultLocale;
        this[Internal].trailingSlash = info.trailingSlash;
    }
    formatPathname() {
        return formatNextPathnameInfo({
            basePath: this[Internal].basePath,
            buildId: this[Internal].buildId,
            defaultLocale: !this[Internal].options.forceLocale ? this[Internal].defaultLocale : undefined,
            locale: this[Internal].locale,
            pathname: this[Internal].url.pathname,
            trailingSlash: this[Internal].trailingSlash
        });
    }
    formatSearch() {
        return this[Internal].url.search;
    }
    get buildId() {
        return this[Internal].buildId;
    }
    set buildId(buildId) {
        this[Internal].buildId = buildId;
    }
    get locale() {
        return this[Internal].locale ?? "";
    }
    set locale(locale) {
        var _this_Internal_options_nextConfig_i18n, _this_Internal_options_nextConfig;
        if (!this[Internal].locale || !((_this_Internal_options_nextConfig = this[Internal].options.nextConfig) == null ? void 0 : (_this_Internal_options_nextConfig_i18n = _this_Internal_options_nextConfig.i18n) == null ? void 0 : _this_Internal_options_nextConfig_i18n.locales.includes(locale))) {
            throw new TypeError(`The NextURL configuration includes no locale "${locale}"`);
        }
        this[Internal].locale = locale;
    }
    get defaultLocale() {
        return this[Internal].defaultLocale;
    }
    get domainLocale() {
        return this[Internal].domainLocale;
    }
    get searchParams() {
        return this[Internal].url.searchParams;
    }
    get host() {
        return this[Internal].url.host;
    }
    set host(value) {
        this[Internal].url.host = value;
    }
    get hostname() {
        return this[Internal].url.hostname;
    }
    set hostname(value) {
        this[Internal].url.hostname = value;
    }
    get port() {
        return this[Internal].url.port;
    }
    set port(value) {
        this[Internal].url.port = value;
    }
    get protocol() {
        return this[Internal].url.protocol;
    }
    set protocol(value) {
        this[Internal].url.protocol = value;
    }
    get href() {
        const pathname = this.formatPathname();
        const search = this.formatSearch();
        return `${this.protocol}//${this.host}${pathname}${search}${this.hash}`;
    }
    set href(url) {
        this[Internal].url = parseURL(url);
        this.analyze();
    }
    get origin() {
        return this[Internal].url.origin;
    }
    get pathname() {
        return this[Internal].url.pathname;
    }
    set pathname(value) {
        this[Internal].url.pathname = value;
    }
    get hash() {
        return this[Internal].url.hash;
    }
    set hash(value) {
        this[Internal].url.hash = value;
    }
    get search() {
        return this[Internal].url.search;
    }
    set search(value) {
        this[Internal].url.search = value;
    }
    get password() {
        return this[Internal].url.password;
    }
    set password(value) {
        this[Internal].url.password = value;
    }
    get username() {
        return this[Internal].url.username;
    }
    set username(value) {
        this[Internal].url.username = value;
    }
    get basePath() {
        return this[Internal].basePath;
    }
    set basePath(value) {
        this[Internal].basePath = value.startsWith("/") ? value : `/${value}`;
    }
    toString() {
        return this.href;
    }
    toJSON() {
        return this.href;
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            href: this.href,
            origin: this.origin,
            protocol: this.protocol,
            username: this.username,
            password: this.password,
            host: this.host,
            hostname: this.hostname,
            port: this.port,
            pathname: this.pathname,
            search: this.search,
            searchParams: this.searchParams,
            hash: this.hash
        };
    }
    clone() {
        return new NextURL(String(this), this[Internal].options);
    }
} //# sourceMappingURL=next-url.js.map

// EXTERNAL MODULE: ./node_modules/next/dist/compiled/@edge-runtime/cookies/index.js
var _edge_runtime_cookies = __webpack_require__(929);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/cookies.js
 //# sourceMappingURL=cookies.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/request.js




const INTERNALS = Symbol("internal request");
class NextRequest extends Request {
    constructor(input, init = {}){
        const url = typeof input !== "string" && "url" in input ? input.url : String(input);
        validateURL(url);
        if (input instanceof Request) super(input, init);
        else super(url, init);
        const nextUrl = new NextURL(url, {
            headers: toNodeOutgoingHttpHeaders(this.headers),
            nextConfig: init.nextConfig
        });
        this[INTERNALS] = {
            cookies: new _edge_runtime_cookies.RequestCookies(this.headers),
            geo: init.geo || {},
            ip: init.ip,
            nextUrl,
            url:  false ? 0 : nextUrl.toString()
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            geo: this.geo,
            ip: this.ip,
            nextUrl: this.nextUrl,
            url: this.url,
            // rest of props come from Request
            bodyUsed: this.bodyUsed,
            cache: this.cache,
            credentials: this.credentials,
            destination: this.destination,
            headers: Object.fromEntries(this.headers),
            integrity: this.integrity,
            keepalive: this.keepalive,
            method: this.method,
            mode: this.mode,
            redirect: this.redirect,
            referrer: this.referrer,
            referrerPolicy: this.referrerPolicy,
            signal: this.signal
        };
    }
    get cookies() {
        return this[INTERNALS].cookies;
    }
    get geo() {
        return this[INTERNALS].geo;
    }
    get ip() {
        return this[INTERNALS].ip;
    }
    get nextUrl() {
        return this[INTERNALS].nextUrl;
    }
    /**
   * @deprecated
   * `page` has been deprecated in favour of `URLPattern`.
   * Read more: https://nextjs.org/docs/messages/middleware-request-page
   */ get page() {
        throw new RemovedPageError();
    }
    /**
   * @deprecated
   * `ua` has been removed in favour of \`userAgent\` function.
   * Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
   */ get ua() {
        throw new RemovedUAError();
    }
    get url() {
        return this[INTERNALS].url;
    }
} //# sourceMappingURL=request.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/response.js



const response_INTERNALS = Symbol("internal response");
const REDIRECTS = new Set([
    301,
    302,
    303,
    307,
    308
]);
function handleMiddlewareField(init, headers) {
    var _init_request;
    if (init == null ? void 0 : (_init_request = init.request) == null ? void 0 : _init_request.headers) {
        if (!(init.request.headers instanceof Headers)) {
            throw new Error("request.headers must be an instance of Headers");
        }
        const keys = [];
        for (const [key, value] of init.request.headers){
            headers.set("x-middleware-request-" + key, value);
            keys.push(key);
        }
        headers.set("x-middleware-override-headers", keys.join(","));
    }
}
class NextResponse extends Response {
    constructor(body, init = {}){
        super(body, init);
        this[response_INTERNALS] = {
            cookies: new _edge_runtime_cookies.ResponseCookies(this.headers),
            url: init.url ? new NextURL(init.url, {
                headers: toNodeOutgoingHttpHeaders(this.headers),
                nextConfig: init.nextConfig
            }) : undefined
        };
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return {
            cookies: this.cookies,
            url: this.url,
            // rest of props come from Response
            body: this.body,
            bodyUsed: this.bodyUsed,
            headers: Object.fromEntries(this.headers),
            ok: this.ok,
            redirected: this.redirected,
            status: this.status,
            statusText: this.statusText,
            type: this.type
        };
    }
    get cookies() {
        return this[response_INTERNALS].cookies;
    }
    static json(body, init) {
        const response = Response.json(body, init);
        return new NextResponse(response.body, response);
    }
    static redirect(url, init) {
        const status = typeof init === "number" ? init : (init == null ? void 0 : init.status) ?? 307;
        if (!REDIRECTS.has(status)) {
            throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        const initObj = typeof init === "object" ? init : {};
        const headers = new Headers(initObj == null ? void 0 : initObj.headers);
        headers.set("Location", validateURL(url));
        return new NextResponse(null, {
            ...initObj,
            headers,
            status
        });
    }
    static rewrite(destination, init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-rewrite", validateURL(destination));
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
    static next(init) {
        const headers = new Headers(init == null ? void 0 : init.headers);
        headers.set("x-middleware-next", "1");
        handleMiddlewareField(init, headers);
        return new NextResponse(null, {
            ...init,
            headers
        });
    }
} //# sourceMappingURL=response.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/relativize-url.js
/**
 * Given a URL as a string and a base URL it will make the URL relative
 * if the parsed protocol and host is the same as the one in the base
 * URL. Otherwise it returns the same URL string.
 */ function relativizeURL(url, base) {
    const baseURL = typeof base === "string" ? new URL(base) : base;
    const relative = new URL(url, base);
    const origin = baseURL.protocol + "//" + baseURL.host;
    return relative.protocol + "//" + relative.host === origin ? relative.toString().replace(origin, "") : relative.toString();
} //# sourceMappingURL=relativize-url.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/app-router-headers.js
const RSC = "RSC";
const ACTION = "Next-Action";
const NEXT_ROUTER_STATE_TREE = "Next-Router-State-Tree";
const NEXT_ROUTER_PREFETCH = "Next-Router-Prefetch";
const NEXT_URL = "Next-Url";
const RSC_CONTENT_TYPE_HEADER = "text/x-component";
const RSC_VARY_HEADER = RSC + ", " + NEXT_ROUTER_STATE_TREE + ", " + NEXT_ROUTER_PREFETCH + ", " + NEXT_URL;
const FLIGHT_PARAMETERS = [
    [
        RSC
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH
    ]
];
const NEXT_RSC_UNION_QUERY = "_rsc"; //# sourceMappingURL=app-router-headers.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/internal-utils.js

const INTERNAL_QUERY_NAMES = [
    "__nextFallback",
    "__nextLocale",
    "__nextInferredLocaleFromDefault",
    "__nextDefaultLocale",
    "__nextIsNotFound",
    NEXT_RSC_UNION_QUERY
];
const EDGE_EXTENDED_INTERNAL_QUERY_NAMES = [
    "__nextDataReq"
];
function stripInternalQueries(query) {
    for (const name of INTERNAL_QUERY_NAMES){
        delete query[name];
    }
}
function stripInternalSearchParams(url, isEdge) {
    const isStringUrl = typeof url === "string";
    const instance = isStringUrl ? new URL(url) : url;
    for (const name of INTERNAL_QUERY_NAMES){
        instance.searchParams.delete(name);
    }
    if (isEdge) {
        for (const name of EDGE_EXTENDED_INTERNAL_QUERY_NAMES){
            instance.searchParams.delete(name);
        }
    }
    return isStringUrl ? instance.toString() : instance;
}
/**
 * Headers that are set by the Next.js server and should be stripped from the
 * request headers going to the user's application.
 */ const INTERNAL_HEADERS = (/* unused pure expression or super */ null && ([
    "x-invoke-path",
    "x-invoke-status",
    "x-invoke-error",
    "x-invoke-query",
    "x-invoke-output",
    "x-middleware-invoke"
]));
/**
 * Strip internal headers from the request headers.
 *
 * @param headers the headers to strip of internal headers
 */ function stripInternalHeaders(headers) {
    for (const key of INTERNAL_HEADERS){
        delete headers[key];
    }
} //# sourceMappingURL=internal-utils.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/shared/lib/router/utils/app-paths.js


/**
 * Normalizes an app route so it represents the actual request path. Essentially
 * performing the following transformations:
 *
 * - `/(dashboard)/user/[id]/page` to `/user/[id]`
 * - `/(dashboard)/account/page` to `/account`
 * - `/user/[id]/page` to `/user/[id]`
 * - `/account/page` to `/account`
 * - `/page` to `/`
 * - `/(dashboard)/user/[id]/route` to `/user/[id]`
 * - `/(dashboard)/account/route` to `/account`
 * - `/user/[id]/route` to `/user/[id]`
 * - `/account/route` to `/account`
 * - `/route` to `/`
 * - `/` to `/`
 *
 * @param route the app route to normalize
 * @returns the normalized pathname
 */ function normalizeAppPath(route) {
    return ensureLeadingSlash(route.split("/").reduce((pathname, segment, index, segments)=>{
        // Empty segments are ignored.
        if (!segment) {
            return pathname;
        }
        // Groups are ignored.
        if (isGroupSegment(segment)) {
            return pathname;
        }
        // Parallel segments are ignored.
        if (segment[0] === "@") {
            return pathname;
        }
        // The last segment (if it's a leaf) should be ignored.
        if ((segment === "page" || segment === "route") && index === segments.length - 1) {
            return pathname;
        }
        return pathname + "/" + segment;
    }, ""));
}
/**
 * Strips the `.rsc` extension if it's in the pathname.
 * Since this function is used on full urls it checks `?` for searchParams handling.
 */ function normalizeRscPath(pathname, enabled) {
    return enabled ? pathname.replace(/\.rsc($|\?)/, "$1") : pathname;
} //# sourceMappingURL=app-paths.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/lib/constants.js
const NEXT_QUERY_PARAM_PREFIX = "nxtP";
const PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
const NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
const NEXT_CACHE_SOFT_TAGS_HEADER = "x-next-cache-soft-tags";
const NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
const NEXT_CACHE_TAG_MAX_LENGTH = 256;
const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
const NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
// in seconds
const CACHE_ONE_YEAR = 31536000;
// Patterns to detect middleware files
const MIDDLEWARE_FILENAME = "middleware";
const MIDDLEWARE_LOCATION_REGEXP = (/* unused pure expression or super */ null && (`(?:src/)?${MIDDLEWARE_FILENAME}`));
// Pattern to detect instrumentation hooks file
const INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
// Because on Windows absolute paths in the generated code can break because of numbers, eg 1 in the path,
// we have to use a private alias
const PAGES_DIR_ALIAS = "private-next-pages";
const DOT_NEXT_ALIAS = "private-dot-next";
const ROOT_DIR_ALIAS = "private-next-root-dir";
const APP_DIR_ALIAS = "private-next-app-dir";
const RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
const RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
const RSC_ACTION_PROXY_ALIAS = "private-next-rsc-action-proxy";
const RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
const PUBLIC_DIR_MIDDLEWARE_CONFLICT = (/* unused pure expression or super */ null && (`You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`));
const SSG_GET_INITIAL_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`));
const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`));
const SERVER_PROPS_SSG_CONFLICT = (/* unused pure expression or super */ null && (`You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`));
const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = (/* unused pure expression or super */ null && (`can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`));
const SERVER_PROPS_EXPORT_ERROR = (/* unused pure expression or super */ null && (`pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`));
const GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
const GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
const UNSTABLE_REVALIDATE_RENAME_ERROR = (/* unused pure expression or super */ null && ("The `unstable_revalidate` property is available for general use.\n" + "Please use `revalidate` instead."));
const GSSP_COMPONENT_MEMBER_ERROR = (/* unused pure expression or super */ null && (`can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`));
const NON_STANDARD_NODE_ENV = (/* unused pure expression or super */ null && (`You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`));
const SSG_FALLBACK_EXPORT_ERROR = (/* unused pure expression or super */ null && (`Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`));
const ESLINT_DEFAULT_DIRS = (/* unused pure expression or super */ null && ([
    "app",
    "pages",
    "components",
    "lib",
    "src"
]));
const ESLINT_PROMPT_VALUES = [
    {
        title: "Strict",
        recommended: true,
        config: {
            extends: "next/core-web-vitals"
        }
    },
    {
        title: "Base",
        config: {
            extends: "next"
        }
    },
    {
        title: "Cancel",
        config: null
    }
];
const SERVER_RUNTIME = {
    edge: "edge",
    experimentalEdge: "experimental-edge",
    nodejs: "nodejs"
};
/**
 * The names of the webpack layers. These layers are the primitives for the
 * webpack chunks.
 */ const WEBPACK_LAYERS_NAMES = {
    /**
   * The layer for the shared code between the client and server bundles.
   */ shared: "shared",
    /**
   * React Server Components layer (rsc).
   */ reactServerComponents: "rsc",
    /**
   * Server Side Rendering layer for app (ssr).
   */ serverSideRendering: "ssr",
    /**
   * The browser client bundle layer for actions.
   */ actionBrowser: "action-browser",
    /**
   * The layer for the API routes.
   */ api: "api",
    /**
   * The layer for the middleware code.
   */ middleware: "middleware",
    /**
   * The layer for assets on the edge.
   */ edgeAsset: "edge-asset",
    /**
   * The browser client bundle layer for App directory.
   */ appPagesBrowser: "app-pages-browser",
    /**
   * The server bundle layer for metadata routes.
   */ appMetadataRoute: "app-metadata-route",
    /**
   * The layer for the server bundle for App Route handlers.
   */ appRouteHandler: "app-route-handler"
};
const WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
        server: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler
        ],
        nonClientServerTarget: [
            // plus middleware and pages api
            WEBPACK_LAYERS_NAMES.middleware,
            WEBPACK_LAYERS_NAMES.api
        ],
        app: [
            WEBPACK_LAYERS_NAMES.reactServerComponents,
            WEBPACK_LAYERS_NAMES.actionBrowser,
            WEBPACK_LAYERS_NAMES.appMetadataRoute,
            WEBPACK_LAYERS_NAMES.appRouteHandler,
            WEBPACK_LAYERS_NAMES.serverSideRendering,
            WEBPACK_LAYERS_NAMES.appPagesBrowser
        ]
    }
};
const WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: "__next_edge_ssr_entry__",
    metadata: "__next_metadata__",
    metadataRoute: "__next_metadata_route__",
    metadataImageMeta: "__next_metadata_image_meta__"
};
 //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/reflect.js
class ReflectAdapter {
    static get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === "function") {
            return value.bind(target);
        }
        return value;
    }
    static set(target, prop, value, receiver) {
        return Reflect.set(target, prop, value, receiver);
    }
    static has(target, prop) {
        return Reflect.has(target, prop);
    }
    static deleteProperty(target, prop) {
        return Reflect.deleteProperty(target, prop);
    }
} //# sourceMappingURL=reflect.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/headers.js

/**
 * @internal
 */ class ReadonlyHeadersError extends Error {
    constructor(){
        super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
    }
    static callable() {
        throw new ReadonlyHeadersError();
    }
}
class HeadersAdapter extends Headers {
    constructor(headers){
        // We've already overridden the methods that would be called, so we're just
        // calling the super constructor to ensure that the instanceof check works.
        super();
        this.headers = new Proxy(headers, {
            get (target, prop, receiver) {
                // Because this is just an object, we expect that all "get" operations
                // are for properties. If it's a "get" for a symbol, we'll just return
                // the symbol.
                if (typeof prop === "symbol") {
                    return ReflectAdapter.get(target, prop, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return undefined.
                if (typeof original === "undefined") return;
                // If the original casing exists, return the value.
                return ReflectAdapter.get(target, original, receiver);
            },
            set (target, prop, value, receiver) {
                if (typeof prop === "symbol") {
                    return ReflectAdapter.set(target, prop, value, receiver);
                }
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, use the prop as the key.
                return ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has (target, prop) {
                if (typeof prop === "symbol") return ReflectAdapter.has(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return false.
                if (typeof original === "undefined") return false;
                // If the original casing exists, return true.
                return ReflectAdapter.has(target, original);
            },
            deleteProperty (target, prop) {
                if (typeof prop === "symbol") return ReflectAdapter.deleteProperty(target, prop);
                const lowercased = prop.toLowerCase();
                // Let's find the original casing of the key. This assumes that there is
                // no mixed case keys (e.g. "Content-Type" and "content-type") in the
                // headers object.
                const original = Object.keys(headers).find((o)=>o.toLowerCase() === lowercased);
                // If the original casing doesn't exist, return true.
                if (typeof original === "undefined") return true;
                // If the original casing exists, delete the property.
                return ReflectAdapter.deleteProperty(target, original);
            }
        });
    }
    /**
   * Seals a Headers instance to prevent modification by throwing an error when
   * any mutating method is called.
   */ static seal(headers) {
        return new Proxy(headers, {
            get (target, prop, receiver) {
                switch(prop){
                    case "append":
                    case "delete":
                    case "set":
                        return ReadonlyHeadersError.callable;
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
    /**
   * Merges a header value into a string. This stores multiple values as an
   * array, so we need to merge them into a string.
   *
   * @param value a header value
   * @returns a merged header value (a string)
   */ merge(value) {
        if (Array.isArray(value)) return value.join(", ");
        return value;
    }
    /**
   * Creates a Headers instance from a plain object or a Headers instance.
   *
   * @param headers a plain object or a Headers instance
   * @returns a headers instance
   */ static from(headers) {
        if (headers instanceof Headers) return headers;
        return new HeadersAdapter(headers);
    }
    append(name, value) {
        const existing = this.headers[name];
        if (typeof existing === "string") {
            this.headers[name] = [
                existing,
                value
            ];
        } else if (Array.isArray(existing)) {
            existing.push(value);
        } else {
            this.headers[name] = value;
        }
    }
    delete(name) {
        delete this.headers[name];
    }
    get(name) {
        const value = this.headers[name];
        if (typeof value !== "undefined") return this.merge(value);
        return null;
    }
    has(name) {
        return typeof this.headers[name] !== "undefined";
    }
    set(name, value) {
        this.headers[name] = value;
    }
    forEach(callbackfn, thisArg) {
        for (const [name, value] of this.entries()){
            callbackfn.call(thisArg, value, name, this);
        }
    }
    *entries() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(name);
            yield [
                name,
                value
            ];
        }
    }
    *keys() {
        for (const key of Object.keys(this.headers)){
            const name = key.toLowerCase();
            yield name;
        }
    }
    *values() {
        for (const key of Object.keys(this.headers)){
            // We assert here that this is a string because we got it from the
            // Object.keys() call above.
            const value = this.get(key);
            yield value;
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
} //# sourceMappingURL=headers.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/spec-extension/adapters/request-cookies.js


/**
 * @internal
 */ class ReadonlyRequestCookiesError extends Error {
    constructor(){
        super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options");
    }
    static callable() {
        throw new ReadonlyRequestCookiesError();
    }
}
class RequestCookiesAdapter {
    static seal(cookies) {
        return new Proxy(cookies, {
            get (target, prop, receiver) {
                switch(prop){
                    case "clear":
                    case "delete":
                    case "set":
                        return ReadonlyRequestCookiesError.callable;
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
}
const SYMBOL_MODIFY_COOKIE_VALUES = Symbol.for("next.mutated.cookies");
function getModifiedCookieValues(cookies) {
    const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
    if (!modified || !Array.isArray(modified) || modified.length === 0) {
        return [];
    }
    return modified;
}
function appendMutableCookies(headers, mutableCookies) {
    const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
    if (modifiedCookieValues.length === 0) {
        return false;
    }
    // Return a new response that extends the response with
    // the modified cookies as fallbacks. `res` cookies
    // will still take precedence.
    const resCookies = new ResponseCookies(headers);
    const returnedCookies = resCookies.getAll();
    // Set the modified cookies as fallbacks.
    for (const cookie of modifiedCookieValues){
        resCookies.set(cookie);
    }
    // Set the original cookies as the final values.
    for (const cookie of returnedCookies){
        resCookies.set(cookie);
    }
    return true;
}
class MutableRequestCookiesAdapter {
    static wrap(cookies, onUpdateCookies) {
        const responseCookes = new _edge_runtime_cookies.ResponseCookies(new Headers());
        for (const cookie of cookies.getAll()){
            responseCookes.set(cookie);
        }
        let modifiedValues = [];
        const modifiedCookies = new Set();
        const updateResponseCookies = ()=>{
            var _fetch___nextGetStaticStore;
            // TODO-APP: change method of getting staticGenerationAsyncStore
            const staticGenerationAsyncStore = fetch.__nextGetStaticStore == null ? void 0 : (_fetch___nextGetStaticStore = fetch.__nextGetStaticStore.call(fetch)) == null ? void 0 : _fetch___nextGetStaticStore.getStore();
            if (staticGenerationAsyncStore) {
                staticGenerationAsyncStore.pathWasRevalidated = true;
            }
            const allCookies = responseCookes.getAll();
            modifiedValues = allCookies.filter((c)=>modifiedCookies.has(c.name));
            if (onUpdateCookies) {
                const serializedCookies = [];
                for (const cookie of modifiedValues){
                    const tempCookies = new _edge_runtime_cookies.ResponseCookies(new Headers());
                    tempCookies.set(cookie);
                    serializedCookies.push(tempCookies.toString());
                }
                onUpdateCookies(serializedCookies);
            }
        };
        return new Proxy(responseCookes, {
            get (target, prop, receiver) {
                switch(prop){
                    // A special symbol to get the modified cookie values
                    case SYMBOL_MODIFY_COOKIE_VALUES:
                        return modifiedValues;
                    // TODO: Throw error if trying to set a cookie after the response
                    // headers have been set.
                    case "delete":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                target.delete(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    case "set":
                        return function(...args) {
                            modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                            try {
                                return target.set(...args);
                            } finally{
                                updateResponseCookies();
                            }
                        };
                    default:
                        return ReflectAdapter.get(target, prop, receiver);
                }
            }
        });
    }
} //# sourceMappingURL=request-cookies.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/api-utils/index.js


/**
 *
 * @param res response object
 * @param statusCode `HTTP` status code of response
 */ function sendStatusCode(res, statusCode) {
    res.statusCode = statusCode;
    return res;
}
/**
 *
 * @param res response object
 * @param [statusOrUrl] `HTTP` status code of redirect
 * @param url URL of redirect
 */ function redirect(res, statusOrUrl, url) {
    if (typeof statusOrUrl === "string") {
        url = statusOrUrl;
        statusOrUrl = 307;
    }
    if (typeof statusOrUrl !== "number" || typeof url !== "string") {
        throw new Error(`Invalid redirect arguments. Please use a single argument URL, e.g. res.redirect('/destination') or use a status code and URL, e.g. res.redirect(307, '/destination').`);
    }
    res.writeHead(statusOrUrl, {
        Location: url
    });
    res.write(url);
    res.end();
    return res;
}
function checkIsOnDemandRevalidate(req, previewProps) {
    const headers = HeadersAdapter.from(req.headers);
    const previewModeId = headers.get(PRERENDER_REVALIDATE_HEADER);
    const isOnDemandRevalidate = previewModeId === previewProps.previewModeId;
    const revalidateOnlyGenerated = headers.has(PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER);
    return {
        isOnDemandRevalidate,
        revalidateOnlyGenerated
    };
}
const COOKIE_NAME_PRERENDER_BYPASS = `__prerender_bypass`;
const COOKIE_NAME_PRERENDER_DATA = `__next_preview_data`;
const RESPONSE_LIMIT_DEFAULT = (/* unused pure expression or super */ null && (4 * 1024 * 1024));
const SYMBOL_PREVIEW_DATA = Symbol(COOKIE_NAME_PRERENDER_DATA);
const SYMBOL_CLEARED_COOKIES = Symbol(COOKIE_NAME_PRERENDER_BYPASS);
function clearPreviewData(res, options = {}) {
    if (SYMBOL_CLEARED_COOKIES in res) {
        return res;
    }
    const { serialize } = __webpack_require__(104);
    const previous = res.getHeader("Set-Cookie");
    res.setHeader(`Set-Cookie`, [
        ...typeof previous === "string" ? [
            previous
        ] : Array.isArray(previous) ? previous : [],
        serialize(COOKIE_NAME_PRERENDER_BYPASS, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        }),
        serialize(COOKIE_NAME_PRERENDER_DATA, "", {
            // To delete a cookie, set `expires` to a date in the past:
            // https://tools.ietf.org/html/rfc6265#section-4.1.1
            // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
            expires: new Date(0),
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            ...options.path !== undefined ? {
                path: options.path
            } : undefined
        })
    ]);
    Object.defineProperty(res, SYMBOL_CLEARED_COOKIES, {
        value: true,
        enumerable: false
    });
    return res;
}
/**
 * Custom error class
 */ class ApiError extends (/* unused pure expression or super */ null && (Error)) {
    constructor(statusCode, message){
        super(message);
        this.statusCode = statusCode;
    }
}
/**
 * Sends error in `response`
 * @param res response object
 * @param statusCode of response
 * @param message of response
 */ function sendError(res, statusCode, message) {
    res.statusCode = statusCode;
    res.statusMessage = message;
    res.end(message);
}
/**
 * Execute getter function only if its needed
 * @param LazyProps `req` and `params` for lazyProp
 * @param prop name of property
 * @param getter function to get data
 */ function setLazyProp({ req }, prop, getter) {
    const opts = {
        configurable: true,
        enumerable: true
    };
    const optsReset = {
        ...opts,
        writable: true
    };
    Object.defineProperty(req, prop, {
        ...opts,
        get: ()=>{
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
            return value;
        },
        set: (value)=>{
            Object.defineProperty(req, prop, {
                ...optsReset,
                value
            });
        }
    });
} //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/async-storage/draft-mode-provider.js

class DraftModeProvider {
    constructor(previewProps, req, cookies, mutableCookies){
        var _cookies_get;
        // The logic for draftMode() is very similar to tryGetPreviewData()
        // but Draft Mode does not have any data associated with it.
        const isOnDemandRevalidate = previewProps && checkIsOnDemandRevalidate(req, previewProps).isOnDemandRevalidate;
        const cookieValue = (_cookies_get = cookies.get(COOKIE_NAME_PRERENDER_BYPASS)) == null ? void 0 : _cookies_get.value;
        this.isEnabled = Boolean(!isOnDemandRevalidate && cookieValue && previewProps && cookieValue === previewProps.previewModeId);
        this._previewModeId = previewProps == null ? void 0 : previewProps.previewModeId;
        this._mutableCookies = mutableCookies;
    }
    enable() {
        if (!this._previewModeId) {
            throw new Error("Invariant: previewProps missing previewModeId this should never happen");
        }
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: this._previewModeId,
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/"
        });
    }
    disable() {
        // To delete a cookie, set `expires` to a date in the past:
        // https://tools.ietf.org/html/rfc6265#section-4.1.1
        // `Max-Age: 0` is not valid, thus ignored, and the cookie is persisted.
        this._mutableCookies.set({
            name: COOKIE_NAME_PRERENDER_BYPASS,
            value: "",
            httpOnly: true,
            sameSite:  true ? "none" : 0,
            secure: "production" !== "development",
            path: "/",
            expires: new Date(0)
        });
    }
} //# sourceMappingURL=draft-mode-provider.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/async-storage/request-async-storage-wrapper.js





function getHeaders(headers) {
    const cleaned = HeadersAdapter.from(headers);
    for (const param of FLIGHT_PARAMETERS){
        cleaned.delete(param.toString().toLowerCase());
    }
    return HeadersAdapter.seal(cleaned);
}
function getCookies(headers) {
    const cookies = new _edge_runtime_cookies.RequestCookies(HeadersAdapter.from(headers));
    return RequestCookiesAdapter.seal(cookies);
}
function getMutableCookies(headers, onUpdateCookies) {
    const cookies = new _edge_runtime_cookies.RequestCookies(HeadersAdapter.from(headers));
    return MutableRequestCookiesAdapter.wrap(cookies, onUpdateCookies);
}
const RequestAsyncStorageWrapper = {
    /**
   * Wrap the callback with the given store so it can access the underlying
   * store using hooks.
   *
   * @param storage underlying storage object returned by the module
   * @param context context to seed the store
   * @param callback function to call within the scope of the context
   * @returns the result returned by the callback
   */ wrap (storage, { req, res, renderOpts }, callback) {
        let previewProps = undefined;
        if (renderOpts && "previewProps" in renderOpts) {
            // TODO: investigate why previewProps isn't on RenderOpts
            previewProps = renderOpts.previewProps;
        }
        function defaultOnUpdateCookies(cookies) {
            if (res) {
                res.setHeader("Set-Cookie", cookies);
            }
        }
        const cache = {};
        const store = {
            get headers () {
                if (!cache.headers) {
                    // Seal the headers object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.headers = getHeaders(req.headers);
                }
                return cache.headers;
            },
            get cookies () {
                if (!cache.cookies) {
                    // Seal the cookies object that'll freeze out any methods that could
                    // mutate the underlying data.
                    cache.cookies = getCookies(req.headers);
                }
                return cache.cookies;
            },
            get mutableCookies () {
                if (!cache.mutableCookies) {
                    cache.mutableCookies = getMutableCookies(req.headers, (renderOpts == null ? void 0 : renderOpts.onUpdateCookies) || (res ? defaultOnUpdateCookies : undefined));
                }
                return cache.mutableCookies;
            },
            get draftMode () {
                if (!cache.draftMode) {
                    cache.draftMode = new DraftModeProvider(previewProps, req, this.cookies, this.mutableCookies);
                }
                return cache.draftMode;
            }
        };
        return storage.run(store, callback, store);
    }
}; //# sourceMappingURL=request-async-storage-wrapper.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/async-local-storage.js
const sharedAsyncLocalStorageNotAvailableError = new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
class FakeAsyncLocalStorage {
    disable() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
        // This fake implementation of AsyncLocalStorage always returns `undefined`.
        return undefined;
    }
    run() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
        throw sharedAsyncLocalStorageNotAvailableError;
    }
}
const maybeGlobalAsyncLocalStorage = globalThis.AsyncLocalStorage;
function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
        return new maybeGlobalAsyncLocalStorage();
    }
    return new FakeAsyncLocalStorage();
} //# sourceMappingURL=async-local-storage.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/client/components/request-async-storage.external.js

const requestAsyncStorage = createAsyncLocalStorage(); //# sourceMappingURL=request-async-storage.external.js.map

;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/adapter.js















class NextRequestHint extends NextRequest {
    constructor(params){
        super(params.input, params.init);
        this.sourcePage = params.page;
    }
    get request() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    respondWith() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
    waitUntil() {
        throw new PageSignatureError({
            page: this.sourcePage
        });
    }
}
const adapter_FLIGHT_PARAMETERS = [
    [
        RSC
    ],
    [
        NEXT_ROUTER_STATE_TREE
    ],
    [
        NEXT_ROUTER_PREFETCH
    ]
];
async function adapter(params) {
    await ensureInstrumentationRegistered();
    // TODO-APP: use explicit marker for this
    const isEdgeRendering = typeof self.__BUILD_MANIFEST !== "undefined";
    const prerenderManifest = typeof self.__PRERENDER_MANIFEST === "string" ? JSON.parse(self.__PRERENDER_MANIFEST) : undefined;
    params.request.url = normalizeRscPath(params.request.url, true);
    const requestUrl = new NextURL(params.request.url, {
        headers: params.request.headers,
        nextConfig: params.request.nextConfig
    });
    // Iterator uses an index to keep track of the current iteration. Because of deleting and appending below we can't just use the iterator.
    // Instead we use the keys before iteration.
    const keys = [
        ...requestUrl.searchParams.keys()
    ];
    for (const key of keys){
        const value = requestUrl.searchParams.getAll(key);
        if (key !== NEXT_QUERY_PARAM_PREFIX && key.startsWith(NEXT_QUERY_PARAM_PREFIX)) {
            const normalizedKey = key.substring(NEXT_QUERY_PARAM_PREFIX.length);
            requestUrl.searchParams.delete(normalizedKey);
            for (const val of value){
                requestUrl.searchParams.append(normalizedKey, val);
            }
            requestUrl.searchParams.delete(key);
        }
    }
    // Ensure users only see page requests, never data requests.
    const buildId = requestUrl.buildId;
    requestUrl.buildId = "";
    const isDataReq = params.request.headers["x-nextjs-data"];
    if (isDataReq && requestUrl.pathname === "/index") {
        requestUrl.pathname = "/";
    }
    const requestHeaders = fromNodeOutgoingHttpHeaders(params.request.headers);
    const flightHeaders = new Map();
    // Parameters should only be stripped for middleware
    if (!isEdgeRendering) {
        for (const param of adapter_FLIGHT_PARAMETERS){
            const key = param.toString().toLowerCase();
            const value = requestHeaders.get(key);
            if (value) {
                flightHeaders.set(key, requestHeaders.get(key));
                requestHeaders.delete(key);
            }
        }
    }
    const normalizeUrl =  false ? 0 : requestUrl;
    const request = new NextRequestHint({
        page: params.page,
        // Strip internal query parameters off the request.
        input: stripInternalSearchParams(normalizeUrl, true).toString(),
        init: {
            body: params.request.body,
            geo: params.request.geo,
            headers: requestHeaders,
            ip: params.request.ip,
            method: params.request.method,
            nextConfig: params.request.nextConfig,
            signal: params.request.signal
        }
    });
    /**
   * This allows to identify the request as a data request. The user doesn't
   * need to know about this property neither use it. We add it for testing
   * purposes.
   */ if (isDataReq) {
        Object.defineProperty(request, "__isData", {
            enumerable: false,
            value: true
        });
    }
    if (!globalThis.__incrementalCache && params.IncrementalCache) {
        globalThis.__incrementalCache = new params.IncrementalCache({
            appDir: true,
            fetchCache: true,
            minimalMode: "production" !== "development",
            fetchCacheKeyPrefix: undefined,
            dev: "production" === "development",
            requestHeaders: params.request.headers,
            requestProtocol: "https",
            getPrerenderManifest: ()=>{
                return {
                    version: -1,
                    routes: {},
                    dynamicRoutes: {},
                    notFoundRoutes: [],
                    preview: {
                        previewModeId: "development-id"
                    }
                };
            }
        });
    }
    const event = new NextFetchEvent({
        request,
        page: params.page
    });
    let response;
    let cookiesFromResponse;
    // we only care to make async storage available for middleware
    const isMiddleware = params.page === "/middleware" || params.page === "/src/middleware";
    if (isMiddleware) {
        response = await RequestAsyncStorageWrapper.wrap(requestAsyncStorage, {
            req: request,
            renderOpts: {
                onUpdateCookies: (cookies)=>{
                    cookiesFromResponse = cookies;
                },
                // @ts-expect-error: TODO: investigate why previewProps isn't on RenderOpts
                previewProps: (prerenderManifest == null ? void 0 : prerenderManifest.preview) || {
                    previewModeId: "development-id",
                    previewModeEncryptionKey: "",
                    previewModeSigningKey: ""
                }
            }
        }, ()=>params.handler(request, event));
    } else {
        response = await params.handler(request, event);
    }
    // check if response is a Response object
    if (response && !(response instanceof Response)) {
        throw new TypeError("Expected an instance of Response to be returned");
    }
    if (response && cookiesFromResponse) {
        response.headers.set("set-cookie", cookiesFromResponse);
    }
    /**
   * For rewrites we must always include the locale in the final pathname
   * so we re-create the NextURL forcing it to include it when the it is
   * an internal rewrite. Also we make sure the outgoing rewrite URL is
   * a data URL if the request was a data request.
   */ const rewrite = response == null ? void 0 : response.headers.get("x-middleware-rewrite");
    if (response && rewrite) {
        const rewriteUrl = new NextURL(rewrite, {
            forceLocale: true,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        if (true) {
            if (rewriteUrl.host === request.nextUrl.host) {
                rewriteUrl.buildId = buildId || rewriteUrl.buildId;
                response.headers.set("x-middleware-rewrite", String(rewriteUrl));
            }
        }
        /**
     * When the request is a data request we must show if there was a rewrite
     * with an internal header so the client knows which component to load
     * from the data request.
     */ const relativizedRewrite = relativizeURL(String(rewriteUrl), String(requestUrl));
        if (isDataReq && // if the rewrite is external and external rewrite
        // resolving config is enabled don't add this header
        // so the upstream app can set it instead
        !(undefined && 0)) {
            response.headers.set("x-nextjs-rewrite", relativizedRewrite);
        }
    }
    /**
   * For redirects we will not include the locale in case when it is the
   * default and we must also make sure the outgoing URL is a data one if
   * the incoming request was a data request.
   */ const redirect = response == null ? void 0 : response.headers.get("Location");
    if (response && redirect && !isEdgeRendering) {
        const redirectURL = new NextURL(redirect, {
            forceLocale: false,
            headers: params.request.headers,
            nextConfig: params.request.nextConfig
        });
        /**
     * Responses created from redirects have immutable headers so we have
     * to clone the response to be able to modify it.
     */ response = new Response(response.body, response);
        if (true) {
            if (redirectURL.host === request.nextUrl.host) {
                redirectURL.buildId = buildId || redirectURL.buildId;
                response.headers.set("Location", String(redirectURL));
            }
        }
        /**
     * When the request is a data request we can't use the location header as
     * it may end up with CORS error. Instead we map to an internal header so
     * the client knows the destination.
     */ if (isDataReq) {
            response.headers.delete("Location");
            response.headers.set("x-nextjs-redirect", relativizeURL(String(redirectURL), String(requestUrl)));
        }
    }
    const finalResponse = response ? response : NextResponse.next();
    // Flight headers are not overridable / removable so they are applied at the end.
    const middlewareOverrideHeaders = finalResponse.headers.get("x-middleware-override-headers");
    const overwrittenHeaders = [];
    if (middlewareOverrideHeaders) {
        for (const [key, value] of flightHeaders){
            finalResponse.headers.set(`x-middleware-request-${key}`, value);
            overwrittenHeaders.push(key);
        }
        if (overwrittenHeaders.length > 0) {
            finalResponse.headers.set("x-middleware-override-headers", middlewareOverrideHeaders + "," + overwrittenHeaders.join(","));
        }
    }
    return {
        response: finalResponse,
        waitUntil: Promise.all(event[waitUntilSymbol])
    };
} //# sourceMappingURL=adapter.js.map

// EXTERNAL MODULE: ./node_modules/@supabase/auth-helpers-nextjs/dist/index.js
var dist = __webpack_require__(144);
;// CONCATENATED MODULE: ./node_modules/next/dist/esm/server/web/exports/next-response.js
// This file is for modularized imports for next/server to get fully-treeshaking.
 //# sourceMappingURL=next-response.js.map

;// CONCATENATED MODULE: ./middleware.ts


async function middleware(req) {
    const res = NextResponse.next();
    const supabase = (0,dist.createMiddlewareClient)({
        req,
        res
    });
    const { data: { session } } = await supabase.auth.getSession(); // destructure the data object to obtain the session object
    if (session === null) return NextResponse.redirect(new URL("/login", req.nextUrl));
    return res;
}
const config = {
    matcher: []
};

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-middleware-loader.js?absolutePagePath=private-next-root-dir%2Fmiddleware.ts&page=%2Fmiddleware&rootDir=C%3A%5CUsers%5CUSER%5CDesktop%5Cdevhunt&matchers=W10%3D&preferredRegion=&middlewareConfig=eyJtYXRjaGVycyI6W119!

        
        
        

        const mod = { ...middleware_namespaceObject }
        const handler = mod.middleware || mod.default

        if (typeof handler !== 'function') {
          throw new Error('The Middleware "pages/middleware" must export a `middleware` or a `default` function');
        }

        /* harmony default export */ function next_middleware_loaderabsolutePagePath_private_next_root_dir_2Fmiddleware_ts_page_2Fmiddleware_rootDir_C_3A_5CUsers_5CUSER_5CDesktop_5Cdevhunt_matchers_W10_3D_preferredRegion_middlewareConfig_eyJtYXRjaGVycyI6W119_(opts) {
          return adapter({
            ...opts,
            page: "/middleware",
            handler,
          })
        }
    

/***/ }),

/***/ 144:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    createBrowserSupabaseClient: ()=>createBrowserSupabaseClient,
    createClientComponentClient: ()=>createClientComponentClient,
    createMiddlewareClient: ()=>createMiddlewareClient,
    createMiddlewareSupabaseClient: ()=>createMiddlewareSupabaseClient,
    createPagesBrowserClient: ()=>createPagesBrowserClient,
    createPagesServerClient: ()=>createPagesServerClient,
    createRouteHandlerClient: ()=>createRouteHandlerClient,
    createServerActionClient: ()=>createServerActionClient,
    createServerComponentClient: ()=>createServerComponentClient,
    createServerSupabaseClient: ()=>createServerSupabaseClient
});
module.exports = __toCommonJS(src_exports);
// src/clientComponentClient.ts
var import_auth_helpers_shared = __webpack_require__(858);
var supabase;
function createClientComponentClient({ supabaseUrl = "https://saabvxfsdpnrfhchurch.supabase.co", supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYWJ2eGZzZHBucmZoY2h1cmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTEyNjUsImV4cCI6MjAxNjg4NzI2NX0.aiIds7qBmZlH1yb_X9b1CqqEU0Znto_R0Ur29xyVK90", options, cookieOptions, isSingleton = true } = {}) {
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");
    }
    const createNewClient = ()=>{
        var _a;
        return (0, import_auth_helpers_shared.createSupabaseClient)(supabaseUrl, supabaseKey, {
            ...options,
            global: {
                ...options == null ? void 0 : options.global,
                headers: {
                    ...(_a = options == null ? void 0 : options.global) == null ? void 0 : _a.headers,
                    "X-Client-Info": `${"@supabase/auth-helpers-nextjs"}@${"0.7.2"}`
                }
            },
            auth: {
                storageKey: cookieOptions == null ? void 0 : cookieOptions.name,
                storage: new import_auth_helpers_shared.BrowserCookieAuthStorageAdapter(cookieOptions)
            }
        });
    };
    if (isSingleton) {
        const _supabase = supabase ?? createNewClient();
        if (true) return _supabase;
        if (!supabase) supabase = _supabase;
        return supabase;
    }
    return createNewClient();
}
// src/pagesBrowserClient.ts
var createPagesBrowserClient = createClientComponentClient;
// src/pagesServerClient.ts
var import_auth_helpers_shared2 = __webpack_require__(858);
var import_set_cookie_parser = __webpack_require__(870);
var NextServerAuthStorageAdapter = class extends import_auth_helpers_shared2.CookieAuthStorageAdapter {
    constructor(context, cookieOptions){
        super(cookieOptions);
        this.context = context;
    }
    getCookie(name) {
        var _a;
        const setCookie = (0, import_set_cookie_parser.splitCookiesString)(((_a = this.context.res.getHeader("set-cookie")) == null ? void 0 : _a.toString()) ?? "").map((c)=>(0, import_auth_helpers_shared2.parseCookies)(c)[name]).find((c)=>!!c);
        const value = setCookie ?? this.context.req.cookies[name];
        return value;
    }
    setCookie(name, value) {
        this._setCookie(name, value);
    }
    deleteCookie(name) {
        this._setCookie(name, "", {
            maxAge: 0
        });
    }
    _setCookie(name, value, options) {
        var _a;
        const setCookies = (0, import_set_cookie_parser.splitCookiesString)(((_a = this.context.res.getHeader("set-cookie")) == null ? void 0 : _a.toString()) ?? "").filter((c)=>!(name in (0, import_auth_helpers_shared2.parseCookies)(c)));
        const cookieStr = (0, import_auth_helpers_shared2.serializeCookie)(name, value, {
            ...this.cookieOptions,
            ...options,
            httpOnly: false
        });
        this.context.res.setHeader("set-cookie", [
            ...setCookies,
            cookieStr
        ]);
    }
};
function createPagesServerClient(context, { supabaseUrl = "https://saabvxfsdpnrfhchurch.supabase.co", supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYWJ2eGZzZHBucmZoY2h1cmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTEyNjUsImV4cCI6MjAxNjg4NzI2NX0.aiIds7qBmZlH1yb_X9b1CqqEU0Znto_R0Ur29xyVK90", options, cookieOptions } = {}) {
    var _a;
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");
    }
    return (0, import_auth_helpers_shared2.createSupabaseClient)(supabaseUrl, supabaseKey, {
        ...options,
        global: {
            ...options == null ? void 0 : options.global,
            headers: {
                ...(_a = options == null ? void 0 : options.global) == null ? void 0 : _a.headers,
                "X-Client-Info": `${"@supabase/auth-helpers-nextjs"}@${"0.7.2"}`
            }
        },
        auth: {
            storageKey: cookieOptions == null ? void 0 : cookieOptions.name,
            storage: new NextServerAuthStorageAdapter(context, cookieOptions)
        }
    });
}
// src/middlewareClient.ts
var import_auth_helpers_shared3 = __webpack_require__(858);
var import_set_cookie_parser2 = __webpack_require__(870);
var NextMiddlewareAuthStorageAdapter = class extends import_auth_helpers_shared3.CookieAuthStorageAdapter {
    constructor(context, cookieOptions){
        super(cookieOptions);
        this.context = context;
    }
    getCookie(name) {
        var _a;
        const setCookie = (0, import_set_cookie_parser2.splitCookiesString)(((_a = this.context.res.headers.get("set-cookie")) == null ? void 0 : _a.toString()) ?? "").map((c)=>(0, import_auth_helpers_shared3.parseCookies)(c)[name]).find((c)=>!!c);
        if (setCookie) {
            return setCookie;
        }
        const cookies = (0, import_auth_helpers_shared3.parseCookies)(this.context.req.headers.get("cookie") ?? "");
        return cookies[name];
    }
    setCookie(name, value) {
        this._setCookie(name, value);
    }
    deleteCookie(name) {
        this._setCookie(name, "", {
            maxAge: 0
        });
    }
    _setCookie(name, value, options) {
        const newSessionStr = (0, import_auth_helpers_shared3.serializeCookie)(name, value, {
            ...this.cookieOptions,
            ...options,
            httpOnly: false
        });
        if (this.context.res.headers) {
            this.context.res.headers.append("set-cookie", newSessionStr);
            this.context.res.headers.append("cookie", newSessionStr);
        }
    }
};
function createMiddlewareClient(context, { supabaseUrl = "https://saabvxfsdpnrfhchurch.supabase.co", supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYWJ2eGZzZHBucmZoY2h1cmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTEyNjUsImV4cCI6MjAxNjg4NzI2NX0.aiIds7qBmZlH1yb_X9b1CqqEU0Znto_R0Ur29xyVK90", options, cookieOptions } = {}) {
    var _a;
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");
    }
    return (0, import_auth_helpers_shared3.createSupabaseClient)(supabaseUrl, supabaseKey, {
        ...options,
        global: {
            ...options == null ? void 0 : options.global,
            headers: {
                ...(_a = options == null ? void 0 : options.global) == null ? void 0 : _a.headers,
                "X-Client-Info": `${"@supabase/auth-helpers-nextjs"}@${"0.7.2"}`
            }
        },
        auth: {
            storageKey: cookieOptions == null ? void 0 : cookieOptions.name,
            storage: new NextMiddlewareAuthStorageAdapter(context, cookieOptions)
        }
    });
}
// src/serverComponentClient.ts
var import_auth_helpers_shared4 = __webpack_require__(858);
var NextServerComponentAuthStorageAdapter = class extends import_auth_helpers_shared4.CookieAuthStorageAdapter {
    constructor(context, cookieOptions){
        super(cookieOptions);
        this.context = context;
    }
    getCookie(name) {
        var _a;
        const nextCookies = this.context.cookies();
        return (_a = nextCookies.get(name)) == null ? void 0 : _a.value;
    }
    setCookie(name, value) {}
    deleteCookie(name) {}
};
function createServerComponentClient(context, { supabaseUrl = "https://saabvxfsdpnrfhchurch.supabase.co", supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYWJ2eGZzZHBucmZoY2h1cmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTEyNjUsImV4cCI6MjAxNjg4NzI2NX0.aiIds7qBmZlH1yb_X9b1CqqEU0Znto_R0Ur29xyVK90", options, cookieOptions } = {}) {
    var _a;
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");
    }
    return (0, import_auth_helpers_shared4.createSupabaseClient)(supabaseUrl, supabaseKey, {
        ...options,
        global: {
            ...options == null ? void 0 : options.global,
            headers: {
                ...(_a = options == null ? void 0 : options.global) == null ? void 0 : _a.headers,
                "X-Client-Info": `${"@supabase/auth-helpers-nextjs"}@${"0.7.2"}`
            }
        },
        auth: {
            storageKey: cookieOptions == null ? void 0 : cookieOptions.name,
            storage: new NextServerComponentAuthStorageAdapter(context, cookieOptions)
        }
    });
}
// src/routeHandlerClient.ts
var import_auth_helpers_shared5 = __webpack_require__(858);
var NextRouteHandlerAuthStorageAdapter = class extends import_auth_helpers_shared5.CookieAuthStorageAdapter {
    constructor(context, cookieOptions){
        super(cookieOptions);
        this.context = context;
    }
    getCookie(name) {
        var _a;
        const nextCookies = this.context.cookies();
        return (_a = nextCookies.get(name)) == null ? void 0 : _a.value;
    }
    setCookie(name, value) {
        const nextCookies = this.context.cookies();
        nextCookies.set(name, value);
    }
    deleteCookie(name) {
        const nextCookies = this.context.cookies();
        nextCookies.set(name, "", {
            maxAge: 0
        });
    }
};
function createRouteHandlerClient(context, { supabaseUrl = "https://saabvxfsdpnrfhchurch.supabase.co", supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYWJ2eGZzZHBucmZoY2h1cmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTEyNjUsImV4cCI6MjAxNjg4NzI2NX0.aiIds7qBmZlH1yb_X9b1CqqEU0Znto_R0Ur29xyVK90", options, cookieOptions } = {}) {
    var _a;
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("either NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables or supabaseUrl and supabaseKey are required!");
    }
    return (0, import_auth_helpers_shared5.createSupabaseClient)(supabaseUrl, supabaseKey, {
        ...options,
        global: {
            ...options == null ? void 0 : options.global,
            headers: {
                ...(_a = options == null ? void 0 : options.global) == null ? void 0 : _a.headers,
                "X-Client-Info": `${"@supabase/auth-helpers-nextjs"}@${"0.7.2"}`
            }
        },
        auth: {
            storageKey: cookieOptions == null ? void 0 : cookieOptions.name,
            storage: new NextRouteHandlerAuthStorageAdapter(context, cookieOptions)
        }
    });
}
// src/serverActionClient.ts
var createServerActionClient = createRouteHandlerClient;
// src/deprecated.ts
function createBrowserSupabaseClient({ supabaseUrl = "https://saabvxfsdpnrfhchurch.supabase.co", supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYWJ2eGZzZHBucmZoY2h1cmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTEyNjUsImV4cCI6MjAxNjg4NzI2NX0.aiIds7qBmZlH1yb_X9b1CqqEU0Znto_R0Ur29xyVK90", options, cookieOptions } = {}) {
    console.warn("Please utilize the `createPagesBrowserClient` function instead of the deprecated `createBrowserSupabaseClient` function. Learn more: https://supabase.com/docs/guides/auth/auth-helpers/nextjs-pages");
    return createPagesBrowserClient({
        supabaseUrl,
        supabaseKey,
        options,
        cookieOptions
    });
}
function createServerSupabaseClient(context, { supabaseUrl = "https://saabvxfsdpnrfhchurch.supabase.co", supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYWJ2eGZzZHBucmZoY2h1cmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTEyNjUsImV4cCI6MjAxNjg4NzI2NX0.aiIds7qBmZlH1yb_X9b1CqqEU0Znto_R0Ur29xyVK90", options, cookieOptions } = {}) {
    console.warn("Please utilize the `createPagesServerClient` function instead of the deprecated `createServerSupabaseClient` function. Learn more: https://supabase.com/docs/guides/auth/auth-helpers/nextjs-pages");
    return createPagesServerClient(context, {
        supabaseUrl,
        supabaseKey,
        options,
        cookieOptions
    });
}
function createMiddlewareSupabaseClient(context, { supabaseUrl = "https://saabvxfsdpnrfhchurch.supabase.co", supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhYWJ2eGZzZHBucmZoY2h1cmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTEyNjUsImV4cCI6MjAxNjg4NzI2NX0.aiIds7qBmZlH1yb_X9b1CqqEU0Znto_R0Ur29xyVK90", options, cookieOptions } = {}) {
    console.warn("Please utilize the `createMiddlewareClient` function instead of the deprecated `createMiddlewareSupabaseClient` function. Learn more: https://supabase.com/docs/guides/auth/auth-helpers/nextjs#middleware");
    return createMiddlewareClient(context, {
        supabaseUrl,
        supabaseKey,
        options,
        cookieOptions
    });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 859:
/***/ ((module, exports) => {

"use strict";

var global = typeof self !== "undefined" ? self : void 0;
var __self__ = function() {
    function F() {
        this.fetch = false;
        this.DOMException = global.DOMException;
    }
    F.prototype = global;
    return new F();
}();
(function(self1) {
    var irrelevant = function(exports1) {
        var support = {
            searchParams: "URLSearchParams" in self1,
            iterable: "Symbol" in self1 && "iterator" in Symbol,
            blob: "FileReader" in self1 && "Blob" in self1 && function() {
                try {
                    new Blob();
                    return true;
                } catch (e) {
                    return false;
                }
            }(),
            formData: "FormData" in self1,
            arrayBuffer: "ArrayBuffer" in self1
        };
        function isDataView(obj) {
            return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
            var viewClasses = [
                "[object Int8Array]",
                "[object Uint8Array]",
                "[object Uint8ClampedArray]",
                "[object Int16Array]",
                "[object Uint16Array]",
                "[object Int32Array]",
                "[object Uint32Array]",
                "[object Float32Array]",
                "[object Float64Array]"
            ];
            var isArrayBufferView = ArrayBuffer.isView || function(obj) {
                return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
            };
        }
        function normalizeName(name) {
            if (typeof name !== "string") {
                name = String(name);
            }
            if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
                throw new TypeError("Invalid character in header field name");
            }
            return name.toLowerCase();
        }
        function normalizeValue(value) {
            if (typeof value !== "string") {
                value = String(value);
            }
            return value;
        }
        // Build a destructive iterator for the value list
        function iteratorFor(items) {
            var iterator = {
                next: function() {
                    var value = items.shift();
                    return {
                        done: value === undefined,
                        value: value
                    };
                }
            };
            if (support.iterable) {
                iterator[Symbol.iterator] = function() {
                    return iterator;
                };
            }
            return iterator;
        }
        function Headers(headers) {
            this.map = {};
            if (headers instanceof Headers) {
                headers.forEach(function(value, name) {
                    this.append(name, value);
                }, this);
            } else if (Array.isArray(headers)) {
                headers.forEach(function(header) {
                    this.append(header[0], header[1]);
                }, this);
            } else if (headers) {
                Object.getOwnPropertyNames(headers).forEach(function(name) {
                    this.append(name, headers[name]);
                }, this);
            }
        }
        Headers.prototype.append = function(name, value) {
            name = normalizeName(name);
            value = normalizeValue(value);
            var oldValue = this.map[name];
            this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name) {
            delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
            name = normalizeName(name);
            return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
            return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
            this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
            for(var name in this.map){
                if (this.map.hasOwnProperty(name)) {
                    callback.call(thisArg, this.map[name], name, this);
                }
            }
        };
        Headers.prototype.keys = function() {
            var items = [];
            this.forEach(function(value, name) {
                items.push(name);
            });
            return iteratorFor(items);
        };
        Headers.prototype.values = function() {
            var items = [];
            this.forEach(function(value) {
                items.push(value);
            });
            return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
            var items = [];
            this.forEach(function(value, name) {
                items.push([
                    name,
                    value
                ]);
            });
            return iteratorFor(items);
        };
        if (support.iterable) {
            Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
            if (body.bodyUsed) {
                return Promise.reject(new TypeError("Already read"));
            }
            body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
            return new Promise(function(resolve, reject) {
                reader.onload = function() {
                    resolve(reader.result);
                };
                reader.onerror = function() {
                    reject(reader.error);
                };
            });
        }
        function readBlobAsArrayBuffer(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsArrayBuffer(blob);
            return promise;
        }
        function readBlobAsText(blob) {
            var reader = new FileReader();
            var promise = fileReaderReady(reader);
            reader.readAsText(blob);
            return promise;
        }
        function readArrayBufferAsText(buf) {
            var view = new Uint8Array(buf);
            var chars = new Array(view.length);
            for(var i = 0; i < view.length; i++){
                chars[i] = String.fromCharCode(view[i]);
            }
            return chars.join("");
        }
        function bufferClone(buf) {
            if (buf.slice) {
                return buf.slice(0);
            } else {
                var view = new Uint8Array(buf.byteLength);
                view.set(new Uint8Array(buf));
                return view.buffer;
            }
        }
        function Body() {
            this.bodyUsed = false;
            this._initBody = function(body) {
                this._bodyInit = body;
                if (!body) {
                    this._bodyText = "";
                } else if (typeof body === "string") {
                    this._bodyText = body;
                } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                    this._bodyBlob = body;
                } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                    this._bodyFormData = body;
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                    this._bodyText = body.toString();
                } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                    this._bodyArrayBuffer = bufferClone(body.buffer);
                    // IE 10-11 can't handle a DataView body.
                    this._bodyInit = new Blob([
                        this._bodyArrayBuffer
                    ]);
                } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                    this._bodyArrayBuffer = bufferClone(body);
                } else {
                    this._bodyText = body = Object.prototype.toString.call(body);
                }
                if (!this.headers.get("content-type")) {
                    if (typeof body === "string") {
                        this.headers.set("content-type", "text/plain;charset=UTF-8");
                    } else if (this._bodyBlob && this._bodyBlob.type) {
                        this.headers.set("content-type", this._bodyBlob.type);
                    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                        this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                    }
                }
            };
            if (support.blob) {
                this.blob = function() {
                    var rejected = consumed(this);
                    if (rejected) {
                        return rejected;
                    }
                    if (this._bodyBlob) {
                        return Promise.resolve(this._bodyBlob);
                    } else if (this._bodyArrayBuffer) {
                        return Promise.resolve(new Blob([
                            this._bodyArrayBuffer
                        ]));
                    } else if (this._bodyFormData) {
                        throw new Error("could not read FormData body as blob");
                    } else {
                        return Promise.resolve(new Blob([
                            this._bodyText
                        ]));
                    }
                };
                this.arrayBuffer = function() {
                    if (this._bodyArrayBuffer) {
                        return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
                    } else {
                        return this.blob().then(readBlobAsArrayBuffer);
                    }
                };
            }
            this.text = function() {
                var rejected = consumed(this);
                if (rejected) {
                    return rejected;
                }
                if (this._bodyBlob) {
                    return readBlobAsText(this._bodyBlob);
                } else if (this._bodyArrayBuffer) {
                    return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
                } else if (this._bodyFormData) {
                    throw new Error("could not read FormData body as text");
                } else {
                    return Promise.resolve(this._bodyText);
                }
            };
            if (support.formData) {
                this.formData = function() {
                    return this.text().then(decode);
                };
            }
            this.json = function() {
                return this.text().then(JSON.parse);
            };
            return this;
        }
        // HTTP methods whose capitalization should be normalized
        var methods = [
            "DELETE",
            "GET",
            "HEAD",
            "OPTIONS",
            "POST",
            "PUT"
        ];
        function normalizeMethod(method) {
            var upcased = method.toUpperCase();
            return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
            options = options || {};
            var body = options.body;
            if (input instanceof Request) {
                if (input.bodyUsed) {
                    throw new TypeError("Already read");
                }
                this.url = input.url;
                this.credentials = input.credentials;
                if (!options.headers) {
                    this.headers = new Headers(input.headers);
                }
                this.method = input.method;
                this.mode = input.mode;
                this.signal = input.signal;
                if (!body && input._bodyInit != null) {
                    body = input._bodyInit;
                    input.bodyUsed = true;
                }
            } else {
                this.url = String(input);
            }
            this.credentials = options.credentials || this.credentials || "same-origin";
            if (options.headers || !this.headers) {
                this.headers = new Headers(options.headers);
            }
            this.method = normalizeMethod(options.method || this.method || "GET");
            this.mode = options.mode || this.mode || null;
            this.signal = options.signal || this.signal;
            this.referrer = null;
            if ((this.method === "GET" || this.method === "HEAD") && body) {
                throw new TypeError("Body not allowed for GET or HEAD requests");
            }
            this._initBody(body);
        }
        Request.prototype.clone = function() {
            return new Request(this, {
                body: this._bodyInit
            });
        };
        function decode(body) {
            var form = new FormData();
            body.trim().split("&").forEach(function(bytes) {
                if (bytes) {
                    var split = bytes.split("=");
                    var name = split.shift().replace(/\+/g, " ");
                    var value = split.join("=").replace(/\+/g, " ");
                    form.append(decodeURIComponent(name), decodeURIComponent(value));
                }
            });
            return form;
        }
        function parseHeaders(rawHeaders) {
            var headers = new Headers();
            // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
            // https://tools.ietf.org/html/rfc7230#section-3.2
            var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
            preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
                var parts = line.split(":");
                var key = parts.shift().trim();
                if (key) {
                    var value = parts.join(":").trim();
                    headers.append(key, value);
                }
            });
            return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
            if (!options) {
                options = {};
            }
            this.type = "default";
            this.status = options.status === undefined ? 200 : options.status;
            this.ok = this.status >= 200 && this.status < 300;
            this.statusText = "statusText" in options ? options.statusText : "OK";
            this.headers = new Headers(options.headers);
            this.url = options.url || "";
            this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
            return new Response(this._bodyInit, {
                status: this.status,
                statusText: this.statusText,
                headers: new Headers(this.headers),
                url: this.url
            });
        };
        Response.error = function() {
            var response = new Response(null, {
                status: 0,
                statusText: ""
            });
            response.type = "error";
            return response;
        };
        var redirectStatuses = [
            301,
            302,
            303,
            307,
            308
        ];
        Response.redirect = function(url, status) {
            if (redirectStatuses.indexOf(status) === -1) {
                throw new RangeError("Invalid status code");
            }
            return new Response(null, {
                status: status,
                headers: {
                    location: url
                }
            });
        };
        exports1.DOMException = self1.DOMException;
        try {
            new exports1.DOMException();
        } catch (err) {
            exports1.DOMException = function(message, name) {
                this.message = message;
                this.name = name;
                var error = Error(message);
                this.stack = error.stack;
            };
            exports1.DOMException.prototype = Object.create(Error.prototype);
            exports1.DOMException.prototype.constructor = exports1.DOMException;
        }
        function fetch(input, init) {
            return new Promise(function(resolve, reject) {
                var request = new Request(input, init);
                if (request.signal && request.signal.aborted) {
                    return reject(new exports1.DOMException("Aborted", "AbortError"));
                }
                var xhr = new XMLHttpRequest();
                function abortXhr() {
                    xhr.abort();
                }
                xhr.onload = function() {
                    var options = {
                        status: xhr.status,
                        statusText: xhr.statusText,
                        headers: parseHeaders(xhr.getAllResponseHeaders() || "")
                    };
                    options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
                    var body = "response" in xhr ? xhr.response : xhr.responseText;
                    resolve(new Response(body, options));
                };
                xhr.onerror = function() {
                    reject(new TypeError("Network request failed"));
                };
                xhr.ontimeout = function() {
                    reject(new TypeError("Network request failed"));
                };
                xhr.onabort = function() {
                    reject(new exports1.DOMException("Aborted", "AbortError"));
                };
                xhr.open(request.method, request.url, true);
                if (request.credentials === "include") {
                    xhr.withCredentials = true;
                } else if (request.credentials === "omit") {
                    xhr.withCredentials = false;
                }
                if ("responseType" in xhr && support.blob) {
                    xhr.responseType = "blob";
                }
                request.headers.forEach(function(value, name) {
                    xhr.setRequestHeader(name, value);
                });
                if (request.signal) {
                    request.signal.addEventListener("abort", abortXhr);
                    xhr.onreadystatechange = function() {
                        // DONE (success or failure)
                        if (xhr.readyState === 4) {
                            request.signal.removeEventListener("abort", abortXhr);
                        }
                    };
                }
                xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
            });
        }
        fetch.polyfill = true;
        if (!self1.fetch) {
            self1.fetch = fetch;
            self1.Headers = Headers;
            self1.Request = Request;
            self1.Response = Response;
        }
        exports1.Headers = Headers;
        exports1.Request = Request;
        exports1.Response = Response;
        exports1.fetch = fetch;
        Object.defineProperty(exports1, "__esModule", {
            value: true
        });
        return exports1;
    }({});
})(__self__);
__self__.fetch.ponyfill = true;
// Remove "polyfill" property added by whatwg-fetch
delete __self__.fetch.polyfill;
// Choose between native implementation (global) or custom implementation (__self__)
// var ctx = global.fetch ? global : __self__;
var ctx = __self__; // this line disable service worker support temporarily
exports = ctx.fetch // To enable: import fetch from 'cross-fetch'
;
exports["default"] = ctx.fetch // For TypeScript consumers without esModuleInterop.
;
exports.fetch = ctx.fetch // To enable: import {fetch} from 'cross-fetch'
;
exports.Headers = ctx.Headers;
exports.Request = ctx.Request;
exports.Response = ctx.Response;
module.exports = exports;


/***/ }),

/***/ 286:
/***/ ((module) => {

"use strict";

var naiveFallback = function() {
    if (typeof self === "object" && self) return self;
    if (false) {}
    throw new Error("Unable to resolve global `this`");
};
module.exports = function() {
    if (this) return this;
    // Unexpected strict mode (may happen if e.g. bundled into ESM module)
    // Fallback to standard globalThis if available
    if (typeof globalThis === "object" && globalThis) return globalThis;
    // Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
    // In all ES5+ engines global object inherits from Object.prototype
    // (if you approached one that doesn't please report)
    try {
        Object.defineProperty(Object.prototype, "__global__", {
            get: function() {
                return this;
            },
            configurable: true
        });
    } catch (error) {
        // Unfortunate case of updates to Object.prototype being restricted
        // via preventExtensions, seal or freeze
        return naiveFallback();
    }
    try {
        // Safari case (window.__global__ works, but __global__ does not)
        if (!__global__) return naiveFallback();
        return __global__;
    } finally{
        delete Object.prototype.__global__;
    }
}();


/***/ }),

/***/ 929:
/***/ ((module) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all)=>{
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toCommonJS = (mod)=>__copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
// src/index.ts
var src_exports = {};
__export(src_exports, {
    RequestCookies: ()=>RequestCookies,
    ResponseCookies: ()=>ResponseCookies,
    parseCookie: ()=>parseCookie,
    parseSetCookie: ()=>parseSetCookie,
    splitCookiesString: ()=>splitCookiesString,
    stringifyCookie: ()=>stringifyCookie
});
module.exports = __toCommonJS(src_exports);
// src/serialize.ts
function stringifyCookie(c) {
    var _a;
    const attrs = [
        "path" in c && c.path && `Path=${c.path}`,
        "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
        "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
        "domain" in c && c.domain && `Domain=${c.domain}`,
        "secure" in c && c.secure && "Secure",
        "httpOnly" in c && c.httpOnly && "HttpOnly",
        "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`
    ].filter(Boolean);
    return `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}; ${attrs.join("; ")}`;
}
function parseCookie(cookie) {
    const map = /* @__PURE__ */ new Map();
    for (const pair of cookie.split(/; */)){
        if (!pair) continue;
        const splitAt = pair.indexOf("=");
        if (splitAt === -1) {
            map.set(pair, "true");
            continue;
        }
        const [key, value] = [
            pair.slice(0, splitAt),
            pair.slice(splitAt + 1)
        ];
        try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
        } catch  {}
    }
    return map;
}
function parseSetCookie(setCookie) {
    if (!setCookie) {
        return void 0;
    }
    const [[name, value], ...attributes] = parseCookie(setCookie);
    const { domain, expires, httponly, maxage, path, samesite, secure } = Object.fromEntries(attributes.map(([key, value2])=>[
            key.toLowerCase(),
            value2
        ]));
    const cookie = {
        name,
        value: decodeURIComponent(value),
        domain,
        ...expires && {
            expires: new Date(expires)
        },
        ...httponly && {
            httpOnly: true
        },
        ...typeof maxage === "string" && {
            maxAge: Number(maxage)
        },
        path,
        ...samesite && {
            sameSite: parseSameSite(samesite)
        },
        ...secure && {
            secure: true
        }
    };
    return compact(cookie);
}
function compact(t) {
    const newT = {};
    for(const key in t){
        if (t[key]) {
            newT[key] = t[key];
        }
    }
    return newT;
}
var SAME_SITE = [
    "strict",
    "lax",
    "none"
];
function parseSameSite(string) {
    string = string.toLowerCase();
    return SAME_SITE.includes(string) ? string : void 0;
}
function splitCookiesString(cookiesString) {
    if (!cookiesString) return [];
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    cookiesSeparatorFound = true;
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
// src/request-cookies.ts
var RequestCookies = class {
    constructor(requestHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        this._headers = requestHeaders;
        const header = requestHeaders.get("cookie");
        if (header) {
            const parsed = parseCookie(header);
            for (const [name, value] of parsed){
                this._parsed.set(name, {
                    name,
                    value
                });
            }
        }
    }
    [Symbol.iterator]() {
        return this._parsed[Symbol.iterator]();
    }
    /**
   * The amount of cookies received from the client
   */ get size() {
        return this._parsed.size;
    }
    get(...args) {
        const name = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(name);
    }
    getAll(...args) {
        var _a;
        const all = Array.from(this._parsed);
        if (!args.length) {
            return all.map(([_, value])=>value);
        }
        const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter(([n])=>n === name).map(([_, value])=>value);
    }
    has(name) {
        return this._parsed.has(name);
    }
    set(...args) {
        const [name, value] = args.length === 1 ? [
            args[0].name,
            args[0].value
        ] : args;
        const map = this._parsed;
        map.set(name, {
            name,
            value
        });
        this._headers.set("cookie", Array.from(map).map(([_, value2])=>stringifyCookie(value2)).join("; "));
        return this;
    }
    /**
   * Delete the cookies matching the passed name or names in the request.
   */ delete(names) {
        const map = this._parsed;
        const result = !Array.isArray(names) ? map.delete(names) : names.map((name)=>map.delete(name));
        this._headers.set("cookie", Array.from(map).map(([_, value])=>stringifyCookie(value)).join("; "));
        return result;
    }
    /**
   * Delete all the cookies in the cookies in the request.
   */ clear() {
        this.delete(Array.from(this._parsed.keys()));
        return this;
    }
    /**
   * Format the cookies in the request as a string for logging
   */ [Symbol.for("edge-runtime.inspect.custom")]() {
        return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map((v)=>`${v.name}=${encodeURIComponent(v.value)}`).join("; ");
    }
};
// src/response-cookies.ts
var ResponseCookies = class {
    constructor(responseHeaders){
        /** @internal */ this._parsed = /* @__PURE__ */ new Map();
        var _a, _b;
        this._headers = responseHeaders;
        const setCookie = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders);
        (_b = responseHeaders.get("set-cookie")) != null ? _b : [];
        const cookieStrings = Array.isArray(setCookie) ? setCookie : // TODO: remove splitCookiesString when `getSetCookie` adoption is high enough in Node.js
        // https://developer.mozilla.org/en-US/docs/Web/API/Headers/getSetCookie#browser_compatibility
        splitCookiesString(setCookie);
        for (const cookieString of cookieStrings){
            const parsed = parseSetCookie(cookieString);
            if (parsed) this._parsed.set(parsed.name, parsed);
        }
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
   */ get(...args) {
        const key = typeof args[0] === "string" ? args[0] : args[0].name;
        return this._parsed.get(key);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
   */ getAll(...args) {
        var _a;
        const all = Array.from(this._parsed.values());
        if (!args.length) {
            return all;
        }
        const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
        return all.filter((c)=>c.name === key);
    }
    has(name) {
        return this._parsed.has(name);
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
   */ set(...args) {
        const [name, value, cookie] = args.length === 1 ? [
            args[0].name,
            args[0].value,
            args[0]
        ] : args;
        const map = this._parsed;
        map.set(name, normalizeCookie({
            name,
            value,
            ...cookie
        }));
        replace(map, this._headers);
        return this;
    }
    /**
   * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
   */ delete(...args) {
        const [name, path, domain] = typeof args[0] === "string" ? [
            args[0]
        ] : [
            args[0].name,
            args[0].path,
            args[0].domain
        ];
        return this.set({
            name,
            path,
            domain,
            value: "",
            expires: /* @__PURE__ */ new Date(0)
        });
    }
    [Symbol.for("edge-runtime.inspect.custom")]() {
        return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
    }
    toString() {
        return [
            ...this._parsed.values()
        ].map(stringifyCookie).join("; ");
    }
};
function replace(bag, headers) {
    headers.delete("set-cookie");
    for (const [, value] of bag){
        const serialized = stringifyCookie(value);
        headers.append("set-cookie", serialized);
    }
}
function normalizeCookie(cookie = {
    name: "",
    value: ""
}) {
    if (typeof cookie.expires === "number") {
        cookie.expires = new Date(cookie.expires);
    }
    if (cookie.maxAge) {
        cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
    }
    if (cookie.path === null || cookie.path === void 0) {
        cookie.path = "/";
    }
    return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 104:
/***/ ((module) => {

"use strict";
var __dirname = "/";

(()=>{
    "use strict";
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var e = {};
    (()=>{
        var r = e;
        /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ r.parse = parse;
        r.serialize = serialize;
        var i = decodeURIComponent;
        var t = encodeURIComponent;
        var a = /; */;
        var n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse(e, r) {
            if (typeof e !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var t = {};
            var n = r || {};
            var o = e.split(a);
            var s = n.decode || i;
            for(var p = 0; p < o.length; p++){
                var f = o[p];
                var u = f.indexOf("=");
                if (u < 0) {
                    continue;
                }
                var v = f.substr(0, u).trim();
                var c = f.substr(++u, f.length).trim();
                if ('"' == c[0]) {
                    c = c.slice(1, -1);
                }
                if (undefined == t[v]) {
                    t[v] = tryDecode(c, s);
                }
            }
            return t;
        }
        function serialize(e, r, i) {
            var a = i || {};
            var o = a.encode || t;
            if (typeof o !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!n.test(e)) {
                throw new TypeError("argument name is invalid");
            }
            var s = o(r);
            if (s && !n.test(s)) {
                throw new TypeError("argument val is invalid");
            }
            var p = e + "=" + s;
            if (null != a.maxAge) {
                var f = a.maxAge - 0;
                if (isNaN(f) || !isFinite(f)) {
                    throw new TypeError("option maxAge is invalid");
                }
                p += "; Max-Age=" + Math.floor(f);
            }
            if (a.domain) {
                if (!n.test(a.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                p += "; Domain=" + a.domain;
            }
            if (a.path) {
                if (!n.test(a.path)) {
                    throw new TypeError("option path is invalid");
                }
                p += "; Path=" + a.path;
            }
            if (a.expires) {
                if (typeof a.expires.toUTCString !== "function") {
                    throw new TypeError("option expires is invalid");
                }
                p += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly) {
                p += "; HttpOnly";
            }
            if (a.secure) {
                p += "; Secure";
            }
            if (a.sameSite) {
                var u = typeof a.sameSite === "string" ? a.sameSite.toLowerCase() : a.sameSite;
                switch(u){
                    case true:
                        p += "; SameSite=Strict";
                        break;
                    case "lax":
                        p += "; SameSite=Lax";
                        break;
                    case "strict":
                        p += "; SameSite=Strict";
                        break;
                    case "none":
                        p += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return p;
        }
        function tryDecode(e, r) {
            try {
                return r(e);
            } catch (r) {
                return e;
            }
        }
    })();
    module.exports = e;
})();


/***/ }),

/***/ 870:
/***/ ((module) => {

"use strict";

var defaultParseOptions = {
    decodeValues: true,
    map: false,
    silent: false
};
function isNonEmptyString(str) {
    return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
    var parts = setCookieValue.split(";").filter(isNonEmptyString);
    var nameValuePairStr = parts.shift();
    var parsed = parseNameValuePair(nameValuePairStr);
    var name = parsed.name;
    var value = parsed.value;
    options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
    try {
        value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
    } catch (e) {
        console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.", e);
    }
    var cookie = {
        name: name,
        value: value
    };
    parts.forEach(function(part) {
        var sides = part.split("=");
        var key = sides.shift().trimLeft().toLowerCase();
        var value = sides.join("=");
        if (key === "expires") {
            cookie.expires = new Date(value);
        } else if (key === "max-age") {
            cookie.maxAge = parseInt(value, 10);
        } else if (key === "secure") {
            cookie.secure = true;
        } else if (key === "httponly") {
            cookie.httpOnly = true;
        } else if (key === "samesite") {
            cookie.sameSite = value;
        } else {
            cookie[key] = value;
        }
    });
    return cookie;
}
function parseNameValuePair(nameValuePairStr) {
    // Parses name-value-pair according to rfc6265bis draft
    var name = "";
    var value = "";
    var nameValueArr = nameValuePairStr.split("=");
    if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
    } else {
        value = nameValuePairStr;
    }
    return {
        name: name,
        value: value
    };
}
function parse(input, options) {
    options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
    if (!input) {
        if (!options.map) {
            return [];
        } else {
            return {};
        }
    }
    if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
            // for fetch responses - they combine headers of the same type in the headers array,
            // but getSetCookie returns an uncombined array
            input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
            // fast-path for node.js (which automatically normalizes header names to lower-case
            input = input.headers["set-cookie"];
        } else {
            // slow-path for other environments - see #25
            var sch = input.headers[Object.keys(input.headers).find(function(key) {
                return key.toLowerCase() === "set-cookie";
            })];
            // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
            if (!sch && input.headers.cookie && !options.silent) {
                console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.");
            }
            input = sch;
        }
    }
    if (!Array.isArray(input)) {
        input = [
            input
        ];
    }
    options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
    if (!options.map) {
        return input.filter(isNonEmptyString).map(function(str) {
            return parseString(str, options);
        });
    } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies, str) {
            var cookie = parseString(str, options);
            cookies[cookie.name] = cookie;
            return cookies;
        }, cookies);
    }
}
/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.

  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.

  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/ function splitCookiesString(cookiesString) {
    if (Array.isArray(cookiesString)) {
        return cookiesString;
    }
    if (typeof cookiesString !== "string") {
        return [];
    }
    var cookiesStrings = [];
    var pos = 0;
    var start;
    var ch;
    var lastComma;
    var nextStart;
    var cookiesSeparatorFound;
    function skipWhitespace() {
        while(pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))){
            pos += 1;
        }
        return pos < cookiesString.length;
    }
    function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
    }
    while(pos < cookiesString.length){
        start = pos;
        cookiesSeparatorFound = false;
        while(skipWhitespace()){
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
                // ',' is a cookie separator if we have later first '=', not ';' or ','
                lastComma = pos;
                pos += 1;
                skipWhitespace();
                nextStart = pos;
                while(pos < cookiesString.length && notSpecialChar()){
                    pos += 1;
                }
                // currently special character
                if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                    // we found cookies separator
                    cookiesSeparatorFound = true;
                    // pos is inside the next cookie, so back up and return it.
                    pos = nextStart;
                    cookiesStrings.push(cookiesString.substring(start, lastComma));
                    start = pos;
                } else {
                    // in param ',' or param separator ';',
                    // we continue from that comma
                    pos = lastComma + 1;
                }
            } else {
                pos += 1;
            }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
    }
    return cookiesStrings;
}
module.exports = parse;
module.exports.parse = parse;
module.exports.parseString = parseString;
module.exports.splitCookiesString = splitCookiesString;


/***/ }),

/***/ 782:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var _globalThis;
if (typeof globalThis === "object") {
    _globalThis = globalThis;
} else {
    try {
        _globalThis = __webpack_require__(286);
    } catch (error) {} finally{
        if (!_globalThis && "undefined" !== "undefined") {}
        if (!_globalThis) {
            throw new Error("Could not determine global this");
        }
    }
}
var NativeWebSocket = _globalThis.WebSocket || _globalThis.MozWebSocket;
var websocket_version = __webpack_require__(866);
/**
 * Expose a W3C WebSocket class with just one or two arguments.
 */ function W3CWebSocket(uri, protocols) {
    var native_instance;
    if (protocols) {
        native_instance = new NativeWebSocket(uri, protocols);
    } else {
        native_instance = new NativeWebSocket(uri);
    }
    /**
	 * 'native_instance' is an instance of nativeWebSocket (the browser's WebSocket
	 * class). Since it is an Object it will be returned as it is when creating an
	 * instance of W3CWebSocket via 'new W3CWebSocket()'.
	 *
	 * ECMAScript 5: http://bclary.com/2004/11/07/#a-13.2.2
	 */ return native_instance;
}
if (NativeWebSocket) {
    [
        "CONNECTING",
        "OPEN",
        "CLOSING",
        "CLOSED"
    ].forEach(function(prop) {
        Object.defineProperty(W3CWebSocket, prop, {
            get: function() {
                return NativeWebSocket[prop];
            }
        });
    });
}
/**
 * Module exports.
 */ module.exports = {
    "w3cwebsocket": NativeWebSocket ? W3CWebSocket : null,
    "version": websocket_version
};


/***/ }),

/***/ 866:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

module.exports = __webpack_require__(512).version;


/***/ }),

/***/ 858:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  BrowserCookieAuthStorageAdapter: () => (/* binding */ BrowserCookieAuthStorageAdapter),
  CookieAuthStorageAdapter: () => (/* binding */ CookieAuthStorageAdapter),
  DEFAULT_COOKIE_OPTIONS: () => (/* binding */ DEFAULT_COOKIE_OPTIONS),
  createSupabaseClient: () => (/* binding */ createSupabaseClient),
  isBrowser: () => (/* binding */ dist_isBrowser),
  parseCookies: () => (/* binding */ export_parseCookies),
  parseSupabaseCookie: () => (/* binding */ parseSupabaseCookie),
  serializeCookie: () => (/* binding */ export_serializeCookie),
  stringifySupabaseSession: () => (/* binding */ stringifySupabaseSession)
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/buffer_utils.js

const buffer_utils_encoder = new TextEncoder();
const buffer_utils_decoder = new TextDecoder();
const MAX_INT32 = (/* unused pure expression or super */ null && (2 ** 32));
function buffer_utils_concat(...buffers) {
    const size = buffers.reduce((acc, { length })=>acc + length, 0);
    const buf = new Uint8Array(size);
    let i = 0;
    buffers.forEach((buffer)=>{
        buf.set(buffer, i);
        i += buffer.length;
    });
    return buf;
}
function p2s(alg, p2sInput) {
    return buffer_utils_concat(buffer_utils_encoder.encode(alg), new Uint8Array([
        0
    ]), p2sInput);
}
function writeUInt32BE(buf, value, offset) {
    if (value < 0 || value >= MAX_INT32) {
        throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`);
    }
    buf.set([
        value >>> 24,
        value >>> 16,
        value >>> 8,
        value & 0xff
    ], offset);
}
function buffer_utils_uint64be(value) {
    const high = Math.floor(value / MAX_INT32);
    const low = value % MAX_INT32;
    const buf = new Uint8Array(8);
    writeUInt32BE(buf, high, 0);
    writeUInt32BE(buf, low, 4);
    return buf;
}
function buffer_utils_uint32be(value) {
    const buf = new Uint8Array(4);
    writeUInt32BE(buf, value);
    return buf;
}
function buffer_utils_lengthAndInput(input) {
    return buffer_utils_concat(buffer_utils_uint32be(input.length), input);
}
async function buffer_utils_concatKdf(secret, bits, value) {
    const iterations = Math.ceil((bits >> 3) / 32);
    const res = new Uint8Array(iterations * 32);
    for(let iter = 0; iter < iterations; iter++){
        const buf = new Uint8Array(4 + secret.length + value.length);
        buf.set(buffer_utils_uint32be(iter + 1));
        buf.set(secret, 4);
        buf.set(value, 4 + secret.length);
        res.set(await digest("sha256", buf), iter * 32);
    }
    return res.slice(0, bits >> 3);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/base64url.js

const base64url_encodeBase64 = (input)=>{
    let unencoded = input;
    if (typeof unencoded === "string") {
        unencoded = buffer_utils_encoder.encode(unencoded);
    }
    const CHUNK_SIZE = 0x8000;
    const arr = [];
    for(let i = 0; i < unencoded.length; i += CHUNK_SIZE){
        arr.push(String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)));
    }
    return btoa(arr.join(""));
};
const encode = (input)=>{
    return base64url_encodeBase64(input).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
const base64url_decodeBase64 = (encoded)=>{
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++){
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
};
const decode = (input)=>{
    let encoded = input;
    if (encoded instanceof Uint8Array) {
        encoded = buffer_utils_decoder.decode(encoded);
    }
    encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
    try {
        return base64url_decodeBase64(encoded);
    } catch (_a) {
        throw new TypeError("The input to be decoded is not correctly encoded.");
    }
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/util/errors.js
class errors_JOSEError extends (/* unused pure expression or super */ null && (Error)) {
    static get code() {
        return "ERR_JOSE_GENERIC";
    }
    constructor(message){
        var _a;
        super(message);
        this.code = "ERR_JOSE_GENERIC";
        this.name = this.constructor.name;
        (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, this.constructor);
    }
}
class errors_JWTClaimValidationFailed extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    static get code() {
        return "ERR_JWT_CLAIM_VALIDATION_FAILED";
    }
    constructor(message, claim = "unspecified", reason = "unspecified"){
        super(message);
        this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        this.claim = claim;
        this.reason = reason;
    }
}
class errors_JWTExpired extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    static get code() {
        return "ERR_JWT_EXPIRED";
    }
    constructor(message, claim = "unspecified", reason = "unspecified"){
        super(message);
        this.code = "ERR_JWT_EXPIRED";
        this.claim = claim;
        this.reason = reason;
    }
}
class errors_JOSEAlgNotAllowed extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
    }
    static get code() {
        return "ERR_JOSE_ALG_NOT_ALLOWED";
    }
}
class errors_JOSENotSupported extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JOSE_NOT_SUPPORTED";
    }
    static get code() {
        return "ERR_JOSE_NOT_SUPPORTED";
    }
}
class errors_JWEDecryptionFailed extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWE_DECRYPTION_FAILED";
        this.message = "decryption operation failed";
    }
    static get code() {
        return "ERR_JWE_DECRYPTION_FAILED";
    }
}
class errors_JWEInvalid extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWE_INVALID";
    }
    static get code() {
        return "ERR_JWE_INVALID";
    }
}
class errors_JWSInvalid extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWS_INVALID";
    }
    static get code() {
        return "ERR_JWS_INVALID";
    }
}
class errors_JWTInvalid extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWT_INVALID";
    }
    static get code() {
        return "ERR_JWT_INVALID";
    }
}
class errors_JWKInvalid extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWK_INVALID";
    }
    static get code() {
        return "ERR_JWK_INVALID";
    }
}
class errors_JWKSInvalid extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWKS_INVALID";
    }
    static get code() {
        return "ERR_JWKS_INVALID";
    }
}
class errors_JWKSNoMatchingKey extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWKS_NO_MATCHING_KEY";
        this.message = "no applicable key found in the JSON Web Key Set";
    }
    static get code() {
        return "ERR_JWKS_NO_MATCHING_KEY";
    }
}
class errors_JWKSMultipleMatchingKeys extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
        this.message = "multiple matching keys found in the JSON Web Key Set";
    }
    static get code() {
        return "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
    }
}
Symbol.asyncIterator;
class errors_JWKSTimeout extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWKS_TIMEOUT";
        this.message = "request timed out";
    }
    static get code() {
        return "ERR_JWKS_TIMEOUT";
    }
}
class errors_JWSSignatureVerificationFailed extends (/* unused pure expression or super */ null && (errors_JOSEError)) {
    constructor(){
        super(...arguments);
        this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        this.message = "signature verification failed";
    }
    static get code() {
        return "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/webcrypto.js
/* harmony default export */ const webcrypto = (crypto);
const webcrypto_isCryptoKey = (key)=>key instanceof CryptoKey;

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/random.js

/* harmony default export */ const runtime_random = (webcrypto.getRandomValues.bind(webcrypto));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/iv.js


function iv_bitLength(alg) {
    switch(alg){
        case "A128GCM":
        case "A128GCMKW":
        case "A192GCM":
        case "A192GCMKW":
        case "A256GCM":
        case "A256GCMKW":
            return 96;
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            return 128;
        default:
            throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
/* harmony default export */ const iv = ((alg)=>random(new Uint8Array(iv_bitLength(alg) >> 3)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/check_iv_length.js


const check_iv_length_checkIvLength = (enc, iv)=>{
    if (iv.length << 3 !== bitLength(enc)) {
        throw new JWEInvalid("Invalid Initialization Vector length");
    }
};
/* harmony default export */ const check_iv_length = ((/* unused pure expression or super */ null && (check_iv_length_checkIvLength)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/check_cek_length.js

const check_cek_length_checkCekLength = (cek, expected)=>{
    const actual = cek.byteLength << 3;
    if (actual !== expected) {
        throw new JWEInvalid(`Invalid Content Encryption Key length. Expected ${expected} bits, got ${actual} bits`);
    }
};
/* harmony default export */ const check_cek_length = ((/* unused pure expression or super */ null && (check_cek_length_checkCekLength)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/decrypt.js









async function cbcDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    if (!(cek instanceof Uint8Array)) {
        throw new TypeError(invalidKeyInput(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, [
        "decrypt"
    ]);
    const macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
        hash: `SHA-${keySize << 1}`,
        name: "HMAC"
    }, false, [
        "sign"
    ]);
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const expectedTag = new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    let macCheckPassed;
    try {
        macCheckPassed = timingSafeEqual(tag, expectedTag);
    } catch (_a) {}
    if (!macCheckPassed) {
        throw new JWEDecryptionFailed();
    }
    let plaintext;
    try {
        plaintext = new Uint8Array(await crypto.subtle.decrypt({
            iv,
            name: "AES-CBC"
        }, encKey, ciphertext));
    } catch (_b) {}
    if (!plaintext) {
        throw new JWEDecryptionFailed();
    }
    return plaintext;
}
async function gcmDecrypt(enc, cek, ciphertext, iv, tag, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
        encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, [
            "decrypt"
        ]);
    } else {
        checkEncCryptoKey(cek, enc, "decrypt");
        encKey = cek;
    }
    try {
        return new Uint8Array(await crypto.subtle.decrypt({
            additionalData: aad,
            iv,
            name: "AES-GCM",
            tagLength: 128
        }, encKey, concat(ciphertext, tag)));
    } catch (_a) {
        throw new JWEDecryptionFailed();
    }
}
const decrypt_decrypt = async (enc, cek, ciphertext, iv, tag, aad)=>{
    if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
        throw new TypeError(invalidKeyInput(cek, ...types, "Uint8Array"));
    }
    checkIvLength(enc, iv);
    switch(enc){
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(-3), 10));
            return cbcDecrypt(enc, cek, ciphertext, iv, tag, aad);
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
            if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(1, 4), 10));
            return gcmDecrypt(enc, cek, ciphertext, iv, tag, aad);
        default:
            throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
    }
};
/* harmony default export */ const runtime_decrypt = ((/* unused pure expression or super */ null && (decrypt_decrypt)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/zlib.js

const zlib_inflate = async ()=>{
    throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported by your javascript runtime. You need to use the `inflateRaw` decrypt option to provide Inflate Raw implementation.');
};
const zlib_deflate = async ()=>{
    throw new JOSENotSupported('JWE "zip" (Compression Algorithm) Header Parameter is not supported by your javascript runtime. You need to use the `deflateRaw` encrypt option to provide Deflate Raw implementation.');
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/bogus.js
const bogus_bogusWebCrypto = [
    {
        hash: "SHA-256",
        name: "HMAC"
    },
    true,
    [
        "sign"
    ]
];
/* harmony default export */ const bogus = ((/* unused pure expression or super */ null && (bogus_bogusWebCrypto)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/aeskw.js





function checkKeySize(key, alg) {
    if (key.algorithm.length !== parseInt(alg.slice(1, 4), 10)) {
        throw new TypeError(`Invalid key size for alg: ${alg}`);
    }
}
function getCryptoKey(key, alg, usage) {
    if (isCryptoKey(key)) {
        checkEncCryptoKey(key, alg, usage);
        return key;
    }
    if (key instanceof Uint8Array) {
        return crypto.subtle.importKey("raw", key, "AES-KW", true, [
            usage
        ]);
    }
    throw new TypeError(invalidKeyInput(key, ...types, "Uint8Array"));
}
const aeskw_wrap = async (alg, key, cek)=>{
    const cryptoKey = await getCryptoKey(key, alg, "wrapKey");
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await crypto.subtle.importKey("raw", cek, ...bogusWebCrypto);
    return new Uint8Array(await crypto.subtle.wrapKey("raw", cryptoKeyCek, cryptoKey, "AES-KW"));
};
const aeskw_unwrap = async (alg, key, encryptedKey)=>{
    const cryptoKey = await getCryptoKey(key, alg, "unwrapKey");
    checkKeySize(cryptoKey, alg);
    const cryptoKeyCek = await crypto.subtle.unwrapKey("raw", encryptedKey, cryptoKey, "AES-KW", ...bogusWebCrypto);
    return new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKeyCek));
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/ecdhes.js





async function deriveKey(publicKey, privateKey, algorithm, keyLength, apu = new Uint8Array(0), apv = new Uint8Array(0)) {
    if (!isCryptoKey(publicKey)) {
        throw new TypeError(invalidKeyInput(publicKey, ...types));
    }
    checkEncCryptoKey(publicKey, "ECDH");
    if (!isCryptoKey(privateKey)) {
        throw new TypeError(invalidKeyInput(privateKey, ...types));
    }
    checkEncCryptoKey(privateKey, "ECDH", "deriveBits");
    const value = concat(lengthAndInput(encoder.encode(algorithm)), lengthAndInput(apu), lengthAndInput(apv), uint32be(keyLength));
    let length;
    if (publicKey.algorithm.name === "X25519") {
        length = 256;
    } else if (publicKey.algorithm.name === "X448") {
        length = 448;
    } else {
        length = Math.ceil(parseInt(publicKey.algorithm.namedCurve.substr(-3), 10) / 8) << 3;
    }
    const sharedSecret = new Uint8Array(await crypto.subtle.deriveBits({
        name: publicKey.algorithm.name,
        public: publicKey
    }, privateKey, length));
    return concatKdf(sharedSecret, keyLength, value);
}
async function generateEpk(key) {
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, ...types));
    }
    return crypto.subtle.generateKey(key.algorithm, true, [
        "deriveBits"
    ]);
}
function ecdhAllowed(key) {
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, ...types));
    }
    return [
        "P-256",
        "P-384",
        "P-521"
    ].includes(key.algorithm.namedCurve) || key.algorithm.name === "X25519" || key.algorithm.name === "X448";
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/check_p2s.js

function check_p2s_checkP2s(p2s) {
    if (!(p2s instanceof Uint8Array) || p2s.length < 8) {
        throw new JWEInvalid("PBES2 Salt Input must be 8 or more octets");
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/pbes2kw.js









function pbes2kw_getCryptoKey(key, alg) {
    if (key instanceof Uint8Array) {
        return crypto.subtle.importKey("raw", key, "PBKDF2", false, [
            "deriveBits"
        ]);
    }
    if (isCryptoKey(key)) {
        checkEncCryptoKey(key, alg, "deriveBits", "deriveKey");
        return key;
    }
    throw new TypeError(invalidKeyInput(key, ...types, "Uint8Array"));
}
async function pbes2kw_deriveKey(p2s, alg, p2c, key) {
    checkP2s(p2s);
    const salt = concatSalt(alg, p2s);
    const keylen = parseInt(alg.slice(13, 16), 10);
    const subtleAlg = {
        hash: `SHA-${alg.slice(8, 11)}`,
        iterations: p2c,
        name: "PBKDF2",
        salt
    };
    const wrapAlg = {
        length: keylen,
        name: "AES-KW"
    };
    const cryptoKey = await pbes2kw_getCryptoKey(key, alg);
    if (cryptoKey.usages.includes("deriveBits")) {
        return new Uint8Array(await crypto.subtle.deriveBits(subtleAlg, cryptoKey, keylen));
    }
    if (cryptoKey.usages.includes("deriveKey")) {
        return crypto.subtle.deriveKey(subtleAlg, cryptoKey, wrapAlg, false, [
            "wrapKey",
            "unwrapKey"
        ]);
    }
    throw new TypeError('PBKDF2 key "usages" must include "deriveBits" or "deriveKey"');
}
const pbes2kw_encrypt = async (alg, key, cek, p2c = 2048, p2s = random(new Uint8Array(16)))=>{
    const derived = await pbes2kw_deriveKey(p2s, alg, p2c, key);
    const encryptedKey = await wrap(alg.slice(-6), derived, cek);
    return {
        encryptedKey,
        p2c,
        p2s: base64url(p2s)
    };
};
const pbes2kw_decrypt = async (alg, key, encryptedKey, p2c, p2s)=>{
    const derived = await pbes2kw_deriveKey(p2s, alg, p2c, key);
    return unwrap(alg.slice(-6), derived, encryptedKey);
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/subtle_rsaes.js

function subtleRsaEs(alg) {
    switch(alg){
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            return "RSA-OAEP";
        default:
            throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/rsaes.js







const rsaes_encrypt = async (alg, key, cek)=>{
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, ...types));
    }
    checkEncCryptoKey(key, alg, "encrypt", "wrapKey");
    checkKeyLength(alg, key);
    if (key.usages.includes("encrypt")) {
        return new Uint8Array(await crypto.subtle.encrypt(subtleAlgorithm(alg), key, cek));
    }
    if (key.usages.includes("wrapKey")) {
        const cryptoKeyCek = await crypto.subtle.importKey("raw", cek, ...bogusWebCrypto);
        return new Uint8Array(await crypto.subtle.wrapKey("raw", cryptoKeyCek, key, subtleAlgorithm(alg)));
    }
    throw new TypeError('RSA-OAEP key "usages" must include "encrypt" or "wrapKey" for this operation');
};
const rsaes_decrypt = async (alg, key, encryptedKey)=>{
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, ...types));
    }
    checkEncCryptoKey(key, alg, "decrypt", "unwrapKey");
    checkKeyLength(alg, key);
    if (key.usages.includes("decrypt")) {
        return new Uint8Array(await crypto.subtle.decrypt(subtleAlgorithm(alg), key, encryptedKey));
    }
    if (key.usages.includes("unwrapKey")) {
        const cryptoKeyCek = await crypto.subtle.unwrapKey("raw", encryptedKey, key, subtleAlgorithm(alg), ...bogusWebCrypto);
        return new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKeyCek));
    }
    throw new TypeError('RSA-OAEP key "usages" must include "decrypt" or "unwrapKey" for this operation');
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/cek.js


function cek_bitLength(alg) {
    switch(alg){
        case "A128GCM":
            return 128;
        case "A192GCM":
            return 192;
        case "A256GCM":
        case "A128CBC-HS256":
            return 256;
        case "A192CBC-HS384":
            return 384;
        case "A256CBC-HS512":
            return 512;
        default:
            throw new JOSENotSupported(`Unsupported JWE Algorithm: ${alg}`);
    }
}
/* harmony default export */ const cek = ((alg)=>random(new Uint8Array(cek_bitLength(alg) >> 3)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/asn1.js






const genericExport = async (keyType, keyFormat, key)=>{
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, ...types));
    }
    if (!key.extractable) {
        throw new TypeError("CryptoKey is not extractable");
    }
    if (key.type !== keyType) {
        throw new TypeError(`key is not a ${keyType} key`);
    }
    return formatPEM(encodeBase64(new Uint8Array(await crypto.subtle.exportKey(keyFormat, key))), `${keyType.toUpperCase()} KEY`);
};
const toSPKI = (key)=>{
    return genericExport("public", "spki", key);
};
const toPKCS8 = (key)=>{
    return genericExport("private", "pkcs8", key);
};
const findOid = (keyData, oid, from = 0)=>{
    if (from === 0) {
        oid.unshift(oid.length);
        oid.unshift(0x06);
    }
    let i = keyData.indexOf(oid[0], from);
    if (i === -1) return false;
    const sub = keyData.subarray(i, i + oid.length);
    if (sub.length !== oid.length) return false;
    return sub.every((value, index)=>value === oid[index]) || findOid(keyData, oid, i + 1);
};
const getNamedCurve = (keyData)=>{
    switch(true){
        case findOid(keyData, [
            0x2a,
            0x86,
            0x48,
            0xce,
            0x3d,
            0x03,
            0x01,
            0x07
        ]):
            return "P-256";
        case findOid(keyData, [
            0x2b,
            0x81,
            0x04,
            0x00,
            0x22
        ]):
            return "P-384";
        case findOid(keyData, [
            0x2b,
            0x81,
            0x04,
            0x00,
            0x23
        ]):
            return "P-521";
        case findOid(keyData, [
            0x2b,
            0x65,
            0x6e
        ]):
            return "X25519";
        case findOid(keyData, [
            0x2b,
            0x65,
            0x6f
        ]):
            return "X448";
        case findOid(keyData, [
            0x2b,
            0x65,
            0x70
        ]):
            return "Ed25519";
        case findOid(keyData, [
            0x2b,
            0x65,
            0x71
        ]):
            return "Ed448";
        default:
            throw new JOSENotSupported("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
    }
};
const genericImport = async (replace, keyFormat, pem, alg, options)=>{
    var _a;
    let algorithm;
    let keyUsages;
    const keyData = new Uint8Array(atob(pem.replace(replace, "")).split("").map((c)=>c.charCodeAt(0)));
    const isPublic = keyFormat === "spki";
    switch(alg){
        case "PS256":
        case "PS384":
        case "PS512":
            algorithm = {
                name: "RSA-PSS",
                hash: `SHA-${alg.slice(-3)}`
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        case "RS256":
        case "RS384":
        case "RS512":
            algorithm = {
                name: "RSASSA-PKCS1-v1_5",
                hash: `SHA-${alg.slice(-3)}`
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            algorithm = {
                name: "RSA-OAEP",
                hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`
            };
            keyUsages = isPublic ? [
                "encrypt",
                "wrapKey"
            ] : [
                "decrypt",
                "unwrapKey"
            ];
            break;
        case "ES256":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-256"
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        case "ES384":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-384"
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        case "ES512":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-521"
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
            {
                const namedCurve = getNamedCurve(keyData);
                algorithm = namedCurve.startsWith("P-") ? {
                    name: "ECDH",
                    namedCurve
                } : {
                    name: namedCurve
                };
                keyUsages = isPublic ? [] : [
                    "deriveBits"
                ];
                break;
            }
        case "EdDSA":
            algorithm = {
                name: getNamedCurve(keyData)
            };
            keyUsages = isPublic ? [
                "verify"
            ] : [
                "sign"
            ];
            break;
        default:
            throw new JOSENotSupported('Invalid or unsupported "alg" (Algorithm) value');
    }
    return crypto.subtle.importKey(keyFormat, keyData, algorithm, (_a = options === null || options === void 0 ? void 0 : options.extractable) !== null && _a !== void 0 ? _a : false, keyUsages);
};
const asn1_fromPKCS8 = (pem, alg, options)=>{
    return genericImport(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", pem, alg, options);
};
const asn1_fromSPKI = (pem, alg, options)=>{
    return genericImport(/(?:-----(?:BEGIN|END) PUBLIC KEY-----|\s)/g, "spki", pem, alg, options);
};
function getElement(seq) {
    let result = [];
    let next = 0;
    while(next < seq.length){
        let nextPart = parseElement(seq.subarray(next));
        result.push(nextPart);
        next += nextPart.byteLength;
    }
    return result;
}
function parseElement(bytes) {
    let position = 0;
    let tag = bytes[0] & 0x1f;
    position++;
    if (tag === 0x1f) {
        tag = 0;
        while(bytes[position] >= 0x80){
            tag = tag * 128 + bytes[position] - 0x80;
            position++;
        }
        tag = tag * 128 + bytes[position] - 0x80;
        position++;
    }
    let length = 0;
    if (bytes[position] < 0x80) {
        length = bytes[position];
        position++;
    } else if (length === 0x80) {
        length = 0;
        while(bytes[position + length] !== 0 || bytes[position + length + 1] !== 0){
            if (length > bytes.byteLength) {
                throw new TypeError("invalid indefinite form length");
            }
            length++;
        }
        const byteLength = position + length + 2;
        return {
            byteLength,
            contents: bytes.subarray(position, position + length),
            raw: bytes.subarray(0, byteLength)
        };
    } else {
        let numberOfDigits = bytes[position] & 0x7f;
        position++;
        length = 0;
        for(let i = 0; i < numberOfDigits; i++){
            length = length * 256 + bytes[position];
            position++;
        }
    }
    const byteLength = position + length;
    return {
        byteLength,
        contents: bytes.subarray(position, byteLength),
        raw: bytes.subarray(0, byteLength)
    };
}
function spkiFromX509(buf) {
    const tbsCertificate = getElement(getElement(parseElement(buf).contents)[0].contents);
    return encodeBase64(tbsCertificate[tbsCertificate[0].raw[0] === 0xa0 ? 6 : 5].raw);
}
function getSPKI(x509) {
    const pem = x509.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, "");
    const raw = decodeBase64(pem);
    return formatPEM(spkiFromX509(raw), "PUBLIC KEY");
}
const asn1_fromX509 = (pem, alg, options)=>{
    let spki;
    try {
        spki = getSPKI(pem);
    } catch (cause) {
        throw new TypeError("failed to parse the X.509 certificate", {
            cause
        });
    }
    return asn1_fromSPKI(spki, alg, options);
};

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/jwk_to_key.js



function subtleMapping(jwk) {
    let algorithm;
    let keyUsages;
    switch(jwk.kty){
        case "oct":
            {
                switch(jwk.alg){
                    case "HS256":
                    case "HS384":
                    case "HS512":
                        algorithm = {
                            name: "HMAC",
                            hash: `SHA-${jwk.alg.slice(-3)}`
                        };
                        keyUsages = [
                            "sign",
                            "verify"
                        ];
                        break;
                    case "A128CBC-HS256":
                    case "A192CBC-HS384":
                    case "A256CBC-HS512":
                        throw new JOSENotSupported(`${jwk.alg} keys cannot be imported as CryptoKey instances`);
                    case "A128GCM":
                    case "A192GCM":
                    case "A256GCM":
                    case "A128GCMKW":
                    case "A192GCMKW":
                    case "A256GCMKW":
                        algorithm = {
                            name: "AES-GCM"
                        };
                        keyUsages = [
                            "encrypt",
                            "decrypt"
                        ];
                        break;
                    case "A128KW":
                    case "A192KW":
                    case "A256KW":
                        algorithm = {
                            name: "AES-KW"
                        };
                        keyUsages = [
                            "wrapKey",
                            "unwrapKey"
                        ];
                        break;
                    case "PBES2-HS256+A128KW":
                    case "PBES2-HS384+A192KW":
                    case "PBES2-HS512+A256KW":
                        algorithm = {
                            name: "PBKDF2"
                        };
                        keyUsages = [
                            "deriveBits"
                        ];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case "RSA":
            {
                switch(jwk.alg){
                    case "PS256":
                    case "PS384":
                    case "PS512":
                        algorithm = {
                            name: "RSA-PSS",
                            hash: `SHA-${jwk.alg.slice(-3)}`
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "RS256":
                    case "RS384":
                    case "RS512":
                        algorithm = {
                            name: "RSASSA-PKCS1-v1_5",
                            hash: `SHA-${jwk.alg.slice(-3)}`
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "RSA-OAEP":
                    case "RSA-OAEP-256":
                    case "RSA-OAEP-384":
                    case "RSA-OAEP-512":
                        algorithm = {
                            name: "RSA-OAEP",
                            hash: `SHA-${parseInt(jwk.alg.slice(-3), 10) || 1}`
                        };
                        keyUsages = jwk.d ? [
                            "decrypt",
                            "unwrapKey"
                        ] : [
                            "encrypt",
                            "wrapKey"
                        ];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case "EC":
            {
                switch(jwk.alg){
                    case "ES256":
                        algorithm = {
                            name: "ECDSA",
                            namedCurve: "P-256"
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ES384":
                        algorithm = {
                            name: "ECDSA",
                            namedCurve: "P-384"
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ES512":
                        algorithm = {
                            name: "ECDSA",
                            namedCurve: "P-521"
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ECDH-ES":
                    case "ECDH-ES+A128KW":
                    case "ECDH-ES+A192KW":
                    case "ECDH-ES+A256KW":
                        algorithm = {
                            name: "ECDH",
                            namedCurve: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            "deriveBits"
                        ] : [];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        case "OKP":
            {
                switch(jwk.alg){
                    case "EdDSA":
                        algorithm = {
                            name: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            "sign"
                        ] : [
                            "verify"
                        ];
                        break;
                    case "ECDH-ES":
                    case "ECDH-ES+A128KW":
                    case "ECDH-ES+A192KW":
                    case "ECDH-ES+A256KW":
                        algorithm = {
                            name: jwk.crv
                        };
                        keyUsages = jwk.d ? [
                            "deriveBits"
                        ] : [];
                        break;
                    default:
                        throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
                }
                break;
            }
        default:
            throw new JOSENotSupported('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
    }
    return {
        algorithm,
        keyUsages
    };
}
const parse = async (jwk)=>{
    var _a, _b;
    if (!jwk.alg) {
        throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
    }
    const { algorithm, keyUsages } = subtleMapping(jwk);
    const rest = [
        algorithm,
        (_a = jwk.ext) !== null && _a !== void 0 ? _a : false,
        (_b = jwk.key_ops) !== null && _b !== void 0 ? _b : keyUsages
    ];
    if (algorithm.name === "PBKDF2") {
        return crypto.subtle.importKey("raw", base64url(jwk.k), ...rest);
    }
    const keyData = {
        ...jwk
    };
    delete keyData.alg;
    delete keyData.use;
    return crypto.subtle.importKey("jwk", keyData, ...rest);
};
/* harmony default export */ const jwk_to_key = ((/* unused pure expression or super */ null && (parse)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/key/import.js





async function importSPKI(spki, alg, options) {
    if (typeof spki !== "string" || spki.indexOf("-----BEGIN PUBLIC KEY-----") !== 0) {
        throw new TypeError('"spki" must be SPKI formatted string');
    }
    return fromSPKI(spki, alg, options);
}
async function importX509(x509, alg, options) {
    if (typeof x509 !== "string" || x509.indexOf("-----BEGIN CERTIFICATE-----") !== 0) {
        throw new TypeError('"x509" must be X.509 formatted string');
    }
    return fromX509(x509, alg, options);
}
async function importPKCS8(pkcs8, alg, options) {
    if (typeof pkcs8 !== "string" || pkcs8.indexOf("-----BEGIN PRIVATE KEY-----") !== 0) {
        throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
    }
    return fromPKCS8(pkcs8, alg, options);
}
async function import_importJWK(jwk, alg, octAsKeyObject) {
    var _a;
    if (!isObject(jwk)) {
        throw new TypeError("JWK must be an object");
    }
    alg || (alg = jwk.alg);
    switch(jwk.kty){
        case "oct":
            if (typeof jwk.k !== "string" || !jwk.k) {
                throw new TypeError('missing "k" (Key Value) Parameter value');
            }
            octAsKeyObject !== null && octAsKeyObject !== void 0 ? octAsKeyObject : octAsKeyObject = jwk.ext !== true;
            if (octAsKeyObject) {
                return asKeyObject({
                    ...jwk,
                    alg,
                    ext: (_a = jwk.ext) !== null && _a !== void 0 ? _a : false
                });
            }
            return decodeBase64URL(jwk.k);
        case "RSA":
            if (jwk.oth !== undefined) {
                throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');
            }
        case "EC":
        case "OKP":
            return asKeyObject({
                ...jwk,
                alg
            });
        default:
            throw new JOSENotSupported('Unsupported "kty" (Key Type) Parameter value');
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/encrypt.js








async function cbcEncrypt(enc, plaintext, cek, iv, aad) {
    if (!(cek instanceof Uint8Array)) {
        throw new TypeError(invalidKeyInput(cek, "Uint8Array"));
    }
    const keySize = parseInt(enc.slice(1, 4), 10);
    const encKey = await crypto.subtle.importKey("raw", cek.subarray(keySize >> 3), "AES-CBC", false, [
        "encrypt"
    ]);
    const macKey = await crypto.subtle.importKey("raw", cek.subarray(0, keySize >> 3), {
        hash: `SHA-${keySize << 1}`,
        name: "HMAC"
    }, false, [
        "sign"
    ]);
    const ciphertext = new Uint8Array(await crypto.subtle.encrypt({
        iv,
        name: "AES-CBC"
    }, encKey, plaintext));
    const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3));
    const tag = new Uint8Array((await crypto.subtle.sign("HMAC", macKey, macData)).slice(0, keySize >> 3));
    return {
        ciphertext,
        tag
    };
}
async function gcmEncrypt(enc, plaintext, cek, iv, aad) {
    let encKey;
    if (cek instanceof Uint8Array) {
        encKey = await crypto.subtle.importKey("raw", cek, "AES-GCM", false, [
            "encrypt"
        ]);
    } else {
        checkEncCryptoKey(cek, enc, "encrypt");
        encKey = cek;
    }
    const encrypted = new Uint8Array(await crypto.subtle.encrypt({
        additionalData: aad,
        iv,
        name: "AES-GCM",
        tagLength: 128
    }, encKey, plaintext));
    const tag = encrypted.slice(-16);
    const ciphertext = encrypted.slice(0, -16);
    return {
        ciphertext,
        tag
    };
}
const encrypt_encrypt = async (enc, plaintext, cek, iv, aad)=>{
    if (!isCryptoKey(cek) && !(cek instanceof Uint8Array)) {
        throw new TypeError(invalidKeyInput(cek, ...types, "Uint8Array"));
    }
    checkIvLength(enc, iv);
    switch(enc){
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(-3), 10));
            return cbcEncrypt(enc, plaintext, cek, iv, aad);
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
            if (cek instanceof Uint8Array) checkCekLength(cek, parseInt(enc.slice(1, 4), 10));
            return gcmEncrypt(enc, plaintext, cek, iv, aad);
        default:
            throw new JOSENotSupported("Unsupported JWE Content Encryption Algorithm");
    }
};
/* harmony default export */ const runtime_encrypt = ((/* unused pure expression or super */ null && (encrypt_encrypt)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/aesgcmkw.js




async function aesgcmkw_wrap(alg, key, cek, iv) {
    const jweAlgorithm = alg.slice(0, 7);
    iv || (iv = generateIv(jweAlgorithm));
    const { ciphertext: encryptedKey, tag } = await encrypt(jweAlgorithm, cek, key, iv, new Uint8Array(0));
    return {
        encryptedKey,
        iv: base64url(iv),
        tag: base64url(tag)
    };
}
async function aesgcmkw_unwrap(alg, key, encryptedKey, iv, tag) {
    const jweAlgorithm = alg.slice(0, 7);
    return decrypt(jweAlgorithm, key, encryptedKey, iv, tag, new Uint8Array(0));
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/decrypt_key_management.js











async function decrypt_key_management_decryptKeyManagement(alg, key, encryptedKey, joseHeader, options) {
    checkKeyType(alg, key, "decrypt");
    switch(alg){
        case "dir":
            {
                if (encryptedKey !== undefined) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
                return key;
            }
        case "ECDH-ES":
            if (encryptedKey !== undefined) throw new JWEInvalid("Encountered unexpected JWE Encrypted Key");
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
            {
                if (!isObject(joseHeader.epk)) throw new JWEInvalid(`JOSE Header "epk" (Ephemeral Public Key) missing or invalid`);
                if (!ECDH.ecdhAllowed(key)) throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
                const epk = await importJWK(joseHeader.epk, alg);
                let partyUInfo;
                let partyVInfo;
                if (joseHeader.apu !== undefined) {
                    if (typeof joseHeader.apu !== "string") throw new JWEInvalid(`JOSE Header "apu" (Agreement PartyUInfo) invalid`);
                    partyUInfo = base64url(joseHeader.apu);
                }
                if (joseHeader.apv !== undefined) {
                    if (typeof joseHeader.apv !== "string") throw new JWEInvalid(`JOSE Header "apv" (Agreement PartyVInfo) invalid`);
                    partyVInfo = base64url(joseHeader.apv);
                }
                const sharedSecret = await ECDH.deriveKey(epk, key, alg === "ECDH-ES" ? joseHeader.enc : alg, alg === "ECDH-ES" ? cekLength(joseHeader.enc) : parseInt(alg.slice(-5, -2), 10), partyUInfo, partyVInfo);
                if (alg === "ECDH-ES") return sharedSecret;
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                return aesKw(alg.slice(-6), sharedSecret, encryptedKey);
            }
        case "RSA1_5":
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                return rsaEs(alg, key, encryptedKey);
            }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                if (typeof joseHeader.p2c !== "number") throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) missing or invalid`);
                const p2cLimit = (options === null || options === void 0 ? void 0 : options.maxPBES2Count) || 10000;
                if (joseHeader.p2c > p2cLimit) throw new JWEInvalid(`JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds`);
                if (typeof joseHeader.p2s !== "string") throw new JWEInvalid(`JOSE Header "p2s" (PBES2 Salt) missing or invalid`);
                return pbes2Kw(alg, key, encryptedKey, joseHeader.p2c, base64url(joseHeader.p2s));
            }
        case "A128KW":
        case "A192KW":
        case "A256KW":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                return aesKw(alg, key, encryptedKey);
            }
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW":
            {
                if (encryptedKey === undefined) throw new JWEInvalid("JWE Encrypted Key missing");
                if (typeof joseHeader.iv !== "string") throw new JWEInvalid(`JOSE Header "iv" (Initialization Vector) missing or invalid`);
                if (typeof joseHeader.tag !== "string") throw new JWEInvalid(`JOSE Header "tag" (Authentication Tag) missing or invalid`);
                const iv = base64url(joseHeader.iv);
                const tag = base64url(joseHeader.tag);
                return aesGcmKw(alg, key, encryptedKey, iv, tag);
            }
        default:
            {
                throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
            }
    }
}
/* harmony default export */ const decrypt_key_management = ((/* unused pure expression or super */ null && (decrypt_key_management_decryptKeyManagement)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/validate_crit.js

function validate_crit_validateCrit(Err, recognizedDefault, recognizedOption, protectedHeader, joseHeader) {
    if (joseHeader.crit !== undefined && protectedHeader.crit === undefined) {
        throw new Err('"crit" (Critical) Header Parameter MUST be integrity protected');
    }
    if (!protectedHeader || protectedHeader.crit === undefined) {
        return new Set();
    }
    if (!Array.isArray(protectedHeader.crit) || protectedHeader.crit.length === 0 || protectedHeader.crit.some((input)=>typeof input !== "string" || input.length === 0)) {
        throw new Err('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
    }
    let recognized;
    if (recognizedOption !== undefined) {
        recognized = new Map([
            ...Object.entries(recognizedOption),
            ...recognizedDefault.entries()
        ]);
    } else {
        recognized = recognizedDefault;
    }
    for (const parameter of protectedHeader.crit){
        if (!recognized.has(parameter)) {
            throw new JOSENotSupported(`Extension Header Parameter "${parameter}" is not recognized`);
        }
        if (joseHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" is missing`);
        } else if (recognized.get(parameter) && protectedHeader[parameter] === undefined) {
            throw new Err(`Extension Header Parameter "${parameter}" MUST be integrity protected`);
        }
    }
    return new Set(protectedHeader.crit);
}
/* harmony default export */ const validate_crit = ((/* unused pure expression or super */ null && (validate_crit_validateCrit)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/flattened/decrypt.js











async function decrypt_flattenedDecrypt(jwe, key, options) {
    var _a;
    if (!isObject(jwe)) {
        throw new JWEInvalid("Flattened JWE must be an object");
    }
    if (jwe.protected === undefined && jwe.header === undefined && jwe.unprotected === undefined) {
        throw new JWEInvalid("JOSE Header missing");
    }
    if (typeof jwe.iv !== "string") {
        throw new JWEInvalid("JWE Initialization Vector missing or incorrect type");
    }
    if (typeof jwe.ciphertext !== "string") {
        throw new JWEInvalid("JWE Ciphertext missing or incorrect type");
    }
    if (typeof jwe.tag !== "string") {
        throw new JWEInvalid("JWE Authentication Tag missing or incorrect type");
    }
    if (jwe.protected !== undefined && typeof jwe.protected !== "string") {
        throw new JWEInvalid("JWE Protected Header incorrect type");
    }
    if (jwe.encrypted_key !== undefined && typeof jwe.encrypted_key !== "string") {
        throw new JWEInvalid("JWE Encrypted Key incorrect type");
    }
    if (jwe.aad !== undefined && typeof jwe.aad !== "string") {
        throw new JWEInvalid("JWE AAD incorrect type");
    }
    if (jwe.header !== undefined && !isObject(jwe.header)) {
        throw new JWEInvalid("JWE Shared Unprotected Header incorrect type");
    }
    if (jwe.unprotected !== undefined && !isObject(jwe.unprotected)) {
        throw new JWEInvalid("JWE Per-Recipient Unprotected Header incorrect type");
    }
    let parsedProt;
    if (jwe.protected) {
        try {
            const protectedHeader = base64url(jwe.protected);
            parsedProt = JSON.parse(decoder.decode(protectedHeader));
        } catch (_b) {
            throw new JWEInvalid("JWE Protected Header is invalid");
        }
    }
    if (!isDisjoint(parsedProt, jwe.header, jwe.unprotected)) {
        throw new JWEInvalid("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
        ...parsedProt,
        ...jwe.header,
        ...jwe.unprotected
    };
    validateCrit(JWEInvalid, new Map(), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    if (joseHeader.zip !== undefined) {
        if (!parsedProt || !parsedProt.zip) {
            throw new JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
        }
        if (joseHeader.zip !== "DEF") {
            throw new JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
        }
    }
    const { alg, enc } = joseHeader;
    if (typeof alg !== "string" || !alg) {
        throw new JWEInvalid("missing JWE Algorithm (alg) in JWE Header");
    }
    if (typeof enc !== "string" || !enc) {
        throw new JWEInvalid("missing JWE Encryption Algorithm (enc) in JWE Header");
    }
    const keyManagementAlgorithms = options && validateAlgorithms("keyManagementAlgorithms", options.keyManagementAlgorithms);
    const contentEncryptionAlgorithms = options && validateAlgorithms("contentEncryptionAlgorithms", options.contentEncryptionAlgorithms);
    if (keyManagementAlgorithms && !keyManagementAlgorithms.has(alg)) {
        throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (contentEncryptionAlgorithms && !contentEncryptionAlgorithms.has(enc)) {
        throw new JOSEAlgNotAllowed('"enc" (Encryption Algorithm) Header Parameter not allowed');
    }
    let encryptedKey;
    if (jwe.encrypted_key !== undefined) {
        encryptedKey = base64url(jwe.encrypted_key);
    }
    let resolvedKey = false;
    if (typeof key === "function") {
        key = await key(parsedProt, jwe);
        resolvedKey = true;
    }
    let cek;
    try {
        cek = await decryptKeyManagement(alg, key, encryptedKey, joseHeader, options);
    } catch (err) {
        if (err instanceof TypeError || err instanceof JWEInvalid || err instanceof JOSENotSupported) {
            throw err;
        }
        cek = generateCek(enc);
    }
    const iv = base64url(jwe.iv);
    const tag = base64url(jwe.tag);
    const protectedHeader = encoder.encode((_a = jwe.protected) !== null && _a !== void 0 ? _a : "");
    let additionalData;
    if (jwe.aad !== undefined) {
        additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(jwe.aad));
    } else {
        additionalData = protectedHeader;
    }
    let plaintext = await decrypt(enc, cek, base64url(jwe.ciphertext), iv, tag, additionalData);
    if (joseHeader.zip === "DEF") {
        plaintext = await ((options === null || options === void 0 ? void 0 : options.inflateRaw) || inflate)(plaintext);
    }
    const result = {
        plaintext
    };
    if (jwe.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jwe.aad !== undefined) {
        result.additionalAuthenticatedData = base64url(jwe.aad);
    }
    if (jwe.unprotected !== undefined) {
        result.sharedUnprotectedHeader = jwe.unprotected;
    }
    if (jwe.header !== undefined) {
        result.unprotectedHeader = jwe.header;
    }
    if (resolvedKey) {
        return {
            ...result,
            key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/compact/decrypt.js



async function decrypt_compactDecrypt(jwe, key, options) {
    if (jwe instanceof Uint8Array) {
        jwe = decoder.decode(jwe);
    }
    if (typeof jwe !== "string") {
        throw new JWEInvalid("Compact JWE must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: encryptedKey, 2: iv, 3: ciphertext, 4: tag, length } = jwe.split(".");
    if (length !== 5) {
        throw new JWEInvalid("Invalid Compact JWE");
    }
    const decrypted = await flattenedDecrypt({
        ciphertext,
        iv: iv || undefined,
        protected: protectedHeader || undefined,
        tag: tag || undefined,
        encrypted_key: encryptedKey || undefined
    }, key, options);
    const result = {
        plaintext: decrypted.plaintext,
        protectedHeader: decrypted.protectedHeader
    };
    if (typeof key === "function") {
        return {
            ...result,
            key: decrypted.key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/general/decrypt.js



async function generalDecrypt(jwe, key, options) {
    if (!isObject(jwe)) {
        throw new JWEInvalid("General JWE must be an object");
    }
    if (!Array.isArray(jwe.recipients) || !jwe.recipients.every(isObject)) {
        throw new JWEInvalid("JWE Recipients missing or incorrect type");
    }
    if (!jwe.recipients.length) {
        throw new JWEInvalid("JWE Recipients has no members");
    }
    for (const recipient of jwe.recipients){
        try {
            return await flattenedDecrypt({
                aad: jwe.aad,
                ciphertext: jwe.ciphertext,
                encrypted_key: recipient.encrypted_key,
                header: recipient.header,
                iv: jwe.iv,
                protected: jwe.protected,
                tag: jwe.tag,
                unprotected: jwe.unprotected
            }, key, options);
        } catch (_a) {}
    }
    throw new JWEDecryptionFailed();
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/key_to_jwk.js




const key_to_jwk_keyToJWK = async (key)=>{
    if (key instanceof Uint8Array) {
        return {
            kty: "oct",
            k: base64url(key)
        };
    }
    if (!isCryptoKey(key)) {
        throw new TypeError(invalidKeyInput(key, ...types, "Uint8Array"));
    }
    if (!key.extractable) {
        throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
    }
    const { ext, key_ops, alg, use, ...jwk } = await crypto.subtle.exportKey("jwk", key);
    return jwk;
};
/* harmony default export */ const key_to_jwk = ((/* unused pure expression or super */ null && (key_to_jwk_keyToJWK)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/key/export.js



async function exportSPKI(key) {
    return exportPublic(key);
}
async function exportPKCS8(key) {
    return exportPrivate(key);
}
async function export_exportJWK(key) {
    return keyToJWK(key);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/encrypt_key_management.js










async function encrypt_key_management_encryptKeyManagement(alg, enc, key, providedCek, providedParameters = {}) {
    let encryptedKey;
    let parameters;
    let cek;
    checkKeyType(alg, key, "encrypt");
    switch(alg){
        case "dir":
            {
                cek = key;
                break;
            }
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
            {
                if (!ECDH.ecdhAllowed(key)) {
                    throw new JOSENotSupported("ECDH with the provided key is not allowed or not supported by your javascript runtime");
                }
                const { apu, apv } = providedParameters;
                let { epk: ephemeralKey } = providedParameters;
                ephemeralKey || (ephemeralKey = (await ECDH.generateEpk(key)).privateKey);
                const { x, y, crv, kty } = await exportJWK(ephemeralKey);
                const sharedSecret = await ECDH.deriveKey(key, ephemeralKey, alg === "ECDH-ES" ? enc : alg, alg === "ECDH-ES" ? cekLength(enc) : parseInt(alg.slice(-5, -2), 10), apu, apv);
                parameters = {
                    epk: {
                        x,
                        crv,
                        kty
                    }
                };
                if (kty === "EC") parameters.epk.y = y;
                if (apu) parameters.apu = base64url(apu);
                if (apv) parameters.apv = base64url(apv);
                if (alg === "ECDH-ES") {
                    cek = sharedSecret;
                    break;
                }
                cek = providedCek || generateCek(enc);
                const kwAlg = alg.slice(-6);
                encryptedKey = await aesKw(kwAlg, sharedSecret, cek);
                break;
            }
        case "RSA1_5":
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            {
                cek = providedCek || generateCek(enc);
                encryptedKey = await rsaEs(alg, key, cek);
                break;
            }
        case "PBES2-HS256+A128KW":
        case "PBES2-HS384+A192KW":
        case "PBES2-HS512+A256KW":
            {
                cek = providedCek || generateCek(enc);
                const { p2c, p2s } = providedParameters;
                ({ encryptedKey, ...parameters } = await pbes2Kw(alg, key, cek, p2c, p2s));
                break;
            }
        case "A128KW":
        case "A192KW":
        case "A256KW":
            {
                cek = providedCek || generateCek(enc);
                encryptedKey = await aesKw(alg, key, cek);
                break;
            }
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW":
            {
                cek = providedCek || generateCek(enc);
                const { iv } = providedParameters;
                ({ encryptedKey, ...parameters } = await aesGcmKw(alg, key, cek, iv));
                break;
            }
        default:
            {
                throw new JOSENotSupported('Invalid or unsupported "alg" (JWE Algorithm) header value');
            }
    }
    return {
        cek,
        encryptedKey,
        parameters
    };
}
/* harmony default export */ const encrypt_key_management = ((/* unused pure expression or super */ null && (encrypt_key_management_encryptKeyManagement)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/flattened/encrypt.js









const encrypt_unprotected = Symbol();
class encrypt_FlattenedEncrypt {
    constructor(plaintext){
        if (!(plaintext instanceof Uint8Array)) {
            throw new TypeError("plaintext must be an instance of Uint8Array");
        }
        this._plaintext = plaintext;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError("setKeyManagementParameters can only be called once");
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._sharedUnprotectedHeader) {
            throw new TypeError("setSharedUnprotectedHeader can only be called once");
        }
        this._sharedUnprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError("setContentEncryptionKey can only be called once");
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError("setInitializationVector can only be called once");
        }
        this._iv = iv;
        return this;
    }
    async encrypt(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader && !this._sharedUnprotectedHeader) {
            throw new JWEInvalid("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
        }
        if (!isDisjoint(this._protectedHeader, this._unprotectedHeader, this._sharedUnprotectedHeader)) {
            throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader,
            ...this._sharedUnprotectedHeader
        };
        validateCrit(JWEInvalid, new Map(), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        if (joseHeader.zip !== undefined) {
            if (!this._protectedHeader || !this._protectedHeader.zip) {
                throw new JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
            }
            if (joseHeader.zip !== "DEF") {
                throw new JOSENotSupported('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value');
            }
        }
        const { alg, enc } = joseHeader;
        if (typeof alg !== "string" || !alg) {
            throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
        }
        if (typeof enc !== "string" || !enc) {
            throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
        }
        let encryptedKey;
        if (alg === "dir") {
            if (this._cek) {
                throw new TypeError("setContentEncryptionKey cannot be called when using Direct Encryption");
            }
        } else if (alg === "ECDH-ES") {
            if (this._cek) {
                throw new TypeError("setContentEncryptionKey cannot be called when using Direct Key Agreement");
            }
        }
        let cek;
        {
            let parameters;
            ({ cek, encryptedKey, parameters } = await encryptKeyManagement(alg, enc, key, this._cek, this._keyManagementParameters));
            if (parameters) {
                if (options && encrypt_unprotected in options) {
                    if (!this._unprotectedHeader) {
                        this.setUnprotectedHeader(parameters);
                    } else {
                        this._unprotectedHeader = {
                            ...this._unprotectedHeader,
                            ...parameters
                        };
                    }
                } else {
                    if (!this._protectedHeader) {
                        this.setProtectedHeader(parameters);
                    } else {
                        this._protectedHeader = {
                            ...this._protectedHeader,
                            ...parameters
                        };
                    }
                }
            }
        }
        this._iv || (this._iv = generateIv(enc));
        let additionalData;
        let protectedHeader;
        let aadMember;
        if (this._protectedHeader) {
            protectedHeader = encoder.encode(base64url(JSON.stringify(this._protectedHeader)));
        } else {
            protectedHeader = encoder.encode("");
        }
        if (this._aad) {
            aadMember = base64url(this._aad);
            additionalData = concat(protectedHeader, encoder.encode("."), encoder.encode(aadMember));
        } else {
            additionalData = protectedHeader;
        }
        let ciphertext;
        let tag;
        if (joseHeader.zip === "DEF") {
            const deflated = await ((options === null || options === void 0 ? void 0 : options.deflateRaw) || deflate)(this._plaintext);
            ({ ciphertext, tag } = await encrypt(enc, deflated, cek, this._iv, additionalData));
        } else {
            ;
            ({ ciphertext, tag } = await encrypt(enc, this._plaintext, cek, this._iv, additionalData));
        }
        const jwe = {
            ciphertext: base64url(ciphertext),
            iv: base64url(this._iv),
            tag: base64url(tag)
        };
        if (encryptedKey) {
            jwe.encrypted_key = base64url(encryptedKey);
        }
        if (aadMember) {
            jwe.aad = aadMember;
        }
        if (this._protectedHeader) {
            jwe.protected = decoder.decode(protectedHeader);
        }
        if (this._sharedUnprotectedHeader) {
            jwe.unprotected = this._sharedUnprotectedHeader;
        }
        if (this._unprotectedHeader) {
            jwe.header = this._unprotectedHeader;
        }
        return jwe;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/general/encrypt.js







class IndividualRecipient {
    constructor(enc, key, options){
        this.parent = enc;
        this.key = key;
        this.options = options;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this.unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this.unprotectedHeader = unprotectedHeader;
        return this;
    }
    addRecipient(...args) {
        return this.parent.addRecipient(...args);
    }
    encrypt(...args) {
        return this.parent.encrypt(...args);
    }
    done() {
        return this.parent;
    }
}
class GeneralEncrypt {
    constructor(plaintext){
        this._recipients = [];
        this._plaintext = plaintext;
    }
    addRecipient(key, options) {
        const recipient = new IndividualRecipient(this, key, {
            crit: options === null || options === void 0 ? void 0 : options.crit
        });
        this._recipients.push(recipient);
        return recipient;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setSharedUnprotectedHeader(sharedUnprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError("setSharedUnprotectedHeader can only be called once");
        }
        this._unprotectedHeader = sharedUnprotectedHeader;
        return this;
    }
    setAdditionalAuthenticatedData(aad) {
        this._aad = aad;
        return this;
    }
    async encrypt(options) {
        var _a, _b, _c;
        if (!this._recipients.length) {
            throw new JWEInvalid("at least one recipient must be added");
        }
        options = {
            deflateRaw: options === null || options === void 0 ? void 0 : options.deflateRaw
        };
        if (this._recipients.length === 1) {
            const [recipient] = this._recipients;
            const flattened = await new FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).encrypt(recipient.key, {
                ...recipient.options,
                ...options
            });
            let jwe = {
                ciphertext: flattened.ciphertext,
                iv: flattened.iv,
                recipients: [
                    {}
                ],
                tag: flattened.tag
            };
            if (flattened.aad) jwe.aad = flattened.aad;
            if (flattened.protected) jwe.protected = flattened.protected;
            if (flattened.unprotected) jwe.unprotected = flattened.unprotected;
            if (flattened.encrypted_key) jwe.recipients[0].encrypted_key = flattened.encrypted_key;
            if (flattened.header) jwe.recipients[0].header = flattened.header;
            return jwe;
        }
        let enc;
        for(let i = 0; i < this._recipients.length; i++){
            const recipient = this._recipients[i];
            if (!isDisjoint(this._protectedHeader, this._unprotectedHeader, recipient.unprotectedHeader)) {
                throw new JWEInvalid("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
            }
            const joseHeader = {
                ...this._protectedHeader,
                ...this._unprotectedHeader,
                ...recipient.unprotectedHeader
            };
            const { alg } = joseHeader;
            if (typeof alg !== "string" || !alg) {
                throw new JWEInvalid('JWE "alg" (Algorithm) Header Parameter missing or invalid');
            }
            if (alg === "dir" || alg === "ECDH-ES") {
                throw new JWEInvalid('"dir" and "ECDH-ES" alg may only be used with a single recipient');
            }
            if (typeof joseHeader.enc !== "string" || !joseHeader.enc) {
                throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
            }
            if (!enc) {
                enc = joseHeader.enc;
            } else if (enc !== joseHeader.enc) {
                throw new JWEInvalid('JWE "enc" (Encryption Algorithm) Header Parameter must be the same for all recipients');
            }
            validateCrit(JWEInvalid, new Map(), recipient.options.crit, this._protectedHeader, joseHeader);
            if (joseHeader.zip !== undefined) {
                if (!this._protectedHeader || !this._protectedHeader.zip) {
                    throw new JWEInvalid('JWE "zip" (Compression Algorithm) Header MUST be integrity protected');
                }
            }
        }
        const cek = generateCek(enc);
        let jwe = {
            ciphertext: "",
            iv: "",
            recipients: [],
            tag: ""
        };
        for(let i = 0; i < this._recipients.length; i++){
            const recipient = this._recipients[i];
            const target = {};
            jwe.recipients.push(target);
            const joseHeader = {
                ...this._protectedHeader,
                ...this._unprotectedHeader,
                ...recipient.unprotectedHeader
            };
            const p2c = joseHeader.alg.startsWith("PBES2") ? 2048 + i : undefined;
            if (i === 0) {
                const flattened = await new FlattenedEncrypt(this._plaintext).setAdditionalAuthenticatedData(this._aad).setContentEncryptionKey(cek).setProtectedHeader(this._protectedHeader).setSharedUnprotectedHeader(this._unprotectedHeader).setUnprotectedHeader(recipient.unprotectedHeader).setKeyManagementParameters({
                    p2c
                }).encrypt(recipient.key, {
                    ...recipient.options,
                    ...options,
                    [unprotected]: true
                });
                jwe.ciphertext = flattened.ciphertext;
                jwe.iv = flattened.iv;
                jwe.tag = flattened.tag;
                if (flattened.aad) jwe.aad = flattened.aad;
                if (flattened.protected) jwe.protected = flattened.protected;
                if (flattened.unprotected) jwe.unprotected = flattened.unprotected;
                target.encrypted_key = flattened.encrypted_key;
                if (flattened.header) target.header = flattened.header;
                continue;
            }
            const { encryptedKey, parameters } = await encryptKeyManagement(((_a = recipient.unprotectedHeader) === null || _a === void 0 ? void 0 : _a.alg) || ((_b = this._protectedHeader) === null || _b === void 0 ? void 0 : _b.alg) || ((_c = this._unprotectedHeader) === null || _c === void 0 ? void 0 : _c.alg), enc, recipient.key, cek, {
                p2c
            });
            target.encrypted_key = base64url(encryptedKey);
            if (recipient.unprotectedHeader || parameters) target.header = {
                ...recipient.unprotectedHeader,
                ...parameters
            };
        }
        return jwe;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/subtle_dsa.js

function subtleDsa(alg, algorithm) {
    const hash = `SHA-${alg.slice(-3)}`;
    switch(alg){
        case "HS256":
        case "HS384":
        case "HS512":
            return {
                hash,
                name: "HMAC"
            };
        case "PS256":
        case "PS384":
        case "PS512":
            return {
                hash,
                name: "RSA-PSS",
                saltLength: alg.slice(-3) >> 3
            };
        case "RS256":
        case "RS384":
        case "RS512":
            return {
                hash,
                name: "RSASSA-PKCS1-v1_5"
            };
        case "ES256":
        case "ES384":
        case "ES512":
            return {
                hash,
                name: "ECDSA",
                namedCurve: algorithm.namedCurve
            };
        case "EdDSA":
            return {
                name: algorithm.name
            };
        default:
            throw new JOSENotSupported(`alg ${alg} is not supported either by JOSE or your javascript runtime`);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/verify.js




const verify_verify = async (alg, key, signature, data)=>{
    const cryptoKey = await getVerifyKey(alg, key, "verify");
    checkKeyLength(alg, cryptoKey);
    const algorithm = subtleAlgorithm(alg, cryptoKey.algorithm);
    try {
        return await crypto.subtle.verify(algorithm, cryptoKey, signature, data);
    } catch (_a) {
        return false;
    }
};
/* harmony default export */ const runtime_verify = ((/* unused pure expression or super */ null && (verify_verify)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/flattened/verify.js









async function verify_flattenedVerify(jws, key, options) {
    var _a;
    if (!isObject(jws)) {
        throw new JWSInvalid("Flattened JWS must be an object");
    }
    if (jws.protected === undefined && jws.header === undefined) {
        throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');
    }
    if (jws.protected !== undefined && typeof jws.protected !== "string") {
        throw new JWSInvalid("JWS Protected Header incorrect type");
    }
    if (jws.payload === undefined) {
        throw new JWSInvalid("JWS Payload missing");
    }
    if (typeof jws.signature !== "string") {
        throw new JWSInvalid("JWS Signature missing or incorrect type");
    }
    if (jws.header !== undefined && !isObject(jws.header)) {
        throw new JWSInvalid("JWS Unprotected Header incorrect type");
    }
    let parsedProt = {};
    if (jws.protected) {
        try {
            const protectedHeader = base64url(jws.protected);
            parsedProt = JSON.parse(decoder.decode(protectedHeader));
        } catch (_b) {
            throw new JWSInvalid("JWS Protected Header is invalid");
        }
    }
    if (!isDisjoint(parsedProt, jws.header)) {
        throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    }
    const joseHeader = {
        ...parsedProt,
        ...jws.header
    };
    const extensions = validateCrit(JWSInvalid, new Map([
        [
            "b64",
            true
        ]
    ]), options === null || options === void 0 ? void 0 : options.crit, parsedProt, joseHeader);
    let b64 = true;
    if (extensions.has("b64")) {
        b64 = parsedProt.b64;
        if (typeof b64 !== "boolean") {
            throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
        }
    }
    const { alg } = joseHeader;
    if (typeof alg !== "string" || !alg) {
        throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    }
    const algorithms = options && validateAlgorithms("algorithms", options.algorithms);
    if (algorithms && !algorithms.has(alg)) {
        throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');
    }
    if (b64) {
        if (typeof jws.payload !== "string") {
            throw new JWSInvalid("JWS Payload must be a string");
        }
    } else if (typeof jws.payload !== "string" && !(jws.payload instanceof Uint8Array)) {
        throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");
    }
    let resolvedKey = false;
    if (typeof key === "function") {
        key = await key(parsedProt, jws);
        resolvedKey = true;
    }
    checkKeyType(alg, key, "verify");
    const data = concat(encoder.encode((_a = jws.protected) !== null && _a !== void 0 ? _a : ""), encoder.encode("."), typeof jws.payload === "string" ? encoder.encode(jws.payload) : jws.payload);
    const signature = base64url(jws.signature);
    const verified = await verify(alg, key, signature, data);
    if (!verified) {
        throw new JWSSignatureVerificationFailed();
    }
    let payload;
    if (b64) {
        payload = base64url(jws.payload);
    } else if (typeof jws.payload === "string") {
        payload = encoder.encode(jws.payload);
    } else {
        payload = jws.payload;
    }
    const result = {
        payload
    };
    if (jws.protected !== undefined) {
        result.protectedHeader = parsedProt;
    }
    if (jws.header !== undefined) {
        result.unprotectedHeader = jws.header;
    }
    if (resolvedKey) {
        return {
            ...result,
            key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/compact/verify.js



async function verify_compactVerify(jws, key, options) {
    if (jws instanceof Uint8Array) {
        jws = decoder.decode(jws);
    }
    if (typeof jws !== "string") {
        throw new JWSInvalid("Compact JWS must be a string or Uint8Array");
    }
    const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split(".");
    if (length !== 3) {
        throw new JWSInvalid("Invalid Compact JWS");
    }
    const verified = await flattenedVerify({
        payload,
        protected: protectedHeader,
        signature
    }, key, options);
    const result = {
        payload: verified.payload,
        protectedHeader: verified.protectedHeader
    };
    if (typeof key === "function") {
        return {
            ...result,
            key: verified.key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/general/verify.js



async function generalVerify(jws, key, options) {
    if (!isObject(jws)) {
        throw new JWSInvalid("General JWS must be an object");
    }
    if (!Array.isArray(jws.signatures) || !jws.signatures.every(isObject)) {
        throw new JWSInvalid("JWS Signatures missing or incorrect type");
    }
    for (const signature of jws.signatures){
        try {
            return await flattenedVerify({
                header: signature.header,
                payload: jws.payload,
                protected: signature.protected,
                signature: signature.signature
            }, key, options);
        } catch (_a) {}
    }
    throw new JWSSignatureVerificationFailed();
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/secs.js
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const year = day * 365.25;
const REGEX = /^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;
/* harmony default export */ const lib_secs = ((str)=>{
    const matched = REGEX.exec(str);
    if (!matched) {
        throw new TypeError("Invalid time period format");
    }
    const value = parseFloat(matched[1]);
    const unit = matched[2].toLowerCase();
    switch(unit){
        case "sec":
        case "secs":
        case "second":
        case "seconds":
        case "s":
            return Math.round(value);
        case "minute":
        case "minutes":
        case "min":
        case "mins":
        case "m":
            return Math.round(value * minute);
        case "hour":
        case "hours":
        case "hr":
        case "hrs":
        case "h":
            return Math.round(value * hour);
        case "day":
        case "days":
        case "d":
            return Math.round(value * day);
        case "week":
        case "weeks":
        case "w":
            return Math.round(value * week);
        default:
            return Math.round(value * year);
    }
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/lib/jwt_claims_set.js





const normalizeTyp = (value)=>value.toLowerCase().replace(/^application\//, "");
const checkAudiencePresence = (audPayload, audOption)=>{
    if (typeof audPayload === "string") {
        return audOption.includes(audPayload);
    }
    if (Array.isArray(audPayload)) {
        return audOption.some(Set.prototype.has.bind(new Set(audPayload)));
    }
    return false;
};
/* harmony default export */ const jwt_claims_set = ((protectedHeader, encodedPayload, options = {})=>{
    const { typ } = options;
    if (typ && (typeof protectedHeader.typ !== "string" || normalizeTyp(protectedHeader.typ) !== normalizeTyp(typ))) {
        throw new JWTClaimValidationFailed('unexpected "typ" JWT header value', "typ", "check_failed");
    }
    let payload;
    try {
        payload = JSON.parse(decoder.decode(encodedPayload));
    } catch (_a) {}
    if (!isObject(payload)) {
        throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");
    }
    const { requiredClaims = [], issuer, subject, audience, maxTokenAge } = options;
    if (maxTokenAge !== undefined) requiredClaims.push("iat");
    if (audience !== undefined) requiredClaims.push("aud");
    if (subject !== undefined) requiredClaims.push("sub");
    if (issuer !== undefined) requiredClaims.push("iss");
    for (const claim of new Set(requiredClaims.reverse())){
        if (!(claim in payload)) {
            throw new JWTClaimValidationFailed(`missing required "${claim}" claim`, claim, "missing");
        }
    }
    if (issuer && !(Array.isArray(issuer) ? issuer : [
        issuer
    ]).includes(payload.iss)) {
        throw new JWTClaimValidationFailed('unexpected "iss" claim value', "iss", "check_failed");
    }
    if (subject && payload.sub !== subject) {
        throw new JWTClaimValidationFailed('unexpected "sub" claim value', "sub", "check_failed");
    }
    if (audience && !checkAudiencePresence(payload.aud, typeof audience === "string" ? [
        audience
    ] : audience)) {
        throw new JWTClaimValidationFailed('unexpected "aud" claim value', "aud", "check_failed");
    }
    let tolerance;
    switch(typeof options.clockTolerance){
        case "string":
            tolerance = secs(options.clockTolerance);
            break;
        case "number":
            tolerance = options.clockTolerance;
            break;
        case "undefined":
            tolerance = 0;
            break;
        default:
            throw new TypeError("Invalid clockTolerance option type");
    }
    const { currentDate } = options;
    const now = epoch(currentDate || new Date());
    if ((payload.iat !== undefined || maxTokenAge) && typeof payload.iat !== "number") {
        throw new JWTClaimValidationFailed('"iat" claim must be a number', "iat", "invalid");
    }
    if (payload.nbf !== undefined) {
        if (typeof payload.nbf !== "number") {
            throw new JWTClaimValidationFailed('"nbf" claim must be a number', "nbf", "invalid");
        }
        if (payload.nbf > now + tolerance) {
            throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed', "nbf", "check_failed");
        }
    }
    if (payload.exp !== undefined) {
        if (typeof payload.exp !== "number") {
            throw new JWTClaimValidationFailed('"exp" claim must be a number', "exp", "invalid");
        }
        if (payload.exp <= now - tolerance) {
            throw new JWTExpired('"exp" claim timestamp check failed', "exp", "check_failed");
        }
    }
    if (maxTokenAge) {
        const age = now - payload.iat;
        const max = typeof maxTokenAge === "number" ? maxTokenAge : secs(maxTokenAge);
        if (age - tolerance > max) {
            throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)', "iat", "check_failed");
        }
        if (age < 0 - tolerance) {
            throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)', "iat", "check_failed");
        }
    }
    return payload;
});

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/verify.js



async function jwtVerify(jwt, key, options) {
    var _a;
    const verified = await compactVerify(jwt, key, options);
    if (((_a = verified.protectedHeader.crit) === null || _a === void 0 ? void 0 : _a.includes("b64")) && verified.protectedHeader.b64 === false) {
        throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
    }
    const payload = jwtPayload(verified.protectedHeader, verified.payload, options);
    const result = {
        payload,
        protectedHeader: verified.protectedHeader
    };
    if (typeof key === "function") {
        return {
            ...result,
            key: verified.key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/decrypt.js



async function jwtDecrypt(jwt, key, options) {
    const decrypted = await compactDecrypt(jwt, key, options);
    const payload = jwtPayload(decrypted.protectedHeader, decrypted.plaintext, options);
    const { protectedHeader } = decrypted;
    if (protectedHeader.iss !== undefined && protectedHeader.iss !== payload.iss) {
        throw new JWTClaimValidationFailed('replicated "iss" claim header parameter mismatch', "iss", "mismatch");
    }
    if (protectedHeader.sub !== undefined && protectedHeader.sub !== payload.sub) {
        throw new JWTClaimValidationFailed('replicated "sub" claim header parameter mismatch', "sub", "mismatch");
    }
    if (protectedHeader.aud !== undefined && JSON.stringify(protectedHeader.aud) !== JSON.stringify(payload.aud)) {
        throw new JWTClaimValidationFailed('replicated "aud" claim header parameter mismatch', "aud", "mismatch");
    }
    const result = {
        payload,
        protectedHeader
    };
    if (typeof key === "function") {
        return {
            ...result,
            key: decrypted.key
        };
    }
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwe/compact/encrypt.js

class encrypt_CompactEncrypt {
    constructor(plaintext){
        this._flattened = new FlattenedEncrypt(plaintext);
    }
    setContentEncryptionKey(cek) {
        this._flattened.setContentEncryptionKey(cek);
        return this;
    }
    setInitializationVector(iv) {
        this._flattened.setInitializationVector(iv);
        return this;
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    setKeyManagementParameters(parameters) {
        this._flattened.setKeyManagementParameters(parameters);
        return this;
    }
    async encrypt(key, options) {
        const jwe = await this._flattened.encrypt(key, options);
        return [
            jwe.protected,
            jwe.encrypted_key,
            jwe.iv,
            jwe.ciphertext,
            jwe.tag
        ].join(".");
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/sign.js




const sign_sign = async (alg, key, data)=>{
    const cryptoKey = await getSignKey(alg, key, "sign");
    checkKeyLength(alg, cryptoKey);
    const signature = await crypto.subtle.sign(subtleAlgorithm(alg, cryptoKey.algorithm), cryptoKey, data);
    return new Uint8Array(signature);
};
/* harmony default export */ const runtime_sign = ((/* unused pure expression or super */ null && (sign_sign)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/flattened/sign.js







class sign_FlattenedSign {
    constructor(payload){
        if (!(payload instanceof Uint8Array)) {
            throw new TypeError("payload must be an instance of Uint8Array");
        }
        this._payload = payload;
    }
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this._unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this._unprotectedHeader = unprotectedHeader;
        return this;
    }
    async sign(key, options) {
        if (!this._protectedHeader && !this._unprotectedHeader) {
            throw new JWSInvalid("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
        }
        if (!isDisjoint(this._protectedHeader, this._unprotectedHeader)) {
            throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        }
        const joseHeader = {
            ...this._protectedHeader,
            ...this._unprotectedHeader
        };
        const extensions = validateCrit(JWSInvalid, new Map([
            [
                "b64",
                true
            ]
        ]), options === null || options === void 0 ? void 0 : options.crit, this._protectedHeader, joseHeader);
        let b64 = true;
        if (extensions.has("b64")) {
            b64 = this._protectedHeader.b64;
            if (typeof b64 !== "boolean") {
                throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
            }
        }
        const { alg } = joseHeader;
        if (typeof alg !== "string" || !alg) {
            throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        }
        checkKeyType(alg, key, "sign");
        let payload = this._payload;
        if (b64) {
            payload = encoder.encode(base64url(payload));
        }
        let protectedHeader;
        if (this._protectedHeader) {
            protectedHeader = encoder.encode(base64url(JSON.stringify(this._protectedHeader)));
        } else {
            protectedHeader = encoder.encode("");
        }
        const data = concat(protectedHeader, encoder.encode("."), payload);
        const signature = await sign(alg, key, data);
        const jws = {
            signature: base64url(signature),
            payload: ""
        };
        if (b64) {
            jws.payload = decoder.decode(payload);
        }
        if (this._unprotectedHeader) {
            jws.header = this._unprotectedHeader;
        }
        if (this._protectedHeader) {
            jws.protected = decoder.decode(protectedHeader);
        }
        return jws;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/compact/sign.js

class sign_CompactSign {
    constructor(payload){
        this._flattened = new FlattenedSign(payload);
    }
    setProtectedHeader(protectedHeader) {
        this._flattened.setProtectedHeader(protectedHeader);
        return this;
    }
    async sign(key, options) {
        const jws = await this._flattened.sign(key, options);
        if (jws.payload === undefined) {
            throw new TypeError("use the flattened module for creating JWS with b64: false");
        }
        return `${jws.protected}.${jws.payload}.${jws.signature}`;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jws/general/sign.js


class IndividualSignature {
    constructor(sig, key, options){
        this.parent = sig;
        this.key = key;
        this.options = options;
    }
    setProtectedHeader(protectedHeader) {
        if (this.protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this.protectedHeader = protectedHeader;
        return this;
    }
    setUnprotectedHeader(unprotectedHeader) {
        if (this.unprotectedHeader) {
            throw new TypeError("setUnprotectedHeader can only be called once");
        }
        this.unprotectedHeader = unprotectedHeader;
        return this;
    }
    addSignature(...args) {
        return this.parent.addSignature(...args);
    }
    sign(...args) {
        return this.parent.sign(...args);
    }
    done() {
        return this.parent;
    }
}
class GeneralSign {
    constructor(payload){
        this._signatures = [];
        this._payload = payload;
    }
    addSignature(key, options) {
        const signature = new IndividualSignature(this, key, options);
        this._signatures.push(signature);
        return signature;
    }
    async sign() {
        if (!this._signatures.length) {
            throw new JWSInvalid("at least one signature must be added");
        }
        const jws = {
            signatures: [],
            payload: ""
        };
        for(let i = 0; i < this._signatures.length; i++){
            const signature = this._signatures[i];
            const flattened = new FlattenedSign(this._payload);
            flattened.setProtectedHeader(signature.protectedHeader);
            flattened.setUnprotectedHeader(signature.unprotectedHeader);
            const { payload, ...rest } = await flattened.sign(signature.key, signature.options);
            if (i === 0) {
                jws.payload = payload;
            } else if (jws.payload !== payload) {
                throw new JWSInvalid("inconsistent use of JWS Unencoded Payload (RFC7797)");
            }
            jws.signatures.push(rest);
        }
        return jws;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/produce.js



class produce_ProduceJWT {
    constructor(payload){
        if (!isObject(payload)) {
            throw new TypeError("JWT Claims Set MUST be an object");
        }
        this._payload = payload;
    }
    setIssuer(issuer) {
        this._payload = {
            ...this._payload,
            iss: issuer
        };
        return this;
    }
    setSubject(subject) {
        this._payload = {
            ...this._payload,
            sub: subject
        };
        return this;
    }
    setAudience(audience) {
        this._payload = {
            ...this._payload,
            aud: audience
        };
        return this;
    }
    setJti(jwtId) {
        this._payload = {
            ...this._payload,
            jti: jwtId
        };
        return this;
    }
    setNotBefore(input) {
        if (typeof input === "number") {
            this._payload = {
                ...this._payload,
                nbf: input
            };
        } else {
            this._payload = {
                ...this._payload,
                nbf: epoch(new Date()) + secs(input)
            };
        }
        return this;
    }
    setExpirationTime(input) {
        if (typeof input === "number") {
            this._payload = {
                ...this._payload,
                exp: input
            };
        } else {
            this._payload = {
                ...this._payload,
                exp: epoch(new Date()) + secs(input)
            };
        }
        return this;
    }
    setIssuedAt(input) {
        if (typeof input === "undefined") {
            this._payload = {
                ...this._payload,
                iat: epoch(new Date())
            };
        } else {
            this._payload = {
                ...this._payload,
                iat: input
            };
        }
        return this;
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/sign.js




class SignJWT extends (/* unused pure expression or super */ null && (ProduceJWT)) {
    setProtectedHeader(protectedHeader) {
        this._protectedHeader = protectedHeader;
        return this;
    }
    async sign(key, options) {
        var _a;
        const sig = new CompactSign(encoder.encode(JSON.stringify(this._payload)));
        sig.setProtectedHeader(this._protectedHeader);
        if (Array.isArray((_a = this._protectedHeader) === null || _a === void 0 ? void 0 : _a.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === false) {
            throw new JWTInvalid("JWTs MUST NOT use unencoded payload");
        }
        return sig.sign(key, options);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/encrypt.js



class EncryptJWT extends (/* unused pure expression or super */ null && (ProduceJWT)) {
    setProtectedHeader(protectedHeader) {
        if (this._protectedHeader) {
            throw new TypeError("setProtectedHeader can only be called once");
        }
        this._protectedHeader = protectedHeader;
        return this;
    }
    setKeyManagementParameters(parameters) {
        if (this._keyManagementParameters) {
            throw new TypeError("setKeyManagementParameters can only be called once");
        }
        this._keyManagementParameters = parameters;
        return this;
    }
    setContentEncryptionKey(cek) {
        if (this._cek) {
            throw new TypeError("setContentEncryptionKey can only be called once");
        }
        this._cek = cek;
        return this;
    }
    setInitializationVector(iv) {
        if (this._iv) {
            throw new TypeError("setInitializationVector can only be called once");
        }
        this._iv = iv;
        return this;
    }
    replicateIssuerAsHeader() {
        this._replicateIssuerAsHeader = true;
        return this;
    }
    replicateSubjectAsHeader() {
        this._replicateSubjectAsHeader = true;
        return this;
    }
    replicateAudienceAsHeader() {
        this._replicateAudienceAsHeader = true;
        return this;
    }
    async encrypt(key, options) {
        const enc = new CompactEncrypt(encoder.encode(JSON.stringify(this._payload)));
        if (this._replicateIssuerAsHeader) {
            this._protectedHeader = {
                ...this._protectedHeader,
                iss: this._payload.iss
            };
        }
        if (this._replicateSubjectAsHeader) {
            this._protectedHeader = {
                ...this._protectedHeader,
                sub: this._payload.sub
            };
        }
        if (this._replicateAudienceAsHeader) {
            this._protectedHeader = {
                ...this._protectedHeader,
                aud: this._payload.aud
            };
        }
        enc.setProtectedHeader(this._protectedHeader);
        if (this._iv) {
            enc.setInitializationVector(this._iv);
        }
        if (this._cek) {
            enc.setContentEncryptionKey(this._cek);
        }
        if (this._keyManagementParameters) {
            enc.setKeyManagementParameters(this._keyManagementParameters);
        }
        return enc.encrypt(key, options);
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwk/thumbprint.js





const check = (value, description)=>{
    if (typeof value !== "string" || !value) {
        throw new JWKInvalid(`${description} missing or invalid`);
    }
};
async function calculateJwkThumbprint(jwk, digestAlgorithm) {
    if (!isObject(jwk)) {
        throw new TypeError("JWK must be an object");
    }
    digestAlgorithm !== null && digestAlgorithm !== void 0 ? digestAlgorithm : digestAlgorithm = "sha256";
    if (digestAlgorithm !== "sha256" && digestAlgorithm !== "sha384" && digestAlgorithm !== "sha512") {
        throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
    }
    let components;
    switch(jwk.kty){
        case "EC":
            check(jwk.crv, '"crv" (Curve) Parameter');
            check(jwk.x, '"x" (X Coordinate) Parameter');
            check(jwk.y, '"y" (Y Coordinate) Parameter');
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x,
                y: jwk.y
            };
            break;
        case "OKP":
            check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
            check(jwk.x, '"x" (Public Key) Parameter');
            components = {
                crv: jwk.crv,
                kty: jwk.kty,
                x: jwk.x
            };
            break;
        case "RSA":
            check(jwk.e, '"e" (Exponent) Parameter');
            check(jwk.n, '"n" (Modulus) Parameter');
            components = {
                e: jwk.e,
                kty: jwk.kty,
                n: jwk.n
            };
            break;
        case "oct":
            check(jwk.k, '"k" (Key Value) Parameter');
            components = {
                k: jwk.k,
                kty: jwk.kty
            };
            break;
        default:
            throw new JOSENotSupported('"kty" (Key Type) Parameter missing or unsupported');
    }
    const data = encoder.encode(JSON.stringify(components));
    return base64url(await digest(digestAlgorithm, data));
}
async function calculateJwkThumbprintUri(jwk, digestAlgorithm) {
    digestAlgorithm !== null && digestAlgorithm !== void 0 ? digestAlgorithm : digestAlgorithm = "sha256";
    const thumbprint = await calculateJwkThumbprint(jwk, digestAlgorithm);
    return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwk/embedded.js



async function EmbeddedJWK(protectedHeader, token) {
    const joseHeader = {
        ...protectedHeader,
        ...token === null || token === void 0 ? void 0 : token.header
    };
    if (!isObject(joseHeader.jwk)) {
        throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a JSON object');
    }
    const key = await importJWK({
        ...joseHeader.jwk,
        ext: true
    }, joseHeader.alg, true);
    if (key instanceof Uint8Array || key.type !== "public") {
        throw new JWSInvalid('"jwk" (JSON Web Key) Header Parameter must be a public key');
    }
    return key;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwks/local.js



function getKtyFromAlg(alg) {
    switch(typeof alg === "string" && alg.slice(0, 2)){
        case "RS":
        case "PS":
            return "RSA";
        case "ES":
            return "EC";
        case "Ed":
            return "OKP";
        default:
            throw new JOSENotSupported('Unsupported "alg" value for a JSON Web Key Set');
    }
}
function local_isJWKSLike(jwks) {
    return jwks && typeof jwks === "object" && Array.isArray(jwks.keys) && jwks.keys.every(isJWKLike);
}
function isJWKLike(key) {
    return isObject(key);
}
function clone(obj) {
    if (typeof structuredClone === "function") {
        return structuredClone(obj);
    }
    return JSON.parse(JSON.stringify(obj));
}
class local_LocalJWKSet {
    constructor(jwks){
        this._cached = new WeakMap();
        if (!local_isJWKSLike(jwks)) {
            throw new JWKSInvalid("JSON Web Key Set malformed");
        }
        this._jwks = clone(jwks);
    }
    async getKey(protectedHeader, token) {
        const { alg, kid } = {
            ...protectedHeader,
            ...token === null || token === void 0 ? void 0 : token.header
        };
        const kty = getKtyFromAlg(alg);
        const candidates = this._jwks.keys.filter((jwk)=>{
            let candidate = kty === jwk.kty;
            if (candidate && typeof kid === "string") {
                candidate = kid === jwk.kid;
            }
            if (candidate && typeof jwk.alg === "string") {
                candidate = alg === jwk.alg;
            }
            if (candidate && typeof jwk.use === "string") {
                candidate = jwk.use === "sig";
            }
            if (candidate && Array.isArray(jwk.key_ops)) {
                candidate = jwk.key_ops.includes("verify");
            }
            if (candidate && alg === "EdDSA") {
                candidate = jwk.crv === "Ed25519" || jwk.crv === "Ed448";
            }
            if (candidate) {
                switch(alg){
                    case "ES256":
                        candidate = jwk.crv === "P-256";
                        break;
                    case "ES256K":
                        candidate = jwk.crv === "secp256k1";
                        break;
                    case "ES384":
                        candidate = jwk.crv === "P-384";
                        break;
                    case "ES512":
                        candidate = jwk.crv === "P-521";
                        break;
                }
            }
            return candidate;
        });
        const { 0: jwk, length } = candidates;
        if (length === 0) {
            throw new JWKSNoMatchingKey();
        } else if (length !== 1) {
            const error = new JWKSMultipleMatchingKeys();
            const { _cached } = this;
            error[Symbol.asyncIterator] = async function*() {
                for (const jwk of candidates){
                    try {
                        yield await importWithAlgCache(_cached, jwk, alg);
                    } catch (_a) {
                        continue;
                    }
                }
            };
            throw error;
        }
        return importWithAlgCache(this._cached, jwk, alg);
    }
}
async function importWithAlgCache(cache, jwk, alg) {
    const cached = cache.get(jwk) || cache.set(jwk, {}).get(jwk);
    if (cached[alg] === undefined) {
        const key = await importJWK({
            ...jwk,
            ext: true
        }, alg);
        if (key instanceof Uint8Array || key.type !== "public") {
            throw new JWKSInvalid("JSON Web Key Set members must be public keys");
        }
        cached[alg] = key;
    }
    return cached[alg];
}
function createLocalJWKSet(jwks) {
    const set = new local_LocalJWKSet(jwks);
    return async function(protectedHeader, token) {
        return set.getKey(protectedHeader, token);
    };
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/fetch_jwks.js

const fetch_jwks_fetchJwks = async (url, timeout, options)=>{
    let controller;
    let id;
    let timedOut = false;
    if (typeof AbortController === "function") {
        controller = new AbortController();
        id = setTimeout(()=>{
            timedOut = true;
            controller.abort();
        }, timeout);
    }
    const response = await fetch(url.href, {
        signal: controller ? controller.signal : undefined,
        redirect: "manual",
        headers: options.headers
    }).catch((err)=>{
        if (timedOut) throw new JWKSTimeout();
        throw err;
    });
    if (id !== undefined) clearTimeout(id);
    if (response.status !== 200) {
        throw new JOSEError("Expected 200 OK from the JSON Web Key Set HTTP response");
    }
    try {
        return await response.json();
    } catch (_a) {
        throw new JOSEError("Failed to parse the JSON Web Key Set HTTP response as JSON");
    }
};
/* harmony default export */ const fetch_jwks = ((/* unused pure expression or super */ null && (fetch_jwks_fetchJwks)));

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwks/remote.js



function isCloudflareWorkers() {
    return typeof WebSocketPair !== "undefined" || typeof navigator !== "undefined" && navigator.userAgent === "Cloudflare-Workers" ||  true && "edge-runtime" === "vercel";
}
class RemoteJWKSet extends (/* unused pure expression or super */ null && (LocalJWKSet)) {
    constructor(url, options){
        super({
            keys: []
        });
        this._jwks = undefined;
        if (!(url instanceof URL)) {
            throw new TypeError("url must be an instance of URL");
        }
        this._url = new URL(url.href);
        this._options = {
            agent: options === null || options === void 0 ? void 0 : options.agent,
            headers: options === null || options === void 0 ? void 0 : options.headers
        };
        this._timeoutDuration = typeof (options === null || options === void 0 ? void 0 : options.timeoutDuration) === "number" ? options === null || options === void 0 ? void 0 : options.timeoutDuration : 5000;
        this._cooldownDuration = typeof (options === null || options === void 0 ? void 0 : options.cooldownDuration) === "number" ? options === null || options === void 0 ? void 0 : options.cooldownDuration : 30000;
        this._cacheMaxAge = typeof (options === null || options === void 0 ? void 0 : options.cacheMaxAge) === "number" ? options === null || options === void 0 ? void 0 : options.cacheMaxAge : 600000;
    }
    coolingDown() {
        return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cooldownDuration : false;
    }
    fresh() {
        return typeof this._jwksTimestamp === "number" ? Date.now() < this._jwksTimestamp + this._cacheMaxAge : false;
    }
    async getKey(protectedHeader, token) {
        if (!this._jwks || !this.fresh()) {
            await this.reload();
        }
        try {
            return await super.getKey(protectedHeader, token);
        } catch (err) {
            if (err instanceof JWKSNoMatchingKey) {
                if (this.coolingDown() === false) {
                    await this.reload();
                    return super.getKey(protectedHeader, token);
                }
            }
            throw err;
        }
    }
    async reload() {
        if (this._pendingFetch && isCloudflareWorkers()) {
            this._pendingFetch = undefined;
        }
        this._pendingFetch || (this._pendingFetch = fetchJwks(this._url, this._timeoutDuration, this._options).then((json)=>{
            if (!isJWKSLike(json)) {
                throw new JWKSInvalid("JSON Web Key Set malformed");
            }
            this._jwks = {
                keys: json.keys
            };
            this._jwksTimestamp = Date.now();
            this._pendingFetch = undefined;
        }).catch((err)=>{
            this._pendingFetch = undefined;
            throw err;
        }));
        await this._pendingFetch;
    }
}
function createRemoteJWKSet(url, options) {
    const set = new RemoteJWKSet(url, options);
    return async function(protectedHeader, token) {
        return set.getKey(protectedHeader, token);
    };
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/jwt/unsecured.js





class UnsecuredJWT extends (/* unused pure expression or super */ null && (ProduceJWT)) {
    encode() {
        const header = base64url.encode(JSON.stringify({
            alg: "none"
        }));
        const payload = base64url.encode(JSON.stringify(this._payload));
        return `${header}.${payload}.`;
    }
    static decode(jwt, options) {
        if (typeof jwt !== "string") {
            throw new JWTInvalid("Unsecured JWT must be a string");
        }
        const { 0: encodedHeader, 1: encodedPayload, 2: signature, length } = jwt.split(".");
        if (length !== 3 || signature !== "") {
            throw new JWTInvalid("Invalid Unsecured JWT");
        }
        let header;
        try {
            header = JSON.parse(decoder.decode(base64url.decode(encodedHeader)));
            if (header.alg !== "none") throw new Error();
        } catch (_a) {
            throw new JWTInvalid("Invalid Unsecured JWT");
        }
        const payload = jwtPayload(header, base64url.decode(encodedPayload), options);
        return {
            payload,
            header
        };
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/util/base64url.js

const base64url_encode = encode;
const base64url_decode = decode;

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/util/decode_protected_header.js



function decodeProtectedHeader(token) {
    let protectedB64u;
    if (typeof token === "string") {
        const parts = token.split(".");
        if (parts.length === 3 || parts.length === 5) {
            ;
            [protectedB64u] = parts;
        }
    } else if (typeof token === "object" && token) {
        if ("protected" in token) {
            protectedB64u = token.protected;
        } else {
            throw new TypeError("Token does not contain a Protected Header");
        }
    }
    try {
        if (typeof protectedB64u !== "string" || !protectedB64u) {
            throw new Error();
        }
        const result = JSON.parse(decoder.decode(base64url(protectedB64u)));
        if (!isObject(result)) {
            throw new Error();
        }
        return result;
    } catch (_a) {
        throw new TypeError("Invalid Token or Protected Header formatting");
    }
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/util/decode_jwt.js




function decodeJwt(jwt) {
    if (typeof jwt !== "string") throw new JWTInvalid("JWTs must use Compact JWS serialization, JWT must be a string");
    const { 1: payload, length } = jwt.split(".");
    if (length === 5) throw new JWTInvalid("Only JWTs using Compact JWS serialization can be decoded");
    if (length !== 3) throw new JWTInvalid("Invalid JWT");
    if (!payload) throw new JWTInvalid("JWTs must contain a payload");
    let decoded;
    try {
        decoded = base64url(payload);
    } catch (_a) {
        throw new JWTInvalid("Failed to parse the base64url encoded payload");
    }
    let result;
    try {
        result = JSON.parse(decoder.decode(decoded));
    } catch (_b) {
        throw new JWTInvalid("Failed to parse the decoded payload as JSON");
    }
    if (!isObject(result)) throw new JWTInvalid("Invalid JWT Claims Set");
    return result;
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/runtime/generate.js



async function generateSecret(alg, options) {
    var _a;
    let length;
    let algorithm;
    let keyUsages;
    switch(alg){
        case "HS256":
        case "HS384":
        case "HS512":
            length = parseInt(alg.slice(-3), 10);
            algorithm = {
                name: "HMAC",
                hash: `SHA-${length}`,
                length
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "A128CBC-HS256":
        case "A192CBC-HS384":
        case "A256CBC-HS512":
            length = parseInt(alg.slice(-3), 10);
            return random(new Uint8Array(length >> 3));
        case "A128KW":
        case "A192KW":
        case "A256KW":
            length = parseInt(alg.slice(1, 4), 10);
            algorithm = {
                name: "AES-KW",
                length
            };
            keyUsages = [
                "wrapKey",
                "unwrapKey"
            ];
            break;
        case "A128GCMKW":
        case "A192GCMKW":
        case "A256GCMKW":
        case "A128GCM":
        case "A192GCM":
        case "A256GCM":
            length = parseInt(alg.slice(1, 4), 10);
            algorithm = {
                name: "AES-GCM",
                length
            };
            keyUsages = [
                "encrypt",
                "decrypt"
            ];
            break;
        default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return crypto.subtle.generateKey(algorithm, (_a = options === null || options === void 0 ? void 0 : options.extractable) !== null && _a !== void 0 ? _a : false, keyUsages);
}
function getModulusLengthOption(options) {
    var _a;
    const modulusLength = (_a = options === null || options === void 0 ? void 0 : options.modulusLength) !== null && _a !== void 0 ? _a : 2048;
    if (typeof modulusLength !== "number" || modulusLength < 2048) {
        throw new JOSENotSupported("Invalid or unsupported modulusLength option provided, 2048 bits or larger keys must be used");
    }
    return modulusLength;
}
async function generateKeyPair(alg, options) {
    var _a, _b, _c;
    let algorithm;
    let keyUsages;
    switch(alg){
        case "PS256":
        case "PS384":
        case "PS512":
            algorithm = {
                name: "RSA-PSS",
                hash: `SHA-${alg.slice(-3)}`,
                publicExponent: new Uint8Array([
                    0x01,
                    0x00,
                    0x01
                ]),
                modulusLength: getModulusLengthOption(options)
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "RS256":
        case "RS384":
        case "RS512":
            algorithm = {
                name: "RSASSA-PKCS1-v1_5",
                hash: `SHA-${alg.slice(-3)}`,
                publicExponent: new Uint8Array([
                    0x01,
                    0x00,
                    0x01
                ]),
                modulusLength: getModulusLengthOption(options)
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
            algorithm = {
                name: "RSA-OAEP",
                hash: `SHA-${parseInt(alg.slice(-3), 10) || 1}`,
                publicExponent: new Uint8Array([
                    0x01,
                    0x00,
                    0x01
                ]),
                modulusLength: getModulusLengthOption(options)
            };
            keyUsages = [
                "decrypt",
                "unwrapKey",
                "encrypt",
                "wrapKey"
            ];
            break;
        case "ES256":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-256"
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "ES384":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-384"
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "ES512":
            algorithm = {
                name: "ECDSA",
                namedCurve: "P-521"
            };
            keyUsages = [
                "sign",
                "verify"
            ];
            break;
        case "EdDSA":
            keyUsages = [
                "sign",
                "verify"
            ];
            const crv = (_a = options === null || options === void 0 ? void 0 : options.crv) !== null && _a !== void 0 ? _a : "Ed25519";
            switch(crv){
                case "Ed25519":
                case "Ed448":
                    algorithm = {
                        name: crv
                    };
                    break;
                default:
                    throw new JOSENotSupported("Invalid or unsupported crv option provided");
            }
            break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
            {
                keyUsages = [
                    "deriveKey",
                    "deriveBits"
                ];
                const crv = (_b = options === null || options === void 0 ? void 0 : options.crv) !== null && _b !== void 0 ? _b : "P-256";
                switch(crv){
                    case "P-256":
                    case "P-384":
                    case "P-521":
                        {
                            algorithm = {
                                name: "ECDH",
                                namedCurve: crv
                            };
                            break;
                        }
                    case "X25519":
                    case "X448":
                        algorithm = {
                            name: crv
                        };
                        break;
                    default:
                        throw new JOSENotSupported("Invalid or unsupported crv option provided, supported values are P-256, P-384, P-521, X25519, and X448");
                }
                break;
            }
        default:
            throw new JOSENotSupported('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
    }
    return crypto.subtle.generateKey(algorithm, (_c = options === null || options === void 0 ? void 0 : options.extractable) !== null && _c !== void 0 ? _c : false, keyUsages);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/key/generate_key_pair.js

async function generate_key_pair_generateKeyPair(alg, options) {
    return generate(alg, options);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/key/generate_secret.js

async function generate_secret_generateSecret(alg, options) {
    return generate(alg, options);
}

;// CONCATENATED MODULE: ./node_modules/jose/dist/browser/index.js
































;// CONCATENATED MODULE: ./node_modules/@supabase/functions-js/dist/module/helper.js
var __awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const resolveFetch = (customFetch)=>{
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    } else if (typeof fetch === "undefined") {
        _fetch = (...args)=>__awaiter(void 0, void 0, void 0, function*() {
                return yield (yield Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 859, 23))).fetch(...args);
            });
    } else {
        _fetch = fetch;
    }
    return (...args)=>_fetch(...args);
}; //# sourceMappingURL=helper.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/functions-js/dist/module/types.js
class FunctionsError extends Error {
    constructor(message, name = "FunctionsError", context){
        super(message);
        super.name = name;
        this.context = context;
    }
}
class FunctionsFetchError extends FunctionsError {
    constructor(context){
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
    }
}
class FunctionsRelayError extends FunctionsError {
    constructor(context){
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
    }
}
class FunctionsHttpError extends FunctionsError {
    constructor(context){
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
    }
} //# sourceMappingURL=types.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
var FunctionsClient_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class FunctionsClient {
    constructor(url, { headers = {}, customFetch } = {}){
        this.url = url;
        this.headers = headers;
        this.fetch = resolveFetch(customFetch);
    }
    /**
     * Updates the authorization header
     * @param token - the new jwt token sent in the authorisation header
     */ setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
    }
    /**
     * Invokes a function
     * @param functionName - The name of the Function to invoke.
     * @param options - Options for invoking the Function.
     */ invoke(functionName, options = {}) {
        var _a;
        return FunctionsClient_awaiter(this, void 0, void 0, function*() {
            try {
                const { headers, method, body: functionArgs } = options;
                let _headers = {};
                let body;
                if (functionArgs && (headers && !Object.prototype.hasOwnProperty.call(headers, "Content-Type") || !headers)) {
                    if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
                        // will work for File as File inherits Blob
                        // also works for ArrayBuffer as it is the same underlying structure as a Blob
                        _headers["Content-Type"] = "application/octet-stream";
                        body = functionArgs;
                    } else if (typeof functionArgs === "string") {
                        // plain string
                        _headers["Content-Type"] = "text/plain";
                        body = functionArgs;
                    } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
                        // don't set content-type headers
                        // Request will automatically add the right boundary value
                        body = functionArgs;
                    } else {
                        // default, assume this is JSON
                        _headers["Content-Type"] = "application/json";
                        body = JSON.stringify(functionArgs);
                    }
                }
                const response = yield this.fetch(`${this.url}/${functionName}`, {
                    method: method || "POST",
                    // headers priority is (high to low):
                    // 1. invoke-level headers
                    // 2. client-level headers
                    // 3. default Content-Type header
                    headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers),
                    body
                }).catch((fetchError)=>{
                    throw new FunctionsFetchError(fetchError);
                });
                const isRelayError = response.headers.get("x-relay-error");
                if (isRelayError && isRelayError === "true") {
                    throw new FunctionsRelayError(response);
                }
                if (!response.ok) {
                    throw new FunctionsHttpError(response);
                }
                let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim();
                let data;
                if (responseType === "application/json") {
                    data = yield response.json();
                } else if (responseType === "application/octet-stream") {
                    data = yield response.blob();
                } else if (responseType === "multipart/form-data") {
                    data = yield response.formData();
                } else {
                    // default to text
                    data = yield response.text();
                }
                return {
                    data,
                    error: null
                };
            } catch (error) {
                return {
                    data: null,
                    error
                };
            }
        });
    }
} //# sourceMappingURL=FunctionsClient.js.map

// EXTERNAL MODULE: ./node_modules/cross-fetch/dist/browser-ponyfill.js
var browser_ponyfill = __webpack_require__(859);
var browser_ponyfill_default = /*#__PURE__*/__webpack_require__.n(browser_ponyfill);
;// CONCATENATED MODULE: ./node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js

class PostgrestBuilder {
    constructor(builder){
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = builder.headers;
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = builder.shouldThrowOnError;
        this.signal = builder.signal;
        this.isMaybeSingle = builder.isMaybeSingle;
        if (builder.fetch) {
            this.fetch = builder.fetch;
        } else if (typeof fetch === "undefined") {
            this.fetch = (browser_ponyfill_default());
        } else {
            this.fetch = fetch;
        }
    }
    /**
     * If there's an error with the query, throwOnError will reject the promise by
     * throwing the error instead of returning it as part of a successful response.
     *
     * {@link https://github.com/supabase/supabase-js/issues/92}
     */ throwOnError() {
        this.shouldThrowOnError = true;
        return this;
    }
    then(onfulfilled, onrejected) {
        // https://postgrest.org/en/stable/api.html#switching-schemas
        if (this.schema === undefined) {
        // skip
        } else if ([
            "GET",
            "HEAD"
        ].includes(this.method)) {
            this.headers["Accept-Profile"] = this.schema;
        } else {
            this.headers["Content-Profile"] = this.schema;
        }
        if (this.method !== "GET" && this.method !== "HEAD") {
            this.headers["Content-Type"] = "application/json";
        }
        // NOTE: Invoke w/o `this` to avoid illegal invocation error.
        // https://github.com/supabase/postgrest-js/pull/247
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body),
            signal: this.signal
        }).then(async (res)=>{
            var _a, _b, _c;
            let error = null;
            let data = null;
            let count = null;
            let status = res.status;
            let statusText = res.statusText;
            if (res.ok) {
                if (this.method !== "HEAD") {
                    const body = await res.text();
                    if (body === "") {
                    // Prefer: return=minimal
                    } else if (this.headers["Accept"] === "text/csv") {
                        data = body;
                    } else if (this.headers["Accept"] && this.headers["Accept"].includes("application/vnd.pgrst.plan+text")) {
                        data = body;
                    } else {
                        data = JSON.parse(body);
                    }
                }
                const countHeader = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.match(/count=(exact|planned|estimated)/);
                const contentRange = (_b = res.headers.get("content-range")) === null || _b === void 0 ? void 0 : _b.split("/");
                if (countHeader && contentRange && contentRange.length > 1) {
                    count = parseInt(contentRange[1]);
                }
                // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
                // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
                if (this.isMaybeSingle && this.method === "GET" && Array.isArray(data)) {
                    if (data.length > 1) {
                        error = {
                            // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                            code: "PGRST116",
                            details: `Results contain ${data.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                            hint: null,
                            message: "JSON object requested, multiple (or no) rows returned"
                        };
                        data = null;
                        count = null;
                        status = 406;
                        statusText = "Not Acceptable";
                    } else if (data.length === 1) {
                        data = data[0];
                    } else {
                        data = null;
                    }
                }
            } else {
                const body = await res.text();
                try {
                    error = JSON.parse(body);
                    // Workaround for https://github.com/supabase/postgrest-js/issues/295
                    if (Array.isArray(error) && res.status === 404) {
                        data = [];
                        error = null;
                        status = 200;
                        statusText = "OK";
                    }
                } catch (_d) {
                    // Workaround for https://github.com/supabase/postgrest-js/issues/295
                    if (res.status === 404 && body === "") {
                        status = 204;
                        statusText = "No Content";
                    } else {
                        error = {
                            message: body
                        };
                    }
                }
                if (error && this.isMaybeSingle && ((_c = error === null || error === void 0 ? void 0 : error.details) === null || _c === void 0 ? void 0 : _c.includes("Results contain 0 rows"))) {
                    error = null;
                    status = 200;
                    statusText = "OK";
                }
                if (error && this.shouldThrowOnError) {
                    throw error;
                }
            }
            const postgrestResponse = {
                error,
                data,
                count,
                status,
                statusText
            };
            return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
            res = res.catch((fetchError)=>{
                var _a, _b, _c;
                return {
                    error: {
                        message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                        details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ""}`,
                        hint: "",
                        code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ""}`
                    },
                    data: null,
                    count: null,
                    status: 0,
                    statusText: ""
                };
            });
        }
        return res.then(onfulfilled, onrejected);
    }
} //# sourceMappingURL=PostgrestBuilder.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js

class PostgrestTransformBuilder extends PostgrestBuilder {
    /**
     * Perform a SELECT on the query result.
     *
     * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
     * return modified rows. By calling this method, modified rows are returned in
     * `data`.
     *
     * @param columns - The columns to retrieve, separated by commas
     */ select(columns) {
        // Remove whitespaces except when quoted
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c)=>{
            if (/\s/.test(c) && !quoted) {
                return "";
            }
            if (c === '"') {
                quoted = !quoted;
            }
            return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (this.headers["Prefer"]) {
            this.headers["Prefer"] += ",";
        }
        this.headers["Prefer"] += "return=representation";
        return this;
    }
    /**
     * Order the query result by `column`.
     *
     * You can call this method multiple times to order by multiple columns.
     *
     * You can order foreign tables, but it doesn't affect the ordering of the
     * current table.
     *
     * @param column - The column to order by
     * @param options - Named parameters
     * @param options.ascending - If `true`, the result will be in ascending order
     * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
     * `null`s appear last.
     * @param options.foreignTable - Set this to order a foreign table by foreign
     * columns
     */ order(column, { ascending = true, nullsFirst, foreignTable } = {}) {
        const key = foreignTable ? `${foreignTable}.order` : "order";
        const existingOrder = this.url.searchParams.get(key);
        this.url.searchParams.set(key, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === undefined ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
        return this;
    }
    /**
     * Limit the query result by `count`.
     *
     * @param count - The maximum number of rows to return
     * @param options - Named parameters
     * @param options.foreignTable - Set this to limit rows of foreign tables
     * instead of the current table
     */ limit(count, { foreignTable } = {}) {
        const key = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
        this.url.searchParams.set(key, `${count}`);
        return this;
    }
    /**
     * Limit the query result by `from` and `to` inclusively.
     *
     * @param from - The starting index from which to limit the result
     * @param to - The last index to which to limit the result
     * @param options - Named parameters
     * @param options.foreignTable - Set this to limit rows of foreign tables
     * instead of the current table
     */ range(from, to, { foreignTable } = {}) {
        const keyOffset = typeof foreignTable === "undefined" ? "offset" : `${foreignTable}.offset`;
        const keyLimit = typeof foreignTable === "undefined" ? "limit" : `${foreignTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        // Range is inclusive, so add 1
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
    }
    /**
     * Set the AbortSignal for the fetch request.
     *
     * @param signal - The AbortSignal to use for the fetch request
     */ abortSignal(signal) {
        this.signal = signal;
        return this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be one row (e.g. using `.limit(1)`), otherwise this
     * returns an error.
     */ single() {
        this.headers["Accept"] = "application/vnd.pgrst.object+json";
        return this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
     * this returns an error.
     */ maybeSingle() {
        // Temporary partial fix for https://github.com/supabase/postgrest-js/issues/361
        // Issue persists e.g. for `.insert([...]).select().maybeSingle()`
        if (this.method === "GET") {
            this.headers["Accept"] = "application/json";
        } else {
            this.headers["Accept"] = "application/vnd.pgrst.object+json";
        }
        this.isMaybeSingle = true;
        return this;
    }
    /**
     * Return `data` as a string in CSV format.
     */ csv() {
        this.headers["Accept"] = "text/csv";
        return this;
    }
    /**
     * Return `data` as an object in [GeoJSON](https://geojson.org) format.
     */ geojson() {
        this.headers["Accept"] = "application/geo+json";
        return this;
    }
    /**
     * Return `data` as the EXPLAIN plan for the query.
     *
     * @param options - Named parameters
     *
     * @param options.analyze - If `true`, the query will be executed and the
     * actual run time will be returned
     *
     * @param options.verbose - If `true`, the query identifier will be returned
     * and `data` will include the output columns of the query
     *
     * @param options.settings - If `true`, include information on configuration
     * parameters that affect query planning
     *
     * @param options.buffers - If `true`, include information on buffer usage
     *
     * @param options.wal - If `true`, include information on WAL record generation
     *
     * @param options.format - The format of the output, can be `"text"` (default)
     * or `"json"`
     */ explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
        const options = [
            analyze ? "analyze" : null,
            verbose ? "verbose" : null,
            settings ? "settings" : null,
            buffers ? "buffers" : null,
            wal ? "wal" : null
        ].filter(Boolean).join("|");
        // An Accept header can carry multiple media types but postgrest-js always sends one
        const forMediatype = this.headers["Accept"];
        this.headers["Accept"] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options};`;
        if (format === "json") return this;
        else return this;
    }
    /**
     * Rollback the query.
     *
     * `data` will still be returned, but the query is not committed.
     */ rollback() {
        var _a;
        if (((_a = this.headers["Prefer"]) !== null && _a !== void 0 ? _a : "").trim().length > 0) {
            this.headers["Prefer"] += ",tx=rollback";
        } else {
            this.headers["Prefer"] = "tx=rollback";
        }
        return this;
    }
    /**
     * Override the type of the returned `data`.
     *
     * @typeParam NewResult - The new result type to override with
     */ returns() {
        return this;
    }
} //# sourceMappingURL=PostgrestTransformBuilder.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js

class PostgrestFilterBuilder extends PostgrestTransformBuilder {
    /**
     * Match only rows where `column` is equal to `value`.
     *
     * To check if the value of `column` is NULL, you should use `.is()` instead.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is not equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is greater than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is greater than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is less than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is less than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-sensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */ like(column, pattern) {
        this.url.searchParams.append(column, `like.${pattern}`);
        return this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */ likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */ likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-insensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */ ilike(column, pattern) {
        this.url.searchParams.append(column, `ilike.${pattern}`);
        return this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */ ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
        return this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */ ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
        return this;
    }
    /**
     * Match only rows where `column` IS `value`.
     *
     * For non-boolean columns, this is only relevant for checking if the value of
     * `column` is NULL by setting `value` to `null`.
     *
     * For boolean columns, you can also set `value` to `true` or `false` and it
     * will behave the same way as `.eq()`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */ is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
    }
    /**
     * Match only rows where `column` is included in the `values` array.
     *
     * @param column - The column to filter on
     * @param values - The values array to filter with
     */ in(column, values) {
        const cleanedValues = values.map((s)=>{
            // handle postgrest reserved characters
            // https://postgrest.org/en/v7.0.0/api.html#reserved-characters
            if (typeof s === "string" && new RegExp("[,()]").test(s)) return `"${s}"`;
            else return `${s}`;
        }).join(",");
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * `column` contains every element appearing in `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */ contains(column, value) {
        if (typeof value === "string") {
            // range types can be inclusive '[', ']' or exclusive '(', ')' so just
            // keep it simple and accept a string
            this.url.searchParams.append(column, `cs.${value}`);
        } else if (Array.isArray(value)) {
            // array
            this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
        } else {
            // json
            this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        }
        return this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * every element appearing in `column` is contained by `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */ containedBy(column, value) {
        if (typeof value === "string") {
            // range
            this.url.searchParams.append(column, `cd.${value}`);
        } else if (Array.isArray(value)) {
            // array
            this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
        } else {
            // json
            this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        }
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is greater than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */ rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or greater than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */ rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is less than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */ rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or less than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */ rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
    }
    /**
     * Only relevant for range columns. Match only rows where `column` is
     * mutually exclusive to `range` and there can be no element between the two
     * ranges.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */ rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
    }
    /**
     * Only relevant for array and range columns. Match only rows where
     * `column` and `value` have an element in common.
     *
     * @param column - The array or range column to filter on
     * @param value - The array or range value to filter with
     */ overlaps(column, value) {
        if (typeof value === "string") {
            // range
            this.url.searchParams.append(column, `ov.${value}`);
        } else {
            // array
            this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
        }
        return this;
    }
    /**
     * Only relevant for text and tsvector columns. Match only rows where
     * `column` matches the query string in `query`.
     *
     * @param column - The text or tsvector column to filter on
     * @param query - The query text to match with
     * @param options - Named parameters
     * @param options.config - The text search configuration to use
     * @param options.type - Change how the `query` text is interpreted
     */ textSearch(column, query, { config, type } = {}) {
        let typePart = "";
        if (type === "plain") {
            typePart = "pl";
        } else if (type === "phrase") {
            typePart = "ph";
        } else if (type === "websearch") {
            typePart = "w";
        }
        const configPart = config === undefined ? "" : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
    }
    /**
     * Match only rows where each column in `query` keys is equal to its
     * associated value. Shorthand for multiple `.eq()`s.
     *
     * @param query - The object to filter with, with column names as keys mapped
     * to their filter values
     */ match(query) {
        Object.entries(query).forEach(([column, value])=>{
            this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
    }
    /**
     * Match only rows which doesn't satisfy the filter.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to be negated to filter with, following
     * PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */ not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
    }
    /**
     * Match only rows which satisfy at least one of the filters.
     *
     * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure it's properly sanitized.
     *
     * It's currently not possible to do an `.or()` filter across multiple tables.
     *
     * @param filters - The filters to use, following PostgREST syntax
     * @param foreignTable - Set this to filter on foreign tables instead of the
     * current table
     */ or(filters, { foreignTable } = {}) {
        const key = foreignTable ? `${foreignTable}.or` : "or";
        this.url.searchParams.append(key, `(${filters})`);
        return this;
    }
    /**
     * Match only rows which satisfy the filter. This is an escape hatch - you
     * should use the specific filter methods wherever possible.
     *
     * Unlike most filters, `opearator` and `value` are used as-is and need to
     * follow [PostgREST
     * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
     * to make sure they are properly sanitized.
     *
     * @param column - The column to filter on
     * @param operator - The operator to filter with, following PostgREST syntax
     * @param value - The value to filter with, following PostgREST syntax
     */ filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
    }
} //# sourceMappingURL=PostgrestFilterBuilder.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js

class PostgrestQueryBuilder {
    constructor(url, { headers = {}, schema, fetch }){
        this.url = url;
        this.headers = headers;
        this.schema = schema;
        this.fetch = fetch;
    }
    /**
     * Perform a SELECT query on the table or view.
     *
     * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
     *
     * @param options - Named parameters
     *
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     *
     * @param options.count - Count algorithm to use to count rows in the table or view.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */ select(columns, { head = false, count } = {}) {
        const method = head ? "HEAD" : "GET";
        // Remove whitespaces except when quoted
        let quoted = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c)=>{
            if (/\s/.test(c) && !quoted) {
                return "";
            }
            if (c === '"') {
                quoted = !quoted;
            }
            return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (count) {
            this.headers["Prefer"] = `count=${count}`;
        }
        return new PostgrestFilterBuilder({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
    /**
     * Perform an INSERT into the table or view.
     *
     * By default, inserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to insert. Pass an object to insert a single row
     * or an array to insert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count inserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column.
     */ insert(values, { count, defaultToNull = true } = {}) {
        const method = "POST";
        const prefersHeaders = [];
        if (this.headers["Prefer"]) {
            prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
            prefersHeaders.push("missing=default");
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x)=>acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [
                    ...new Set(columns)
                ].map((column)=>`"${column}"`);
                this.url.searchParams.set("columns", uniqueColumns.join(","));
            }
        }
        return new PostgrestFilterBuilder({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
    /**
     * Perform an UPSERT on the table or view. Depending on the column(s) passed
     * to `onConflict`, `.upsert()` allows you to perform the equivalent of
     * `.insert()` if a row with the corresponding `onConflict` columns doesn't
     * exist, or if it does exist, perform an alternative action depending on
     * `ignoreDuplicates`.
     *
     * By default, upserted rows are not returned. To return it, chain the call
     * with `.select()`.
     *
     * @param values - The values to upsert with. Pass an object to upsert a
     * single row or an array to upsert multiple rows.
     *
     * @param options - Named parameters
     *
     * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
     * duplicate rows are determined. Two rows are duplicates if all the
     * `onConflict` columns are equal.
     *
     * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
     * `false`, duplicate rows are merged with existing rows.
     *
     * @param options.count - Count algorithm to use to count upserted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     *
     * @param options.defaultToNull - Make missing fields default to `null`.
     * Otherwise, use the default value for the column. This only applies when
     * inserting new rows, not when merging with existing rows under
     * `ignoreDuplicates: false`.
     */ upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
        const method = "POST";
        const prefersHeaders = [
            `resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`
        ];
        if (onConflict !== undefined) this.url.searchParams.set("on_conflict", onConflict);
        if (this.headers["Prefer"]) {
            prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
            prefersHeaders.push("missing=default");
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
            const columns = values.reduce((acc, x)=>acc.concat(Object.keys(x)), []);
            if (columns.length > 0) {
                const uniqueColumns = [
                    ...new Set(columns)
                ].map((column)=>`"${column}"`);
                this.url.searchParams.set("columns", uniqueColumns.join(","));
            }
        }
        return new PostgrestFilterBuilder({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
    /**
     * Perform an UPDATE on the table or view.
     *
     * By default, updated rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param values - The values to update with
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count updated rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */ update(values, { count } = {}) {
        const method = "PATCH";
        const prefersHeaders = [];
        if (this.headers["Prefer"]) {
            prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            body: values,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
    /**
     * Perform a DELETE on the table or view.
     *
     * By default, deleted rows are not returned. To return it, chain the call
     * with `.select()` after filters.
     *
     * @param options - Named parameters
     *
     * @param options.count - Count algorithm to use to count deleted rows.
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */ delete({ count } = {}) {
        const method = "DELETE";
        const prefersHeaders = [];
        if (count) {
            prefersHeaders.push(`count=${count}`);
        }
        if (this.headers["Prefer"]) {
            prefersHeaders.unshift(this.headers["Prefer"]);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
            method,
            url: this.url,
            headers: this.headers,
            schema: this.schema,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
} //# sourceMappingURL=PostgrestQueryBuilder.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/postgrest-js/dist/module/version.js
const version = "1.7.0"; //# sourceMappingURL=version.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/postgrest-js/dist/module/constants.js

const DEFAULT_HEADERS = {
    "X-Client-Info": `postgrest-js/${version}`
}; //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js



/**
 * PostgREST client.
 *
 * @typeParam Database - Types for the schema from the [type
 * generator](https://supabase.com/docs/reference/javascript/next/typescript-support)
 *
 * @typeParam SchemaName - Postgres schema to switch to. Must be a string
 * literal, the same one passed to the constructor. If the schema is not
 * `"public"`, this must be supplied manually.
 */ class PostgrestClient {
    // TODO: Add back shouldThrowOnError once we figure out the typings
    /**
     * Creates a PostgREST client.
     *
     * @param url - URL of the PostgREST endpoint
     * @param options - Named parameters
     * @param options.headers - Custom headers
     * @param options.schema - Postgres schema to switch to
     * @param options.fetch - Custom fetch
     */ constructor(url, { headers = {}, schema, fetch } = {}){
        this.url = url;
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers);
        this.schema = schema;
        this.fetch = fetch;
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */ from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new PostgrestQueryBuilder(url, {
            headers: Object.assign({}, this.headers),
            schema: this.schema,
            fetch: this.fetch
        });
    }
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */ rpc(fn, args = {}, { head = false, count } = {}) {
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body;
        if (head) {
            method = "HEAD";
            Object.entries(args).forEach(([name, value])=>{
                url.searchParams.append(name, `${value}`);
            });
        } else {
            method = "POST";
            body = args;
        }
        const headers = Object.assign({}, this.headers);
        if (count) {
            headers["Prefer"] = `count=${count}`;
        }
        return new PostgrestFilterBuilder({
            method,
            url,
            headers,
            schema: this.schema,
            body,
            fetch: this.fetch,
            allowEmpty: false
        });
    }
} //# sourceMappingURL=PostgrestClient.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/postgrest-js/dist/module/index.js




 //# sourceMappingURL=index.js.map

// EXTERNAL MODULE: ./node_modules/websocket/lib/browser.js
var browser = __webpack_require__(782);
;// CONCATENATED MODULE: ./node_modules/@supabase/realtime-js/dist/module/lib/version.js
const version_version = "2.7.2"; //# sourceMappingURL=version.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/realtime-js/dist/module/lib/constants.js

const constants_DEFAULT_HEADERS = {
    "X-Client-Info": `realtime-js/${version_version}`
};
const VSN = "1.0.0";
const DEFAULT_TIMEOUT = 10000;
const WS_CLOSE_NORMAL = 1000;
var SOCKET_STATES;
(function(SOCKET_STATES) {
    SOCKET_STATES[SOCKET_STATES["connecting"] = 0] = "connecting";
    SOCKET_STATES[SOCKET_STATES["open"] = 1] = "open";
    SOCKET_STATES[SOCKET_STATES["closing"] = 2] = "closing";
    SOCKET_STATES[SOCKET_STATES["closed"] = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function(CHANNEL_STATES) {
    CHANNEL_STATES["closed"] = "closed";
    CHANNEL_STATES["errored"] = "errored";
    CHANNEL_STATES["joined"] = "joined";
    CHANNEL_STATES["joining"] = "joining";
    CHANNEL_STATES["leaving"] = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function(CHANNEL_EVENTS) {
    CHANNEL_EVENTS["close"] = "phx_close";
    CHANNEL_EVENTS["error"] = "phx_error";
    CHANNEL_EVENTS["join"] = "phx_join";
    CHANNEL_EVENTS["reply"] = "phx_reply";
    CHANNEL_EVENTS["leave"] = "phx_leave";
    CHANNEL_EVENTS["access_token"] = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function(TRANSPORTS) {
    TRANSPORTS["websocket"] = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
(function(CONNECTION_STATE) {
    CONNECTION_STATE["Connecting"] = "connecting";
    CONNECTION_STATE["Open"] = "open";
    CONNECTION_STATE["Closing"] = "closing";
    CONNECTION_STATE["Closed"] = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {})); //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/realtime-js/dist/module/lib/timer.js
/**
 * Creates a timer that accepts a `timerCalc` function to perform calculated timeout retries, such as exponential backoff.
 *
 * @example
 *    let reconnectTimer = new Timer(() => this.connect(), function(tries){
 *      return [1000, 5000, 10000][tries - 1] || 10000
 *    })
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 *    reconnectTimer.scheduleTimeout() // fires after 5000
 *    reconnectTimer.reset()
 *    reconnectTimer.scheduleTimeout() // fires after 1000
 */ class Timer {
    constructor(callback, timerCalc){
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = undefined;
        this.tries = 0;
        this.callback = callback;
        this.timerCalc = timerCalc;
    }
    reset() {
        this.tries = 0;
        clearTimeout(this.timer);
    }
    // Cancels any previous scheduleTimeout and schedules callback
    scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.tries = this.tries + 1;
            this.callback();
        }, this.timerCalc(this.tries + 1));
    }
} //# sourceMappingURL=timer.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
// This file draws heavily from https://github.com/phoenixframework/phoenix/commit/cf098e9cf7a44ee6479d31d911a97d3c7430c6fe
// License: https://github.com/phoenixframework/phoenix/blob/master/LICENSE.md
class Serializer {
    constructor(){
        this.HEADER_LENGTH = 1;
    }
    decode(rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
            return callback(this._binaryDecode(rawPayload));
        }
        if (typeof rawPayload === "string") {
            return callback(JSON.parse(rawPayload));
        }
        return callback({});
    }
    _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const decoder = new TextDecoder();
        return this._decodeBroadcast(buffer, view, decoder);
    }
    _decodeBroadcast(buffer, view, decoder) {
        const topicSize = view.getUint8(1);
        const eventSize = view.getUint8(2);
        let offset = this.HEADER_LENGTH + 2;
        const topic = decoder.decode(buffer.slice(offset, offset + topicSize));
        offset = offset + topicSize;
        const event = decoder.decode(buffer.slice(offset, offset + eventSize));
        offset = offset + eventSize;
        const data = JSON.parse(decoder.decode(buffer.slice(offset, buffer.byteLength)));
        return {
            ref: null,
            topic: topic,
            event: event,
            payload: data
        };
    }
} //# sourceMappingURL=serializer.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/realtime-js/dist/module/lib/push.js

class Push {
    /**
     * Initializes the Push
     *
     * @param channel The Channel
     * @param event The event, for example `"phx_join"`
     * @param payload The payload, for example `{user_id: 123}`
     * @param timeout The push timeout in milliseconds
     */ constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT){
        this.channel = channel;
        this.event = event;
        this.payload = payload;
        this.timeout = timeout;
        this.sent = false;
        this.timeoutTimer = undefined;
        this.ref = "";
        this.receivedResp = null;
        this.recHooks = [];
        this.refEvent = null;
        this.rateLimited = false;
    }
    resend(timeout) {
        this.timeout = timeout;
        this._cancelRefEvent();
        this.ref = "";
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
    }
    send() {
        if (this._hasReceived("timeout")) {
            return;
        }
        this.startTimeout();
        this.sent = true;
        const status = this.channel.socket.push({
            topic: this.channel.topic,
            event: this.event,
            payload: this.payload,
            ref: this.ref,
            join_ref: this.channel._joinRef()
        });
        if (status === "rate limited") {
            this.rateLimited = true;
        }
    }
    updatePayload(payload) {
        this.payload = Object.assign(Object.assign({}, this.payload), payload);
    }
    receive(status, callback) {
        var _a;
        if (this._hasReceived(status)) {
            callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
        }
        this.recHooks.push({
            status,
            callback
        });
        return this;
    }
    startTimeout() {
        if (this.timeoutTimer) {
            return;
        }
        this.ref = this.channel.socket._makeRef();
        this.refEvent = this.channel._replyEventName(this.ref);
        const callback = (payload)=>{
            this._cancelRefEvent();
            this._cancelTimeout();
            this.receivedResp = payload;
            this._matchReceive(payload);
        };
        this.channel._on(this.refEvent, {}, callback);
        this.timeoutTimer = setTimeout(()=>{
            this.trigger("timeout", {});
        }, this.timeout);
    }
    trigger(status, response) {
        if (this.refEvent) this.channel._trigger(this.refEvent, {
            status,
            response
        });
    }
    destroy() {
        this._cancelRefEvent();
        this._cancelTimeout();
    }
    _cancelRefEvent() {
        if (!this.refEvent) {
            return;
        }
        this.channel._off(this.refEvent, {});
    }
    _cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = undefined;
    }
    _matchReceive({ status, response }) {
        this.recHooks.filter((h)=>h.status === status).forEach((h)=>h.callback(response));
    }
    _hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
    }
} //# sourceMappingURL=push.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
/*
  This file draws heavily from https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/assets/js/phoenix/presence.js
  License: https://github.com/phoenixframework/phoenix/blob/d344ec0a732ab4ee204215b31de69cf4be72e3bf/LICENSE.md
*/ var REALTIME_PRESENCE_LISTEN_EVENTS;
(function(REALTIME_PRESENCE_LISTEN_EVENTS) {
    REALTIME_PRESENCE_LISTEN_EVENTS["SYNC"] = "sync";
    REALTIME_PRESENCE_LISTEN_EVENTS["JOIN"] = "join";
    REALTIME_PRESENCE_LISTEN_EVENTS["LEAVE"] = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
class RealtimePresence {
    /**
     * Initializes the Presence.
     *
     * @param channel - The RealtimeChannel
     * @param opts - The options,
     *        for example `{events: {state: 'state', diff: 'diff'}}`
     */ constructor(channel, opts){
        this.channel = channel;
        this.state = {};
        this.pendingDiffs = [];
        this.joinRef = null;
        this.caller = {
            onJoin: ()=>{},
            onLeave: ()=>{},
            onSync: ()=>{}
        };
        const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
            state: "presence_state",
            diff: "presence_diff"
        };
        this.channel._on(events.state, {}, (newState)=>{
            const { onJoin, onLeave, onSync } = this.caller;
            this.joinRef = this.channel._joinRef();
            this.state = RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
            this.pendingDiffs.forEach((diff)=>{
                this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            });
            this.pendingDiffs = [];
            onSync();
        });
        this.channel._on(events.diff, {}, (diff)=>{
            const { onJoin, onLeave, onSync } = this.caller;
            if (this.inPendingSyncState()) {
                this.pendingDiffs.push(diff);
            } else {
                this.state = RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
                onSync();
            }
        });
        this.onJoin((key, currentPresences, newPresences)=>{
            this.channel._trigger("presence", {
                event: "join",
                key,
                currentPresences,
                newPresences
            });
        });
        this.onLeave((key, currentPresences, leftPresences)=>{
            this.channel._trigger("presence", {
                event: "leave",
                key,
                currentPresences,
                leftPresences
            });
        });
        this.onSync(()=>{
            this.channel._trigger("presence", {
                event: "sync"
            });
        });
    }
    /**
     * Used to sync the list of presences on the server with the
     * client's state.
     *
     * An optional `onJoin` and `onLeave` callback can be provided to
     * react to changes in the client's local presences across
     * disconnects and reconnects with the server.
     *
     * @internal
     */ static syncState(currentState, newState, onJoin, onLeave) {
        const state = this.cloneDeep(currentState);
        const transformedState = this.transformState(newState);
        const joins = {};
        const leaves = {};
        this.map(state, (key, presences)=>{
            if (!transformedState[key]) {
                leaves[key] = presences;
            }
        });
        this.map(transformedState, (key, newPresences)=>{
            const currentPresences = state[key];
            if (currentPresences) {
                const newPresenceRefs = newPresences.map((m)=>m.presence_ref);
                const curPresenceRefs = currentPresences.map((m)=>m.presence_ref);
                const joinedPresences = newPresences.filter((m)=>curPresenceRefs.indexOf(m.presence_ref) < 0);
                const leftPresences = currentPresences.filter((m)=>newPresenceRefs.indexOf(m.presence_ref) < 0);
                if (joinedPresences.length > 0) {
                    joins[key] = joinedPresences;
                }
                if (leftPresences.length > 0) {
                    leaves[key] = leftPresences;
                }
            } else {
                joins[key] = newPresences;
            }
        });
        return this.syncDiff(state, {
            joins,
            leaves
        }, onJoin, onLeave);
    }
    /**
     * Used to sync a diff of presence join and leave events from the
     * server, as they happen.
     *
     * Like `syncState`, `syncDiff` accepts optional `onJoin` and
     * `onLeave` callbacks to react to a user joining or leaving from a
     * device.
     *
     * @internal
     */ static syncDiff(state, diff, onJoin, onLeave) {
        const { joins, leaves } = {
            joins: this.transformState(diff.joins),
            leaves: this.transformState(diff.leaves)
        };
        if (!onJoin) {
            onJoin = ()=>{};
        }
        if (!onLeave) {
            onLeave = ()=>{};
        }
        this.map(joins, (key, newPresences)=>{
            var _a;
            const currentPresences = (_a = state[key]) !== null && _a !== void 0 ? _a : [];
            state[key] = this.cloneDeep(newPresences);
            if (currentPresences.length > 0) {
                const joinedPresenceRefs = state[key].map((m)=>m.presence_ref);
                const curPresences = currentPresences.filter((m)=>joinedPresenceRefs.indexOf(m.presence_ref) < 0);
                state[key].unshift(...curPresences);
            }
            onJoin(key, currentPresences, newPresences);
        });
        this.map(leaves, (key, leftPresences)=>{
            let currentPresences = state[key];
            if (!currentPresences) return;
            const presenceRefsToRemove = leftPresences.map((m)=>m.presence_ref);
            currentPresences = currentPresences.filter((m)=>presenceRefsToRemove.indexOf(m.presence_ref) < 0);
            state[key] = currentPresences;
            onLeave(key, currentPresences, leftPresences);
            if (currentPresences.length === 0) delete state[key];
        });
        return state;
    }
    /** @internal */ static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key)=>func(key, obj[key]));
    }
    /**
     * Remove 'metas' key
     * Change 'phx_ref' to 'presence_ref'
     * Remove 'phx_ref' and 'phx_ref_prev'
     *
     * @example
     * // returns {
     *  abc123: [
     *    { presence_ref: '2', user_id: 1 },
     *    { presence_ref: '3', user_id: 2 }
     *  ]
     * }
     * RealtimePresence.transformState({
     *  abc123: {
     *    metas: [
     *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
     *      { phx_ref: '3', user_id: 2 }
     *    ]
     *  }
     * })
     *
     * @internal
     */ static transformState(state) {
        state = this.cloneDeep(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key)=>{
            const presences = state[key];
            if ("metas" in presences) {
                newState[key] = presences.metas.map((presence)=>{
                    presence["presence_ref"] = presence["phx_ref"];
                    delete presence["phx_ref"];
                    delete presence["phx_ref_prev"];
                    return presence;
                });
            } else {
                newState[key] = presences;
            }
            return newState;
        }, {});
    }
    /** @internal */ static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    /** @internal */ onJoin(callback) {
        this.caller.onJoin = callback;
    }
    /** @internal */ onLeave(callback) {
        this.caller.onLeave = callback;
    }
    /** @internal */ onSync(callback) {
        this.caller.onSync = callback;
    }
    /** @internal */ inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
    }
} //# sourceMappingURL=RealtimePresence.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
/**
 * Helpers to convert the change Payload into native JS types.
 */ // Adapted from epgsql (src/epgsql_binary.erl), this module licensed under
// 3-clause BSD found here: https://raw.githubusercontent.com/epgsql/epgsql/devel/LICENSE
var PostgresTypes;
(function(PostgresTypes) {
    PostgresTypes["abstime"] = "abstime";
    PostgresTypes["bool"] = "bool";
    PostgresTypes["date"] = "date";
    PostgresTypes["daterange"] = "daterange";
    PostgresTypes["float4"] = "float4";
    PostgresTypes["float8"] = "float8";
    PostgresTypes["int2"] = "int2";
    PostgresTypes["int4"] = "int4";
    PostgresTypes["int4range"] = "int4range";
    PostgresTypes["int8"] = "int8";
    PostgresTypes["int8range"] = "int8range";
    PostgresTypes["json"] = "json";
    PostgresTypes["jsonb"] = "jsonb";
    PostgresTypes["money"] = "money";
    PostgresTypes["numeric"] = "numeric";
    PostgresTypes["oid"] = "oid";
    PostgresTypes["reltime"] = "reltime";
    PostgresTypes["text"] = "text";
    PostgresTypes["time"] = "time";
    PostgresTypes["timestamp"] = "timestamp";
    PostgresTypes["timestamptz"] = "timestamptz";
    PostgresTypes["timetz"] = "timetz";
    PostgresTypes["tsrange"] = "tsrange";
    PostgresTypes["tstzrange"] = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
/**
 * Takes an array of columns and an object of string values then converts each string value
 * to its mapped type.
 *
 * @param {{name: String, type: String}[]} columns
 * @param {Object} record
 * @param {Object} options The map of various options that can be applied to the mapper
 * @param {Array} options.skipTypes The array of types that should not be converted
 *
 * @example convertChangeData([{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age:'33'}, {})
 * //=>{ first_name: 'Paul', age: 33 }
 */ const convertChangeData = (columns, record, options = {})=>{
    var _a;
    const skipTypes = (_a = options.skipTypes) !== null && _a !== void 0 ? _a : [];
    return Object.keys(record).reduce((acc, rec_key)=>{
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
    }, {});
};
/**
 * Converts the value of an individual column.
 *
 * @param {String} columnName The column that you want to convert
 * @param {{name: String, type: String}[]} columns All of the columns
 * @param {Object} record The map of string values
 * @param {Array} skipTypes An array of types that should not be converted
 * @return {object} Useless information
 *
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, [])
 * //=> 33
 * @example convertColumn('age', [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}], {first_name: 'Paul', age: '33'}, ['int4'])
 * //=> "33"
 */ const convertColumn = (columnName, columns, record, skipTypes)=>{
    const column = columns.find((x)=>x.name === columnName);
    const colType = column === null || column === void 0 ? void 0 : column.type;
    const value = record[columnName];
    if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value);
    }
    return noop(value);
};
/**
 * If the value of the cell is `null`, returns null.
 * Otherwise converts the string value to the correct type.
 * @param {String} type A postgres column type
 * @param {String} value The cell value
 *
 * @example convertCell('bool', 't')
 * //=> true
 * @example convertCell('int8', '10')
 * //=> 10
 * @example convertCell('_int4', '{1,2,3,4}')
 * //=> [1,2,3,4]
 */ const convertCell = (type, value)=>{
    // if data type is an array
    if (type.charAt(0) === "_") {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
    }
    // If not null, convert to correct type.
    switch(type){
        case PostgresTypes.bool:
            return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
            return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
            return toJson(value);
        case PostgresTypes.timestamp:
            return toTimestampString(value); // Format to be consistent with PostgREST
        case PostgresTypes.abstime:
        case PostgresTypes.date:
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime:
        case PostgresTypes.text:
        case PostgresTypes.time:
        case PostgresTypes.timestamptz:
        case PostgresTypes.timetz:
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
            return noop(value);
        default:
            // Return the value for remaining types
            return noop(value);
    }
};
const noop = (value)=>{
    return value;
};
const toBoolean = (value)=>{
    switch(value){
        case "t":
            return true;
        case "f":
            return false;
        default:
            return value;
    }
};
const toNumber = (value)=>{
    if (typeof value === "string") {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) {
            return parsedValue;
        }
    }
    return value;
};
const toJson = (value)=>{
    if (typeof value === "string") {
        try {
            return JSON.parse(value);
        } catch (error) {
            console.log(`JSON parse error: ${error}`);
            return value;
        }
    }
    return value;
};
/**
 * Converts a Postgres Array into a native JS array
 *
 * @example toArray('{}', 'int4')
 * //=> []
 * @example toArray('{"[2021-01-01,2021-12-31)","(2021-01-01,2021-12-32]"}', 'daterange')
 * //=> ['[2021-01-01,2021-12-31)', '(2021-01-01,2021-12-32]']
 * @example toArray([1,2,3,4], 'int4')
 * //=> [1,2,3,4]
 */ const toArray = (value, type)=>{
    if (typeof value !== "string") {
        return value;
    }
    const lastIdx = value.length - 1;
    const closeBrace = value[lastIdx];
    const openBrace = value[0];
    // Confirm value is a Postgres array by checking curly brackets
    if (openBrace === "{" && closeBrace === "}") {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        // TODO: find a better solution to separate Postgres array data
        try {
            arr = JSON.parse("[" + valTrim + "]");
        } catch (_) {
            // WARNING: splitting on comma does not cover all edge cases
            arr = valTrim ? valTrim.split(",") : [];
        }
        return arr.map((val)=>convertCell(type, val));
    }
    return value;
};
/**
 * Fixes timestamp to be ISO-8601. Swaps the space between the date and time for a 'T'
 * See https://github.com/supabase/supabase/issues/18
 *
 * @example toTimestampString('2019-09-10 00:00:00')
 * //=> '2019-09-10T00:00:00'
 */ const toTimestampString = (value)=>{
    if (typeof value === "string") {
        return value.replace(" ", "T");
    }
    return value;
}; //# sourceMappingURL=transformers.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
var RealtimeChannel_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT) {
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["ALL"] = "*";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["INSERT"] = "INSERT";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["UPDATE"] = "UPDATE";
    REALTIME_POSTGRES_CHANGES_LISTEN_EVENT["DELETE"] = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function(REALTIME_LISTEN_TYPES) {
    REALTIME_LISTEN_TYPES["BROADCAST"] = "broadcast";
    REALTIME_LISTEN_TYPES["PRESENCE"] = "presence";
    /**
     * listen to Postgres changes.
     */ REALTIME_LISTEN_TYPES["POSTGRES_CHANGES"] = "postgres_changes";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function(REALTIME_SUBSCRIBE_STATES) {
    REALTIME_SUBSCRIBE_STATES["SUBSCRIBED"] = "SUBSCRIBED";
    REALTIME_SUBSCRIBE_STATES["TIMED_OUT"] = "TIMED_OUT";
    REALTIME_SUBSCRIBE_STATES["CLOSED"] = "CLOSED";
    REALTIME_SUBSCRIBE_STATES["CHANNEL_ERROR"] = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
/** A channel is the basic building block of Realtime
 * and narrows the scope of data flow to subscribed clients.
 * You can think of a channel as a chatroom where participants are able to see who's online
 * and send and receive messages.
 **/ class RealtimeChannel {
    constructor(/** Topic name can be any string. */ topic, params = {
        config: {}
    }, socket){
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.state = CHANNEL_STATES.closed;
        this.joinedOnce = false;
        this.pushBuffer = [];
        this.params.config = Object.assign({
            broadcast: {
                ack: false,
                self: false
            },
            presence: {
                key: ""
            }
        }, params.config);
        this.timeout = this.socket.timeout;
        this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
        this.rejoinTimer = new Timer(()=>this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive("ok", ()=>{
            this.state = CHANNEL_STATES.joined;
            this.rejoinTimer.reset();
            this.pushBuffer.forEach((pushEvent)=>pushEvent.send());
            this.pushBuffer = [];
        });
        this._onClose(()=>{
            this.rejoinTimer.reset();
            this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
            this.state = CHANNEL_STATES.closed;
            this.socket._remove(this);
        });
        this._onError((reason)=>{
            if (this._isLeaving() || this._isClosed()) {
                return;
            }
            this.socket.log("channel", `error ${this.topic}`, reason);
            this.state = CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive("timeout", ()=>{
            if (!this._isJoining()) {
                return;
            }
            this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
            this.state = CHANNEL_STATES.errored;
            this.rejoinTimer.scheduleTimeout();
        });
        this._on(CHANNEL_EVENTS.reply, {}, (payload, ref)=>{
            this._trigger(this._replyEventName(ref), payload);
        });
        this.presence = new RealtimePresence(this);
    }
    /** Subscribe registers your client with the server */ subscribe(callback, timeout = this.timeout) {
        var _a, _b;
        if (this.joinedOnce) {
            throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
        } else {
            const { config: { broadcast, presence } } = this.params;
            this._onError((e)=>callback && callback("CHANNEL_ERROR", e));
            this._onClose(()=>callback && callback("CLOSED"));
            const accessTokenPayload = {};
            const config = {
                broadcast,
                presence,
                postgres_changes: (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r)=>r.filter)) !== null && _b !== void 0 ? _b : []
            };
            if (this.socket.accessToken) {
                accessTokenPayload.access_token = this.socket.accessToken;
            }
            this.updateJoinPayload(Object.assign({
                config
            }, accessTokenPayload));
            this.joinedOnce = true;
            this._rejoin(timeout);
            this.joinPush.receive("ok", ({ postgres_changes: serverPostgresFilters })=>{
                var _a;
                this.socket.accessToken && this.socket.setAuth(this.socket.accessToken);
                if (serverPostgresFilters === undefined) {
                    callback && callback("SUBSCRIBED");
                    return;
                } else {
                    const clientPostgresBindings = this.bindings.postgres_changes;
                    const bindingsLen = (_a = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a !== void 0 ? _a : 0;
                    const newPostgresBindings = [];
                    for(let i = 0; i < bindingsLen; i++){
                        const clientPostgresBinding = clientPostgresBindings[i];
                        const { filter: { event, schema, table, filter } } = clientPostgresBinding;
                        const serverPostgresFilter = serverPostgresFilters && serverPostgresFilters[i];
                        if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
                            newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), {
                                id: serverPostgresFilter.id
                            }));
                        } else {
                            this.unsubscribe();
                            callback && callback("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
                            return;
                        }
                    }
                    this.bindings.postgres_changes = newPostgresBindings;
                    callback && callback("SUBSCRIBED");
                    return;
                }
            }).receive("error", (error)=>{
                callback && callback("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(error).join(", ") || "error")));
                return;
            }).receive("timeout", ()=>{
                callback && callback("TIMED_OUT");
                return;
            });
        }
        return this;
    }
    presenceState() {
        return this.presence.state;
    }
    track(payload, opts = {}) {
        return RealtimeChannel_awaiter(this, void 0, void 0, function*() {
            return yield this.send({
                type: "presence",
                event: "track",
                payload
            }, opts.timeout || this.timeout);
        });
    }
    untrack(opts = {}) {
        return RealtimeChannel_awaiter(this, void 0, void 0, function*() {
            return yield this.send({
                type: "presence",
                event: "untrack"
            }, opts);
        });
    }
    on(type, filter, callback) {
        return this._on(type, filter, callback);
    }
    send(payload, opts = {}) {
        return new Promise((resolve)=>{
            var _a, _b, _c;
            const push = this._push(payload.type, payload, opts.timeout || this.timeout);
            if (push.rateLimited) {
                resolve("rate limited");
            }
            if (payload.type === "broadcast" && !((_c = (_b = (_a = this.params) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
                resolve("ok");
            }
            push.receive("ok", ()=>resolve("ok"));
            push.receive("timeout", ()=>resolve("timed out"));
        });
    }
    updateJoinPayload(payload) {
        this.joinPush.updatePayload(payload);
    }
    /**
     * Leaves the channel.
     *
     * Unsubscribes from server events, and instructs channel to terminate on server.
     * Triggers onClose() hooks.
     *
     * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
     * channel.unsubscribe().receive("ok", () => alert("left!") )
     */ unsubscribe(timeout = this.timeout) {
        this.state = CHANNEL_STATES.leaving;
        const onClose = ()=>{
            this.socket.log("channel", `leave ${this.topic}`);
            this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
        };
        this.rejoinTimer.reset();
        // Destroy joinPush to avoid connection timeouts during unscription phase
        this.joinPush.destroy();
        return new Promise((resolve)=>{
            const leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
            leavePush.receive("ok", ()=>{
                onClose();
                resolve("ok");
            }).receive("timeout", ()=>{
                onClose();
                resolve("timed out");
            }).receive("error", ()=>{
                resolve("error");
            });
            leavePush.send();
            if (!this._canPush()) {
                leavePush.trigger("ok", {});
            }
        });
    }
    /** @internal */ _push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) {
            throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        }
        let pushEvent = new Push(this, event, payload, timeout);
        if (this._canPush()) {
            pushEvent.send();
        } else {
            pushEvent.startTimeout();
            this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling before dispatching to the channel callbacks.
     * Must return the payload, modified or unmodified.
     *
     * @internal
     */ _onMessage(_event, payload, _ref) {
        return payload;
    }
    /** @internal */ _isMember(topic) {
        return this.topic === topic;
    }
    /** @internal */ _joinRef() {
        return this.joinPush.ref;
    }
    /** @internal */ _trigger(type, payload, ref) {
        var _a, _b;
        const typeLower = type.toLocaleLowerCase();
        const { close, error, leave, join } = CHANNEL_EVENTS;
        const events = [
            close,
            error,
            leave,
            join
        ];
        if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
            return;
        }
        let handledPayload = this._onMessage(typeLower, payload, ref);
        if (payload && !handledPayload) {
            throw "channel onMessage callbacks must return the payload, modified or unmodified";
        }
        if ([
            "insert",
            "update",
            "delete"
        ].includes(typeLower)) {
            (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind)=>{
                var _a, _b, _c;
                return ((_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event) === "*" || ((_c = (_b = bind.filter) === null || _b === void 0 ? void 0 : _b.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
            }).map((bind)=>bind.callback(handledPayload, ref));
        } else {
            (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind)=>{
                var _a, _b, _c, _d, _e, _f;
                if ([
                    "broadcast",
                    "presence",
                    "postgres_changes"
                ].includes(typeLower)) {
                    if ("id" in bind) {
                        const bindId = bind.id;
                        const bindEvent = (_a = bind.filter) === null || _a === void 0 ? void 0 : _a.event;
                        return bindId && ((_b = payload.ids) === null || _b === void 0 ? void 0 : _b.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
                    } else {
                        const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                        return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
                    }
                } else {
                    return bind.type.toLocaleLowerCase() === typeLower;
                }
            }).map((bind)=>{
                if (typeof handledPayload === "object" && "ids" in handledPayload) {
                    const postgresChanges = handledPayload.data;
                    const { schema, table, commit_timestamp, type, errors } = postgresChanges;
                    const enrichedPayload = {
                        schema: schema,
                        table: table,
                        commit_timestamp: commit_timestamp,
                        eventType: type,
                        new: {},
                        old: {},
                        errors: errors
                    };
                    handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
                }
                bind.callback(handledPayload, ref);
            });
        }
    }
    /** @internal */ _isClosed() {
        return this.state === CHANNEL_STATES.closed;
    }
    /** @internal */ _isJoined() {
        return this.state === CHANNEL_STATES.joined;
    }
    /** @internal */ _isJoining() {
        return this.state === CHANNEL_STATES.joining;
    }
    /** @internal */ _isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
    }
    /** @internal */ _replyEventName(ref) {
        return `chan_reply_${ref}`;
    }
    /** @internal */ _on(type, filter, callback) {
        const typeLower = type.toLocaleLowerCase();
        const binding = {
            type: typeLower,
            filter: filter,
            callback: callback
        };
        if (this.bindings[typeLower]) {
            this.bindings[typeLower].push(binding);
        } else {
            this.bindings[typeLower] = [
                binding
            ];
        }
        return this;
    }
    /** @internal */ _off(type, filter) {
        const typeLower = type.toLocaleLowerCase();
        this.bindings[typeLower] = this.bindings[typeLower].filter((bind)=>{
            var _a;
            return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && RealtimeChannel.isEqual(bind.filter, filter));
        });
        return this;
    }
    /** @internal */ static isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        for(const k in obj1){
            if (obj1[k] !== obj2[k]) {
                return false;
            }
        }
        return true;
    }
    /** @internal */ _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();
        if (this.socket.isConnected()) {
            this._rejoin();
        }
    }
    /**
     * Registers a callback that will be executed when the channel closes.
     *
     * @internal
     */ _onClose(callback) {
        this._on(CHANNEL_EVENTS.close, {}, callback);
    }
    /**
     * Registers a callback that will be executed when the channel encounteres an error.
     *
     * @internal
     */ _onError(callback) {
        this._on(CHANNEL_EVENTS.error, {}, (reason)=>callback(reason));
    }
    /**
     * Returns `true` if the socket is connected and the channel has been joined.
     *
     * @internal
     */ _canPush() {
        return this.socket.isConnected() && this._isJoined();
    }
    /** @internal */ _rejoin(timeout = this.timeout) {
        if (this._isLeaving()) {
            return;
        }
        this.socket._leaveOpenTopic(this.topic);
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
    }
    /** @internal */ _getPayloadRecords(payload) {
        const records = {
            new: {},
            old: {}
        };
        if (payload.type === "INSERT" || payload.type === "UPDATE") {
            records.new = convertChangeData(payload.columns, payload.record);
        }
        if (payload.type === "UPDATE" || payload.type === "DELETE") {
            records.old = convertChangeData(payload.columns, payload.old_record);
        }
        return records;
    }
} //# sourceMappingURL=RealtimeChannel.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var RealtimeClient_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const RealtimeClient_noop = ()=>{};
class RealtimeClient {
    /**
     * Initializes the Socket.
     *
     * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
     * @param options.transport The Websocket Transport, for example WebSocket.
     * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
     * @param options.params The optional params to pass when connecting.
     * @param options.headers The optional headers to pass when connecting.
     * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
     * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
     * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
     * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
     * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
     */ constructor(endPoint, options){
        var _a;
        this.accessToken = null;
        this.channels = [];
        this.endPoint = "";
        this.headers = constants_DEFAULT_HEADERS;
        this.params = {};
        this.timeout = DEFAULT_TIMEOUT;
        this.transport = browser.w3cwebsocket;
        this.heartbeatIntervalMs = 30000;
        this.heartbeatTimer = undefined;
        this.pendingHeartbeatRef = null;
        this.ref = 0;
        this.logger = RealtimeClient_noop;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new Serializer();
        this.stateChangeCallbacks = {
            open: [],
            close: [],
            error: [],
            message: []
        };
        this.eventsPerSecondLimitMs = 100;
        this.inThrottle = false;
        this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
        if (options === null || options === void 0 ? void 0 : options.params) this.params = options.params;
        if (options === null || options === void 0 ? void 0 : options.headers) this.headers = Object.assign(Object.assign({}, this.headers), options.headers);
        if (options === null || options === void 0 ? void 0 : options.timeout) this.timeout = options.timeout;
        if (options === null || options === void 0 ? void 0 : options.logger) this.logger = options.logger;
        if (options === null || options === void 0 ? void 0 : options.transport) this.transport = options.transport;
        if (options === null || options === void 0 ? void 0 : options.heartbeatIntervalMs) this.heartbeatIntervalMs = options.heartbeatIntervalMs;
        const eventsPerSecond = (_a = options === null || options === void 0 ? void 0 : options.params) === null || _a === void 0 ? void 0 : _a.eventsPerSecond;
        if (eventsPerSecond) this.eventsPerSecondLimitMs = Math.floor(1000 / eventsPerSecond);
        this.reconnectAfterMs = (options === null || options === void 0 ? void 0 : options.reconnectAfterMs) ? options.reconnectAfterMs : (tries)=>{
            return [
                1000,
                2000,
                5000,
                10000
            ][tries - 1] || 10000;
        };
        this.encode = (options === null || options === void 0 ? void 0 : options.encode) ? options.encode : (payload, callback)=>{
            return callback(JSON.stringify(payload));
        };
        this.decode = (options === null || options === void 0 ? void 0 : options.decode) ? options.decode : this.serializer.decode.bind(this.serializer);
        this.reconnectTimer = new Timer(()=>RealtimeClient_awaiter(this, void 0, void 0, function*() {
                this.disconnect();
                this.connect();
            }), this.reconnectAfterMs);
    }
    /**
     * Connects the socket, unless already connected.
     */ connect() {
        if (this.conn) {
            return;
        }
        this.conn = new this.transport(this._endPointURL(), [], null, this.headers);
        if (this.conn) {
            this.conn.binaryType = "arraybuffer";
            this.conn.onopen = ()=>this._onConnOpen();
            this.conn.onerror = (error)=>this._onConnError(error);
            this.conn.onmessage = (event)=>this._onConnMessage(event);
            this.conn.onclose = (event)=>this._onConnClose(event);
        }
    }
    /**
     * Disconnects the socket.
     *
     * @param code A numeric status code to send on disconnect.
     * @param reason A custom reason for the disconnect.
     */ disconnect(code, reason) {
        if (this.conn) {
            this.conn.onclose = function() {}; // noop
            if (code) {
                this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
            } else {
                this.conn.close();
            }
            this.conn = null;
            // remove open handles
            this.heartbeatTimer && clearInterval(this.heartbeatTimer);
            this.reconnectTimer.reset();
        }
    }
    /**
     * Returns all created channels
     */ getChannels() {
        return this.channels;
    }
    /**
     * Unsubscribes and removes a single channel
     * @param channel A RealtimeChannel instance
     */ removeChannel(channel) {
        return RealtimeClient_awaiter(this, void 0, void 0, function*() {
            const status = yield channel.unsubscribe();
            if (this.channels.length === 0) {
                this.disconnect();
            }
            return status;
        });
    }
    /**
     * Unsubscribes and removes all channels
     */ removeAllChannels() {
        return RealtimeClient_awaiter(this, void 0, void 0, function*() {
            const values_1 = yield Promise.all(this.channels.map((channel)=>channel.unsubscribe()));
            this.disconnect();
            return values_1;
        });
    }
    /**
     * Logs the message.
     *
     * For customized logging, `this.logger` can be overridden.
     */ log(kind, msg, data) {
        this.logger(kind, msg, data);
    }
    /**
     * Returns the current state of the socket.
     */ connectionState() {
        switch(this.conn && this.conn.readyState){
            case SOCKET_STATES.connecting:
                return CONNECTION_STATE.Connecting;
            case SOCKET_STATES.open:
                return CONNECTION_STATE.Open;
            case SOCKET_STATES.closing:
                return CONNECTION_STATE.Closing;
            default:
                return CONNECTION_STATE.Closed;
        }
    }
    /**
     * Returns `true` is the connection is open.
     */ isConnected() {
        return this.connectionState() === CONNECTION_STATE.Open;
    }
    channel(topic, params = {
        config: {}
    }) {
        if (!this.isConnected()) {
            this.connect();
        }
        const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
        this.channels.push(chan);
        return chan;
    }
    /**
     * Push out a message if the socket is connected.
     *
     * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
     */ push(data) {
        const { topic, event, payload, ref } = data;
        let callback = ()=>{
            this.encode(data, (result)=>{
                var _a;
                (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
            });
        };
        this.log("push", `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
            if ([
                "broadcast",
                "presence",
                "postgres_changes"
            ].includes(event)) {
                const isThrottled = this._throttle(callback)();
                if (isThrottled) {
                    return "rate limited";
                }
            } else {
                callback();
            }
        } else {
            this.sendBuffer.push(callback);
        }
    }
    /**
     * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
     *
     * @param token A JWT string.
     */ setAuth(token) {
        this.accessToken = token;
        this.channels.forEach((channel)=>{
            token && channel.updateJoinPayload({
                access_token: token
            });
            if (channel.joinedOnce && channel._isJoined()) {
                channel._push(CHANNEL_EVENTS.access_token, {
                    access_token: token
                });
            }
        });
    }
    /**
     * Return the next message ref, accounting for overflows
     *
     * @internal
     */ _makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
            this.ref = 0;
        } else {
            this.ref = newRef;
        }
        return this.ref.toString();
    }
    /**
     * Unsubscribe from channels with the specified topic.
     *
     * @internal
     */ _leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c)=>c.topic === topic && (c._isJoined() || c._isJoining()));
        if (dupChannel) {
            this.log("transport", `leaving duplicate topic "${topic}"`);
            dupChannel.unsubscribe();
        }
    }
    /**
     * Removes a subscription from the socket.
     *
     * @param channel An open subscription.
     *
     * @internal
     */ _remove(channel) {
        this.channels = this.channels.filter((c)=>c._joinRef() !== channel._joinRef());
    }
    /**
     * Returns the URL of the websocket.
     *
     * @internal
     */ _endPointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, {
            vsn: VSN
        }));
    }
    /** @internal */ _onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg)=>{
            let { topic, event, payload, ref } = msg;
            if (ref && ref === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
                this.pendingHeartbeatRef = null;
            }
            this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
            this.channels.filter((channel)=>channel._isMember(topic)).forEach((channel)=>channel._trigger(event, payload, ref));
            this.stateChangeCallbacks.message.forEach((callback)=>callback(msg));
        });
    }
    /** @internal */ _onConnOpen() {
        this.log("transport", `connected to ${this._endPointURL()}`);
        this._flushSendBuffer();
        this.reconnectTimer.reset();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(()=>this._sendHeartbeat(), this.heartbeatIntervalMs);
        this.stateChangeCallbacks.open.forEach((callback)=>callback());
    }
    /** @internal */ _onConnClose(event) {
        this.log("transport", "close", event);
        this._triggerChanError();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.reconnectTimer.scheduleTimeout();
        this.stateChangeCallbacks.close.forEach((callback)=>callback(event));
    }
    /** @internal */ _onConnError(error) {
        this.log("transport", error.message);
        this._triggerChanError();
        this.stateChangeCallbacks.error.forEach((callback)=>callback(error));
    }
    /** @internal */ _triggerChanError() {
        this.channels.forEach((channel)=>channel._trigger(CHANNEL_EVENTS.error));
    }
    /** @internal */ _appendParams(url, params) {
        if (Object.keys(params).length === 0) {
            return url;
        }
        const prefix = url.match(/\?/) ? "&" : "?";
        const query = new URLSearchParams(params);
        return `${url}${prefix}${query}`;
    }
    /** @internal */ _flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
            this.sendBuffer.forEach((callback)=>callback());
            this.sendBuffer = [];
        }
    }
    /** @internal */ _sendHeartbeat() {
        var _a;
        if (!this.isConnected()) {
            return;
        }
        if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null;
            this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "hearbeat timeout");
            return;
        }
        this.pendingHeartbeatRef = this._makeRef();
        this.push({
            topic: "phoenix",
            event: "heartbeat",
            payload: {},
            ref: this.pendingHeartbeatRef
        });
        this.setAuth(this.accessToken);
    }
    /** @internal */ _throttle(callback, eventsPerSecondLimitMs = this.eventsPerSecondLimitMs) {
        return ()=>{
            if (this.inThrottle) return true;
            callback();
            if (eventsPerSecondLimitMs > 0) {
                this.inThrottle = true;
                setTimeout(()=>{
                    this.inThrottle = false;
                }, eventsPerSecondLimitMs);
            }
            return false;
        };
    }
} //# sourceMappingURL=RealtimeClient.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/realtime-js/dist/module/index.js



 //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/storage-js/dist/module/lib/errors.js
class StorageError extends Error {
    constructor(message){
        super(message);
        this.__isStorageError = true;
        this.name = "StorageError";
    }
}
function isStorageError(error) {
    return typeof error === "object" && error !== null && "__isStorageError" in error;
}
class StorageApiError extends StorageError {
    constructor(message, status){
        super(message);
        this.name = "StorageApiError";
        this.status = status;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        };
    }
}
class StorageUnknownError extends StorageError {
    constructor(message, originalError){
        super(message);
        this.name = "StorageUnknownError";
        this.originalError = originalError;
    }
} //# sourceMappingURL=errors.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/storage-js/dist/module/lib/helpers.js
var helpers_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const helpers_resolveFetch = (customFetch)=>{
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    } else if (typeof fetch === "undefined") {
        _fetch = (...args)=>helpers_awaiter(void 0, void 0, void 0, function*() {
                return yield (yield Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 859, 23))).fetch(...args);
            });
    } else {
        _fetch = fetch;
    }
    return (...args)=>_fetch(...args);
};
const resolveResponse = ()=>helpers_awaiter(void 0, void 0, void 0, function*() {
        if (typeof Response === "undefined") {
            return (yield Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 859, 23))).Response;
        }
        return Response;
    }); //# sourceMappingURL=helpers.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/storage-js/dist/module/lib/fetch.js
var fetch_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const _getErrorMessage = (err)=>err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const handleError = (error, reject)=>fetch_awaiter(void 0, void 0, void 0, function*() {
        const Res = yield resolveResponse();
        if (error instanceof Res) {
            error.json().then((err)=>{
                reject(new StorageApiError(_getErrorMessage(err), error.status || 500));
            }).catch((err)=>{
                reject(new StorageUnknownError(_getErrorMessage(err), err));
            });
        } else {
            reject(new StorageUnknownError(_getErrorMessage(error), error));
        }
    });
const _getRequestParams = (method, options, parameters, body)=>{
    const params = {
        method,
        headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
    };
    if (method === "GET") {
        return params;
    }
    params.headers = Object.assign({
        "Content-Type": "application/json"
    }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
};
function _handleRequest(fetcher, method, url, options, parameters, body) {
    return fetch_awaiter(this, void 0, void 0, function*() {
        return new Promise((resolve, reject)=>{
            fetcher(url, _getRequestParams(method, options, parameters, body)).then((result)=>{
                if (!result.ok) throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
                return result.json();
            }).then((data)=>resolve(data)).catch((error)=>handleError(error, reject));
        });
    });
}
function get(fetcher, url, options, parameters) {
    return fetch_awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, "GET", url, options, parameters);
    });
}
function post(fetcher, url, body, options, parameters) {
    return fetch_awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, "POST", url, options, parameters, body);
    });
}
function put(fetcher, url, body, options, parameters) {
    return fetch_awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, "PUT", url, options, parameters, body);
    });
}
function remove(fetcher, url, body, options, parameters) {
    return fetch_awaiter(this, void 0, void 0, function*() {
        return _handleRequest(fetcher, "DELETE", url, options, parameters, body);
    });
} //# sourceMappingURL=fetch.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
var StorageFileApi_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const DEFAULT_SEARCH_OPTIONS = {
    limit: 100,
    offset: 0,
    sortBy: {
        column: "name",
        order: "asc"
    }
};
const DEFAULT_FILE_OPTIONS = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: false
};
class StorageFileApi {
    constructor(url, headers = {}, bucketId, fetch){
        this.url = url;
        this.headers = headers;
        this.bucketId = bucketId;
        this.fetch = helpers_resolveFetch(fetch);
    }
    /**
     * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
     *
     * @param method HTTP method.
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */ uploadOrUpdate(method, path, fileBody, fileOptions) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            try {
                let body;
                const options = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
                const headers = Object.assign(Object.assign({}, this.headers), method === "POST" && {
                    "x-upsert": String(options.upsert)
                });
                if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
                    body = new FormData();
                    body.append("cacheControl", options.cacheControl);
                    body.append("", fileBody);
                } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
                    body = fileBody;
                    body.append("cacheControl", options.cacheControl);
                } else {
                    body = fileBody;
                    headers["cache-control"] = `max-age=${options.cacheControl}`;
                    headers["content-type"] = options.contentType;
                }
                const cleanPath = this._removeEmptyFolders(path);
                const _path = this._getFinalPath(cleanPath);
                const res = yield this.fetch(`${this.url}/object/${_path}`, Object.assign({
                    method,
                    body: body,
                    headers
                }, (options === null || options === void 0 ? void 0 : options.duplex) ? {
                    duplex: options.duplex
                } : {}));
                if (res.ok) {
                    return {
                        data: {
                            path: cleanPath
                        },
                        error: null
                    };
                } else {
                    const error = yield res.json();
                    return {
                        data: null,
                        error
                    };
                }
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Uploads a file to an existing bucket.
     *
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param fileBody The body of the file to be stored in the bucket.
     */ upload(path, fileBody, fileOptions) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
        });
    }
    /**
     * Upload a file with a token generated from `createSignedUploadUrl`.
     * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
     * @param token The token generated from `createSignedUploadUrl`
     * @param fileBody The body of the file to be stored in the bucket.
     */ uploadToSignedUrl(path, token, fileBody, fileOptions) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            const cleanPath = this._removeEmptyFolders(path);
            const _path = this._getFinalPath(cleanPath);
            const url = new URL(this.url + `/object/upload/sign/${_path}`);
            url.searchParams.set("token", token);
            try {
                let body;
                const options = Object.assign({
                    upsert: DEFAULT_FILE_OPTIONS.upsert
                }, fileOptions);
                const headers = Object.assign(Object.assign({}, this.headers), {
                    "x-upsert": String(options.upsert)
                });
                if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
                    body = new FormData();
                    body.append("cacheControl", options.cacheControl);
                    body.append("", fileBody);
                } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
                    body = fileBody;
                    body.append("cacheControl", options.cacheControl);
                } else {
                    body = fileBody;
                    headers["cache-control"] = `max-age=${options.cacheControl}`;
                    headers["content-type"] = options.contentType;
                }
                const res = yield this.fetch(url.toString(), {
                    method: "PUT",
                    body: body,
                    headers
                });
                if (res.ok) {
                    return {
                        data: {
                            path: cleanPath
                        },
                        error: null
                    };
                } else {
                    const error = yield res.json();
                    return {
                        data: null,
                        error
                    };
                }
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a signed upload URL.
     * Signed upload URLs can be used to upload files to the bucket without further authentication.
     * They are valid for one minute.
     * @param path The file path, including the current file name. For example `folder/image.png`.
     */ createSignedUploadUrl(path) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            try {
                let _path = this._getFinalPath(path);
                const data = yield post(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, {
                    headers: this.headers
                });
                const url = new URL(this.url + data.url);
                const token = url.searchParams.get("token");
                if (!token) {
                    throw new StorageError("No token returned by API");
                }
                return {
                    data: {
                        signedUrl: url.toString(),
                        path,
                        token
                    },
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Replaces an existing file at the specified path with a new one.
     *
     * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
     * @param fileBody The body of the file to be stored in the bucket.
     */ update(path, fileBody, fileOptions) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
        });
    }
    /**
     * Moves an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
     */ move(fromPath, toPath) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield post(this.fetch, `${this.url}/object/move`, {
                    bucketId: this.bucketId,
                    sourceKey: fromPath,
                    destinationKey: toPath
                }, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Copies an existing file to a new path in the same bucket.
     *
     * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
     * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
     */ copy(fromPath, toPath) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield post(this.fetch, `${this.url}/object/copy`, {
                    bucketId: this.bucketId,
                    sourceKey: fromPath,
                    destinationKey: toPath
                }, {
                    headers: this.headers
                });
                return {
                    data: {
                        path: data.Key
                    },
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param path The file path, including the current file name. For example `folder/image.png`.
     * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */ createSignedUrl(path, expiresIn, options) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            try {
                let _path = this._getFinalPath(path);
                let data = yield post(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({
                    expiresIn
                }, (options === null || options === void 0 ? void 0 : options.transform) ? {
                    transform: options.transform
                } : {}), {
                    headers: this.headers
                });
                const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
                const signedUrl = encodeURI(`${this.url}${data.signedURL}${downloadQueryParam}`);
                data = {
                    signedUrl
                };
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
     *
     * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
     * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
     * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     */ createSignedUrls(paths, expiresIn, options) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, {
                    expiresIn,
                    paths
                }, {
                    headers: this.headers
                });
                const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `&download=${options.download === true ? "" : options.download}` : "";
                return {
                    data: data.map((datum)=>Object.assign(Object.assign({}, datum), {
                            signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null
                        })),
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
     *
     * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
     * @param options.transform Transform the asset before serving it to the client.
     */ download(path, options) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
            const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
            const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
            const queryString = transformationQuery ? `?${transformationQuery}` : "";
            try {
                const _path = this._getFinalPath(path);
                const res = yield get(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
                    headers: this.headers,
                    noResolveJson: true
                });
                const data = yield res.blob();
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
     * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
     *
     * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
     * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
     * @param options.transform Transform the asset before serving it to the client.
     */ getPublicUrl(path, options) {
        const _path = this._getFinalPath(path);
        const _queryString = [];
        const downloadQueryParam = (options === null || options === void 0 ? void 0 : options.download) ? `download=${options.download === true ? "" : options.download}` : "";
        if (downloadQueryParam !== "") {
            _queryString.push(downloadQueryParam);
        }
        const wantsTransformation = typeof (options === null || options === void 0 ? void 0 : options.transform) !== "undefined";
        const renderPath = wantsTransformation ? "render/image" : "object";
        const transformationQuery = this.transformOptsToQueryString((options === null || options === void 0 ? void 0 : options.transform) || {});
        if (transformationQuery !== "") {
            _queryString.push(transformationQuery);
        }
        let queryString = _queryString.join("&");
        if (queryString !== "") {
            queryString = `?${queryString}`;
        }
        return {
            data: {
                publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`)
            }
        };
    }
    /**
     * Deletes files within the same bucket
     *
     * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
     */ remove(paths) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, {
                    prefixes: paths
                }, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Get file metadata
     * @param id the file id to retrieve metadata
     */ // async getMetadata(
    //   id: string
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Update file metadata
     * @param id the file id to update metadata
     * @param meta the new file metadata
     */ // async updateMetadata(
    //   id: string,
    //   meta: Metadata
    // ): Promise<
    //   | {
    //       data: Metadata
    //       error: null
    //     }
    //   | {
    //       data: null
    //       error: StorageError
    //     }
    // > {
    //   try {
    //     const data = await post(
    //       this.fetch,
    //       `${this.url}/metadata/${id}`,
    //       { ...meta },
    //       { headers: this.headers }
    //     )
    //     return { data, error: null }
    //   } catch (error) {
    //     if (isStorageError(error)) {
    //       return { data: null, error }
    //     }
    //     throw error
    //   }
    // }
    /**
     * Lists all the files within a bucket.
     * @param path The folder path.
     */ list(path, options, parameters) {
        return StorageFileApi_awaiter(this, void 0, void 0, function*() {
            try {
                const body = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options), {
                    prefix: path || ""
                });
                const data = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body, {
                    headers: this.headers
                }, parameters);
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    _getFinalPath(path) {
        return `${this.bucketId}/${path}`;
    }
    _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
    }
    transformOptsToQueryString(transform) {
        const params = [];
        if (transform.width) {
            params.push(`width=${transform.width}`);
        }
        if (transform.height) {
            params.push(`height=${transform.height}`);
        }
        if (transform.resize) {
            params.push(`resize=${transform.resize}`);
        }
        if (transform.format) {
            params.push(`format=${transform.format}`);
        }
        if (transform.quality) {
            params.push(`quality=${transform.quality}`);
        }
        return params.join("&");
    }
} //# sourceMappingURL=StorageFileApi.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/storage-js/dist/module/lib/version.js
// generated by genversion
const lib_version_version = "2.5.1"; //# sourceMappingURL=version.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/storage-js/dist/module/lib/constants.js

const lib_constants_DEFAULT_HEADERS = {
    "X-Client-Info": `storage-js/${lib_version_version}`
}; //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
var StorageBucketApi_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class StorageBucketApi {
    constructor(url, headers = {}, fetch){
        this.url = url;
        this.headers = Object.assign(Object.assign({}, lib_constants_DEFAULT_HEADERS), headers);
        this.fetch = helpers_resolveFetch(fetch);
    }
    /**
     * Retrieves the details of all Storage buckets within an existing project.
     */ listBuckets() {
        return StorageBucketApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield get(this.fetch, `${this.url}/bucket`, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Retrieves the details of an existing Storage bucket.
     *
     * @param id The unique identifier of the bucket you would like to retrieve.
     */ getBucket(id) {
        return StorageBucketApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield get(this.fetch, `${this.url}/bucket/${id}`, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Creates a new Storage bucket
     *
     * @param id A unique identifier for the bucket you are creating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     * @returns newly created bucket id
     */ createBucket(id, options = {
        public: false
    }) {
        return StorageBucketApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield post(this.fetch, `${this.url}/bucket`, {
                    id,
                    name: id,
                    public: options.public,
                    file_size_limit: options.fileSizeLimit,
                    allowed_mime_types: options.allowedMimeTypes
                }, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Updates a Storage bucket
     *
     * @param id A unique identifier for the bucket you are updating.
     * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
     * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
     * The global file size limit takes precedence over this value.
     * The default value is null, which doesn't set a per bucket file size limit.
     * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
     * The default value is null, which allows files with all mime types to be uploaded.
     * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
     */ updateBucket(id, options) {
        return StorageBucketApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield put(this.fetch, `${this.url}/bucket/${id}`, {
                    id,
                    name: id,
                    public: options.public,
                    file_size_limit: options.fileSizeLimit,
                    allowed_mime_types: options.allowedMimeTypes
                }, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Removes all objects inside a single bucket.
     *
     * @param id The unique identifier of the bucket you would like to empty.
     */ emptyBucket(id) {
        return StorageBucketApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
     * You must first `empty()` the bucket.
     *
     * @param id The unique identifier of the bucket you would like to delete.
     */ deleteBucket(id) {
        return StorageBucketApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isStorageError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
} //# sourceMappingURL=StorageBucketApi.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/storage-js/dist/module/StorageClient.js


class StorageClient extends StorageBucketApi {
    constructor(url, headers = {}, fetch){
        super(url, headers, fetch);
    }
    /**
     * Perform file operation in a bucket.
     *
     * @param id The bucket id to operate on.
     */ from(id) {
        return new StorageFileApi(this.url, this.headers, id, this.fetch);
    }
} //# sourceMappingURL=StorageClient.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/supabase-js/dist/module/lib/version.js
const module_lib_version_version = "2.24.0"; //# sourceMappingURL=version.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/supabase-js/dist/module/lib/constants.js
// constants.ts

const module_lib_constants_DEFAULT_HEADERS = {
    "X-Client-Info": `supabase-js/${module_lib_version_version}`
}; //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/supabase-js/dist/module/lib/fetch.js
var lib_fetch_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const fetch_resolveFetch = (customFetch)=>{
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    } else if (typeof fetch === "undefined") {
        _fetch = (browser_ponyfill_default());
    } else {
        _fetch = fetch;
    }
    return (...args)=>_fetch(...args);
};
const resolveHeadersConstructor = ()=>{
    if (typeof Headers === "undefined") {
        return browser_ponyfill.Headers;
    }
    return Headers;
};
const fetchWithAuth = (supabaseKey, getAccessToken, customFetch)=>{
    const fetch1 = fetch_resolveFetch(customFetch);
    const HeadersConstructor = resolveHeadersConstructor();
    return (input, init)=>lib_fetch_awaiter(void 0, void 0, void 0, function*() {
            var _a;
            const accessToken = (_a = yield getAccessToken()) !== null && _a !== void 0 ? _a : supabaseKey;
            let headers = new HeadersConstructor(init === null || init === void 0 ? void 0 : init.headers);
            if (!headers.has("apikey")) {
                headers.set("apikey", supabaseKey);
            }
            if (!headers.has("Authorization")) {
                headers.set("Authorization", `Bearer ${accessToken}`);
            }
            return fetch1(input, Object.assign(Object.assign({}, init), {
                headers
            }));
        });
}; //# sourceMappingURL=fetch.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
function stripTrailingSlash(url) {
    return url.replace(/\/$/, "");
}
const isBrowser = ()=>"undefined" !== "undefined";
function applySettingDefaults(options, defaults) {
    const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options;
    const { db: DEFAULT_DB_OPTIONS, auth: DEFAULT_AUTH_OPTIONS, realtime: DEFAULT_REALTIME_OPTIONS, global: DEFAULT_GLOBAL_OPTIONS } = defaults;
    return {
        db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS), dbOptions),
        auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), authOptions),
        realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS), realtimeOptions),
        global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS), globalOptions)
    };
} //# sourceMappingURL=helpers.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js
var lib_helpers_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function expiresAt(expiresIn) {
    const timeNow = Math.round(Date.now() / 1000);
    return timeNow + expiresIn;
}
function helpers_uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == "x" ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
const helpers_isBrowser = ()=>typeof document !== "undefined";
const localStorageWriteTests = {
    tested: false,
    writable: false
};
/**
 * Checks whether localStorage is supported on this browser.
 */ const supportsLocalStorage = ()=>{
    if (!helpers_isBrowser()) {
        return false;
    }
    try {
        if (typeof globalThis.localStorage !== "object") {
            return false;
        }
    } catch (e) {
        // DOM exception when accessing `localStorage`
        return false;
    }
    if (localStorageWriteTests.tested) {
        return localStorageWriteTests.writable;
    }
    const randomKey = `lswt-${Math.random()}${Math.random()}`;
    try {
        globalThis.localStorage.setItem(randomKey, randomKey);
        globalThis.localStorage.removeItem(randomKey);
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = true;
    } catch (e) {
        // localStorage can't be written to
        // https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = false;
    }
    return localStorageWriteTests.writable;
};
function getParameterByName(name, url) {
    var _a;
    if (!url) url = ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.href) || "";
    // eslint-disable-next-line no-useless-escape
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
const lib_helpers_resolveFetch = (customFetch)=>{
    let _fetch;
    if (customFetch) {
        _fetch = customFetch;
    } else if (typeof fetch === "undefined") {
        _fetch = (...args)=>lib_helpers_awaiter(void 0, void 0, void 0, function*() {
                return yield (yield Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 859, 23))).fetch(...args);
            });
    } else {
        _fetch = fetch;
    }
    return (...args)=>_fetch(...args);
};
const looksLikeFetchResponse = (maybeResponse)=>{
    return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
};
// Storage helpers
const setItemAsync = (storage, key, data)=>lib_helpers_awaiter(void 0, void 0, void 0, function*() {
        yield storage.setItem(key, JSON.stringify(data));
    });
const getItemAsync = (storage, key)=>lib_helpers_awaiter(void 0, void 0, void 0, function*() {
        const value = yield storage.getItem(key);
        if (!value) {
            return null;
        }
        try {
            return JSON.parse(value);
        } catch (_a) {
            return value;
        }
    });
const removeItemAsync = (storage, key)=>lib_helpers_awaiter(void 0, void 0, void 0, function*() {
        yield storage.removeItem(key);
    });
function helpers_decodeBase64URL(value) {
    const key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let base64 = "";
    let chr1, chr2, chr3;
    let enc1, enc2, enc3, enc4;
    let i = 0;
    value = value.replace("-", "+").replace("_", "/");
    while(i < value.length){
        enc1 = key.indexOf(value.charAt(i++));
        enc2 = key.indexOf(value.charAt(i++));
        enc3 = key.indexOf(value.charAt(i++));
        enc4 = key.indexOf(value.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        base64 = base64 + String.fromCharCode(chr1);
        if (enc3 != 64 && chr2 != 0) {
            base64 = base64 + String.fromCharCode(chr2);
        }
        if (enc4 != 64 && chr3 != 0) {
            base64 = base64 + String.fromCharCode(chr3);
        }
    }
    return base64;
}
/**
 * A deferred represents some asynchronous work that is not yet finished, which
 * may or may not culminate in a value.
 * Taken from: https://github.com/mike-north/types/blob/master/src/async.ts
 */ class Deferred {
    constructor(){
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;
        this.promise = new Deferred.promiseConstructor((res, rej)=>{
            // eslint-disable-next-line @typescript-eslint/no-extra-semi
            ;
            this.resolve = res;
            this.reject = rej;
        });
    }
}
Deferred.promiseConstructor = Promise;
// Taken from: https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript-without-using-a-library
function decodeJWTPayload(token) {
    // Regex checks for base64url format
    const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i;
    const parts = token.split(".");
    if (parts.length !== 3) {
        throw new Error("JWT is not valid: not a JWT structure");
    }
    if (!base64UrlRegex.test(parts[1])) {
        throw new Error("JWT is not valid: payload is not in base64url format");
    }
    const base64Url = parts[1];
    return JSON.parse(helpers_decodeBase64URL(base64Url));
}
/**
 * Creates a promise that resolves to null after some time.
 */ function sleep(time) {
    return new Promise((accept)=>{
        setTimeout(()=>accept(null), time);
    });
}
/**
 * Converts the provided async function into a retryable function. Each result
 * or thrown error is sent to the isRetryable function which should return true
 * if the function should run again.
 */ function retryable(fn, isRetryable) {
    const promise = new Promise((accept, reject)=>{
        // eslint-disable-next-line @typescript-eslint/no-extra-semi
        ;
        (()=>lib_helpers_awaiter(this, void 0, void 0, function*() {
                for(let attempt = 0; attempt < Infinity; attempt++){
                    try {
                        const result = yield fn(attempt);
                        if (!isRetryable(attempt, null, result)) {
                            accept(result);
                            return;
                        }
                    } catch (e) {
                        if (!isRetryable(attempt, e)) {
                            reject(e);
                            return;
                        }
                    }
                }
            }))();
    });
    return promise;
}
function dec2hex(dec) {
    return ("0" + dec.toString(16)).substr(-2);
}
// Functions below taken from: https://stackoverflow.com/questions/63309409/creating-a-code-verifier-and-challenge-for-pkce-auth-on-spotify-api-in-reactjs
function generatePKCEVerifier() {
    const verifierLength = 56;
    const array = new Uint32Array(verifierLength);
    if (typeof crypto === "undefined") {
        const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
        const charSetLen = charSet.length;
        let verifier = "";
        for(let i = 0; i < verifierLength; i++){
            verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
        }
        return verifier;
    }
    crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
}
function sha256(randomString) {
    return lib_helpers_awaiter(this, void 0, void 0, function*() {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(randomString);
        const hash = yield crypto.subtle.digest("SHA-256", encodedData);
        const bytes = new Uint8Array(hash);
        return Array.from(bytes).map((c)=>String.fromCharCode(c)).join("");
    });
}
function base64urlencode(str) {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function generatePKCEChallenge(verifier) {
    return lib_helpers_awaiter(this, void 0, void 0, function*() {
        if (typeof crypto === "undefined") {
            console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
            return verifier;
        }
        const hashed = yield sha256(verifier);
        return base64urlencode(hashed);
    });
} //# sourceMappingURL=helpers.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/gotrue-js/dist/module/lib/errors.js
class AuthError extends Error {
    constructor(message, status){
        super(message);
        this.__isAuthError = true;
        this.name = "AuthError";
        this.status = status;
    }
}
function isAuthError(error) {
    return typeof error === "object" && error !== null && "__isAuthError" in error;
}
class AuthApiError extends AuthError {
    constructor(message, status){
        super(message, status);
        this.name = "AuthApiError";
        this.status = status;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        };
    }
}
function isAuthApiError(error) {
    return isAuthError(error) && error.name === "AuthApiError";
}
class AuthUnknownError extends AuthError {
    constructor(message, originalError){
        super(message);
        this.name = "AuthUnknownError";
        this.originalError = originalError;
    }
}
class CustomAuthError extends AuthError {
    constructor(message, name, status){
        super(message);
        this.name = name;
        this.status = status;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status
        };
    }
}
class AuthSessionMissingError extends CustomAuthError {
    constructor(){
        super("Auth session missing!", "AuthSessionMissingError", 400);
    }
}
class AuthInvalidCredentialsError extends CustomAuthError {
    constructor(message){
        super(message, "AuthInvalidCredentialsError", 400);
    }
}
class AuthImplicitGrantRedirectError extends CustomAuthError {
    constructor(message, details = null){
        super(message, "AuthImplicitGrantRedirectError", 500);
        this.details = null;
        this.details = details;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details
        };
    }
}
class AuthPKCEGrantCodeExchangeError extends CustomAuthError {
    constructor(message, details = null){
        super(message, "AuthPKCEGrantCodeExchangeError", 500);
        this.details = null;
        this.details = details;
    }
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            status: this.status,
            details: this.details
        };
    }
}
class AuthRetryableFetchError extends CustomAuthError {
    constructor(message, status){
        super(message, "AuthRetryableFetchError", status);
    }
} //# sourceMappingURL=errors.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js
var module_lib_fetch_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};


const fetch_getErrorMessage = (err)=>err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
const fetch_handleError = (error, reject)=>module_lib_fetch_awaiter(void 0, void 0, void 0, function*() {
        const NETWORK_ERROR_CODES = [
            502,
            503,
            504
        ];
        if (!looksLikeFetchResponse(error)) {
            reject(new AuthRetryableFetchError(fetch_getErrorMessage(error), 0));
        } else if (NETWORK_ERROR_CODES.includes(error.status)) {
            // status in 500...599 range - server had an error, request might be retryed.
            reject(new AuthRetryableFetchError(fetch_getErrorMessage(error), error.status));
        } else {
            // got a response from server that is not in the 500...599 range - should not retry
            error.json().then((err)=>{
                reject(new AuthApiError(fetch_getErrorMessage(err), error.status || 500));
            }).catch((e)=>{
                // not a valid json response
                reject(new AuthUnknownError(fetch_getErrorMessage(e), e));
            });
        }
    });
const fetch_getRequestParams = (method, options, parameters, body)=>{
    const params = {
        method,
        headers: (options === null || options === void 0 ? void 0 : options.headers) || {}
    };
    if (method === "GET") {
        return params;
    }
    params.headers = Object.assign({
        "Content-Type": "application/json;charset=UTF-8"
    }, options === null || options === void 0 ? void 0 : options.headers);
    params.body = JSON.stringify(body);
    return Object.assign(Object.assign({}, params), parameters);
};
function _request(fetcher, method, url, options) {
    var _a;
    return module_lib_fetch_awaiter(this, void 0, void 0, function*() {
        const headers = Object.assign({}, options === null || options === void 0 ? void 0 : options.headers);
        if (options === null || options === void 0 ? void 0 : options.jwt) {
            headers["Authorization"] = `Bearer ${options.jwt}`;
        }
        const qs = (_a = options === null || options === void 0 ? void 0 : options.query) !== null && _a !== void 0 ? _a : {};
        if (options === null || options === void 0 ? void 0 : options.redirectTo) {
            qs["redirect_to"] = options.redirectTo;
        }
        const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
        const data = yield fetch_handleRequest(fetcher, method, url + queryString, {
            headers,
            noResolveJson: options === null || options === void 0 ? void 0 : options.noResolveJson
        }, {}, options === null || options === void 0 ? void 0 : options.body);
        return (options === null || options === void 0 ? void 0 : options.xform) ? options === null || options === void 0 ? void 0 : options.xform(data) : {
            data: Object.assign({}, data),
            error: null
        };
    });
}
function fetch_handleRequest(fetcher, method, url, options, parameters, body) {
    return module_lib_fetch_awaiter(this, void 0, void 0, function*() {
        return new Promise((resolve, reject)=>{
            fetcher(url, fetch_getRequestParams(method, options, parameters, body)).then((result)=>{
                if (!result.ok) throw result;
                if (options === null || options === void 0 ? void 0 : options.noResolveJson) return result;
                return result.json();
            }).then((data)=>resolve(data)).catch((error)=>fetch_handleError(error, reject));
        });
    });
}
function _sessionResponse(data) {
    var _a;
    let session = null;
    if (hasSession(data)) {
        session = Object.assign({}, data);
        session.expires_at = expiresAt(data.expires_in);
    }
    const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
    return {
        data: {
            session,
            user
        },
        error: null
    };
}
function _userResponse(data) {
    var _a;
    const user = (_a = data.user) !== null && _a !== void 0 ? _a : data;
    return {
        data: {
            user
        },
        error: null
    };
}
function _ssoResponse(data) {
    return {
        data,
        error: null
    };
}
function _generateLinkResponse(data) {
    const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data, rest = __rest(data, [
        "action_link",
        "email_otp",
        "hashed_token",
        "redirect_to",
        "verification_type"
    ]);
    const properties = {
        action_link,
        email_otp,
        hashed_token,
        redirect_to,
        verification_type
    };
    const user = Object.assign({}, rest);
    return {
        data: {
            properties,
            user
        },
        error: null
    };
}
function _noResolveJsonResponse(data) {
    return data;
}
/**
 * hasSession checks if the response object contains a valid session
 * @param data A response object
 * @returns true if a session is in the response
 */ function hasSession(data) {
    return data.access_token && data.refresh_token && data.expires_in;
} //# sourceMappingURL=fetch.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js
var GoTrueAdminApi_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var GoTrueAdminApi_rest = undefined && undefined.__rest || function(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++){
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
};



class GoTrueAdminApi {
    constructor({ url = "", headers = {}, fetch }){
        this.url = url;
        this.headers = headers;
        this.fetch = lib_helpers_resolveFetch(fetch);
        this.mfa = {
            listFactors: this._listFactors.bind(this),
            deleteFactor: this._deleteFactor.bind(this)
        };
    }
    /**
     * Removes a logged-in session.
     * @param jwt A valid, logged-in JWT.
     */ signOut(jwt) {
        return GoTrueAdminApi_awaiter(this, void 0, void 0, function*() {
            try {
                yield _request(this.fetch, "POST", `${this.url}/logout`, {
                    headers: this.headers,
                    jwt,
                    noResolveJson: true
                });
                return {
                    data: null,
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Sends an invite link to an email address.
     * @param email The email address of the user.
     * @param options Additional options to be included when inviting.
     */ inviteUserByEmail(email, options = {}) {
        return GoTrueAdminApi_awaiter(this, void 0, void 0, function*() {
            try {
                return yield _request(this.fetch, "POST", `${this.url}/invite`, {
                    body: {
                        email,
                        data: options.data
                    },
                    headers: this.headers,
                    redirectTo: options.redirectTo,
                    xform: _userResponse
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Generates email links and OTPs to be sent via a custom email provider.
     * @param email The user's email.
     * @param options.password User password. For signup only.
     * @param options.data Optional user metadata. For signup only.
     * @param options.redirectTo The redirect url which should be appended to the generated link
     */ generateLink(params) {
        return GoTrueAdminApi_awaiter(this, void 0, void 0, function*() {
            try {
                const { options } = params, rest = GoTrueAdminApi_rest(params, [
                    "options"
                ]);
                const body = Object.assign(Object.assign({}, rest), options);
                if ("newEmail" in rest) {
                    // replace newEmail with new_email in request body
                    body.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
                    delete body["newEmail"];
                }
                return yield _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
                    body: body,
                    headers: this.headers,
                    xform: _generateLinkResponse,
                    redirectTo: options === null || options === void 0 ? void 0 : options.redirectTo
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            properties: null,
                            user: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    // User Admin API
    /**
     * Creates a new user.
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */ createUser(attributes) {
        return GoTrueAdminApi_awaiter(this, void 0, void 0, function*() {
            try {
                return yield _request(this.fetch, "POST", `${this.url}/admin/users`, {
                    body: attributes,
                    headers: this.headers,
                    xform: _userResponse
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Get a list of users.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
     */ listUsers(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        return GoTrueAdminApi_awaiter(this, void 0, void 0, function*() {
            try {
                const pagination = {
                    nextPage: null,
                    lastPage: 0,
                    total: 0
                };
                const response = yield _request(this.fetch, "GET", `${this.url}/admin/users`, {
                    headers: this.headers,
                    noResolveJson: true,
                    query: {
                        page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
                        per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
                    },
                    xform: _noResolveJsonResponse
                });
                if (response.error) throw response.error;
                const users = yield response.json();
                const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
                const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
                if (links.length > 0) {
                    links.forEach((link)=>{
                        const page = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
                        const rel = JSON.parse(link.split(";")[1].split("=")[1]);
                        pagination[`${rel}Page`] = page;
                    });
                    pagination.total = parseInt(total);
                }
                return {
                    data: Object.assign(Object.assign({}, users), pagination),
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            users: []
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Get user by id.
     *
     * @param uid The user's unique identifier
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */ getUserById(uid) {
        return GoTrueAdminApi_awaiter(this, void 0, void 0, function*() {
            try {
                return yield _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
                    headers: this.headers,
                    xform: _userResponse
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Updates the user data.
     *
     * @param attributes The data you want to update.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */ updateUserById(uid, attributes) {
        return GoTrueAdminApi_awaiter(this, void 0, void 0, function*() {
            try {
                return yield _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
                    body: attributes,
                    headers: this.headers,
                    xform: _userResponse
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Delete a user. Requires a `service_role` key.
     *
     * @param id The user id you want to remove.
     * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema.
     * Defaults to false for backward compatibility.
     *
     * This function should only be called on a server. Never expose your `service_role` key in the browser.
     */ deleteUser(id, shouldSoftDelete = false) {
        return GoTrueAdminApi_awaiter(this, void 0, void 0, function*() {
            try {
                return yield _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
                    headers: this.headers,
                    body: {
                        should_soft_delete: shouldSoftDelete
                    },
                    xform: _userResponse
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    _listFactors(params) {
        return GoTrueAdminApi_awaiter(this, void 0, void 0, function*() {
            try {
                const { data, error } = yield _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
                    headers: this.headers,
                    xform: (factors)=>{
                        return {
                            data: {
                                factors
                            },
                            error: null
                        };
                    }
                });
                return {
                    data,
                    error
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    _deleteFactor(params) {
        return GoTrueAdminApi_awaiter(this, void 0, void 0, function*() {
            try {
                const data = yield _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
                    headers: this.headers
                });
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
} //# sourceMappingURL=GoTrueAdminApi.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/gotrue-js/dist/module/lib/version.js
// Generated by genversion.
const dist_module_lib_version_version = "2.28.1"; //# sourceMappingURL=version.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/gotrue-js/dist/module/lib/constants.js

const GOTRUE_URL = "http://localhost:9999";
const STORAGE_KEY = "supabase.auth.token";
const AUDIENCE = "";
const dist_module_lib_constants_DEFAULT_HEADERS = {
    "X-Client-Info": `gotrue-js/${dist_module_lib_version_version}`
};
const EXPIRY_MARGIN = 10; // in seconds
const NETWORK_FAILURE = {
    MAX_RETRIES: 10,
    RETRY_INTERVAL: 2
}; //# sourceMappingURL=constants.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js

const localStorageAdapter = {
    getItem: (key)=>{
        if (!supportsLocalStorage()) {
            return null;
        }
        return globalThis.localStorage.getItem(key);
    },
    setItem: (key, value)=>{
        if (!supportsLocalStorage()) {
            return;
        }
        globalThis.localStorage.setItem(key, value);
    },
    removeItem: (key)=>{
        if (!supportsLocalStorage()) {
            return;
        }
        globalThis.localStorage.removeItem(key);
    }
};
/* harmony default export */ const local_storage = (localStorageAdapter); //# sourceMappingURL=local-storage.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js
/**
 * https://mathiasbynens.be/notes/globalthis
 */ function polyfillGlobalThis() {
    if (typeof globalThis === "object") return;
    try {
        Object.defineProperty(Object.prototype, "__magic__", {
            get: function() {
                return this;
            },
            configurable: true
        });
        // @ts-expect-error 'Allow access to magic'
        __magic__.globalThis = __magic__;
        // @ts-expect-error 'Allow access to magic'
        delete Object.prototype.__magic__;
    } catch (e) {
        if (typeof self !== "undefined") {
            // @ts-expect-error 'Allow access to globals'
            self.globalThis = self;
        }
    }
} //# sourceMappingURL=polyfills.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js
var GoTrueClient_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







polyfillGlobalThis(); // Make "globalThis" available
const DEFAULT_OPTIONS = {
    url: GOTRUE_URL,
    storageKey: STORAGE_KEY,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    headers: dist_module_lib_constants_DEFAULT_HEADERS,
    flowType: "implicit"
};
/** Current session will be checked for refresh at this interval. */ const AUTO_REFRESH_TICK_DURATION = 30 * 1000;
/**
 * A token refresh will be attempted this many ticks before the current session expires. */ const AUTO_REFRESH_TICK_THRESHOLD = 3;
class GoTrueClient {
    /**
     * Create a new client for use in the browser.
     */ constructor(options){
        var _a;
        this.stateChangeEmitters = new Map();
        this.autoRefreshTicker = null;
        this.visibilityChangedCallback = null;
        this.refreshingDeferred = null;
        /**
         * Keeps track of the async client initialization.
         * When null or not yet resolved the auth state is `unknown`
         * Once resolved the the auth state is known and it's save to call any further client methods.
         * Keep extra care to never reject or throw uncaught errors
         */ this.initializePromise = null;
        this.detectSessionInUrl = true;
        /**
         * Used to broadcast state change events to other tabs listening.
         */ this.broadcastChannel = null;
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        this.inMemorySession = null;
        this.storageKey = settings.storageKey;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.persistSession = settings.persistSession;
        this.storage = settings.storage || local_storage;
        this.admin = new GoTrueAdminApi({
            url: settings.url,
            headers: settings.headers,
            fetch: settings.fetch
        });
        this.url = settings.url;
        this.headers = settings.headers;
        this.fetch = lib_helpers_resolveFetch(settings.fetch);
        this.detectSessionInUrl = settings.detectSessionInUrl;
        this.flowType = settings.flowType;
        this.mfa = {
            verify: this._verify.bind(this),
            enroll: this._enroll.bind(this),
            unenroll: this._unenroll.bind(this),
            challenge: this._challenge.bind(this),
            listFactors: this._listFactors.bind(this),
            challengeAndVerify: this._challengeAndVerify.bind(this),
            getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
        };
        if (this.persistSession && this.storage === local_storage && !supportsLocalStorage()) {
            console.warn(`No storage option exists to persist the session, which may result in unexpected behavior when using auth.
        If you want to set persistSession to true, please provide a storage option or you may set persistSession to false to disable this warning.`);
        }
        if (helpers_isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
            try {
                this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
            } catch (e) {
                console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
            }
            (_a = this.broadcastChannel) === null || _a === void 0 ? void 0 : _a.addEventListener("message", (event)=>{
                this._notifyAllSubscribers(event.data.event, event.data.session, false); // broadcast = false so we don't get an endless loop of messages
            });
        }
        this.initialize();
    }
    /**
     * Initializes the client session either from the url or from storage.
     * This method is automatically called when instantiating the client, but should also be called
     * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
     */ initialize() {
        if (!this.initializePromise) {
            this.initializePromise = this._initialize();
        }
        return this.initializePromise;
    }
    /**
     * IMPORTANT:
     * 1. Never throw in this method, as it is called from the constructor
     * 2. Never return a session from this method as it would be cached over
     *    the whole lifetime of the client
     */ _initialize() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            if (this.initializePromise) {
                return this.initializePromise;
            }
            try {
                const isPKCEFlow = yield this._isPKCEFlow();
                if (this.detectSessionInUrl && this._isImplicitGrantFlow() || isPKCEFlow) {
                    const { data, error } = yield this._getSessionFromUrl(isPKCEFlow);
                    if (error) {
                        // failed login attempt via url,
                        // remove old session as in verifyOtp, signUp and signInWith*
                        yield this._removeSession();
                        return {
                            error
                        };
                    }
                    const { session, redirectType } = data;
                    yield this._saveSession(session);
                    setTimeout(()=>{
                        if (redirectType === "recovery") {
                            this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
                        } else {
                            this._notifyAllSubscribers("SIGNED_IN", session);
                        }
                    }, 0);
                    return {
                        error: null
                    };
                }
                // no login attempt via callback url try to recover session from storage
                yield this._recoverAndRefresh();
                return {
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        error
                    };
                }
                return {
                    error: new AuthUnknownError("Unexpected error during initialization", error)
                };
            } finally{
                yield this._handleVisibilityChange();
            }
        });
    }
    /**
     * Creates a new user.
     *
     * Be aware that if a user account exists in the system you may get back an
     * error message that attempts to hide this information from the user.
     * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
     *
     * @returns A logged-in session if the server has "autoconfirm" ON
     * @returns A user if the server has "autoconfirm" OFF
     */ signUp(credentials) {
        var _a, _b, _c;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                let res;
                if ("email" in credentials) {
                    const { email, password, options } = credentials;
                    let codeChallenge = null;
                    let codeChallengeMethod = null;
                    if (this.flowType === "pkce") {
                        const codeVerifier = generatePKCEVerifier();
                        yield setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                        codeChallenge = yield generatePKCEChallenge(codeVerifier);
                        codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
                    }
                    res = yield _request(this.fetch, "POST", `${this.url}/signup`, {
                        headers: this.headers,
                        redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                        body: {
                            email,
                            password,
                            data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            },
                            code_challenge: codeChallenge,
                            code_challenge_method: codeChallengeMethod
                        },
                        xform: _sessionResponse
                    });
                } else if ("phone" in credentials) {
                    const { phone, password, options } = credentials;
                    res = yield _request(this.fetch, "POST", `${this.url}/signup`, {
                        headers: this.headers,
                        body: {
                            phone,
                            password,
                            data: (_b = options === null || options === void 0 ? void 0 : options.data) !== null && _b !== void 0 ? _b : {},
                            channel: (_c = options === null || options === void 0 ? void 0 : options.channel) !== null && _c !== void 0 ? _c : "sms",
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            }
                        },
                        xform: _sessionResponse
                    });
                } else {
                    throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
                }
                const { data, error } = res;
                if (error || !data) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: error
                    };
                }
                const session = data.session;
                const user = data.user;
                if (data.session) {
                    yield this._saveSession(data.session);
                    this._notifyAllSubscribers("SIGNED_IN", session);
                }
                return {
                    data: {
                        user,
                        session
                    },
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Log in an existing user with an email and password or phone and password.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or that the
     * email/phone and password combination is wrong or that the account can only
     * be accessed via social login.
     */ signInWithPassword(credentials) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                let res;
                if ("email" in credentials) {
                    const { email, password, options } = credentials;
                    res = yield _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                        headers: this.headers,
                        body: {
                            email,
                            password,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            }
                        },
                        xform: _sessionResponse
                    });
                } else if ("phone" in credentials) {
                    const { phone, password, options } = credentials;
                    res = yield _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
                        headers: this.headers,
                        body: {
                            phone,
                            password,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            }
                        },
                        xform: _sessionResponse
                    });
                } else {
                    throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
                }
                const { data, error } = res;
                if (error || !data) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                if (data.session) {
                    yield this._saveSession(data.session);
                    this._notifyAllSubscribers("SIGNED_IN", data.session);
                }
                return {
                    data,
                    error
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Log in an existing user via a third-party provider.
     * This method supports the PKCE flow.
     */ signInWithOAuth(credentials) {
        var _a, _b, _c, _d;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            yield this._removeSession();
            return yield this._handleProviderSignIn(credentials.provider, {
                redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
                scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
                queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
                skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
            });
        });
    }
    /**
     * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
     */ exchangeCodeForSession(authCode) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            const codeVerifier = yield getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
            const { data, error } = yield _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
                headers: this.headers,
                body: {
                    auth_code: authCode,
                    code_verifier: codeVerifier
                },
                xform: _sessionResponse
            });
            yield removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
            if (error || !data) return {
                data: {
                    user: null,
                    session: null
                },
                error
            };
            if (data.session) {
                yield this._saveSession(data.session);
                this._notifyAllSubscribers("SIGNED_IN", data.session);
            }
            return {
                data,
                error
            };
        });
    }
    /**
     * Allows signing in with an ID token issued by certain supported providers.
     * The ID token is verified for validity and a new session is established.
     *
     * @experimental
     */ signInWithIdToken(credentials) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            yield this._removeSession();
            try {
                const { options, provider, token, nonce } = credentials;
                const res = yield _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
                    headers: this.headers,
                    body: {
                        provider,
                        id_token: token,
                        nonce,
                        gotrue_meta_security: {
                            captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                        }
                    },
                    xform: _sessionResponse
                });
                const { data, error } = res;
                if (error || !data) return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
                if (data.session) {
                    yield this._saveSession(data.session);
                    this._notifyAllSubscribers("SIGNED_IN", data.session);
                }
                return {
                    data,
                    error
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Log in a user using magiclink or a one-time password (OTP).
     *
     * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
     * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
     * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
     *
     * Be aware that you may get back an error message that will not distinguish
     * between the cases where the account does not exist or, that the account
     * can only be accessed via social login.
     *
     * Do note that you will need to configure a Whatsapp sender on Twilio
     * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
     * channel is not supported on other providers
     * at this time.
     * This method supports PKCE when an email is passed.
     */ signInWithOtp(credentials) {
        var _a, _b, _c, _d, _e;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                if ("email" in credentials) {
                    const { email, options } = credentials;
                    let codeChallenge = null;
                    let codeChallengeMethod = null;
                    if (this.flowType === "pkce") {
                        const codeVerifier = generatePKCEVerifier();
                        yield setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                        codeChallenge = yield generatePKCEChallenge(codeVerifier);
                        codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
                    }
                    const { error } = yield _request(this.fetch, "POST", `${this.url}/otp`, {
                        headers: this.headers,
                        body: {
                            email,
                            data: (_a = options === null || options === void 0 ? void 0 : options.data) !== null && _a !== void 0 ? _a : {},
                            create_user: (_b = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            },
                            code_challenge: codeChallenge,
                            code_challenge_method: codeChallengeMethod
                        },
                        redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo
                    });
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                if ("phone" in credentials) {
                    const { phone, options } = credentials;
                    const { error } = yield _request(this.fetch, "POST", `${this.url}/otp`, {
                        headers: this.headers,
                        body: {
                            phone,
                            data: (_c = options === null || options === void 0 ? void 0 : options.data) !== null && _c !== void 0 ? _c : {},
                            create_user: (_d = options === null || options === void 0 ? void 0 : options.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            },
                            channel: (_e = options === null || options === void 0 ? void 0 : options.channel) !== null && _e !== void 0 ? _e : "sms"
                        }
                    });
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Log in a user given a User supplied OTP received via mobile.
     */ verifyOtp(params) {
        var _a, _b;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                if (params.type !== "email_change" && params.type !== "phone_change") {
                    // we don't want to remove the authenticated session if the user is performing an email_change or phone_change verification
                    yield this._removeSession();
                }
                const { data, error } = yield _request(this.fetch, "POST", `${this.url}/verify`, {
                    headers: this.headers,
                    body: Object.assign(Object.assign({}, params), {
                        gotrue_meta_security: {
                            captcha_token: (_a = params.options) === null || _a === void 0 ? void 0 : _a.captchaToken
                        }
                    }),
                    redirectTo: (_b = params.options) === null || _b === void 0 ? void 0 : _b.redirectTo,
                    xform: _sessionResponse
                });
                if (error) {
                    throw error;
                }
                if (!data) {
                    throw new Error("An error occurred on token verification.");
                }
                const session = data.session;
                const user = data.user;
                if (session === null || session === void 0 ? void 0 : session.access_token) {
                    yield this._saveSession(session);
                    this._notifyAllSubscribers("SIGNED_IN", session);
                }
                return {
                    data: {
                        user,
                        session
                    },
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Attempts a single-sign on using an enterprise Identity Provider. A
     * successful SSO attempt will redirect the current page to the identity
     * provider authorization page. The redirect URL is implementation and SSO
     * protocol specific.
     *
     * You can use it by providing a SSO domain. Typically you can extract this
     * domain by asking users for their email address. If this domain is
     * registered on the Auth instance the redirect will use that organization's
     * currently active SSO Identity Provider for the login.
     *
     * If you have built an organization-specific login page, you can use the
     * organization's SSO Identity Provider UUID directly instead.
     */ signInWithSSO(params) {
        var _a, _b, _c;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                return yield _request(this.fetch, "POST", `${this.url}/sso`, {
                    body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? {
                        provider_id: params.providerId
                    } : null), "domain" in params ? {
                        domain: params.domain
                    } : null), {
                        redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : undefined
                    }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? {
                        gotrue_meta_security: {
                            captcha_token: params.options.captchaToken
                        }
                    } : null), {
                        skip_http_redirect: true
                    }),
                    headers: this.headers,
                    xform: _ssoResponse
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Sends a reauthentication OTP to the user's email or phone number.
     * Requires the user to be signed-in.
     */ reauthenticate() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                const { data: { session }, error: sessionError } = yield this.getSession();
                if (sessionError) throw sessionError;
                if (!session) throw new AuthSessionMissingError();
                const { error } = yield _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
                    headers: this.headers,
                    jwt: session.access_token
                });
                return {
                    data: {
                        user: null,
                        session: null
                    },
                    error
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
     */ resend(credentials) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                yield this._removeSession();
                const endpoint = `${this.url}/resend`;
                if ("email" in credentials) {
                    const { email, type, options } = credentials;
                    const { error } = yield _request(this.fetch, "POST", endpoint, {
                        headers: this.headers,
                        body: {
                            email,
                            type,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            }
                        }
                    });
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                } else if ("phone" in credentials) {
                    const { phone, type, options } = credentials;
                    const { error } = yield _request(this.fetch, "POST", endpoint, {
                        headers: this.headers,
                        body: {
                            phone,
                            type,
                            gotrue_meta_security: {
                                captcha_token: options === null || options === void 0 ? void 0 : options.captchaToken
                            }
                        }
                    });
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Returns the session, refreshing it if necessary.
     * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
     */ getSession() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            // make sure we've read the session from the url if there is one
            // save to just await, as long we make sure _initialize() never throws
            yield this.initializePromise;
            let currentSession = null;
            if (this.persistSession) {
                const maybeSession = yield getItemAsync(this.storage, this.storageKey);
                if (maybeSession !== null) {
                    if (this._isValidSession(maybeSession)) {
                        currentSession = maybeSession;
                    } else {
                        yield this._removeSession();
                    }
                }
            } else {
                currentSession = this.inMemorySession;
            }
            if (!currentSession) {
                return {
                    data: {
                        session: null
                    },
                    error: null
                };
            }
            const hasExpired = currentSession.expires_at ? currentSession.expires_at <= Date.now() / 1000 : false;
            if (!hasExpired) {
                return {
                    data: {
                        session: currentSession
                    },
                    error: null
                };
            }
            const { session, error } = yield this._callRefreshToken(currentSession.refresh_token);
            if (error) {
                return {
                    data: {
                        session: null
                    },
                    error
                };
            }
            return {
                data: {
                    session
                },
                error: null
            };
        });
    }
    /**
     * Gets the current user details if there is an existing session.
     * @param jwt Takes in an optional access token jwt. If no jwt is provided, getUser() will attempt to get the jwt from the current session.
     */ getUser(jwt) {
        var _a, _b;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                if (!jwt) {
                    const { data, error } = yield this.getSession();
                    if (error) {
                        throw error;
                    }
                    // Default to Authorization header if there is no existing session
                    jwt = (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : undefined;
                }
                return yield _request(this.fetch, "GET", `${this.url}/user`, {
                    headers: this.headers,
                    jwt: jwt,
                    xform: _userResponse
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Updates user data for a logged in user.
     */ updateUser(attributes, options = {}) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                const { data: sessionData, error: sessionError } = yield this.getSession();
                if (sessionError) {
                    throw sessionError;
                }
                if (!sessionData.session) {
                    throw new AuthSessionMissingError();
                }
                const session = sessionData.session;
                const { data, error: userError } = yield _request(this.fetch, "PUT", `${this.url}/user`, {
                    headers: this.headers,
                    redirectTo: options === null || options === void 0 ? void 0 : options.emailRedirectTo,
                    body: attributes,
                    jwt: session.access_token,
                    xform: _userResponse
                });
                if (userError) throw userError;
                session.user = data.user;
                yield this._saveSession(session);
                this._notifyAllSubscribers("USER_UPDATED", session);
                return {
                    data: {
                        user: session.user
                    },
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Decodes a JWT (without performing any validation).
     */ _decodeJWT(jwt) {
        return decodeJWTPayload(jwt);
    }
    /**
     * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
     * If the refresh token or access token in the current session is invalid, an error will be thrown.
     * @param currentSession The current session that minimally contains an access token and refresh token.
     */ setSession(currentSession) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                if (!currentSession.access_token || !currentSession.refresh_token) {
                    throw new AuthSessionMissingError();
                }
                const timeNow = Date.now() / 1000;
                let expiresAt = timeNow;
                let hasExpired = true;
                let session = null;
                const payload = decodeJWTPayload(currentSession.access_token);
                if (payload.exp) {
                    expiresAt = payload.exp;
                    hasExpired = expiresAt <= timeNow;
                }
                if (hasExpired) {
                    const { session: refreshedSession, error } = yield this._callRefreshToken(currentSession.refresh_token);
                    if (error) {
                        return {
                            data: {
                                user: null,
                                session: null
                            },
                            error: error
                        };
                    }
                    if (!refreshedSession) {
                        return {
                            data: {
                                user: null,
                                session: null
                            },
                            error: null
                        };
                    }
                    session = refreshedSession;
                } else {
                    const { data, error } = yield this.getUser(currentSession.access_token);
                    if (error) {
                        throw error;
                    }
                    session = {
                        access_token: currentSession.access_token,
                        refresh_token: currentSession.refresh_token,
                        user: data.user,
                        token_type: "bearer",
                        expires_in: expiresAt - timeNow,
                        expires_at: expiresAt
                    };
                    yield this._saveSession(session);
                    this._notifyAllSubscribers("SIGNED_IN", session);
                }
                return {
                    data: {
                        user: session.user,
                        session
                    },
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            session: null,
                            user: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Returns a new session, regardless of expiry status.
     * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
     * If the current session's refresh token is invalid, an error will be thrown.
     * @param currentSession The current session. If passed in, it must contain a refresh token.
     */ refreshSession(currentSession) {
        var _a;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                if (!currentSession) {
                    const { data, error } = yield this.getSession();
                    if (error) {
                        throw error;
                    }
                    currentSession = (_a = data.session) !== null && _a !== void 0 ? _a : undefined;
                }
                if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
                    throw new AuthSessionMissingError();
                }
                const { session, error } = yield this._callRefreshToken(currentSession.refresh_token);
                if (error) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: error
                    };
                }
                if (!session) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error: null
                    };
                }
                return {
                    data: {
                        user: session.user,
                        session
                    },
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            user: null,
                            session: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Gets the session data from a URL string
     */ _getSessionFromUrl(isPKCEFlow) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                if (!helpers_isBrowser()) throw new AuthImplicitGrantRedirectError("No browser detected.");
                if (this.flowType === "implicit" && !this._isImplicitGrantFlow()) {
                    throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
                } else if (this.flowType == "pkce" && !isPKCEFlow) {
                    throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
                }
                if (isPKCEFlow) {
                    const authCode = getParameterByName("code");
                    if (!authCode) throw new AuthPKCEGrantCodeExchangeError("No code detected.");
                    const { data, error } = yield this.exchangeCodeForSession(authCode);
                    if (error) throw error;
                    if (!data.session) throw new AuthPKCEGrantCodeExchangeError("No session detected.");
                    let url = new URL(window.location.href);
                    url.searchParams.delete("code");
                    window.history.replaceState(window.history.state, "", url.toString());
                    return {
                        data: {
                            session: data.session,
                            redirectType: null
                        },
                        error: null
                    };
                }
                const error_description = getParameterByName("error_description");
                if (error_description) {
                    const error_code = getParameterByName("error_code");
                    if (!error_code) throw new AuthImplicitGrantRedirectError("No error_code detected.");
                    const error = getParameterByName("error");
                    if (!error) throw new AuthImplicitGrantRedirectError("No error detected.");
                    throw new AuthImplicitGrantRedirectError(error_description, {
                        error,
                        code: error_code
                    });
                }
                const provider_token = getParameterByName("provider_token");
                const provider_refresh_token = getParameterByName("provider_refresh_token");
                const access_token = getParameterByName("access_token");
                if (!access_token) throw new AuthImplicitGrantRedirectError("No access_token detected.");
                const expires_in = getParameterByName("expires_in");
                if (!expires_in) throw new AuthImplicitGrantRedirectError("No expires_in detected.");
                const refresh_token = getParameterByName("refresh_token");
                if (!refresh_token) throw new AuthImplicitGrantRedirectError("No refresh_token detected.");
                const token_type = getParameterByName("token_type");
                if (!token_type) throw new AuthImplicitGrantRedirectError("No token_type detected.");
                const timeNow = Math.round(Date.now() / 1000);
                const expires_at = timeNow + parseInt(expires_in);
                const { data, error } = yield this.getUser(access_token);
                if (error) throw error;
                const user = data.user;
                const session = {
                    provider_token,
                    provider_refresh_token,
                    access_token,
                    expires_in: parseInt(expires_in),
                    expires_at,
                    refresh_token,
                    token_type,
                    user
                };
                const redirectType = getParameterByName("type");
                // Remove tokens from URL
                window.location.hash = "";
                return {
                    data: {
                        session,
                        redirectType
                    },
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            session: null,
                            redirectType: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
     */ _isImplicitGrantFlow() {
        return helpers_isBrowser() && (Boolean(getParameterByName("access_token")) || Boolean(getParameterByName("error_description")));
    }
    /**
     * Checks if the current URL and backing storage contain parameters given by a PKCE flow
     */ _isPKCEFlow() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            const currentStorageContent = yield getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
            return helpers_isBrowser() && Boolean(getParameterByName("code")) && Boolean(currentStorageContent);
        });
    }
    /**
     * Inside a browser context, `signOut()` will remove the logged in user from the browser session
     * and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
     *
     * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
     * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
     */ signOut() {
        var _a;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            const { data, error: sessionError } = yield this.getSession();
            if (sessionError) {
                return {
                    error: sessionError
                };
            }
            const accessToken = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token;
            if (accessToken) {
                const { error } = yield this.admin.signOut(accessToken);
                if (error) {
                    // ignore 404s since user might not exist anymore
                    // ignore 401s since an invalid or expired JWT should sign out the current session
                    if (!(isAuthApiError(error) && (error.status === 404 || error.status === 401))) {
                        return {
                            error
                        };
                    }
                }
            }
            yield this._removeSession();
            yield removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
            this._notifyAllSubscribers("SIGNED_OUT", null);
            return {
                error: null
            };
        });
    }
    /**
     * Receive a notification every time an auth event happens.
     * @param callback A callback function to be invoked when an auth event happens.
     */ onAuthStateChange(callback) {
        const id = helpers_uuid();
        const subscription = {
            id,
            callback,
            unsubscribe: ()=>{
                this.stateChangeEmitters.delete(id);
            }
        };
        this.stateChangeEmitters.set(id, subscription);
        this.emitInitialSession(id);
        return {
            data: {
                subscription
            }
        };
    }
    emitInitialSession(id) {
        var _a, _b;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                const { data: { session }, error } = yield this.getSession();
                if (error) throw error;
                (_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback("INITIAL_SESSION", session);
            } catch (err) {
                (_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback("INITIAL_SESSION", null);
                console.error(err);
            }
        });
    }
    /**
     * Sends a password reset request to an email address.
     * This method supports the PKCE flow.
     * @param email The email address of the user.
     * @param options.redirectTo The URL to send the user to after they click the password reset link.
     * @param options.captchaToken Verification token received when the user completes the captcha on the site.
     */ resetPasswordForEmail(email, options = {}) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce") {
                const codeVerifier = generatePKCEVerifier();
                yield setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                codeChallenge = yield generatePKCEChallenge(codeVerifier);
                codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
            }
            try {
                return yield _request(this.fetch, "POST", `${this.url}/recover`, {
                    body: {
                        email,
                        code_challenge: codeChallenge,
                        code_challenge_method: codeChallengeMethod,
                        gotrue_meta_security: {
                            captcha_token: options.captchaToken
                        }
                    },
                    headers: this.headers,
                    redirectTo: options.redirectTo
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * Generates a new JWT.
     * @param refreshToken A valid refresh token that was returned on login.
     */ _refreshAccessToken(refreshToken) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                const startedAt = Date.now();
                // will attempt to refresh the token with exponential backoff
                return yield retryable((attempt)=>GoTrueClient_awaiter(this, void 0, void 0, function*() {
                        yield sleep(attempt * 200); // 0, 200, 400, 800, ...
                        return yield _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
                            body: {
                                refresh_token: refreshToken
                            },
                            headers: this.headers,
                            xform: _sessionResponse
                        });
                    }), (attempt, _, result)=>result && result.error && result.error instanceof AuthRetryableFetchError && // retryable only if the request can be sent before the backoff overflows the tick duration
                    Date.now() + (attempt + 1) * 200 - startedAt < AUTO_REFRESH_TICK_DURATION);
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: {
                            session: null,
                            user: null
                        },
                        error
                    };
                }
                throw error;
            }
        });
    }
    _isValidSession(maybeSession) {
        const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
        return isValidSession;
    }
    _handleProviderSignIn(provider, options) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            const url = yield this._getUrlForProvider(provider, {
                redirectTo: options.redirectTo,
                scopes: options.scopes,
                queryParams: options.queryParams
            });
            // try to open on the browser
            if (helpers_isBrowser() && !options.skipBrowserRedirect) {
                window.location.assign(url);
            }
            return {
                data: {
                    provider,
                    url
                },
                error: null
            };
        });
    }
    /**
     * Recovers the session from LocalStorage and refreshes
     * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
     */ _recoverAndRefresh() {
        var _a;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                const currentSession = yield getItemAsync(this.storage, this.storageKey);
                if (!this._isValidSession(currentSession)) {
                    if (currentSession !== null) {
                        yield this._removeSession();
                    }
                    return;
                }
                const timeNow = Math.round(Date.now() / 1000);
                if (((_a = currentSession.expires_at) !== null && _a !== void 0 ? _a : Infinity) < timeNow + EXPIRY_MARGIN) {
                    if (this.autoRefreshToken && currentSession.refresh_token) {
                        const { error } = yield this._callRefreshToken(currentSession.refresh_token);
                        if (error) {
                            console.log(error.message);
                            yield this._removeSession();
                        }
                    }
                } else {
                    if (this.persistSession) {
                        yield this._saveSession(currentSession);
                    }
                    this._notifyAllSubscribers("SIGNED_IN", currentSession);
                }
            } catch (err) {
                console.error(err);
                return;
            }
        });
    }
    _callRefreshToken(refreshToken) {
        var _a, _b;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            // refreshing is already in progress
            if (this.refreshingDeferred) {
                return this.refreshingDeferred.promise;
            }
            try {
                this.refreshingDeferred = new Deferred();
                if (!refreshToken) {
                    throw new AuthSessionMissingError();
                }
                const { data, error } = yield this._refreshAccessToken(refreshToken);
                if (error) throw error;
                if (!data.session) throw new AuthSessionMissingError();
                yield this._saveSession(data.session);
                this._notifyAllSubscribers("TOKEN_REFRESHED", data.session);
                const result = {
                    session: data.session,
                    error: null
                };
                this.refreshingDeferred.resolve(result);
                return result;
            } catch (error) {
                if (isAuthError(error)) {
                    const result = {
                        session: null,
                        error
                    };
                    (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
                    return result;
                }
                (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
                throw error;
            } finally{
                this.refreshingDeferred = null;
            }
        });
    }
    _notifyAllSubscribers(event, session, broadcast = true) {
        if (this.broadcastChannel && broadcast) {
            this.broadcastChannel.postMessage({
                event,
                session
            });
        }
        this.stateChangeEmitters.forEach((x)=>x.callback(event, session));
    }
    /**
     * set currentSession and currentUser
     * process to _startAutoRefreshToken if possible
     */ _saveSession(session) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            if (!this.persistSession) {
                this.inMemorySession = session;
            }
            if (this.persistSession && session.expires_at) {
                yield this._persistSession(session);
            }
        });
    }
    _persistSession(currentSession) {
        return setItemAsync(this.storage, this.storageKey, currentSession);
    }
    _removeSession() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            if (this.persistSession) {
                yield removeItemAsync(this.storage, this.storageKey);
            } else {
                this.inMemorySession = null;
            }
        });
    }
    /**
     * Removes any registered visibilitychange callback.
     *
     * {@see #startAutoRefresh}
     * {@see #stopAutoRefresh}
     */ _removeVisibilityChangedCallback() {
        const callback = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
            if (callback && helpers_isBrowser() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
                window.removeEventListener("visibilitychange", callback);
            }
        } catch (e) {
            console.error("removing visibilitychange callback failed", e);
        }
    }
    /**
     * This is the private implementation of {@link #startAutoRefresh}. Use this
     * within the library.
     */ _startAutoRefresh() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            yield this._stopAutoRefresh();
            const ticker = setInterval(()=>this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION);
            this.autoRefreshTicker = ticker;
            if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
                // ticker is a NodeJS Timeout object that has an `unref` method
                // https://nodejs.org/api/timers.html#timeoutunref
                // When auto refresh is used in NodeJS (like for testing) the
                // `setInterval` is preventing the process from being marked as
                // finished and tests run endlessly. This can be prevented by calling
                // `unref()` on the returned object.
                ticker.unref();
            // @ts-ignore
            } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
                // similar like for NodeJS, but with the Deno API
                // https://deno.land/api@latest?unstable&s=Deno.unrefTimer
                // @ts-ignore
                Deno.unrefTimer(ticker);
            }
            // run the tick immediately
            yield this._autoRefreshTokenTick();
        });
    }
    /**
     * This is the private implementation of {@link #stopAutoRefresh}. Use this
     * within the library.
     */ _stopAutoRefresh() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            const ticker = this.autoRefreshTicker;
            this.autoRefreshTicker = null;
            if (ticker) {
                clearInterval(ticker);
            }
        });
    }
    /**
     * Starts an auto-refresh process in the background. The session is checked
     * every few seconds. Close to the time of expiration a process is started to
     * refresh the session. If refreshing fails it will be retried for as long as
     * necessary.
     *
     * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
     * to call this function, it will be called for you.
     *
     * On browsers the refresh process works only when the tab/window is in the
     * foreground to conserve resources as well as prevent race conditions and
     * flooding auth with requests. If you call this method any managed
     * visibility change callback will be removed and you must manage visibility
     * changes on your own.
     *
     * On non-browser platforms the refresh process works *continuously* in the
     * background, which may not be desirable. You should hook into your
     * platform's foreground indication mechanism and call these methods
     * appropriately to conserve resources.
     *
     * {@see #stopAutoRefresh}
     */ startAutoRefresh() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            this._removeVisibilityChangedCallback();
            yield this._startAutoRefresh();
        });
    }
    /**
     * Stops an active auto refresh process running in the background (if any).
     *
     * If you call this method any managed visibility change callback will be
     * removed and you must manage visibility changes on your own.
     *
     * See {@link #startAutoRefresh} for more details.
     */ stopAutoRefresh() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            this._removeVisibilityChangedCallback();
            yield this._stopAutoRefresh();
        });
    }
    /**
     * Runs the auto refresh token tick.
     */ _autoRefreshTokenTick() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            const now = Date.now();
            try {
                const { data: { session } } = yield this.getSession();
                if (!session || !session.refresh_token || !session.expires_at) {
                    return;
                }
                // session will expire in this many ticks (or has already expired if <= 0)
                const expiresInTicks = Math.floor((session.expires_at * 1000 - now) / AUTO_REFRESH_TICK_DURATION);
                if (expiresInTicks < AUTO_REFRESH_TICK_THRESHOLD) {
                    yield this._callRefreshToken(session.refresh_token);
                }
            } catch (e) {
                console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
            }
        });
    }
    /**
     * Registers callbacks on the browser / platform, which in-turn run
     * algorithms when the browser window/tab are in foreground. On non-browser
     * platforms it assumes always foreground.
     */ _handleVisibilityChange() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            if (!helpers_isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
                if (this.autoRefreshToken) {
                    // in non-browser environments the refresh token ticker runs always
                    this.startAutoRefresh();
                }
                return false;
            }
            try {
                this.visibilityChangedCallback = ()=>GoTrueClient_awaiter(this, void 0, void 0, function*() {
                        return yield this._onVisibilityChanged(false);
                    });
                window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", this.visibilityChangedCallback);
                // now immediately call the visbility changed callback to setup with the
                // current visbility state
                yield this._onVisibilityChanged(true); // initial call
            } catch (error) {
                console.error("_handleVisibilityChange", error);
            }
        });
    }
    /**
     * Callback registered with `window.addEventListener('visibilitychange')`.
     */ _onVisibilityChanged(isInitial) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            if (document.visibilityState === "visible") {
                if (!isInitial) {
                    // initial visibility change setup is handled in another flow under #initialize()
                    yield this.initializePromise;
                    yield this._recoverAndRefresh();
                }
                if (this.autoRefreshToken) {
                    // in browser environments the refresh token ticker runs only on focused tabs
                    // which prevents race conditions
                    this._startAutoRefresh();
                }
            } else if (document.visibilityState === "hidden") {
                if (this.autoRefreshToken) {
                    this._stopAutoRefresh();
                }
            }
        });
    }
    /**
     * Generates the relevant login URL for a third-party provider.
     * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
     * @param options.scopes A space-separated list of scopes granted to the OAuth application.
     * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
     */ _getUrlForProvider(provider, options) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            const urlParams = [
                `provider=${encodeURIComponent(provider)}`
            ];
            if (options === null || options === void 0 ? void 0 : options.redirectTo) {
                urlParams.push(`redirect_to=${encodeURIComponent(options.redirectTo)}`);
            }
            if (options === null || options === void 0 ? void 0 : options.scopes) {
                urlParams.push(`scopes=${encodeURIComponent(options.scopes)}`);
            }
            if (this.flowType === "pkce") {
                const codeVerifier = generatePKCEVerifier();
                yield setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
                const codeChallenge = yield generatePKCEChallenge(codeVerifier);
                const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
                const flowParams = new URLSearchParams({
                    code_challenge: `${encodeURIComponent(codeChallenge)}`,
                    code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
                });
                urlParams.push(flowParams.toString());
            }
            if (options === null || options === void 0 ? void 0 : options.queryParams) {
                const query = new URLSearchParams(options.queryParams);
                urlParams.push(query.toString());
            }
            return `${this.url}/authorize?${urlParams.join("&")}`;
        });
    }
    _unenroll(params) {
        var _a;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                const { data: sessionData, error: sessionError } = yield this.getSession();
                if (sessionError) {
                    return {
                        data: null,
                        error: sessionError
                    };
                }
                return yield _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#enroll}
     */ _enroll(params) {
        var _a, _b;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                const { data: sessionData, error: sessionError } = yield this.getSession();
                if (sessionError) {
                    return {
                        data: null,
                        error: sessionError
                    };
                }
                const { data, error } = yield _request(this.fetch, "POST", `${this.url}/factors`, {
                    body: {
                        friendly_name: params.friendlyName,
                        factor_type: params.factorType,
                        issuer: params.issuer
                    },
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
                });
                if (error) {
                    return {
                        data: null,
                        error
                    };
                }
                if ((_b = data === null || data === void 0 ? void 0 : data.totp) === null || _b === void 0 ? void 0 : _b.qr_code) {
                    data.totp.qr_code = `data:image/svg+xml;utf-8,${data.totp.qr_code}`;
                }
                return {
                    data,
                    error: null
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#verify}
     */ _verify(params) {
        var _a;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                const { data: sessionData, error: sessionError } = yield this.getSession();
                if (sessionError) {
                    return {
                        data: null,
                        error: sessionError
                    };
                }
                const { data, error } = yield _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
                    body: {
                        code: params.code,
                        challenge_id: params.challengeId
                    },
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
                });
                if (error) {
                    return {
                        data: null,
                        error
                    };
                }
                yield this._saveSession(Object.assign({
                    expires_at: Math.round(Date.now() / 1000) + data.expires_in
                }, data));
                this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data);
                return {
                    data,
                    error
                };
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challenge}
     */ _challenge(params) {
        var _a;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            try {
                const { data: sessionData, error: sessionError } = yield this.getSession();
                if (sessionError) {
                    return {
                        data: null,
                        error: sessionError
                    };
                }
                return yield _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
                    headers: this.headers,
                    jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
                });
            } catch (error) {
                if (isAuthError(error)) {
                    return {
                        data: null,
                        error
                    };
                }
                throw error;
            }
        });
    }
    /**
     * {@see GoTrueMFAApi#challengeAndVerify}
     */ _challengeAndVerify(params) {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            const { data: challengeData, error: challengeError } = yield this._challenge({
                factorId: params.factorId
            });
            if (challengeError) {
                return {
                    data: null,
                    error: challengeError
                };
            }
            return yield this._verify({
                factorId: params.factorId,
                challengeId: challengeData.id,
                code: params.code
            });
        });
    }
    /**
     * {@see GoTrueMFAApi#listFactors}
     */ _listFactors() {
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            const { data: { user }, error: userError } = yield this.getUser();
            if (userError) {
                return {
                    data: null,
                    error: userError
                };
            }
            const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
            const totp = factors.filter((factor)=>factor.factor_type === "totp" && factor.status === "verified");
            return {
                data: {
                    all: factors,
                    totp
                },
                error: null
            };
        });
    }
    /**
     * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
     */ _getAuthenticatorAssuranceLevel() {
        var _a, _b;
        return GoTrueClient_awaiter(this, void 0, void 0, function*() {
            const { data: { session }, error: sessionError } = yield this.getSession();
            if (sessionError) {
                return {
                    data: null,
                    error: sessionError
                };
            }
            if (!session) {
                return {
                    data: {
                        currentLevel: null,
                        nextLevel: null,
                        currentAuthenticationMethods: []
                    },
                    error: null
                };
            }
            const payload = this._decodeJWT(session.access_token);
            let currentLevel = null;
            if (payload.aal) {
                currentLevel = payload.aal;
            }
            let nextLevel = currentLevel;
            const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor)=>factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
            if (verifiedFactors.length > 0) {
                nextLevel = "aal2";
            }
            const currentAuthenticationMethods = payload.amr || [];
            return {
                data: {
                    currentLevel,
                    nextLevel,
                    currentAuthenticationMethods
                },
                error: null
            };
        });
    }
} //# sourceMappingURL=GoTrueClient.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/gotrue-js/dist/module/index.js




 //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js

class SupabaseAuthClient extends GoTrueClient {
    constructor(options){
        super(options);
    }
} //# sourceMappingURL=SupabaseAuthClient.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
var SupabaseClient_awaiter = undefined && undefined.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








const DEFAULT_GLOBAL_OPTIONS = {
    headers: module_lib_constants_DEFAULT_HEADERS
};
const DEFAULT_DB_OPTIONS = {
    schema: "public"
};
const DEFAULT_AUTH_OPTIONS = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "implicit"
};
const DEFAULT_REALTIME_OPTIONS = {};
/**
 * Supabase Client.
 *
 * An isomorphic Javascript client for interacting with Postgres.
 */ class SupabaseClient {
    /**
     * Create a new client for use in the browser.
     * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
     * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
     * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
     * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
     * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
     * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
     * @param options.realtime Options passed along to realtime-js constructor.
     * @param options.global.fetch A custom fetch implementation.
     * @param options.global.headers Any additional headers to send with each network request.
     */ constructor(supabaseUrl, supabaseKey, options){
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        if (!supabaseUrl) throw new Error("supabaseUrl is required.");
        if (!supabaseKey) throw new Error("supabaseKey is required.");
        const _supabaseUrl = stripTrailingSlash(supabaseUrl);
        this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, "ws");
        this.authUrl = `${_supabaseUrl}/auth/v1`;
        this.storageUrl = `${_supabaseUrl}/storage/v1`;
        this.functionsUrl = `${_supabaseUrl}/functions/v1`;
        // default storage key uses the supabase project ref as a namespace
        const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`;
        const DEFAULTS = {
            db: DEFAULT_DB_OPTIONS,
            realtime: DEFAULT_REALTIME_OPTIONS,
            auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), {
                storageKey: defaultStorageKey
            }),
            global: DEFAULT_GLOBAL_OPTIONS
        };
        const settings = applySettingDefaults(options !== null && options !== void 0 ? options : {}, DEFAULTS);
        this.storageKey = (_b = (_a = settings.auth) === null || _a === void 0 ? void 0 : _a.storageKey) !== null && _b !== void 0 ? _b : "";
        this.headers = (_d = (_c = settings.global) === null || _c === void 0 ? void 0 : _c.headers) !== null && _d !== void 0 ? _d : {};
        this.auth = this._initSupabaseAuthClient((_e = settings.auth) !== null && _e !== void 0 ? _e : {}, this.headers, (_f = settings.global) === null || _f === void 0 ? void 0 : _f.fetch);
        this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), (_g = settings.global) === null || _g === void 0 ? void 0 : _g.fetch);
        this.realtime = this._initRealtimeClient(Object.assign({
            headers: this.headers
        }, settings.realtime));
        this.rest = new PostgrestClient(`${_supabaseUrl}/rest/v1`, {
            headers: this.headers,
            schema: (_h = settings.db) === null || _h === void 0 ? void 0 : _h.schema,
            fetch: this.fetch
        });
        this._listenForAuthEvents();
    }
    /**
     * Supabase Functions allows you to deploy and invoke edge functions.
     */ get functions() {
        return new FunctionsClient(this.functionsUrl, {
            headers: this.headers,
            customFetch: this.fetch
        });
    }
    /**
     * Supabase Storage allows you to manage user-generated content, such as photos or videos.
     */ get storage() {
        return new StorageClient(this.storageUrl, this.headers, this.fetch);
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */ from(relation) {
        return this.rest.from(relation);
    }
    /**
     * Perform a function call.
     *
     * @param fn - The function name to call
     * @param args - The arguments to pass to the function call
     * @param options - Named parameters
     * @param options.head - When set to `true`, `data` will not be returned.
     * Useful if you only need the count.
     * @param options.count - Count algorithm to use to count rows returned by the
     * function. Only applicable for [set-returning
     * functions](https://www.postgresql.org/docs/current/functions-srf.html).
     *
     * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
     * hood.
     *
     * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
     * statistics under the hood.
     *
     * `"estimated"`: Uses exact count for low numbers and planned count for high
     * numbers.
     */ rpc(fn, args = {}, options) {
        return this.rest.rpc(fn, args, options);
    }
    /**
     * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
     *
     * @param {string} name - The name of the Realtime channel.
     * @param {Object} opts - The options to pass to the Realtime channel.
     *
     */ channel(name, opts = {
        config: {}
    }) {
        return this.realtime.channel(name, opts);
    }
    /**
     * Returns all Realtime channels.
     */ getChannels() {
        return this.realtime.getChannels();
    }
    /**
     * Unsubscribes and removes Realtime channel from Realtime client.
     *
     * @param {RealtimeChannel} channel - The name of the Realtime channel.
     *
     */ removeChannel(channel) {
        return this.realtime.removeChannel(channel);
    }
    /**
     * Unsubscribes and removes all Realtime channels from Realtime client.
     */ removeAllChannels() {
        return this.realtime.removeAllChannels();
    }
    _getAccessToken() {
        var _a, _b;
        return SupabaseClient_awaiter(this, void 0, void 0, function*() {
            const { data } = yield this.auth.getSession();
            return (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : null;
        });
    }
    _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, storageKey, flowType }, headers, fetch) {
        const authHeaders = {
            Authorization: `Bearer ${this.supabaseKey}`,
            apikey: `${this.supabaseKey}`
        };
        return new SupabaseAuthClient({
            url: this.authUrl,
            headers: Object.assign(Object.assign({}, authHeaders), headers),
            storageKey: storageKey,
            autoRefreshToken,
            persistSession,
            detectSessionInUrl,
            storage,
            flowType,
            fetch
        });
    }
    _initRealtimeClient(options) {
        return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options), {
            params: Object.assign({
                apikey: this.supabaseKey
            }, options === null || options === void 0 ? void 0 : options.params)
        }));
    }
    _listenForAuthEvents() {
        let data = this.auth.onAuthStateChange((event, session)=>{
            this._handleTokenChanged(event, session === null || session === void 0 ? void 0 : session.access_token, "CLIENT");
        });
        return data;
    }
    _handleTokenChanged(event, token, source) {
        if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
            // Token has changed
            this.realtime.setAuth(token !== null && token !== void 0 ? token : null);
            this.changedAccessToken = token;
        } else if (event === "SIGNED_OUT") {
            // Token is removed
            this.realtime.setAuth(this.supabaseKey);
            if (source == "STORAGE") this.auth.signOut();
            this.changedAccessToken = undefined;
        }
    }
} //# sourceMappingURL=SupabaseClient.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/supabase-js/dist/module/index.js





/**
 * Creates a new Supabase Client.
 */ const createClient = (supabaseUrl, supabaseKey, options)=>{
    return new SupabaseClient(supabaseUrl, supabaseKey, options);
}; //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/@supabase/auth-helpers-shared/dist/index.mjs
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod)=>function __require() {
        return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
            exports: {}
        }).exports, mod), mod.exports;
    };
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
            get: ()=>from[key],
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
    }
    return to;
};
var __toESM = (mod, isNodeMode, target)=>(target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod));
// ../../node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js
var require_cookie = __commonJS({
    "../../node_modules/.pnpm/cookie@0.5.0/node_modules/cookie/index.js" (exports) {
        "use strict";
        exports.parse = parse3;
        exports.serialize = serialize3;
        var __toString = Object.prototype.toString;
        var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        function parse3(str, options) {
            if (typeof str !== "string") {
                throw new TypeError("argument str must be a string");
            }
            var obj = {};
            var opt = options || {};
            var dec = opt.decode || decode;
            var index = 0;
            while(index < str.length){
                var eqIdx = str.indexOf("=", index);
                if (eqIdx === -1) {
                    break;
                }
                var endIdx = str.indexOf(";", index);
                if (endIdx === -1) {
                    endIdx = str.length;
                } else if (endIdx < eqIdx) {
                    index = str.lastIndexOf(";", eqIdx - 1) + 1;
                    continue;
                }
                var key = str.slice(index, eqIdx).trim();
                if (void 0 === obj[key]) {
                    var val = str.slice(eqIdx + 1, endIdx).trim();
                    if (val.charCodeAt(0) === 34) {
                        val = val.slice(1, -1);
                    }
                    obj[key] = tryDecode(val, dec);
                }
                index = endIdx + 1;
            }
            return obj;
        }
        function serialize3(name, val, options) {
            var opt = options || {};
            var enc = opt.encode || encode;
            if (typeof enc !== "function") {
                throw new TypeError("option encode is invalid");
            }
            if (!fieldContentRegExp.test(name)) {
                throw new TypeError("argument name is invalid");
            }
            var value = enc(val);
            if (value && !fieldContentRegExp.test(value)) {
                throw new TypeError("argument val is invalid");
            }
            var str = name + "=" + value;
            if (null != opt.maxAge) {
                var maxAge = opt.maxAge - 0;
                if (isNaN(maxAge) || !isFinite(maxAge)) {
                    throw new TypeError("option maxAge is invalid");
                }
                str += "; Max-Age=" + Math.floor(maxAge);
            }
            if (opt.domain) {
                if (!fieldContentRegExp.test(opt.domain)) {
                    throw new TypeError("option domain is invalid");
                }
                str += "; Domain=" + opt.domain;
            }
            if (opt.path) {
                if (!fieldContentRegExp.test(opt.path)) {
                    throw new TypeError("option path is invalid");
                }
                str += "; Path=" + opt.path;
            }
            if (opt.expires) {
                var expires = opt.expires;
                if (!isDate(expires) || isNaN(expires.valueOf())) {
                    throw new TypeError("option expires is invalid");
                }
                str += "; Expires=" + expires.toUTCString();
            }
            if (opt.httpOnly) {
                str += "; HttpOnly";
            }
            if (opt.secure) {
                str += "; Secure";
            }
            if (opt.priority) {
                var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
                switch(priority){
                    case "low":
                        str += "; Priority=Low";
                        break;
                    case "medium":
                        str += "; Priority=Medium";
                        break;
                    case "high":
                        str += "; Priority=High";
                        break;
                    default:
                        throw new TypeError("option priority is invalid");
                }
            }
            if (opt.sameSite) {
                var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
                switch(sameSite){
                    case true:
                        str += "; SameSite=Strict";
                        break;
                    case "lax":
                        str += "; SameSite=Lax";
                        break;
                    case "strict":
                        str += "; SameSite=Strict";
                        break;
                    case "none":
                        str += "; SameSite=None";
                        break;
                    default:
                        throw new TypeError("option sameSite is invalid");
                }
            }
            return str;
        }
        function decode(str) {
            return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
        }
        function encode(val) {
            return encodeURIComponent(val);
        }
        function isDate(val) {
            return __toString.call(val) === "[object Date]" || val instanceof Date;
        }
        function tryDecode(str, decode2) {
            try {
                return decode2(str);
            } catch (e) {
                return str;
            }
        }
    }
});
// src/browserCookieStorage.ts
var import_cookie2 = __toESM(require_cookie());
// src/utils/cookies.ts
var import_cookie = __toESM(require_cookie());

function parseSupabaseCookie(str) {
    if (!str) {
        return null;
    }
    try {
        const session = JSON.parse(str);
        if (!session) {
            return null;
        }
        if (session.constructor.name === "Object") {
            return session;
        }
        if (session.constructor.name !== "Array") {
            throw new Error(`Unexpected format: ${session.constructor.name}`);
        }
        const [_header, payloadStr, _signature] = session[0].split(".");
        const payload = base64url_decode(payloadStr);
        const decoder = new TextDecoder();
        const { exp, sub, ...user } = JSON.parse(decoder.decode(payload));
        return {
            expires_at: exp,
            expires_in: exp - Math.round(Date.now() / 1e3),
            token_type: "bearer",
            access_token: session[0],
            refresh_token: session[1],
            provider_token: session[2],
            provider_refresh_token: session[3],
            user: {
                id: sub,
                factors: session[4],
                ...user
            }
        };
    } catch (err) {
        console.warn("Failed to parse cookie string:", err);
        return null;
    }
}
function stringifySupabaseSession(session) {
    var _a;
    return JSON.stringify([
        session.access_token,
        session.refresh_token,
        session.provider_token,
        session.provider_refresh_token,
        ((_a = session.user) == null ? void 0 : _a.factors) ?? null
    ]);
}
// src/utils/helpers.ts
function dist_isBrowser() {
    return  false && 0;
}
// src/utils/constants.ts
var DEFAULT_COOKIE_OPTIONS = {
    path: "/",
    maxAge: 60 * 60 * 24 * 365 * 1e3
};
// src/cookieAuthStorageAdapter.ts
var CookieAuthStorageAdapter = class {
    constructor(cookieOptions){
        this.cookieOptions = {
            ...DEFAULT_COOKIE_OPTIONS,
            ...cookieOptions
        };
    }
    getItem(key) {
        const value = this.getCookie(key);
        if (!value) return null;
        if (key.endsWith("-code-verifier")) {
            return value;
        }
        return JSON.stringify(parseSupabaseCookie(value));
    }
    setItem(key, value) {
        if (key.endsWith("-code-verifier")) {
            this.setCookie(key, value);
            return;
        }
        let session = JSON.parse(value);
        const sessionStr = stringifySupabaseSession(session);
        this.setCookie(key, sessionStr);
    }
    removeItem(key) {
        this.deleteCookie(key);
    }
};
// src/browserCookieStorage.ts
var BrowserCookieAuthStorageAdapter = class extends CookieAuthStorageAdapter {
    constructor(cookieOptions){
        super(cookieOptions);
    }
    getCookie(name) {
        if (!dist_isBrowser()) return null;
        const cookies = (0, import_cookie2.parse)(document.cookie);
        return cookies[name];
    }
    setCookie(name, value) {
        if (!dist_isBrowser()) return null;
        document.cookie = (0, import_cookie2.serialize)(name, value, {
            ...this.cookieOptions,
            httpOnly: false
        });
    }
    deleteCookie(name) {
        if (!dist_isBrowser()) return null;
        document.cookie = (0, import_cookie2.serialize)(name, "", {
            ...this.cookieOptions,
            maxAge: 0,
            httpOnly: false
        });
    }
};
// src/createClient.ts

function createSupabaseClient(supabaseUrl, supabaseKey, options) {
    var _a;
    const bowser = dist_isBrowser();
    return createClient(supabaseUrl, supabaseKey, {
        ...options,
        auth: {
            flowType: "pkce",
            autoRefreshToken: bowser,
            detectSessionInUrl: bowser,
            persistSession: true,
            storage: options.auth.storage,
            ...((_a = options.auth) == null ? void 0 : _a.storageKey) ? {
                storageKey: options.auth.storageKey
            } : {}
        }
    });
}
var export_parseCookies = import_cookie.parse;
var export_serializeCookie = import_cookie.serialize;
 /*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */  //# sourceMappingURL=index.mjs.map


/***/ }),

/***/ 512:
/***/ ((module) => {

"use strict";
module.exports = {"version":"1.0.34"};

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(210));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES).middleware_middleware = __webpack_exports__;
/******/ }
]);
//# sourceMappingURL=middleware.js.map