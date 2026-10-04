import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function read(relativePath) {
  return readFile(path.join(ROOT, ...relativePath.split("/")), "utf8");
}

test("observability skill implements the operational signal evidence boundary", async () => {
  const skill = await read("skills/observability/SKILL.md");
  assert.match(skill, /relevant operational failures can be detected and diagnosed/i);
  assert.match(skill, /operational signal plan/i);
  for (const result of ["PASS", "PASS_WITH_CONDITIONS", "NOT_APPLICABLE", "FAIL"]) {
    assert.match(skill, new RegExp("`" + result + "`"));
  }
  assert.match(skill, /NOT_APPLICABLE.*evidence/is);
});

test("telemetry is not treated as authoritative effect evidence", async () => {
  const skill = await read("skills/observability/SKILL.md");
  const model = await read("skills/observability/references/OPERATING-MODEL.md");
  assert.match(skill, /successful span does not by itself prove an external effect/i);
  assert.match(model, /Telemetry helps explain.*does not automatically establish the truth/is);
});

test("privacy defaults prohibit secrets and private reasoning", async () => {
  const skill = await read("skills/observability/SKILL.md");
  const privacy = await read("skills/observability/references/PRIVACY-RETENTION-AND-SAMPLING.md");
  assert.match(skill, /default sensitive content capture to off/i);
  assert.match(skill, /never emit secrets.*chain of thought/is);
  assert.match(privacy, /chain of thought\/private reasoning/i);
  assert.match(privacy, /Do not sample away required authoritative records or receipts/i);
});

test("metric guidance requires semantics and bounded cardinality", async () => {
  const metrics = await read("skills/observability/references/METRICS-SLOS-AND-ALERTING.md");
  const signals = await read("skills/observability/references/SIGNALS-AND-CORRELATION.md");
  for (const field of ["purpose", "unit", "source", "population", "window", "owner", "missing-data"]) {
    assert.match(metrics, new RegExp(field, "i"));
  }
  assert.match(metrics, /Missing data is not zero/i);
  assert.match(signals, /Avoid them as high-frequency metric labels/i);
});

test("alerts require actionability, ownership, and response evidence", async () => {
  const metrics = await read("skills/observability/references/METRICS-SLOS-AND-ALERTING.md");
  assert.match(metrics, /Alert on actionable conditions/i);
  assert.match(metrics, /Who owns it\?/);
  assert.match(metrics, /expected first action/i);
  assert.match(metrics, /runbook/i);
});

test("unknown external effects cannot be resolved by blind retry", async () => {
  const diagnostics = await read("skills/observability/references/DIAGNOSTICS-AND-INCIDENTS.md");
  assert.match(diagnostics, /timeout does not establish failure/i);
  assert.match(diagnostics, /stop blind retry/i);
  assert.match(diagnostics, /query authoritative external state/i);
  assert.match(diagnostics, /confirmed\/rejected\/partial\/unknown/i);
});

test("operational signal plan template covers detection through verification", async () => {
  const plan = await read("skills/observability/assets/OPERATIONAL-SIGNAL-PLAN.md.template");
  for (const heading of [
    "Authoritative truth and evidence",
    "Failure modes and signals",
    "Signal inventory",
    "Metrics / SLOs / alerts",
    "Data handling",
    "Validation plan",
    "Conditions / out-of-scope decisions",
  ]) {
    assert.match(plan, new RegExp(heading.replace(/[.*+?^$()|[\]\\]/g, "\\$&")));
  }
  for (const column of ["Failure mode", "Detection signal", "Correlation", "Diagnostic evidence", "Response owner", "Verification"]) {
    assert.match(plan, new RegExp(column));
  }
});

test("evidence template requires current proof and residual-risk ownership", async () => {
  const evidence = await read("skills/observability/assets/OBSERVABILITY-EVIDENCE.md.template");
  assert.match(evidence, /Evidence timestamp\/window/);
  assert.match(evidence, /Failure-mode verification/);
  assert.match(evidence, /Secret\/prohibited-content check/);
  assert.match(evidence, /Known unavailable evidence/);
  assert.match(evidence, /Conditions and residual risk/);
  assert.match(evidence, /Do not count planned or historical evidence as current proof/i);
});

