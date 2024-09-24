import { useAuth } from "payload/components/utilities";
import React, { useEffect, useState } from "react";

import applications from "../../../lib/data/json/applications";

function BeforeDashboard() {
  const { user } = useAuth();

  const [selectedApp, setSelectedApp] = useState(
    String(user.currentApp ?? user.defaultApp) ?? "",
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      selectedApp &&
      selectedApp !== "select" &&
      selectedApp !== String(user.currentApp)
    ) {
      setLoading(true);
      fetch(`/api/users/current-app`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedApp }),
      })
        .then((response) => {
          setLoading(false);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .then((data) => {
          window.location.replace(`/admin?app=${encodeURI(data.currentApp)}`);
        })
        .catch((error) => {
          setLoading(false);
          throw error;
        });
    }
  }, [selectedApp]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedApp(selectedValue);
  };

  return (
    <div style={{}}>
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
            value={selectedApp}
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
