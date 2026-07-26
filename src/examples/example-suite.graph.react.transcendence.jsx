openapi: 3.1.0
info:
  title: RTT/1 Example Suite Graph API (Transcendence)
  version: 1.0.0-alpha
  description: >
    Transcendence-tier RTT/1 example suite graph endpoint. Includes nodes,
    edges, clarity_surface, clarity_scan, session metadata, geometry,
    anchors, structural regime, transcendence markers, and structural signature.

paths:
  /examples/suite/graph/transcendence:
    get:
      summary: Return transcendence RTT/1 example suite graph
      operationId: exampleSuiteGraphTranscendence
      responses:
        "200":
          description: Transcendence example suite graph
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ExampleSuiteGraphTranscendence"

components:
  schemas:

    ExampleSuiteGraphTranscendence:
      type: object
      required:
        - engine
        - version
        - session
        - nodes
        - edges
        - geometry
        - meta
        - signature
      properties:
        engine: { type: "string" }
        version: { type: "string" }

        session:
          type: object
          properties:
            rtt: { type: "number" }
            coherence: { type: "string" }
            drift: { type: "string" }
            paradox: { type: "string" }
            singularity: { type: "boolean" }
            transcendence: { type: "boolean" }

        nodes:
          type: array
          items:
            $ref: "#/components/schemas/ExampleSuiteGraphNodeTranscendence"

        edges:
          type: array
          items:
            $ref: "#/components/schemas/ExampleSuiteGraphEdgeTranscendence"

        geometry:
          type: object
          properties:
            shape: { type: "string" }
            anchors:
              type: array
              items: { type: "string" }
            regime: { type: "string" }
            collapse: { type: "string" }
            dimensionality: { type: "string" }

        meta:
          type: object
          properties:
            tier: { type: "string" }
            strictness: { type: "string" }
            completeness: { type: "string" }
            finality: { type: "string" }
            self_similarity: { type: "string" }

        signature:
          type: object
          properties:
            description: { type: "string" }
            hash: { type: "string" }
            invariant: { type: "boolean" }

    ExampleSuiteGraphNodeTranscendence:
      type: object
      required: ["id","payload","clarity_surface","clarity_scan"]
      properties:
        id: { type: "string" }
        label: { type: ["string","null"] }
        payload:
          type: object
          additionalProperties: true
        clarity_surface:
          type: object
        clarity_scan:
          type: object

    ExampleSuiteGraphEdgeTranscendence:
      type: object
      required: ["from","to"]
      properties:
        from: { type: "string" }
        to: { type: "string" }
        label: { type: ["string","null"] }