test("bounded plan and report amendments reuse stable execution evidence and preserve unrelated artifacts", async () => {
  const skill = await read("skills/observability/SKILL.md");
  const bounded = skill.split("## Select execution depth")[1].split("Use the deep path")[0];
  for (const obligation of [/bounded/i, /healthy.*(?:existing|current).*plan.*report/is, /(?:durable|persisted)/i, /(?:inspectable|auditable)/i, /execution.*evidence/i, /(?:affected|changed).*(?:failure mode|claim)/is, /(?:owning|canonical).*sources/is, /inputs.*(?:stable|unchanged)/is, /smallest.*section/is, /critical.*failure.*coverage/is, /privacy/i, /freshness/i, /preserv\w*.*unrelated.*(?:artifacts|evidence)/is]) assert.match(bounded, obligation);
  const noReportProof = /\b(?:report\w*|amend\w*|plan)\b[^.!?\n]{0,80}\b(?:does\s+not|cannot|must\s+not|never)\b[^.!?\n]{0,60}\b(?:prove|establish|demonstrate)\b[^.!?\n]{0,60}\b(?:runtime|signal|execution)\b/i;
  assert.match(bounded, noReportProof);
  assert.match("Updating a report cannot establish successful signal execution.", noReportProof);
  assert.match("Amending a plan must not demonstrate runtime verification by itself.", noReportProof);
  assert.doesNotMatch(bounded.replace(noReportProof, "report proves successful runtime execution"), noReportProof);
  assert.doesNotMatch("Updating a report establishes successful signal execution.", noReportProof);
});

test("deep routing invalidates proof when production signal or privacy inputs change", async () => {
  const skill = await read("skills/observability/SKILL.md");
  const deep = skill.split("Use the deep path")[1].split("Load detailed references")[0];
  for (const trigger of [/new plan/i, /changed instrumentation/i, /missing durable evidence/i, /contradictions/i, /candidate behavior/i, /failure modes/i, /runtime/i, /topology/i, /correlation boundaries/i, /redaction\/privacy\/access/i, /export destinations/i, /sampling\/retention/i, /metrics\/SLO/i, /alert destinations\/response/i]) assert.match(deep, trigger);
  for (const obligation of [/invalidat\w*.*(?:affected|changed).*proof/is, /fresh\w*.*test/is, /mandatory.*safety.*invariants/is]) assert.match(deep, obligation);
  const noPlanSubstitute = /\b(?:production|runtime)\b[^.!?\n]{0,40}\b(?:evidence|proof)\b[^.!?\n]{0,40}\b(?:cannot|must\s+not|may\s+not)\b[^.!?\n]{0,40}\b(?:replac\w*|substitut\w*)\b[^.!?\n]{0,40}\b(?:plan|configuration)\b/i;
  assert.match(deep, noPlanSubstitute);
  assert.match("Required runtime proof must not be substituted with a plan.", noPlanSubstitute);
  assert.doesNotMatch(deep.replace(noPlanSubstitute, "production evidence may be replaced by a plan"), noPlanSubstitute);
  assert.doesNotMatch("Production evidence may be replaced by a plan.", noPlanSubstitute);
});

test("observability independently verifies durable proof and freshness instead of inferred telemetry success", async () => {
  const model = await read("skills/observability/references/OPERATING-MODEL.md");
  const lifecycle = model.split("## Evidence lifecycle")[1].split("## Release-candidate use")[0];
  for (const state of ["Reusable", "Invalidated", "Fresh", "Assumptions"]) assert.match(lifecycle, new RegExp(state));
  for (const obligation of [/evidence.*actual.*execution/is, /freshness.*expiry.*policy/is, /inputs.*(?:unchanged|stable)/is, /expired.*observation.*window/is, /recollection.*not.*evidence/is, /authoritative.*(?:state|receipts).*diagnostic telemetry/is, /independent\w*.*verif\w*.*own.*gate/is]) assert.match(lifecycle, obligation);
  const report = await read("skills/observability/assets/OBSERVABILITY-EVIDENCE.md.template");
  for (const obligation of [/(?:stable|unchanged).*inputs.*freshness/is, /reus\w*.*durable.*execution.*evidence/is, /invalidat\w*.*proof/is, /fresh\w*.*(?:executed|observed)/is, /preserv\w*.*unrelated.*evidence/is, /assum\w*.*not.*evidence/is]) assert.match(report, obligation);
});

test("observability detail loads from explicit domain triggers", async () => {
  const skill = await read("skills/observability/SKILL.md");
  const routing = skill.split("Load detailed references by trigger:")[1].split("## Discover")[0];
  for (const reference of ["OPERATING-MODEL.md", "SIGNALS-AND-CORRELATION.md", "METRICS-SLOS-AND-ALERTING.md", "DIAGNOSTICS-AND-INCIDENTS.md", "PRIVACY-RETENTION-AND-SAMPLING.md", "OPENTELEMETRY.md"]) assert.match(routing, new RegExp(reference.replaceAll(".", "\\.")));
  for (const trigger of [/scope\/result ambiguity/i, /correlation/i, /alert\/response/i, /unknown external effects/i, /sampling/i, /mapping or convention/i]) assert.match(routing, trigger);
});
