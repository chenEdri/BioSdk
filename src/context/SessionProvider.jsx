import { useState, useCallback } from "react";
import { SessionContext } from "./sessionContext";
import { setCustomerSessionId } from "../utils/sdk";

function generateCSID() {
  return "csid-" + crypto.randomUUID();
}

/**
 * Provides session state management for the entire application.
 * Manages: authentication state, CSID lifecycle, activity tracking.
 */
export default function SessionProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("isLoggedIn") === "true"
  );
  const [iam, setIam] = useState(() => sessionStorage.getItem("iam") || "");
  const [csid, setCsid] = useState(() => {
    const stored = sessionStorage.getItem("csid");
    if (stored) return stored;
    const newCsid = generateCSID();
    sessionStorage.setItem("csid", newCsid);
    setCustomerSessionId(newCsid);
    return newCsid;
  });
  const [initCompleted, setInitCompleted] = useState(
    () => sessionStorage.getItem("initCompleted") === "true"
  );
  const [activities, setActivities] = useState(() => {
    const stored = sessionStorage.getItem("activities");
    return stored ? JSON.parse(stored) : [];
  });

  const addActivity = useCallback((event) => {
    const entry = {
      timestamp: new Date().toISOString(),
      ...event,
    };
    setActivities((prev) => {
      const updated = [...prev, entry];
      sessionStorage.setItem("activities", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const login = useCallback((userName) => {
    const newCsid = generateCSID();
    sessionStorage.setItem("csid", newCsid);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("iam", userName);
    setCsid(newCsid);
    setIsLoggedIn(true);
    setIam(userName);
    setCustomerSessionId(newCsid);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("csid");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("iam");
    sessionStorage.removeItem("initCompleted");
    sessionStorage.removeItem("activities");
    setCsid("");
    setIsLoggedIn(false);
    setIam("");
    setInitCompleted(false);
    setActivities([]);
  }, []);

  const markInitCompleted = useCallback(() => {
    sessionStorage.setItem("initCompleted", "true");
    setInitCompleted(true);
  }, []);

  return (
    <SessionContext.Provider
      value={{
        isLoggedIn,
        iam,
        csid,
        initCompleted,
        activities,
        login,
        logout,
        markInitCompleted,
        addActivity,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}