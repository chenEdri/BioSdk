import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeContext } from "../utils/sdk";
import { useSession } from "../hooks/useSession";
import { triggerInit } from "../services/api";
import { CONTEXTS, ACTIONS, ACTIVITY_TYPES, ROUTES } from "../config/constants";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const { login, markInitCompleted, addActivity } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    changeContext(CONTEXTS.LOGIN);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setLoading(true);
    try {
      const result = await triggerInit({ iam: userName.trim() });
      setResponse(result.data);

      login(userName.trim());
      markInitCompleted();
      addActivity({
        type: "api_call",
        action: ACTIONS.INIT,
        activityType: ACTIVITY_TYPES.LOGIN,
        status: "success",
      });

      setTimeout(() => {
        navigate(ROUTES.ACCOUNT);
      }, 800);
    } catch (err) {
      console.error("[Login] Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="form">
        <div className="form-group">
          <label htmlFor="username">Name / Email (used as IAM):</label>
          <input
            id="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name or email"
            disabled={loading}
            required
          />
        </div>
        <button type="submit" disabled={loading || !userName.trim()}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {response && (
        <div className="response-box">
          <h3>Init Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}