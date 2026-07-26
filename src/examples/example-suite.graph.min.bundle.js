import{exampleGraph as g,exampleClarity as c}from"./example-bundle.js";export function exampleSuiteGraph(){return{nodes:g.nodes.map((n,i)=>({id:n.id,label:n.label??`Node ${i+1}`,payload:n.payload,clarity_surface:c.clarity_surface,clarity_scan:c.clarity_scan})),edges:g.edges};}

