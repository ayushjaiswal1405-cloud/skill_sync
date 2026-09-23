"use client";

type Role = "student" | "company" | "institution" | "academician";

const roleCards: Record<Role, { label: string; eyebrow: string; description: string; icon: string; accent: string; action: string }> = {
  student: { label: "Student", eyebrow: "LEARN · GROW · LAUNCH", description: "Assess your skills, discover opportunities, and build a verified portfolio.", icon: "✦", accent: "student", action: "Enter as a student" },
  company: { label: "Company", eyebrow: "HIRE · TRAIN · COLLABORATE", description: "Find skill-matched talent and build meaningful campus connections.", icon: "⌁", accent: "company", action: "Enter as a company" },
  institution: { label: "Institution", eyebrow: "MEASURE · SUPPORT · PLACE", description: "Turn student skill and placement signals into better outcomes.", icon: "▦", accent: "institution", action: "Enter as an institution" },
  academician: { label: "Academician", eyebrow: "TEACH · CONNECT · CREATE", description: "Bring industry into the classroom through practical collaboration.", icon: "◌", accent: "academician", action: "Enter as an academician" }
};

export function RoleSelection({ onSelectRole }: { onSelectRole: (role: Role) => void }) {
  return <main className="role-selection-shell"><div className="role-selection-top"><div className="login-brand"><span className="brand-mark">C</span><span>Campus<span>Bridge</span></span></div><span className="role-selection-help">Already have access? <button>Sign in</button></span></div><section className="role-selection-content"><div className="selection-heading"><p className="eyebrow">ACADEMIA × INDUSTRY COLLABORATION</p><h1>Where do you belong<br /><strong>in the bridge?</strong></h1><p>Choose your workspace to get a tailored CampusBridge experience.</p></div><div className="role-card-grid">{(Object.keys(roleCards) as Role[]).map((role) => { const card = roleCards[role]; return <button className={`role-card ${card.accent}`} key={role} onClick={() => onSelectRole(role)}><div className="role-card-top"><span className="role-card-icon">{card.icon}</span><span className="role-card-arrow">↗</span></div><p className="eyebrow">{card.eyebrow}</p><h2>{card.label}</h2><p>{card.description}</p><span className="role-card-action">{card.action} <b>→</b></span></button>; })}</div><div className="selection-footer"><span><b>One connected ecosystem</b> · Skills, opportunity and impact in one place</span><span>Secure · Role-based · Built for collaboration</span></div></section></main>;
}
