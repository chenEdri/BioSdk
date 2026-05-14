import { useEffect, useState } from "react";
import { changeContext } from "../utils/sdk";
import { useSession } from "../hooks/useSession";
import { triggerGetScore } from "../services/api";
import { CONTEXTS, ACTIONS, ACTIVITY_TYPES } from "../config/constants";

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const { iam, csid, initCompleted, addActivity } = useSession();

  useEffect(() => {
    changeContext(CONTEXTS.PAYMENT);
  }, []);

  const handlePayment = async () => {
    if (!initCompleted) {
      setError(
        "Cannot trigger getScore: init has not been completed. Please login first."
      );
      return;
    }

    setError("");
    setLoading(true);
    try {
      const result = await triggerGetScore({ iam });
      setResponse(result.data);
      addActivity({
        type: "api_call",
        action: ACTIONS.GET_SCORE,
        activityType: ACTIVITY_TYPES.PAYMENT,
        status: "success",
      });
    } catch (err) {
      console.error("[Payment] Error:", err);
      setError("Payment request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Payment</h1>
      <div className="info-box">
        <p>
          <strong>User:</strong> {iam}
        </p>
        <p>
          <strong>Session ID (CSID):</strong> {csid}
        </p>
        <p>
          <strong>Init Status:</strong>{" "}
          {initCompleted ? "✅ Completed" : "❌ Not completed"}
        </p>
      </div>
      <div className="actions">
        <button onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Make Payment"}
        </button>
      </div>
      {error && <div className="error-box">{error}</div>}
      {response && (
        <div className="response-box">
          <h3>GetScore Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}