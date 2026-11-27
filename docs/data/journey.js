/* ============================================================
   JOURNEY — education, experience and learning path ("flight path").
   - type: "education", "experience" or "learning"
   - status: "done", "now" or "next"
   Add a new stop by copying a { ... } block. Order = top to bottom.
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

PORTFOLIO.journey = [
  {
    type: "education",
    status: "now",
    title: "Data Science & Artificial Intelligence",
    place: "UNIMINUTO · Corporación Universitaria Minuto de Dios",
    period: "In progress",
    text: "University studies in data science and AI.",
    tags: ["Data Science", "AI", "Statistics"]
  },
  {
    type: "learning",
    status: "done",
    title: "Mathematics for Machine Learning",
    place: "Platzi",
    period: "Completed",
    text: "Algebra, linear algebra, descriptive & inferential statistics, probability, differential and vector calculus.",
    tags: ["Calculus", "Linear Algebra", "Statistics", "Probability"]
  },
  {
    type: "learning",
    status: "done",
    title: "Python & ML Fundamentals",
    place: "Self-driven + Platzi",
    period: "Completed",
    text: "Python, OOP, Pandas, NumPy, Scikit-learn and exploratory data analysis.",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn"]
  },
  {
    type: "learning",
    status: "now",
    title: "APIs & Model Deployment",
    place: "Platzi · DataCamp",
    period: "Studying now",
    text: "FastAPI, serving ML models, databases and containers.",
    tags: ["FastAPI", "SQL", "Docker"]
  },
  {
    type: "learning",
    status: "now",
    title: "Deep Learning",
    place: "Platzi",
    period: "Studying now",
    text: "Neural networks, CNNs, RNNs, computer vision and NLP with PyTorch and TensorFlow.",
    tags: ["PyTorch", "TensorFlow", "Computer Vision", "NLP"]
  },
  {
    type: "learning",
    status: "next",
    title: "MLOps & Cloud",
    place: "Next destination",
    period: "Up next",
    text: "MLflow, Kubeflow, AWS for ML and monitoring models in production.",
    tags: ["MLOps", "AWS", "Kubernetes"]
  }
];
