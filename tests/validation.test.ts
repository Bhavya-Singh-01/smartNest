import { test } from "node:test";
import assert from "node:assert/strict";
import { parseNewPassword, parseProfile, parseSignIn, parseSignUp, safeNextPath, validateNewPassword } from "../lib/validation.ts";

const form = (fields: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(fields)) f.set(k, v);
  return f;
};

test("sign-up accepts valid input and normalises email", () => {
  const { values, errors } = parseSignUp(form({ fullName: "  Asha Rao ", email: " Asha@Example.COM ", password: "smart1234", confirmPassword: "smart1234" }));
  assert.deepEqual(errors, {});
  assert.equal(values.fullName, "Asha Rao");
  assert.equal(values.email, "asha@example.com");
});

test("sign-up reports every invalid field", () => {
  const { errors } = parseSignUp(form({ fullName: "", email: "not-an-email", password: "short", confirmPassword: "different" }));
  assert.ok(errors.fullName && errors.email && errors.password && errors.confirmPassword);
});

test("password rules: length and letters + digits", () => {
  assert.match(validateNewPassword("") ?? "", /Enter a password/);
  assert.match(validateNewPassword("abc12") ?? "", /at least 8/);
  assert.match(validateNewPassword("abcdefgh") ?? "", /letters and numbers/);
  assert.match(validateNewPassword("12345678") ?? "", /letters and numbers/);
  assert.equal(validateNewPassword("abcd1234"), undefined);
  assert.match(validateNewPassword("a1".repeat(40)) ?? "", /72/);
});

test("sign-in requires email and password", () => {
  assert.deepEqual(Object.keys(parseSignIn(form({ email: "", password: "" })).errors).sort(), ["email", "password"]);
  assert.deepEqual(parseSignIn(form({ email: "a@b.co", password: "x" })).errors, {});
});

test("new password must be confirmed", () => {
  assert.ok(parseNewPassword(form({ password: "abcd1234", confirmPassword: "abcd12345" })).errors.confirmPassword);
  assert.deepEqual(parseNewPassword(form({ password: "abcd1234", confirmPassword: "abcd1234" })).errors, {});
});

test("profile phone is optional but validated", () => {
  assert.deepEqual(parseProfile(form({ fullName: "Asha", phone: "" })).errors, {});
  assert.deepEqual(parseProfile(form({ fullName: "Asha", phone: "+91 98765 43210" })).errors, {});
  assert.ok(parseProfile(form({ fullName: "Asha", phone: "call me" })).errors.phone);
});

test("redirect target must stay on this site", () => {
  assert.equal(safeNextPath("/app/devices"), "/app/devices");
  assert.equal(safeNextPath("//evil.example"), "/app");
  assert.equal(safeNextPath("/\\evil.example"), "/app");
  assert.equal(safeNextPath("https://evil.example"), "/app");
  assert.equal(safeNextPath(null), "/app");
});
