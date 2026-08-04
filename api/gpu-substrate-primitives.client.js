export async function gpuSubstratePrimitives(substrate) {
  const response = await fetch("/api/gpu-substrate-primitives", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(substrate)
  });

  return response.json();
}
