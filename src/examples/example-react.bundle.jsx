import React from "react";
import { exampleSuite } from "./example-bundle.js";

export function ExampleDashboardBundle() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>RTT/1 Example Dashboard</h1>

      <Section title="Clarity Example" data={exampleSuite.clarity} />
      <Section title="Graph Example" data={exampleSuite.graph} />
      <Section title="Report Example" data={exampleSuite.report} />
    </div>
  );
}

function Section({ title, data }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 12,
        marginBottom: 16
      }}
    >
      <h2>{title}</h2>
      <pre
        style={{
          background: "#f7f7f7",
          padding: 10,
          overflowX: "auto"
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

