import React from "react";

export default function ExampleDashboard({ suite }) {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>RTT/1 Example Dashboard</h1>

      <Section title="Clarity Example" data={suite.clarity} />
      <Section title="Graph Example" data={suite.graph} />
      <Section title="Report Example" data={suite.report} />
    </div>
  );
}

function Section({ title, data }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: 12,
      marginBottom: 16
    }}>
      <h2>{title}</h2>
      <pre style={{
        background: "#f7f7f7",
        padding: 10,
        overflowX: "auto"
      }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

