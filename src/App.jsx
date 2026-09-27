import { useMemo, useState } from "react";
import "./App.css";

const categories = [
  {
    id: "school",
    name: "School",
    icon: "🎓",
    description: "Classes, studying, assignments, and learning",
  },
  {
    id: "work",
    name: "Work",
    icon: "💼",
    description: "Career, jobs, internships, and professional goals",
  },
  {
    id: "family",
    name: "Family & Friends",
    icon: "❤️",
    description: "Time with family, friends, and relationships",
  },
  {
    id: "self-care",
    name: "Self-Care",
    icon: "🧘",
    description: "Relaxation, hobbies, and personal well-being",
  },
  {
    id: "health",
    name: "Health & Fitness",
    icon: "🏃",
    description: "Exercise, nutrition, sleep, and physical health",
  },
  {
    id: "fun",
    name: "Fun & Recreation",
    icon: "🎮",
    description: "Entertainment, hobbies, games, and recreation",
  },
];

const initialActivities = [
  {
    id: 1,
    category: "school",
    title: "Studied for engineering exam",
    date: "2026-09-27",
    notes: "Reviewed circuits and practice problems.",
  },
  {
    id: 2,
    category: "work",
    title: "Worked on project",
    date: "2026-09-26",
    notes: "Finished the weekly project tasks.",
  },
  {
    id: 3,
    category: "health",
    title: "Went for a walk",
    date: "2026-09-25",
    notes: "30 minute walk outside.",
  },
  {
    id: 4,
    category: "self-care",
    title: "Watched a movie",
    date: "2026-09-23",
    notes: "Relaxed after a busy week.",
  },
  {
    id: 5,
    category: "family",
    title: "Dinner with family",
    date: "2026-09-20",
    notes: "Had dinner and caught up with everyone.",
  },
];

function getCategory(id) {
  return categories.find((category) => category.id === id);
}

function getDaysSince(dateString) {
  const today = new Date("2026-09-27T12:00:00");
  const date = new Date(`${dateString}T12:00:00`);
  return Math.max(0, Math.floor((today - date) / (1000 * 60 * 60 * 24)));
}

