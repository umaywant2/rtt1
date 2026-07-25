import React from "react";

export default function DiagnosticTable({ diagnostics }) {
  const { issues = [], warnings = [], stats = {} } = diagnostics;

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={cell}>Field</th>
          <th style={cell}>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={cell}>Issues</td>
          <td style={cell}>{issues.join(", ") || "None"}</td>
        </tr>
        <tr>
          <td style={cell}>Warnings</td>
          <td style={cell}>{warnings.join(", ") || "None"}</td>
        </tr>
        <tr>
          <td style={cell}>Timestamp</td>
          <td style={cell}>{stats.timestamp || "N/A"}</td>
        </tr>
        <tr>
          <td style={cell}>Length</td>
          <td style={cell}>{stats.length || 0}</td>
        </tr>
      </tbody>
    </table>
  );
}

const cell = {
  border: "1px solid #ccc",
  padding: "6px"
};
