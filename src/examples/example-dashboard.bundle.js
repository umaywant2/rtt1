import { exampleSuite } from "./example-bundle.js";

export function renderExampleDashboard(target) {
  const html = `
    <div style="font-family:sans-serif;padding:20px">
      <h1>RTT/1 Example Dashboard</h1>

      <div style="border:1px solid #ccc;padding:12px;margin-bottom:16px">
        <h2>Clarity Example</h2>
        <pre style="background:#f7f7f7;padding:10px;overflow-x:auto">
${JSON.stringify(exampleSuite.clarity, null, 2)}
        </pre>
      </div>

      <div style="border:1px solid #ccc;padding:12px;margin-bottom:16px">
        <h2>Graph Example</h2>
        <pre style="background:#f7f7f7;padding:10px;overflow-x:auto">
${JSON.stringify(exampleSuite.graph, null, 2)}
        </pre>
      </div>

      <div style="border:1px solid #ccc;padding:12px;margin-bottom:16px">
        <h2>Report Example</h2>
        <pre style="background:#f7f7f7;padding:10px;overflow-x:auto">
${JSON.stringify(exampleSuite.report, null, 2)}
        </pre>
      </div>
    </div>
  `;

  target.innerHTML = html;
}

