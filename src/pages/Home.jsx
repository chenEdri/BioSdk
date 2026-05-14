import { useEffect } from "react";
import { changeContext } from "../utils/sdk";
import { useSession } from "../hooks/useSession";
import { CONTEXTS } from "../config/constants";

export default function Home() {
  const { isLoggedIn, iam, csid } = useSession();

  useEffect(() => {
    changeContext(CONTEXTS.HOME);
  }, []);

  return (
    <div className="page">
      <h1>Home</h1>
      <p>Welcome to the Bio Application.</p>
      {isLoggedIn && (
        <div className="info-box">
          <p>
            <strong>Logged in as:</strong> {iam}
          </p>
          <p>
            <strong>Session ID (CSID):</strong> {csid}
          </p>
        </div>
      )}
      {!isLoggedIn && <p>Please log in to access all features.</p>}
    </div>
  );
}