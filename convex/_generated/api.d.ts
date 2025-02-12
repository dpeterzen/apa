/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as authAdapter from "../authAdapter.js";
import type * as canvasTiles from "../canvasTiles.js";
import type * as http from "../http.js";
import type * as imageTiles from "../imageTiles.js";
import type * as noteTiles from "../noteTiles.js";
import type * as tiles from "../tiles.js";
import type * as utils from "../utils.js";
import type * as videoTiles from "../videoTiles.js";
import type * as walls from "../walls.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  authAdapter: typeof authAdapter;
  canvasTiles: typeof canvasTiles;
  http: typeof http;
  imageTiles: typeof imageTiles;
  noteTiles: typeof noteTiles;
  tiles: typeof tiles;
  utils: typeof utils;
  videoTiles: typeof videoTiles;
  walls: typeof walls;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
