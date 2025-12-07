(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/store/slices/favoritesSlice.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// store/favoritesSlice.ts
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__,
    "toggleFavorite": ()=>toggleFavorite
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    items: []
};
const favoritesSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action)=>{
            const exists = state.items.find((item)=>item.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter((item)=>item.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
        }
    }
});
const { toggleFavorite } = favoritesSlice.actions;
const __TURBOPACK__default__export__ = favoritesSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/store/slices/searchSlice.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// store/slices/searchSlice.ts
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__,
    "setQuery": ()=>setQuery,
    "setSourceFilter": ()=>setSourceFilter
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    query: "",
    sourceFilter: "all"
};
const searchSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "search",
    initialState,
    reducers: {
        setQuery: (state, action)=>{
            state.query = action.payload;
        },
        setSourceFilter: (state, action)=>{
            state.sourceFilter = action.payload;
        }
    }
});
const { setQuery, setSourceFilter } = searchSlice.actions;
const __TURBOPACK__default__export__ = searchSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/util/fetchContent.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "fetchFilteredFeed": ()=>fetchFilteredFeed
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const TMDB_API_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_TMDB_API_KEY;
const NEWS_API_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_NEWS_API_KEY;
async function fetchFilteredFeed(query, source) {
    let page = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    console.log("Fetching feed with query:", query, "source:", source, "page:", page);
    const results = [];
    const fetchNews = async ()=>{
        const defaultQuery = "latest";
        const searchQuery = query || defaultQuery;
        const newsQuery = "q=".concat(encodeURIComponent(searchQuery), "&");
        const url = "https://newsapi.org/v2/everything?".concat(newsQuery, "pageSize=5&page=").concat(page, "&apiKey=").concat(NEWS_API_KEY);
        const response = await fetch(url);
        const data = await response.json();
        return (data.articles || []).map((item, index)=>({
                id: "news-".concat(page, "-").concat(index),
                source: "news",
                title: item.title,
                imageUrl: item.urlToImage || "",
                description: item.description || "",
                actionUrl: item.url
            }));
    };
    const fetchTMDB = async ()=>{
        const tmdbBaseUrl = "https://api.themoviedb.org/3/".concat(query ? "search/movie" : "movie/popular");
        const tmdbQuery = query ? "query=".concat(encodeURIComponent(query), "&") : "";
        const url = "".concat(tmdbBaseUrl, "?").concat(tmdbQuery, "api_key=").concat(TMDB_API_KEY, "&page=").concat(page);
        const response = await fetch(url);
        const data = await response.json();
        return (data.results || []).map((item)=>({
                id: "tmdb-".concat(item.id),
                source: "tmdb",
                title: item.title,
                imageUrl: item.poster_path ? "https://image.tmdb.org/t/p/w500".concat(item.poster_path) : "",
                description: item.overview || "",
                actionUrl: "https://www.themoviedb.org/movie/".concat(item.id)
            }));
    };
    // Conditionally call APIs
    if (source === "news") {
        results.push(...await fetchNews());
    } else if (source === "tmdb") {
        results.push(...await fetchTMDB());
    } else if (source === "all") {
        const [newsResults, tmdbResults] = await Promise.all([
            fetchNews(),
            fetchTMDB()
        ]);
        results.push(...newsResults, ...tmdbResults);
    }
    return results;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/store/slices/feedSlice.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// slices/feedSlice.ts
__turbopack_context__.s({
    "clearFeed": ()=>clearFeed,
    "default": ()=>__TURBOPACK__default__export__,
    "fetchFilteredFeedThunk": ()=>fetchFilteredFeedThunk,
    "incrementPage": ()=>incrementPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$fetchContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/util/fetchContent.ts [app-client] (ecmascript)");
;
;
const initialState = {
    feed: [],
    loading: false,
    error: null,
    hasMore: true,
    page: 1,
    lastQuery: ""
};
const fetchFilteredFeedThunk = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("feed/fetchFilteredFeed", async (param, param1)=>{
    let { query, source, page } = param, { getState } = param1;
    const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$util$2f$fetchContent$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchFilteredFeed"])(query, source, page);
    return {
        data,
        query,
        page
    };
});
const feedSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "feed",
    initialState,
    reducers: {
        incrementPage (state) {
            state.page += 1;
        },
        clearFeed (state) {
            state.feed = [];
            state.page = 1;
            state.hasMore = true;
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchFilteredFeedThunk.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }).addCase(fetchFilteredFeedThunk.fulfilled, (state, action)=>{
            const { data, query, page } = action.payload;
            // if query changed, reset feed
            if (query !== state.lastQuery || page === 1) {
                state.feed = data;
            } else {
                state.feed = [
                    ...state.feed,
                    ...data
                ];
            }
            state.lastQuery = query;
            state.hasMore = data.length > 0;
            state.loading = false;
        }).addCase(fetchFilteredFeedThunk.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message || "Failed to fetch feed.";
        });
    }
});
const { incrementPage, clearFeed } = feedSlice.actions;
const __TURBOPACK__default__export__ = feedSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/store/slices/trendingSlice.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// store/slices/trendingSlice.ts
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__,
    "fetchTrendingItems": ()=>fetchTrendingItems
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
;
;
const fetchTrendingItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])("trending/fetchTrendingItems", async ()=>{
    const [news, movies, posts] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/trending/news"),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/trending/movies"),
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/api/trending/posts")
    ]);
    return {
        news: news.data,
        movies: movies.data,
        posts: posts.data
    };
});
const initialState = {
    news: [],
    movies: [],
    posts: [],
    status: "idle",
    error: ""
};
const trendingSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "trending",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchTrendingItems.pending, (state)=>{
            state.status = "loading";
        }).addCase(fetchTrendingItems.fulfilled, (state, action)=>{
            state.status = "succeeded";
            state.news = action.payload.news;
            state.movies = action.payload.movies;
            state.posts = action.payload.posts;
        }).addCase(fetchTrendingItems.rejected, (state, action)=>{
            state.status = "failed";
            var _action_error_message;
            state.error = (_action_error_message = action.error.message) !== null && _action_error_message !== void 0 ? _action_error_message : "Something went wrong";
        });
    }
});
const __TURBOPACK__default__export__ = trendingSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/store/index.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// store/store.ts
__turbopack_context__.s({
    "persistor": ()=>persistor,
    "store": ()=>store
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux/dist/redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/persistStore.js [app-client] (ecmascript) <export default as persistStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/persistReducer.js [app-client] (ecmascript) <export default as persistReducer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/lib/storage/index.js [app-client] (ecmascript)"); // defaults to localStorage for web
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$favoritesSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/favoritesSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$searchSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/searchSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$feedSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/feedSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$trendingSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/slices/trendingSlice.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
// Combine all reducers
const rootReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2f$dist$2f$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["combineReducers"])({
    favorites: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$favoritesSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    search: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$searchSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    feed: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$feedSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    trending: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$slices$2f$trendingSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
// Redux Persist configuration
const persistConfig = {
    key: "root",
    storage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    whitelist: [
        "favorites",
        "search",
        "feed"
    ]
};
const persistedReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__["persistReducer"])(persistConfig, rootReducer);
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: false
        })
});
const persistor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__["persistStore"])(store);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/store/ReduxProvider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// store/ReduxProvider.tsx
__turbopack_context__.s({
    "ReduxProvider": ()=>ReduxProvider
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/index.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/integration/react.js [app-client] (ecmascript)");
"use client";
;
;
;
;
const ReduxProvider = (param)=>{
    let { children } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PersistGate"], {
            loading: null,
            persistor: __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$index$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persistor"],
            children: children
        }, void 0, false, {
            fileName: "[project]/store/ReduxProvider.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/store/ReduxProvider.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ReduxProvider;
var _c;
__turbopack_context__.k.register(_c, "ReduxProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=_7edab122._.js.map