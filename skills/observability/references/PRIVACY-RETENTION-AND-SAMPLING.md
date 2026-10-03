# Privacy, retention, and sampling

## Content minimization

Default telemetry content capture to off unless there is a documented need.

Prefer:

- references or IDs;
- digests;
- sizes;
- schemas/types;
- status classes;
- bounded categories;
- redaction metadata.

Avoid collecting raw content simply because it is technically available.

## Never require

Observability must not require:

- passwords;
- API tokens;
- private keys;
- reusable credentials;
- chain of thought/private reasoning;
- unrelated personal data.

If sensitive values are needed to operate the system, keep them in the target system's approved secret store and out of telemetry payloads.

## Opt-in content capture

When raw request/output/tool content is genuinely necessary, define:

```text
purpose
data classification
owner
allowed destination
access policy
redaction
retention
legal/contractual constraints
review trigger
```

Use the narrowest field set and shortest defensible retention.

## Retention by signal

Different signal classes can need different lifetimes.

Examples:

- durable business/operational records: according to business/legal policy;
- incident evidence: according to incident/legal requirements;
- traces: diagnostic window;
- detailed logs: short operational window where practical;
- aggregate metrics: longer analytical window when useful;
- temporary diagnostic bundles: explicit deletion after use.

Do not inherit one vendor retention value for every signal class without review.

## Sampling

Sampling can reduce cost and data volume, but it must not make required evidence disappear.

Document:

- what is sampled;
- sampling method/rate;
- whether errors/critical effects are preserved;
- how sampling affects metric/volume claims;
- how an operator knows a record was sampled;
- what independent durable evidence remains.

Do not sample away required authoritative records or receipts.

## Redaction validation

Test redaction with representative sensitive patterns and structured fields.

Verify:

- secret-like values do not reach portable diagnostic artifacts;
- paths/identifiers are normalized where needed;
- allowlists beat broad deny-only filters for shareable bundles;
- redaction failure is visible;
- redaction does not silently destroy the fields required for diagnosis.

## Access and sharing

Telemetry access should follow the target organization's existing authorization model. Treat exported bundles, dashboards, and logs as data products with explicit audiences.

A correlation identifier does not grant permission to retrieve the correlated data.
