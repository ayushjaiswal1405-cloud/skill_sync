"use client";

import { useState, type FormEvent } from "react";

type Role = "student" | "institution" | "academician";
type Provider = { name: string; mark: string };

const authDetails: Record<Role, { label: string; eyebrow: string; title: string; description: string; field: string; placeholder: string; providers: Provider[]; story: string; storyDetail: string; icon: string }> = {
  student: { label: "Student", eyebrow: "STUDENT PORTAL", title: "Your next opportunity starts here.", description: "Build a profile that shows what you can do, not only what you have studied.", field: "College email", placeholder: "you@college.edu", providers: [{ name: "LinkedIn", mark: "in" }, { name: "GitHub", mark: "◉" }, { name: "Google", mark: "G" }], story: "Your skills have a story.", storyDetail: "Make it visible to the people building the future.", icon: "✦" },
  institution: { label: "Institution", eyebrow: "INSTITUTION PORTAL", title: "Make every career outcome visible.", description: "Bring student development, industry demand and placement readiness into one view.", field: "Institution email", placeholder: "careers@institution.edu", providers: [{ name: "Google Workspace", mark: "G" }, { name: "Microsoft", mark: "▣" }, { name: "SAML / SSO", mark: "◇" }], story: "Better signals.", storyDetail: "Stronger interventions. More confident graduates.", icon: "▦" },
  academician: { label: "Academician", eyebrow: "ACADEMICIAN PORTAL", title: "Connect knowledge with practice.", description: "Discover workshops, faculty immersion and research collaborations that keep learning current.", field: "Academic email", placeholder: "faculty@institution.edu", providers: [{ name: "Google Workspace", mark: "G" }, { name: "Microsoft", mark: "▣" }, { name: "ORCID", mark: "iD" }], story: "Teaching goes further.", storyDetail: "When academia and industry build together.", icon: "◌" }
};

export function StakeholderLoginScreen({ role, onSignIn, onBack }: { role: Role; onSignIn: () => void; onBack: () => void }) {
  const details = authDetails[role];
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(role === "student" ? "aarav@northfield.edu" : "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password.trim() || (mode === "signup" && !name.trim())) {
      setError(mode === "signin" ? `Enter your ${details.field.toLowerCase()} and password to continue.` : "Complete the required fields to create your account.");
      return;
    }
    setError("");
    onSignIn();
  }

  return <main className={`stakeholder-auth-shell ${role}`}><section className="stakeholder-story"><button className="back-role" onClick={onBack}>← Choose a different workspace</button><div className="login-brand"><span className="brand-mark">C</span><span>Campus<span>Bridge</span></span></div><div className="stakeholder-story-copy"><span className="stakeholder-auth-icon">{details.icon}</span><p className="eyebrow">{details.eyebrow}</p><h1>{details.story}<br /><strong>{details.storyDetail}</strong></h1><p>{details.description}</p><div className="stakeholder-proof"><span>✓ Role-specific workspace</span><span>✓ Verified opportunities</span><span>✓ Secure access controls</span></div></div></section><section className="stakeholder-form-area"><form className="stakeholder-form" onSubmit={submit}><div className="auth-tabs"><button type="button" className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setError(""); }}>Sign in</button><button type="button" className={mode === "signup" ? "active" : ""} onClick={() => { setMode("signup"); setError(""); }}>Create account</button></div><p className="eyebrow">{details.eyebrow}</p><h2>{mode === "signin" ? `Sign in as a ${details.label.toLowerCase()}` : `Create your ${details.label.toLowerCase()} account`}</h2><p className="auth-intro">{mode === "signin" ? "Continue to your personalized CampusBridge workspace." : "Join the connected ecosystem for learning and opportunity."}</p>{mode === "signup" && <label>Full name<input value={name} onChange={(event) => setName(event.target.value)} placeholder={role === "institution" ? "Institution administrator" : "Your full name"} autoComplete="name" /></label>}<label>{details.field}<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={details.placeholder} autoComplete="email" /></label><label>Password<div className="password-field"><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" autoComplete={mode === "signin" ? "current-password" : "new-password"} /><button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? "Hide" : "Show"}</button></div></label>{mode === "signup" && <label className="consent"><input type="checkbox" /> I agree to the CampusBridge terms and privacy policy.</label>}{error && <p className="auth-error">{error}</p>}<div className="auth-options"><label className="consent"><input type="checkbox" /> Remember me</label>{mode === "signin" && <button type="button">Forgot password?</button>}</div><button className="login-submit" type="submit">{mode === "signin" ? "Continue to workspace" : "Create account"}<span>→</span></button><div className="login-divider"><span>or continue with</span></div><div className="provider-row">{details.providers.slice(0, 2).map((provider) => <button type="button" key={provider.name} onClick={onSignIn}><b>{provider.mark}</b> {provider.name}</button>)}</div><button className="sso-wide" type="button" onClick={onSignIn}><b>{details.providers[2].mark}</b> Continue with {details.providers[2].name}</button><p className="auth-foot">{mode === "signin" ? "New to CampusBridge?" : "Already have an account?"} <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>{mode === "signin" ? "Create an account" : "Sign in instead"}</button></p><p className="auth-security">Your information is protected with role-based access controls.</p></form></section></main>;
}
