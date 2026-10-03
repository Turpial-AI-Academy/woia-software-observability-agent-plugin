# Metrics, SLOs, and alerting

## Metric contract

A meaningful metric definition should identify:

```text
stable ID/name
purpose
unit
source
population
window
aggregation
dimensions
exclusions
owner
missing-data behavior
sampling behavior
measured vs estimated status
```

Ratios require a clear denominator. Missing data is not zero.

## Useful metric families

Select only what explains relevant behavior:

- business or user outcomes;
- quality/correctness;
- technical reliability;
- latency and throughput;
- queue/backlog/saturation;
- external dependency behavior;
- effect confirmation/unknown rates;
- cost/resource usage;
- incident detection/containment/recovery.

Activity counts such as prompts, tokens, log lines, or tool calls are not outcome metrics by themselves.

## Latency

Separate latency components when they have different owners or remedies:

```text
end-to-end cycle time
queue/wait time
application processing
model/provider latency
tool/dependency latency
approval/manual wait
validation time
handoff/retry time
```

Optimizing one component does not imply end-to-end improvement.

## SLO readiness

Do not create an SLO merely because an SLO tool exists.

Before defining one, require:

- a meaningful service/user outcome or technical objective;
- an indicator that can actually be measured;
- known population and window;
- trustworthy instrumentation and missing-data behavior;
- baseline or enough operational evidence to set a defensible objective;
- owner and response expectations.

Document whether the SLO is contractual, internal, experimental, or informational.

## Error budgets

Error budgets are useful for repeatable reliability objectives. They are not a universal permission to tolerate:

- security violations;
- irreversible harmful effects;
- unauthorized financial actions;
- evidence corruption;
- legal/compliance breaches.

Such events may require explicit stop conditions independent of aggregate availability.

## Alert design

Alert on actionable conditions, not on every anomaly.

Every alert should answer:

```text
What condition fired?
What user/system impact does it imply?
Who owns it?
What is the expected first action?
What evidence/dashboard/runbook supports diagnosis?
How does it avoid obvious duplicate/noise behavior?
How is recovery or auto-resolution determined?
```

Prefer symptoms and impact for paging; use lower-urgency channels for diagnostic or predictive signals when appropriate.

## Dashboard role

A dashboard should make an operational question easier to answer. Typical questions:

- Is the system serving valid outcomes?
- What changed with this release?
- Where is latency concentrated?
- Which failure class dominates?
- Are external effects confirmed or unknown?
- Are SLOs/targets degrading?
- Is the incident improving after mitigation?

A dashboard screenshot is not a substitute for tested signal evidence.

## Validation

Test metric semantics with representative fixtures or known events when possible:

- counter increments once per intended event;
- histograms use expected units;
- ratios use correct population/denominator;
- labels remain bounded;
- missing observations do not become zero silently;
- alerts fire on the intended condition and remain quiet on a negative control.
