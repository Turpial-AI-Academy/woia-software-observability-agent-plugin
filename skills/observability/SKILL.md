---
name: observability
description: Design, audit, validate, and report observability for software systems. Use when defining operational signals, logs, metrics, traces, alerting, SLOs, diagnostic evidence, incident reconstruction, sampling, retention, redaction, or OpenTelemetry mappings.
license: MIT
---

# Observability

Use this skill to prove that relevant operational failures can be detected and diagnosed with sufficient evidence, without requiring ASPS or a specific telemetry vendor.

## Operating flow

```text
DISCOVER -> DECIDE -> IMPLEMENT -> VALIDATE -> REPORT
```

The default posture is evidence-first and preserve-first. Inspect the actual release candidate or running system before changing instrumentation. Preserve healthy existing telemetry, dashboards, alerts, runbooks, privacy controls, and incident procedures unless a concrete gap requires change.

## Core distinction

Do not confuse diagnostic telemetry with operational truth.

```text
authoritative system state / durable records / receipts
    -> evidence about what actually happened

events / logs / traces / metrics / alerts / dashboards
    -> signals that help detect, correlate, diagnose, and explain
```

A successful span does not by itself prove an external effect completed. A chat transcript is not sufficient operational evidence by default. Private reasoning or chain of thought is never required for observability.

## Select execution depth

Use a bounded amendment of a healthy existing operational signal plan or evidence report when a local explanation, reference, or ownership clarification changes and the release/system inputs remain stable. Locate the authoritative artifact and durable, inspectable execution evidence, identify the affected failure mode or claim, and load only its owning sources. Confirm unchanged candidate/runtime, topology, correlation, redaction, export, sampling, retention, and alert destinations before reusing their evidence.

Amend the smallest coherent section, check the affected claim plus critical failure coverage, privacy, source attribution, and evidence freshness, and preserve unrelated valid artifacts and evidence. Reuse an existing artifact rather than replaying every template. Rejoin Validate/Report with the affected scope; a reporting amendment does not itself prove a runtime signal path passed.

Use the deep path for a new plan, new/changed instrumentation, unhealthy or missing durable evidence, unclear scope, contradictions, or changes to relevant candidate behavior, failure modes, runtime, topology, correlation boundaries, redaction/privacy/access policy, export destinations, sampling/retention, metrics/SLO semantics, or alert destinations/response paths. Invalidate affected proof and freshly test the changed failure/signal path and mandatory safety invariants. Missing required production evidence cannot be replaced by a plan, configuration presence, or inferred telemetry success.

Load detailed references by trigger:

| Trigger | Reference |
|---|---|
| New plan, scope/result ambiguity, or evidence lifecycle decision | [OPERATING-MODEL.md](references/OPERATING-MODEL.md) |
| Signal choice, correlation, cardinality, or source attribution changes | [SIGNALS-AND-CORRELATION.md](references/SIGNALS-AND-CORRELATION.md) |
| Metric semantics, SLO readiness, or alert/response changes | [METRICS-SLOS-AND-ALERTING.md](references/METRICS-SLOS-AND-ALERTING.md) |
| Failure reproduction, incident evidence, or unknown external effects | [DIAGNOSTICS-AND-INCIDENTS.md](references/DIAGNOSTICS-AND-INCIDENTS.md) |
| Privacy/redaction, retention, sampling, access, or export changes | [PRIVACY-RETENTION-AND-SAMPLING.md](references/PRIVACY-RETENTION-AND-SAMPLING.md) |
| OpenTelemetry mapping or convention changes | [OPENTELEMETRY.md](references/OPENTELEMETRY.md) |

## Discover

For the target release candidate or system, identify:

- user-visible and operator-visible critical paths;
- relevant failure modes, partial failures, unknown outcomes, and external effects;
- existing logs, metrics, traces, events, health checks, alerts, dashboards, SLOs, runbooks, and incident records;
- correlation identifiers and boundaries across requests, jobs, attempts, services, queues, and external calls;
- authoritative sources of truth and durable evidence;
- deployment/runtime topology and environments;
- data classification, privacy, retention, access, and redaction constraints;
- current instrumentation limitations and fields that are unavailable;
- operational owners and expected responders.