function App() {
  const [activities, setActivities] = useState(initialActivities);
  const [activePage, setActivePage] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    category: "school",
    title: "",
    date: "2026-09-27",
    notes: "",
  });

  const categoryStats = useMemo(() => {
    return categories.map((category) => {
      const categoryActivities = activities
        .filter((activity) => activity.category === category.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      const lastActivity = categoryActivities[0];
      const daysSince = lastActivity
        ? getDaysSince(lastActivity.date)
        : null;

      return {
        ...category,
        lastActivity,
        daysSince,
      };
    });
  }, [activities]);

  const recommendation = useMemo(() => {
    const sorted = [...categoryStats].sort((a, b) => {
      if (a.daysSince === null) return -1;
      if (b.daysSince === null) return 1;
      return b.daysSince - a.daysSince;
    });

    return sorted[0];
  }, [categoryStats]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    const newActivity = {
      id: Date.now(),
      ...form,
    };

    setActivities((current) => [newActivity, ...current]);
    setForm({
      category: "school",
      title: "",
      date: "2026-09-27",
      notes: "",
    });
    setShowModal(false);
  }

  function deleteActivity(id) {
    setActivities((current) =>
      current.filter((activity) => activity.id !== id)
    );
  }

  function getStatus(daysSince) {
    if (daysSince === null) return "Needs attention";
    if (daysSince >= 7) return "Needs attention";
    if (daysSince >= 3) return "Could use attention";
    return "Active";
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">⚖️</div>
          <div>
            <h1>LifeBalance</h1>
            <p>Find your balance.</p>
          </div>
        </div>

        <nav>
          <button
            className={activePage === "dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("dashboard")}
          >
            <span>◉</span>
            Dashboard
          </button>

          <button
            className={activePage === "activities" ? "nav-item active" : "nav-item"}
            onClick={() => setActivePage("activities")}
          >
            <span>✓</span>
            Activities
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-card">
            <div className="avatar">B</div>
            <div>
              <strong>Ben</strong>
              <span>Personal account</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">PERSONAL DASHBOARD</span>
            <h2>
              {activePage === "dashboard"
                ? "Good evening, Ben."
                : "Your activities"}
            </h2>
          </div>

          <button className="primary-button" onClick={() => setShowModal(true)}>
            + Log Activity
          </button>
        </header>

        {activePage === "dashboard" ? (
          <>
            <section className="hero-card">
              <div>
                <span className="eyebrow">TODAY'S CHECK-IN</span>
                <h3>How balanced does your life feel?</h3>
                <p>
                  LifeBalance looks at your recent activities and highlights
                  areas that may need a little more attention.
                </p>
              </div>

              <div className="hero-stat">
                <strong>{activities.length}</strong>
                <span>activities logged</span>
              </div>
            </section>

            <section className="section-header">
              <div>
                <span className="eyebrow">LIFE AREAS</span>
                <h3>Your balance</h3>
              </div>
              <span className="section-note">
                Based on your recent activity
              </span>
            </section>

            <section className="category-grid">
              {categoryStats.map((category) => (
                <article className="category-card" key={category.id}>
                  <div className="category-top">
                    <div className="category-icon">{category.icon}</div>
                    <span
                      className={`status ${
                        getStatus(category.daysSince) === "Active"
                          ? "status-active"
                          : "status-warning"
                      }`}
                    >
                      {getStatus(category.daysSince)}
                    </span>
                  </div>

                  <h4>{category.name}</h4>
                  <p>{category.description}</p>

                  <div className="category-footer">
                    <span>Last activity</span>
                    <strong>
                      {category.daysSince === null
                        ? "Never"
                        : category.daysSince === 0
                        ? "Today"
                        : `${category.daysSince} day${
                            category.daysSince === 1 ? "" : "s"
                          } ago`}
                    </strong>
                  </div>
                </article>
              ))}
            </section>

            <section className="recommendation">
              <div className="recommendation-icon">💡</div>

              <div className="recommendation-content">
                <span className="eyebrow">RECOMMENDED FOCUS</span>
                <h3>
                  Give some attention to {recommendation.name}.
                </h3>
                <p>
                  {recommendation.daysSince === null
                    ? `You haven't logged anything for ${recommendation.name} yet.`
                    : `It has been ${recommendation.daysSince} day${
                        recommendation.daysSince === 1 ? "" : "s"
                      } since your last ${recommendation.name.toLowerCase()} activity.`}
                </p>
              </div>

              <button
                className="secondary-button"
                onClick={() => {
                  setForm((current) => ({
                    ...current,
                    category: recommendation.id,
                  }));
                  setShowModal(true);
                }}
              >
                Log activity
              </button>
            </section>
          </>
        ) : (
          <section className="activities-page">
            <div className="section-header">
              <div>
                <span className="eyebrow">ACTIVITY HISTORY</span>
                <h3>Everything you've logged</h3>
              </div>
            </div>

            <div className="activity-list">
              {activities.length === 0 ? (
                <div className="empty-state">
                  <span>📝</span>
                  <h3>No activities yet</h3>
                  <p>Log your first activity to start building your balance.</p>
                </div>
              ) : (
                activities.map((activity) => {
                  const category = getCategory(activity.category);

                  return (
                    <article className="activity-row" key={activity.id}>
                      <div className="activity-icon">{category.icon}</div>

                      <div className="activity-info">
                        <div className="activity-title-row">
                          <h4>{activity.title}</h4>
                          <span className="activity-date">
                            {new Date(
                              `${activity.date}T12:00:00`
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        <span className="activity-category">
                          {category.name}
                        </span>

                        {activity.notes && <p>{activity.notes}</p>}
                      </div>

                      <button
                        className="delete-button"
                        onClick={() => deleteActivity(activity.id)}
                        title="Delete activity"
                      >
                        ×
                      </button>
                    </article>
                  );
                })
              )}
            </div>
          </section>
        )}
      </main>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <span className="eyebrow">NEW ACTIVITY</span>
                <h3>What did you do?</h3>
              </div>

              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Life area
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                >
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Activity
                <input
                  type="text"
                  placeholder="e.g. Went to the gym"
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  autoFocus
                />
              </label>

              <label>
                Date
                <input
                  type="date"
                  value={form.date}
                  onChange={(event) =>
                    setForm({ ...form, date: event.target.value })
                  }
                />
              </label>

              <label>
                Notes <span className="optional">(optional)</span>
                <textarea
                  placeholder="Add a few details..."
                  value={form.notes}
                  onChange={(event) =>
                    setForm({ ...form, notes: event.target.value })
                  }
                  rows="4"
                />
              </label>

              <div className="form-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
