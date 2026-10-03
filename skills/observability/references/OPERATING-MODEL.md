# Observability operating model

## Capability boundary

Observability is the capability to make relevant operational behavior detectable, correlatable, and diagnosable with sufficient evidence.

It is not synonymous with installing a monitoring vendor, collecting every possible field, or retaining full application payloads.

The minimum contract is:

```text
release/system context
+ relevant failure modes
+ operational signal plan
+ current validation evidence
-> justified capability result
```

## Evidence model

Keep these concepts separate:

- **authoritative state:** the system or record that determines what is true now;
- **durable operational evidence:** receipts, records, state transitions, versioned artifacts, or other evidence of what occurred;
- **event:** a discrete operational occurrence;
- **log:** technical or diagnostic record;
- **span/trace:** timing and causal/correlation view of operations;
- **metric:** aggregatable measurement;
- **alert:** actionable notification derived from a condition;
- **dashboard:** presentation, not evidence by itself.

Telemetry helps explain. It does not automatically establish the truth of an external effect.

## Scope classification

Classify each target area:

- `REQUIRED`: failure would materially affect users, operators, security, data, money, availability, or release confidence.
- `CONDITIONAL`: value depends on scale, maturity, traffic, external obligations, or operational model.
- `NOT_APPLICABLE`: no meaningful runtime/operational behavior exists for the reviewed scope.

Examples that can be `NOT_APPLICABLE` with evidence include a documentation-only change with no executable/runtime behavior. A service change with unobservable critical failure modes is not `NOT_APPLICABLE`.

## Failure-mode-first design

Start from failures, not telemetry products.

For every relevant failure mode, record:

```text
failure mode
-> impact
-> authoritative truth/evidence
-> detection signal
-> correlation keys
-> diagnostic evidence
-> response owner
-> verification procedure
```

This prevents dashboards from becoming disconnected collections of activity metrics.

## Minimum sufficient evidence

More telemetry is not automatically better. Prefer the smallest signal set that can:

- detect the important condition;
- identify the affected scope;
- separate likely failure classes;
- support safe next action;
- reconstruct the event later when required.

Escalate signal detail only when the current evidence cannot answer an operational question.

## Evidence lifecycle

Classify proof for the affected claim before reuse:

- **Reusable:** durable, inspectable evidence of actual execution, tied to the release/system, signal/failure mode, runtime/topology, configuration, sanitization, destination, and observation window. Verify these inputs remain stable and the system's freshness/expiry policy still permits the evidence. Reuse unrelated valid artifacts without replaying broad discovery or runtime checks every session.
- **Invalidated:** identify the affected claim and dependent signal checks when candidate behavior, runtime/topology, correlation, redaction, exporter/destination, sampling/retention, metric/SLO semantics, or alert response changed. Preserve original records as history and preserve proof whose inputs remain unchanged.
- **Fresh:** exercise the changed failure path, correlation, required redaction/privacy/sampling invariants, and alert destination where relevant. Re-observe volatile health or effect state when a current claim or expired observation window requires it. Do not rerun unaffected expensive checks without an invalidating cause.
- **Assumptions:** planned instrumentation, SDK initialization, configuration presence, screenshots, recollection, and inferred span success are not execution evidence. Keep limitations visible and distinguish authoritative state/durable receipts from diagnostic telemetry.

For a bounded amendment, attach the changed claim to its existing evidence and record the inputs checked for stability. Production observability PASS still requires sufficient actual execution proof; amendment of a plan/report cannot manufacture it. The capability independently verifies the proof required by its own gate.

## Release-candidate use

When reviewing a release candidate:

1. bind the review to a version, commit, artifact, image, or deployable candidate when possible;
2. identify what operational behavior changed;
3. identify new or changed failure modes;
4. verify affected signal paths;
5. avoid requiring unrelated instrumentation changes;
6. record unverified assumptions explicitly.

## Result classification

### PASS

Use only when current evidence demonstrates that relevant failures are detectable and diagnosable.

### PASS_WITH_CONDITIONS

Use when release confidence is sufficient but bounded gaps remain, for example:

- a low-risk secondary path lacks full trace detail;
- a noncritical metric will be enabled after traffic exists;
- an external provider exposes limited fields but fallback evidence is adequate.

Conditions must have scope, risk, owner, and expiry/review trigger.

### NOT_APPLICABLE

Use only when the reviewed change/system has no relevant operational observability requirement. State the evidence.

### FAIL

Use when an important failure can occur without sufficient detection/diagnosis, or when telemetry creates unacceptable privacy/security risk or misleading claims.

## Preserve-first rule

In an established system, do not replace healthy telemetry naming, dashboards, SLOs, or incident processes merely to match this plugin. Add or change only what closes a demonstrated gap.
