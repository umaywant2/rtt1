// Core engine
export function diagnosticEngine(input = {}) {
  const length =
    typeof input.text === "string" ? input.text.length : 0;

  const issues = [];
  const warnings = [];

  if (length === 0) {
    warnings.push("Empty input payload");
  }

  if (typeof input.text === "string" && input.text.includes("error")) {
    issues.push("Detected error token in input");
  }

  return {
    issues,
    warnings,
    stats: {
      timestamp: Date.now(),
      length
    }
  };
}

// Worker wrapper
export function diagnosticWorker(input = {}) {
  try {
    return diagnosticEngine(input);
  } catch (err) {
    return {
      issues: [`Worker diagnostic error: ${err.message}`],
      warnings: [],
      stats: {
        timestamp: Date.now(),
        length: 0
      }
    };
  }
}

// Client wrapper
export function diagnosticClient(input = {}) {
  try {
    return diagnosticEngine(input);
  } catch (err) {
    return {
      issues: [`Client diagnostic error: ${err.message}`],
      warnings: [],
      stats: {
        timestamp: Date.now(),
        length: 0
      }
    };
  }
}

// Graph diagnostics
export async function diagnosticGraph(graph = {}) {
  const nodes = Array.isArray(graph.nodes) ? graph.nodes : [];
  const edges = Array.isArray(graph.edges) ? graph.edges : [];

  const outNodes = [];
  for (const node of nodes) {
    const payload = node.payload ?? {};
    const diagnostics = diagnosticWorker(payload);
    outNodes.push({
      id: node.id,
      label: node.label ?? null,
      diagnostics
    });
  }

  return {
    nodes: outNodes,
    edges
  };
}

// Worker router
export async function diagnosticRouterWorker(message = {}) {
  const { route, payload } = message;

  switch (route) {
    case "diagnostics":
      return diagnosticWorker(payload);
    case "diagnostics.graph":
      return await diagnosticGraph(payload);
    default:
      return {
        issues: [`Unknown diagnostic route: ${route}`],
        warnings: [],
        stats: {
          timestamp: Date.now(),
          length: 0
        }
      };
  }
}

// Client router
export async function diagnosticRouterClient(message = {}) {
  const { route, payload } = message;

  switch (route) {
    case "diagnostics":
      return diagnosticClient(payload);
    case "diagnostics.graph":
      return await diagnosticGraph(payload);
    default:
      return {
        issues: [`Unknown diagnostic route: ${route}`],
        warnings: [],
        stats: {
          timestamp: Date.now(),
          length: 0
        }
      };
  }
}

