import { useContext } from "react";
import { SessionContext } from "../context/sessionContext";

/**
 * Custom hook to access session state and actions.
 * Must be used within a SessionProvider.
 *
 * @returns {{
 *   isLoggedIn: boolean,
 *   iam: string,
 *   csid: string,
 *   initCompleted: boolean,
 *   activities: Array,
 *   login: (userName: string) => void,
 *   logout: () => void,
 *   markInitCompleted: () => void,
 *   addActivity: (event: object) => void
 * }}
 */
export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
