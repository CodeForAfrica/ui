import React, { useState } from "react";
import { useAuth } from "payload/components/utilities";
import applications from "../../../lib/data/json/applications";

const BeforeDashboard: React.FC = () => {
  const { user } = useAuth();

  const [selectedApp, setSelectedApp] = useState(
    String(
      user.currentlyManagedApplication ?? user.defaultManagedApplication,
    ) ?? "",
  );

  const updateCurrentlyManagedApp = async (app) => {
    try {
      const response = await fetch(
        `/api/users/update-current-managed-app?newApplication=${app}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("API request failed");
      }
    } catch (error) {
      console.error("Error during API request", error);
    }
  };

  const handleChange = (event) => {
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
    </div>
  );
};

export default BeforeDashboard;