Do not invent signals that the runtime cannot expose. Mark unavailable evidence explicitly.

## Decide

Select the minimum sufficient signal set for each relevant failure mode.

Every important failure mode should answer:

1. **Detection:** what signal shows that something is wrong?
2. **Correlation:** how is the failure tied to the affected request, job, task, release, or effect?
3. **Diagnosis:** what evidence narrows the cause without exposing unnecessary sensitive content?
4. **Ownership:** who or what is expected to respond?
5. **Verification:** how will the signal path itself be tested?

Prefer bounded-cardinality dimensions for metrics. Keep high-cardinality identifiers in traces/logs/events when useful for diagnosis.

Only define SLOs when an indicator, population, measurement source, and baseline are credible. Only create alerts when they correspond to an actionable condition with an owner and response path.

Expand the decision context only for an affected signal, metric, SLO, alert, or unresolved invariant.

## Implement

When implementation is authorized:

- reuse existing instrumentation conventions where healthy;
- add the smallest missing signals and correlation fields;
- keep telemetry vendor adapters separate from domain semantics;
- default sensitive content capture to off;
- never emit secrets, credentials, private keys, or chain of thought;
- label estimated or inferred measurements as estimates;
- preserve source attribution for measurements when it matters;
- make external export optional unless the target system explicitly requires it;
- keep local diagnostic evidence possible where practical;
- document sampling and retention policies per signal class.

OpenTelemetry may be used as an interoperability layer, not as a mandatory architecture or source of truth. Read [references/OPENTELEMETRY.md](references/OPENTELEMETRY.md) only when mapping to OTel.

## Validate

Validation must exercise the failure paths, not merely confirm that an SDK initialized.

For each relevant failure mode, obtain current evidence that:

- the condition produces a detectable signal;
- required correlation survives the path being tested;
- the signal contains enough sanitized context to diagnose or route investigation;
- alerts, if any, reach the intended actionable destination;
- metrics use correct units, populations, labels, and missing-data semantics;
- sampling does not erase required critical evidence;
- retention/redaction behavior matches policy;
- no secret or prohibited content is emitted;
- unknown or partial external effects remain visible instead of being misreported as success/failure.

For stable inputs, independently inspect still-valid durable execution evidence instead of repeating its runtime checks merely because a new session started. Re-execute only invalidated or missing proof and freshness checks required by the system's policy. Preserve the distinction between durable operational facts and diagnostic telemetry.

## Result classification

Report exactly one capability result:

- `PASS`: relevant operational failures have tested detection and diagnosis evidence.
- `PASS_WITH_CONDITIONS`: sufficient evidence exists for the current release, with explicit bounded limitations and owners.
- `NOT_APPLICABLE`: observability work is genuinely outside the release/system scope, with evidence explaining why.
- `FAIL`: a relevant operational failure cannot be detected or diagnosed with sufficient evidence, or required evidence is misleading/unsafe.

Do not report `PASS` from planned instrumentation, historical screenshots, unexecuted dashboards, or configuration presence alone.

## Report

The final report should include:

- target release/system and exact version or candidate when available;
- relevant failure modes reviewed;
- operational signal plan and implemented/verified status;
- detection, correlation, diagnosis, and ownership evidence;
- metrics/SLO/alerting decisions;
- privacy, redaction, retention, and sampling constraints;
- tested commands/procedures and observed outcomes;
- reused, invalidated, and fresh evidence with sources/inputs/windows, plus assumptions that are not evidence;
- limitations, unavailable fields, residual risks, and follow-up owners;
- capability result.

Use [assets/OPERATIONAL-SIGNAL-PLAN.md.template](assets/OPERATIONAL-SIGNAL-PLAN.md.template) and [assets/OBSERVABILITY-EVIDENCE.md.template](assets/OBSERVABILITY-EVIDENCE.md.template) when creating an artifact or filling a demonstrated gap; preserve a healthy existing plan/report.
