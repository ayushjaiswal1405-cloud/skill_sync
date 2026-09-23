"use client";

import { useState, type FormEvent } from "react";

type ProfileValues = { branch: string; semester: string; academicDetails: string; skills: string; interests: string; projects: string; certifications: string; careerGoal: string };

const initialValues: ProfileValues = { branch: "", semester: "", academicDetails: "", skills: "", interests: "", projects: "", certifications: "", careerGoal: "" };

export function StudentProfileSetup({ onComplete, onLogout }: { onComplete: () => void; onLogout: () => void }) {
  const [values, setValues] = useState<ProfileValues>(initialValues);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const update = (field: keyof ProfileValues, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const completed = Object.values(values).filter((value) => value.trim()).length;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const missing = Object.entries(values).filter(([, value]) => !value.trim()).map(([field]) => field);
    if (missing.length) {
      setError("Complete every profile field before entering your student dashboard.");
      return;
    }
    setError("");
    setSaving(true);
    window.setTimeout(() => { setSaving(false); onComplete(); }, 450);
  }

  return <main className="student-setup-shell"><header className="student-setup-topbar"><div className="login-brand"><span className="brand-mark">C</span><span>Campus<span>Bridge</span></span></div><button className="setup-logout" onClick={onLogout}>← Back to sign in</button></header><section className="student-setup-content"><div className="student-setup-intro"><div><p className="eyebrow">FIRST-TIME SETUP · STUDENT PROFILE</p><h1>Let’s make your profile<br /><strong>opportunity-ready.</strong></h1><p>These details help CampusBridge understand your strengths, identify skill gaps and recommend relevant internships, projects and jobs.</p></div><div className="setup-progress"><div><b>{completed}/8</b><small>sections complete</small></div><span><i style={{ width: `${(completed / 8) * 100}%` }} /></span></div></div><form className="student-profile-form" onSubmit={submit}><div className="profile-form-heading"><div><p className="eyebrow">YOUR FOUNDATIONS</p><h2>Complete your student profile</h2></div><span><b>*</b> Required to continue</span></div><div className="student-form-grid"><label>Branch <span>*</span><select value={values.branch} onChange={(event) => update("branch", event.target.value)}><option value="">Select your branch</option><option>Computer Science & Engineering</option><option>Information Technology</option><option>Electronics & Communication</option><option>Mechanical Engineering</option><option>Civil Engineering</option><option>Other</option></select></label><label>Semester <span>*</span><select value={values.semester} onChange={(event) => update("semester", event.target.value)}><option value="">Select current semester</option>{["1st semester", "2nd semester", "3rd semester", "4th semester", "5th semester", "6th semester", "7th semester", "8th semester"].map((semester) => <option key={semester}>{semester}</option>)}</select></label><label className="wide-field">Academic details <span>*</span><textarea value={values.academicDetails} onChange={(event) => update("academicDetails", event.target.value)} placeholder="Add your institution, degree, CGPA/percentage and graduation year" rows={3} /></label><label>Skills <span>*</span><input value={values.skills} onChange={(event) => update("skills", event.target.value)} placeholder="React, Python, SQL, Figma" /><small>Separate skills with commas</small></label><label>Interests <span>*</span><input value={values.interests} onChange={(event) => update("interests", event.target.value)} placeholder="Web development, AI, fintech" /><small>What would you like to explore?</small></label><label className="wide-field">Projects <span>*</span><textarea value={values.projects} onChange={(event) => update("projects", event.target.value)} placeholder="Describe your strongest project, your contribution and the technologies used" rows={3} /></label><label>Certifications <span>*</span><textarea value={values.certifications} onChange={(event) => update("certifications", event.target.value)} placeholder="AWS Cloud Practitioner, Google Analytics, or write None" rows={3} /></label><label>Career goal <span>*</span><select value={values.careerGoal} onChange={(event) => update("careerGoal", event.target.value)}><option value="">Choose a target role</option><option>Frontend Developer</option><option>Backend Developer</option><option>Full Stack Developer</option><option>Data Analyst</option><option>Product Designer</option><option>Not sure yet</option></select><small>This shapes your opportunity matches</small></label></div>{error && <p className="profile-form-error">{error}</p>}<footer className="student-form-footer"><p>🔒 Your profile is visible only to verified institutions and industry partners.</p><button className="primary" type="submit" disabled={saving}>{saving ? "Saving profile…" : "Save profile & continue →"}</button></footer></form></section></main>;
}
