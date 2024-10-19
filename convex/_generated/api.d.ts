/* prettier-ignore-start */

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
import type * as mutations_appointment from "../mutations/appointment.js";
import type * as mutations_patientData from "../mutations/patientData.js";
import type * as mutations_userAuthentication from "../mutations/userAuthentication.js";
import type * as queries_appointment from "../queries/appointment.js";
import type * as queries_patientData from "../queries/patientData.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "mutations/appointment": typeof mutations_appointment;
  "mutations/patientData": typeof mutations_patientData;
  "mutations/userAuthentication": typeof mutations_userAuthentication;
  "queries/appointment": typeof queries_appointment;
  "queries/patientData": typeof queries_patientData;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
