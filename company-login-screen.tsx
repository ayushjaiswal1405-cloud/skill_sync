"use client";

import { useState } from "react";

export function CompanyLoginScreen({ onSignIn, onSwitchRole }: { onSignIn: () => void; onSwitchRole: () => void }) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password.trim() || (mode === "signup" && !company.trim())) {
      setError(mode === "signup" ? "Add your company name, work email and password to continue." : "Enter your work email and password to continue.");
      return;
    }
    setError("");
    onSignIn();
  }

  function useDemo() {
    setCompany("Nexora Labs");
    setEmail("talent@nexoralabs.com");
    setPassword("demo-company");
    setError("");
  }

  return <main className="company-auth-shell"><section className="company-auth-story"><button className="back-role" onClick={onSwitchRole}>← Switch role</button><div className="login-brand"><span className="brand-mark">C</span><span>Campus<span>Bridge</span></span></div><div className="company-story-copy"><span className="company-auth-icon">⌁</span><p className="eyebrow">INDUSTRY PARTNER PORTAL</p><h1>Build teams that move ideas forward.</h1><p>Connect with verified student talent, run role-specific assessments, and create pathways from campus to your company.</p><div className="company-trust"><span>✓ Verified talent pool</span><span>✓ Assessment-ready candidates</span><span>✓ Institution partnerships</span></div></div><div className="company-story-card"><span className="mini-logo">N</span><div><b>Nexora Labs</b><small>Example company workspace</small></div><strong>86% <small>talent fit</small></strong></div></section><section className="company-auth-form-area"><form className="company-auth-form" onSubmit={submit}><div className="auth-tabs"><button type="button" className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setError(""); }}>Sign in</button><button type="button" className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setError(""); }}>Create company account</button></div><p className="eyebrow">{mode === "signin" ? "WELCOME BACK" : "JOIN THE NETWORK"}</p><h2>{mode === "signin" ? "Sign in to your company workspace" : "Create your company workspace"}</h2><p className="auth-intro">{mode === "signin" ? "Manage roles, assessments, candidates and partnerships in one place." : "Start connecting your team with job-ready academic talent."}</p>{mode === "signup" && <label>Company name<input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="e.g. Nexora Labs" /></label>}<label>Work email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="talent@yourcompany.com" autoComplete="email" /></label><label>Password<div className="password-field"><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" autoComplete={mode === "signin" ? "current-password" : "new-password"} /><button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button></div></label>{mode === "signup" && <label className="consent"><input type="checkbox" /> I agree to the platform terms and company verification policy.</label>}{error && <p className="auth-error">{error}</p>}<div className="auth-options">{mode === "signin" ? <label className="consent"><input type="checkbox" /> Remember me</label> : <span>Company verification takes one business day.</span>}{mode === "signin" && <button type="button">Forgot password?</button>}</div><button className="login-submit company-submit" type="submit">{mode === "signin" ? "Sign in to workspace" : "Create company account"}<span>→</span></button><div className="login-divider"><span>or continue with</span></div><div className="provider-row"><button type="button" onClick={onSignIn}><b>G</b> Google Workspace</button><button type="button" onClick={onSignIn}><b>in</b> LinkedIn</button></div><button className="sso-wide" type="button" onClick={onSignIn}>▣ Continue with Microsoft / SSO</button><button className="demo-company" type="button" onClick={useDemo}>Use demo company credentials</button><p className="auth-foot">{mode === "signin" ? "New company partner?" : "Already have a workspace?"} <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>{mode === "signin" ? "Create an account" : "Sign in instead"}</button></p></form></section></main>;
}
