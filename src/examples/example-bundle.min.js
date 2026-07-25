export const exampleClarity={input:{text:"The system maintains structural stability across its components."},clarity_surface:{summary:"Input expresses a stable structural claim.",signals:["system","structural","stability","components"],operators:["claim","structure"],coherence:"declared",drift:"bounded",paradox:"structural"},clarity_scan:{anchors:["structural","stability","components"],tensions:[],gaps:[],load_bearing:["claim","structure"],stability:"stable"},diagnostics:{issues:[],warnings:[],stats:{timestamp:Date.now(),length:56}}};

export const exampleGraph={nodes:[{id:"n1",payload:{text:"Subsystem A exhibits bounded drift."}},{id:"n2",payload:{text:"Subsystem B maintains structural stability."}}],edges:[{from:"n1",to:"n2",label:"dependency"}]};

export const exampleReport={input:exampleClarity.input,clarity_surface:exampleClarity.clarity_surface,clarity_scan:exampleClarity.clarity_scan,diagnostics:exampleClarity.diagnostics};

export const exampleSuite={clarity:exampleClarity,graph:exampleGraph,report:exampleReport};

