// Application configuration constants

export const APP_NAME = "Bio App";

// SDK Context identifiers for each page/view
export const CONTEXTS = {
  HOME: "home_screen",
  LOGIN: "login_screen",
  ACCOUNT_OVERVIEW: "account_overview",
  PAYMENT: "payment_screen",
};

// API action types
export const ACTIONS = {
  INIT: "init",
  GET_SCORE: "getScore",
};

// API activity types
export const ACTIVITY_TYPES = {
  LOGIN: "login",
  PAYMENT: "payment",
};

// API request defaults
export const API_DEFAULTS = {
  CUSTOMER_ID: "dummy",
  BRAND: "SD",
  SOLUTION: "ATO",
};

// Route paths
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ACCOUNT: "/account",
  PAYMENT: "/payment",
};
