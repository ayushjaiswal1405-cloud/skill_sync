"use client";

import { useMemo, useState } from "react";
import { RoleDashboard } from "./role-dashboard";
import { CompanyLoginScreen } from "./company-login-screen";
import { CompanyPortal } from "./company-portal";
import { RoleSelection } from "./role-selection";
import { StakeholderLoginScreen } from "./stakeholder-login-screen";
import { InstitutionPortal } from "./institution-portal";
import { AcademicianPortal } from "./academician-portal";
import { StudentProfileSetup } from "./student-profile-details";
import { StudentPortal } from "./student-portal";

type Opportunity = { id: number; title: string; company: string; type: string; location: string; skills: string[]; deadline: string; accent: string };
type Role = "student" | "company" | "institution" | "academician";

const roleDetails: Record<Role, { label: string; workspace: string; name: string; initials: string; subtitle: string }> = {
  student: { label: "Student", workspace: "STUDENT WORKSPACE", name: "Aarav Sharma", initials: "AS", subtitle: "Computer Science · 2026" },
  company: { label: "Company", workspace: "COMPANY WORKSPACE", name: "Nexora Labs", initials: "NL", subtitle: "Verified industry partner" },
  institution: { label: "Institution", workspace: "INSTITUTION WORKSPACE", name: "Northfield Institute", initials: "NI", subtitle: "Placement & career cell" },
  academician: { label: "Academician", workspace: "ACADEMICIAN WORKSPACE", name: "Dr. Meera Iyer", initials: "MI", subtitle: "Computer Science Department" }
};

const skills = [
  { name: "React", score: 82, target: 80 },
  { name: "JavaScript", score: 76, target: 75 },
  { name: "Git", score: 71, target: 70 },
  { name: "REST APIs", score: 48, target: 75 },
  { name: "SQL", score: 55, target: 70 },
  { name: "System Design", score: 35, target: 65 }
];

const opportunities: Opportunity[] = [
  { id: 1, title: "Frontend Developer Intern", company: "Nexora Labs", type: "Internship", location: "Remote", skills: ["React", "JavaScript", "Git"], deadline: "Oct 12", accent: "violet" },
  { id: 2, title: "Full Stack Trainee", company: "BluePeak Systems", type: "Apprenticeship", location: "Bengaluru · Hybrid", skills: ["React", "REST APIs", "SQL"], deadline: "Oct 18", accent: "blue" },
  { id: 3, title: "Product Engineering Project", company: "OrbitWorks", type: "Live project", location: "Remote", skills: ["React", "REST APIs", "System Design"], deadline: "Oct 25", accent: "orange" }
];

const questions = [
  { prompt: "Which HTTP method is typically idempotent when updating a resource?", options: ["POST", "PUT", "PATCH", "CONNECT"], answer: 1, skill: "REST APIs" },
  { prompt: "Which SQL clause filters grouped results?", options: ["WHERE", "ORDER BY", "HAVING", "LIMIT"], answer: 2, skill: "SQL" },
  { prompt: "What is the main purpose of a load balancer?", options: ["Store files", "Distribute traffic", "Encrypt passwords", "Render HTML"], answer: 1, skill: "System Design" }
];

function matchScore(opportunity: Opportunity) {
  const total = opportunity.skills.reduce((sum, skill) => sum + (skills.find((item) => item.name === skill)?.score ?? 0), 0);
  return Math.round(total / opportunity.skills.length);
}

