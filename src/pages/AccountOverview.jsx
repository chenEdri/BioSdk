import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { changeContext } from "../utils/sdk";
import { useSession } from "../hooks/useSession";
import { CONTEXTS, ROUTES } from "../config/constants";

export default function AccountOverview() {
  const { iam, csid, initCompleted, activities } = useSession();
  const [showActivity, setShowActivity] = useState(false);

  useEffect(() => {
    changeContext(CONTEXTS.ACCOUNT_OVERVIEW);
  }, []);

  return (
    <div className="page">
      <h1>Account Overview</h1>
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
        <h3>Actions:</h3>
        <div className="actions-row">
          <Link to={ROUTES.PAYMENT} className="btn">
            Go to Payment
          </Link>
          <button onClick={() => setShowActivity((prev) => !prev)}>
            {showActivity ? "Hide Activity" : "Show Activity"}
          </button>
        </div>
      </div>
      <div
        className="activity-box"
        style={{ display: showActivity ? "block" : "none" }}
      >
        <h3>Session Activity ({activities.length} events):</h3>
        {activities.length === 0 ? (
          <p className="no-activity">No activity recorded yet.</p>
        ) : (
          <ul className="activity-list">
            {activities.map((activity, index) => (
              <li key={index} className="activity-item">
                <span className="activity-time">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
                <span className="activity-action">{activity.action}</span>
                <span className="activity-type">
                  ({activity.activityType})
                </span>
                <span className="activity-status">{activity.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}