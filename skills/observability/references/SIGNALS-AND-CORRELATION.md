# Signals and correlation

## Signal families

Use signal types for distinct purposes.

| Signal | Best suited for |
|---|---|
| Events | discrete lifecycle or domain transitions |
| Logs | detailed technical/diagnostic context |
| Traces | causal path, timing, cross-boundary correlation |
| Metrics | aggregation, trends, rates, saturation, objectives |
| Health checks | bounded readiness/liveness/dependency probes |
| Records/receipts | durable evidence of state or external effects |

Do not force every system to emit every signal type.

## Correlation

Choose identifiers that let an operator follow the affected operation across relevant boundaries.

Examples:

- request or operation ID;
- job/run/attempt ID;
- trace/span IDs;
- deployment/release version;
- workflow/task ID;
- external effect/receipt ID;
- tenant/account class when policy permits;
- service/component name and version.

Correlation identifiers should not silently carry authorization. Trace context is for correlation, not permission.

## Attempts and long-lived work

Long-lived workflows may span retries, sessions, workers, or days. Prefer a durable workflow/task identity plus separate attempt/run identities rather than keeping one trace artificially open.

A retry should be distinguishable from the prior attempt. When supported, trace links can relate attempts without pretending they are one continuous span tree.

## Structured events

Useful event fields commonly include:

```text
event name
timestamp
severity/status
component/service
version/release
environment
correlation identifiers
bounded status/error class
duration when relevant
source attribution when relevant
redaction/sampling metadata when relevant
```

Do not log arbitrary free-form payloads merely because storage is available.

## Error taxonomy

Prefer stable error classes over free-form message labels.

A practical starting taxonomy may include:

```text
validation_error
dependency_error
timeout
rate_limit
authorization_denied
configuration_error
external_error
partial_effect
unknown_effect
state_conflict
resource_exhaustion
security_violation
internal_error
```

Adapt the taxonomy to the target system. Avoid a universal list that obscures domain-specific failure classes.

## Cardinality

High-cardinality identifiers can be useful in traces, events, and logs.

Avoid them as high-frequency metric labels by default:

- request IDs;
- user IDs;
- emails;
- full URLs;
- arbitrary error messages;
- prompt/content text;
- external record IDs.

Prefer bounded dimensions such as service, operation, status class, error class, environment, effect type, or version family.

## Source attribution

When a measurement can come from multiple places, record its source where the distinction matters:

- provider-reported;
- harness/runtime-reported;
- measured by instrumentation;
- measured by an adapter;
- estimated;
- user-supplied.

Do not present an estimate as a provider-billed or directly measured value.

## Signal quality checks

A signal is only useful when it has:

- known meaning and units;
- stable enough naming;
- adequate coverage;
- timestamp semantics;
- expected cardinality;
- documented missing-data behavior;
- privacy classification;
- owner;
- tested production or representative failure path.

Configuration presence alone does not prove signal quality.