export default function Home() {
  const [role, setRole] = useState<Role | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [studentProfileComplete, setStudentProfileComplete] = useState(false);
  const [studentCareerGoal, setStudentCareerGoal] = useState("Frontend Developer");
  const [view, setView] = useState<"dashboard" | "assessment" | "opportunities" | "portfolio">("dashboard");
  const [answers, setAnswers] = useState<number[]>([]);
  const [assessmentDone, setAssessmentDone] = useState(false);
  const [applied, setApplied] = useState<number[]>([2]);
  const gaps = skills.filter((skill) => skill.score < skill.target).sort((a, b) => (b.target - b.score) - (a.target - a.score));
  const readiness = Math.round(skills.reduce((sum, skill) => sum + skill.score, 0) / skills.length);
  const assessmentScore = useMemo(() => answers.filter((answer, index) => answer === questions[index]?.answer).length, [answers]);
  const answeredCount = questions.filter((_, index) => answers[index] !== undefined).length;

  function apply(id: number) { setApplied((current) => current.includes(id) ? current : [...current, id]); }
  function takeAssessment() { setView("assessment"); setAnswers([]); setAssessmentDone(false); }

  if (!signedIn && role === null) return <RoleSelection onSelectRole={setRole} />;
  if (!signedIn && role === "company") return <CompanyLoginScreen onSignIn={() => setSignedIn(true)} onSwitchRole={() => setRole(null)} />;
  if (!signedIn && role !== null && role !== "company") return <StakeholderLoginScreen role={role} onSignIn={() => setSignedIn(true)} onBack={() => setRole(null)} />;
  if (role === "company") return <CompanyPortal onLogout={() => { setSignedIn(false); setRole(null); }} />;
  if (role === "institution") return <InstitutionPortal onLogout={() => { setSignedIn(false); setRole(null); }} />;
  if (role === "academician") return <AcademicianPortal onLogout={() => { setSignedIn(false); setRole(null); }} />;
  if (role === "student" && !studentProfileComplete) return <StudentProfileSetup onComplete={(careerGoal) => { if (careerGoal && careerGoal !== "None / not added yet") setStudentCareerGoal(careerGoal); setStudentProfileComplete(true); }} onLogout={() => { setSignedIn(false); setRole(null); }} />;
  if (role === "student") return <StudentPortal initialRole={studentCareerGoal} onLogout={() => { setSignedIn(false); setRole(null); }} />;
  const currentRole = role ?? "student";

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">C</span><span>Campus<span>Bridge</span></span></div>
        <p className="workspace">STUDENT WORKSPACE</p>
        <nav>{[
          ["dashboard", "▦", "Overview"], ["assessment", "◌", "Skill assessment"], ["opportunities", "⌁", "Opportunities"], ["portfolio", "□", "My portfolio"]
        ].map(([key, icon, label]) => <button key={key} className={view === key ? "nav active" : "nav"} onClick={() => setView(key as typeof view)}><i>{icon}</i>{label}</button>)}</nav>
        <div className="help"><b>Need guidance?</b><p>Your career mentor is ready to help.</p><button>Message mentor →</button></div>
        <div className="profile"><div className="avatar">AS</div><div><b>Aarav Sharma</b><small>Computer Science · 2026</small></div><span>⌄</span></div>
      </aside>

      <section className="content">
        <header><div><p className="eyebrow">MONDAY, SEPTEMBER 21</p><h1>{view === "dashboard" ? "Good morning, Aarav." : view[0].toUpperCase() + view.slice(1)}</h1></div><div className="header-actions"><button className="bell">♧<em>3</em></button><button className="role">Student <span>⌄</span></button></div></header>
        {currentRole !== "student" && <RoleDashboard role={currentRole} />}
        {currentRole === "student" && view === "dashboard" && <Dashboard readiness={readiness} gaps={gaps} assessmentDone={assessmentDone} onAssess={takeAssessment} onExplore={() => setView("opportunities")} applied={applied} onApply={apply} />}
        {currentRole === "student" && view === "assessment" && <Assessment answers={answers} answeredCount={answeredCount} setAnswers={setAnswers} done={assessmentDone} score={assessmentScore} onFinish={() => setAssessmentDone(true)} onReturn={() => setView("dashboard")} />}
        {currentRole === "student" && view === "opportunities" && <Opportunities applied={applied} onApply={apply} />}
        {currentRole === "student" && view === "portfolio" && <Portfolio readiness={readiness} />}
      </section>
    </main>
  );
}

function Dashboard({ readiness, gaps, assessmentDone, onAssess, onExplore, applied, onApply }: { readiness: number; gaps: typeof skills; assessmentDone: boolean; onAssess: () => void; onExplore: () => void; applied: number[]; onApply: (id: number) => void }) {
  return <div className="page-grid"><div>
    <section className="hero"><div><span className="pill">✦ Career readiness</span><h2>Turn your learning into<br /><strong>real opportunities.</strong></h2><p>Your profile is {readiness}% aligned with your frontend career goal. A few focused steps can unlock more matches.</p><button className="primary" onClick={onAssess}>{assessmentDone ? "Retake skill assessment" : "Take skill assessment"} <span>→</span></button></div><div className="orb-wrap"><div className="orb"><b>{readiness}%</b><small>READY</small></div><span className="float f1">React</span><span className="float f2">Git</span><span className="float f3">API</span></div></section>
    <section className="section-title"><div><h2>Your next best matches</h2><p>Opportunities ranked by your skills and preferences.</p></div><button className="text-button" onClick={onExplore}>View all opportunities →</button></section>
    <div className="opportunity-list">{opportunities.slice(0, 2).map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} applied={applied.includes(opportunity.id)} onApply={onApply} />)}</div>
  </div><aside className="right-rail"><section className="card progress-card"><div className="card-heading"><div><p className="eyebrow">PROFILE COMPLETION</p><h3>Keep building momentum</h3></div><b className="score">78%</b></div><div className="bar"><span /></div><div className="check done">✓ Basic profile <small>Complete</small></div><div className="check done">✓ Add your projects <small>Complete</small></div><div className="check">○ Upload latest resume <button>Upload</button></div></section><section className="card gap-card"><div className="card-heading"><div><p className="eyebrow">SKILL GAP INSIGHTS</p><h3>Focus areas</h3></div><button className="dots">•••</button></div>{gaps.slice(0, 3).map((skill) => <div className="gap" key={skill.name}><div><b>{skill.name}</b><small>{skill.score}% today · {skill.target}% goal</small></div><span>{skill.target - skill.score}% gap</span></div>)}<button className="outline" onClick={onAssess}>View learning plan →</button></section></aside></div>;
}

