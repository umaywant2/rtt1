import React from "react";
import { exampleSuiteGraphFull } from "./example-suite.graph.full.bundle.js";

export default function ExampleSuiteGraphFullReact() {
  const graph = exampleSuiteGraphFull();

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>RTT/1 Example Suite Graph (Full)</h1>

      <SessionBlock session={graph.session} />

      {graph.nodes.map((node) => (
        <NodeBlock key={node.id} node={node} />
      ))}

      <EdgesBlock edges={graph.edges} />
    </div>
  );
}

function SessionBlock({ session }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 16 }}>
      <h2>Session</h2>
      <pre style={preStyle}>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

function NodeBlock({ node }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 16 }}>
      <h2>Node: {node.id}</h2>
      <pre style={preStyle}>{JSON.stringify(node.payload, null, 2)}</pre>

      <h3>Clarity Surface</h3>
      <pre style={preStyle}>{JSON.stringify(node.clarity_surface, null, 2)}</pre>

      <h3>Clarity Scan</h3>
      <pre style={preStyle}>{JSON.stringify(node.clarity_scan, null, 2)}</pre>
    </div>
  );
}

function EdgesBlock({ edges }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 12 }}>
      <h2>Edges</h2>
      <pre style={preStyle}>{JSON.stringify(edges, null, 2)}</pre>
    </div>
  );
}

const preStyle = {
  background: "#f7f7f7",
  padding: 10,
  overflowX: "auto"
};

