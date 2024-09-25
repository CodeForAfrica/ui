import { useAuth } from "payload/components/utilities";
import React, { useEffect, useState } from "react";

import applications, { RESEARCH } from "../../lib/data/common/applications";

function BeforeDashboard() {
  const { user } = useAuth();

  const [selectedApp, setSelectedApp] = useState(
    user.currentApp || user.defaultApp || RESEARCH,
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateCurrentApp = async () => {
      if (
        selectedApp &&
        selectedApp !== "select" &&
        selectedApp !== String(user.currentApp)
      ) {
        try {
          setLoading(true);
          const response = await fetch(`/api/users/apps/current`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedApp }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          window.location.replace(`/admin?app=${encodeURI(data.currentApp)}`);
        } catch (error) {
          console.error("Error updating current app:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    updateCurrentApp();
  }, [selectedApp]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedApp(selectedValue);
  };

  return (
    <div>
      {loading ? (
        <>
          <p
            style={{
              padding: "5px 10px",
              marginTop: "30px",
              background: "var(--theme-input-bg)",
            }}
          >
            Loading...
          </p>
        </>
      ) : (
        <>
          <label
            style={{ marginRight: "10px", color: "var(--theme-elevation-500)" }}
          >
            Application:
          </label>
          <select
            id="lang"
            onChange={handleChange}
            value={String(selectedApp)}
            style={{
              padding: "5px",
              width: "auto",
              backgroundColor: "var(--theme-bg)",
              color: "var(--theme-elevation-800)",
              border: "none",
            }}
          >
            <option value="select">Select app...</option>
            {applications.map((app) => (
              <option key={app.value} value={app.value}>
                {app.label}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

export default BeforeDashboard;