function OpportunityCard({ opportunity, applied, onApply }: { opportunity: Opportunity; applied: boolean; onApply: (id: number) => void }) { const score = matchScore(opportunity); return <article className="opportunity"><div className={`company-logo ${opportunity.accent}`}>{opportunity.company[0]}</div><div className="opportunity-info"><div className="opportunity-top"><div><p className="eyebrow">{opportunity.type} · {opportunity.location}</p><h3>{opportunity.title}</h3><p>{opportunity.company} <span className="verified">✓</span></p></div><div className="match"><b>{score}%</b><small>MATCH</small></div></div><div className="skills">{opportunity.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><footer><span>Deadline: <b>{opportunity.deadline}</b></span><button className={applied ? "applied" : "apply"} disabled={applied} onClick={() => onApply(opportunity.id)}>{applied ? "✓ Applied" : "Apply now →"}</button></footer></div></article>; }

function Assessment({ answers, answeredCount, setAnswers, done, score, onFinish, onReturn }: { answers: number[]; answeredCount: number; setAnswers: (answers: number[]) => void; done: boolean; score: number; onFinish: () => void; onReturn: () => void }) { if (done) return <section className="assessment-result"><span className="result-icon">✓</span><p className="eyebrow">ASSESSMENT COMPLETE</p><h2>Great work, Aarav!</h2><p>You answered {score} of {questions.length} questions correctly. Your result has been captured for your career-readiness profile.</p><div className="result-score">{Math.round((score / questions.length) * 100)}%</div><button className="primary" onClick={onReturn}>See my dashboard →</button></section>; return <section className="assessment"><div className="section-title"><div><p className="eyebrow">FOUNDATION ASSESSMENT · 3 QUESTIONS</p><h2>Discover your growth areas</h2></div><span className="question-count">{answeredCount} / {questions.length} answered</span></div>{questions.map((question, index) => <article className="question" key={question.skill}><div className="question-label">{index + 1}<span>{question.skill}</span></div><h3>{question.prompt}</h3><div className="answers">{question.options.map((option, answerIndex) => <button onClick={() => { const next = [...answers]; next[index] = answerIndex; setAnswers(next); }} className={answers[index] === answerIndex ? "selected" : ""} key={option}>{String.fromCharCode(65 + answerIndex)}<span>{option}</span></button>)}</div></article>)}<button className="primary" disabled={answeredCount !== questions.length} onClick={onFinish}>Finish assessment →</button></section>; }

function Opportunities({ applied, onApply }: { applied: number[]; onApply: (id: number) => void }) { return <section><div className="section-title"><div><p className="eyebrow">PERSONALIZED FOR YOU</p><h2>Explore opportunities</h2><p>Ranked using your verified skills and career preferences.</p></div></div><div className="opportunity-list full-list">{opportunities.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} applied={applied.includes(opportunity.id)} onApply={onApply} />)}</div></section>; }

function Portfolio({ readiness }: { readiness: number }) { return <section className="portfolio"><div className="portfolio-head"><div className="avatar large">AS</div><div><p className="eyebrow">VERIFIED STUDENT PORTFOLIO</p><h2>Aarav Sharma <span className="verified">✓</span></h2><p>B.Tech Computer Science · Class of 2026</p></div><button className="outline">Share portfolio ↗</button></div><div className="portfolio-grid"><div className="card"><p className="eyebrow">CAREER READINESS</p><div className="large-number">{readiness}%</div><p>Frontend developer pathway</p></div><div className="card"><p className="eyebrow">VERIFIED SKILLS</p><div className="tag-cloud">{skills.filter((skill) => skill.score >= skill.target).map((skill) => <span key={skill.name}>✓ {skill.name}</span>)}</div></div><div className="card"><p className="eyebrow">PROJECT HIGHLIGHT</p><h3>Campus Events Hub</h3><p>Responsive event discovery app built with React, TypeScript and REST APIs.</p><div className="skills"><span>React</span><span>TypeScript</span></div></div></div></section>; }
