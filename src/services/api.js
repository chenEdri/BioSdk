/**
 * Mock API Service
 * Simulates server-side scoring API calls.
 * Returns mock responses matching the expected API contract.
 */

import { ACTIONS, ACTIVITY_TYPES, API_DEFAULTS } from "../config/constants";

function generateUUID() {
  return crypto.randomUUID();
}

function createMockResponse() {
  const uuid = generateUUID();
  return {
    attempt: uuid,
    id: uuid,
    request_id: uuid,
    status: "success",
  };
}

/**
 * Triggers the init API call (simulated).
 * Should be called on user login.
 *
 * @param {{ iam: string }} params - The IAM identifier from the login input
 * @returns {Promise<{ status: number, data: object }>}
 */
export async function triggerInit({ iam }) {
  const requestBody = {
    customerId: API_DEFAULTS.CUSTOMER_ID,
    action: ACTIONS.INIT,
    activityType: ACTIVITY_TYPES.LOGIN,
    uuid: generateUUID(),
    brand: API_DEFAULTS.BRAND,
    solution: API_DEFAULTS.SOLUTION,
    iam,
  };

  console.log("[API] triggerInit request:", requestBody);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const response = createMockResponse();
  console.log("[API] triggerInit response:", response);

  return { status: 200, data: response };
}

/**
 * Triggers the getScore API call (simulated).
 * Should only be called after init has completed.
 *
 * @param {{ iam: string }} params - The IAM identifier
 * @returns {Promise<{ status: number, data: object }>}
 */
export async function triggerGetScore({ iam }) {
  const requestBody = {
    customerId: API_DEFAULTS.CUSTOMER_ID,
    action: ACTIONS.GET_SCORE,
    activityType: ACTIVITY_TYPES.PAYMENT,
    uuid: generateUUID(),
    brand: API_DEFAULTS.BRAND,
    solution: API_DEFAULTS.SOLUTION,
    iam,
  };

  console.log("[API] triggerGetScore request:", requestBody);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const response = createMockResponse();
  console.log("[API] triggerGetScore response:", response);

  return { status: 200, data: response };
}
