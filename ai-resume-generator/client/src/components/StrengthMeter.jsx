import "./StrengthMeter.css";

const StrengthMeter = ({ data }) => {
  const calculateScore = () => {
    let score = 0;
    const checks = [];

    // Name (10pts)
    if (data.name?.trim()) {
      score += 10;
      checks.push({ label: "Full name", done: true });
    } else {
      checks.push({ label: "Full name", done: false });
    }

    // Email (10pts)
    if (data.email?.trim()) {
      score += 10;
      checks.push({ label: "Email address", done: true });
    } else {
      checks.push({ label: "Email address", done: false });
    }

    // Phone (10pts)
    if (data.phone?.trim()) {
      score += 10;
      checks.push({ label: "Phone number", done: true });
    } else {
      checks.push({ label: "Phone number", done: false });
    }

    // Objective (15pts)
    if (data.objective?.trim()) {
      score += data.objective.length > 50 ? 15 : 8;
      checks.push({ label: "Career objective", done: true });
    } else {
      checks.push({ label: "Career objective", done: false });
    }

    // Skills (15pts)
    const skillCount = Array.isArray(data.skills) ? data.skills.length : 0;
    if (skillCount >= 3) {
      score += 15;
      checks.push({ label: "3+ skills added", done: true });
    } else if (skillCount > 0) {
      score += 7;
      checks.push({ label: "3+ skills added", done: false });
    } else {
      checks.push({ label: "3+ skills added", done: false });
    }

    // Experience (15pts)
    if (data.experience?.trim()) {
      score += data.experience.length > 80 ? 15 : 8;
      checks.push({ label: "Work experience", done: true });
    } else {
      checks.push({ label: "Work experience", done: false });
    }

    // Education (10pts)
    if (data.education?.trim()) {
      score += 10;
      checks.push({ label: "Education details", done: true });
    } else {
      checks.push({ label: "Education details", done: false });
    }

    // Projects (10pts)
    if (data.projects?.trim()) {
      score += 10;
      checks.push({ label: "Projects listed", done: true });
    } else {
      checks.push({ label: "Projects listed", done: false });
    }

    // Social links (5pts)
    if (data.linkedin?.trim() || data.github?.trim() || data.portfolio?.trim()) {
      score += 5;
      checks.push({ label: "Social/portfolio links", done: true });
    } else {
      checks.push({ label: "Social/portfolio links", done: false });
    }

    return { score: Math.min(score, 100), checks };
  };

  const { score, checks } = calculateScore();

  const getLevel = () => {
    if (score >= 80) return { label: "Excellent", color: "#10b981" };
    if (score >= 60) return { label: "Good", color: "#6366f1" };
    if (score >= 40) return { label: "Fair", color: "#f59e0b" };
    return { label: "Needs Work", color: "#ef4444" };
  };

  const level = getLevel();

  return (
    <div className="strength-meter">
      <div className="strength-header">
        <span className="strength-label">Resume Strength</span>
        <span className="strength-score" style={{ color: level.color }}>
          {score}% — {level.label}
        </span>
      </div>

      <div className="strength-bar-bg">
        <div
          className="strength-bar-fill"
          style={{
            width: `${score}%`,
            background: level.color,
          }}
        />
      </div>

      <div className="strength-checks">
        {checks.map((c, i) => (
          <div key={i} className={`check-item ${c.done ? "done" : ""}`}>
            <span className="check-dot" />
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrengthMeter;
