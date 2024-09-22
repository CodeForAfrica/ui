import { useAuth } from "payload/components/utilities";
import React, { useState } from "react";

import applications from "../../../lib/data/json/applications";

function BeforeDashboard() {
  const { user } = useAuth();

  const [selectedApp, setSelectedApp] = useState(
    String(
      user.currentlyManagedApplication ?? user.defaultManagedApplication,
    ) ?? "",
  );

  const [loading, setLoading] = useState(false);

  const updateCurrentlyManagedApp = async (newApplication: string) => {
    fetch(`/api/users/update-current-managed-app`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newApplication }),
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          // eslint-disable-next-line no-undef
          window.location.reload();
        } else {
          console.log("Invalid response was returned from the server");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setLoading(true);
    const selectedValue = event.target.value;
    setSelectedApp(selectedValue);
    updateCurrentlyManagedApp(selectedValue);
  };

  return (
    <div
      style={{
        borderTop: `1px solid var(--theme-elevation-100)`,
        borderBottom: `1px solid var(--theme-elevation-100)`,
        padding: "20px 0",
      }}
    >
      <p>
        Welcome, you can manage the content of multiple <b>CivicSignal</b>{" "}
        applications in one place by selecting the application you want to
        manage.
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <select
          id="lang"
          onChange={handleChange}
          value={selectedApp}
          style={{
            padding: "10px",
            backgroundColor: "var(--theme-input-bg)",
            color: "var(--theme-elevation-800)",
            border: "1px solid var(--theme-elevation-200)",
          }}
        >
          <option value="select">Select application</option>
          {applications.map((app) => (
            <option key={app.value} value={app.value}>
              {app.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default BeforeDashboard;
