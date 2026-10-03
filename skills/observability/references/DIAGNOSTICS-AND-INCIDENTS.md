# Diagnostics and incidents

## Diagnostic principle

Reproduce before modifying when safe. Preserve evidence, classify the failure, reduce the search surface, and change one causal layer at a time.

Do not:

- broaden permissions as the first debugging step;
- retry an external effect whose outcome is unknown;
- delete evidence to make a signal look clean;
- copy secrets or full private payloads into tickets;
- blame a model/provider before checking inputs, policy, state, and dependencies.

## Diagnostic envelope

Capture only fields relevant to reproduction and triage, such as:

```text
release/version/commit
environment
runtime/platform
component/service versions
configuration profile (sanitized)
operation/task/attempt identifiers
dependency/provider versions
error class
trace/event/record references
sampling/redaction status
observed timestamp/window
```

Mark unavailable fields instead of inventing them.

## Layered diagnosis

A useful order is:

1. environment/runtime;
2. configuration and deploy version;
3. dependency reachability;
4. application/component;
5. policy/authorization;
6. state/locks/queues;
7. external effect status;
8. semantic/model quality;
9. security/privacy controls.

Change the order when the evidence clearly points elsewhere.

## Unknown external effects

A timeout does not establish failure.

For an effect with unknown outcome:

```text
stop blind retry
-> identify target/idempotency key
-> query authoritative external state
-> capture receipt/evidence
-> classify confirmed/rejected/partial/unknown
-> decide retry/compensation
```

Keep uncertainty explicit until reconciled.

## Incident reconstruction

A person with appropriate access should be able to answer:

- what version was running;
- what operation was affected;
- when it started and ended;
- what signals detected it;
- what changed;
- which effects occurred or remain unknown;
- which evidence supports the conclusion;
- what mitigation/recovery was applied;
- what residual risk remains.

Private chain of thought is not required for this reconstruction.

## Evidence preservation

During a material incident:

- avoid overwriting relevant records;
- preserve timestamps and source attribution;
- hash or otherwise identify important exported artifacts when justified;
- record redactions;
- control access;
- identify external provider/system logs;
- distinguish original evidence from later analysis.

## Diagnostic bundle

A shareable bundle may contain sanitized:

```text
summary
versions
environment
selected events/logs
trace references
metric snapshots or queries
configuration summaries
health/probe results
incident timeline
known limitations
```

Exclude by default:

- credentials/secrets;
- full prompts or user payloads;
- private keys/tokens;
- full session databases;
- unrelated customer data;
- chain of thought.

## Convert failures into regressions

When a failure is repeatable:

```text
failure
-> minimal reproduction
-> stable failure class
-> corrected instrumentation/behavior
-> regression test or evaluation
-> release evidence
```

Do not rely on informal memory for recurring incidents.
