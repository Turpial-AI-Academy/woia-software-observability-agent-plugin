# Optional OpenTelemetry mapping

OpenTelemetry is an interoperability option for traces, metrics, logs, context propagation, and OTLP export. It is not required to use this plugin.

## Boundary

Keep the system's operational model independent from a telemetry protocol.

```text
domain operation / failure mode / evidence need
-> instrumentation model
-> optional OpenTelemetry mapping
-> optional exporter/backend
```

This keeps a backend or semantic-convention change from becoming a change to business truth.

## Mapping approach

Typical mappings include:

| Domain concept | OpenTelemetry representation |
|---|---|
| operation/attempt | root or internal span where appropriate |
| nested processing step | internal span |
| outgoing dependency/tool call | client span |
| discrete execution event | span event or log/event record |
| error class | span status plus stable error attributes |
| duration distribution | metric histogram |
| aggregate count/rate | counter or derived metric |

Use standard attributes when their semantics match. Namespace custom attributes consistently.

## Correlation

OpenTelemetry trace/span IDs complement domain identifiers; they do not replace durable request/job/task/effect identifiers when those are needed across retries, long-running work, or multiple traces.

Use links when two traces or attempts are related without a strict parent/child lifetime.

## Propagation

Propagate standard trace context only across boundaries that support it and where policy permits.

Do not propagate:

- secrets;
- raw task/user content;
- approvals or authority as implicit permissions;
- unnecessary personal data.

Trace context is correlation metadata, not authorization.

## Semantic convention changes

Telemetry semantic conventions can evolve independently from the system.

When a release depends on a particular convention:

- record the convention/version used;
- isolate mapping code from authoritative records;
- avoid experimental fields as the only evidence for a critical claim;
- test mapping changes;
- document unavailable provider/runtime fields rather than fabricating them.

## Export

External collectors/backends are optional unless the target system requires them. A local or repository-owned diagnostic path can still satisfy the capability when it provides sufficient current evidence.

Never embed exporter credentials in portable plugin content.
