/* ============================================================
   SKILLS — grouped into "constellations" (categories).
   - Add a skill: add { name, icon } to a category's list.
   - Add a category: copy a whole { ... } block.
   - icon: a Devicon path (https://devicon.dev), e.g. "python/python-original".
           If docs/assets/icons/python-original.svg exists it is used; otherwise
           it loads from the Devicon CDN.
           Leave it out and a monogram is shown instead.
   - level: "core" (I use it a lot) or "learning" (I'm getting into it).
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

PORTFOLIO.skills = [
  {
    category: "Machine Learning",
    description: "Classical ML, from EDA to tuned pipelines.",
    items: [
      { name: "Python", icon: "python/python-original", level: "core" },
      { name: "Scikit-learn", icon: "scikitlearn/scikitlearn-original", level: "core" },
      { name: "Pandas", icon: "pandas/pandas-original", level: "core" },
      { name: "NumPy", icon: "numpy/numpy-original", level: "core" },
      { name: "Matplotlib", icon: "matplotlib/matplotlib-original", level: "core" },
      { name: "Seaborn", level: "core" }
    ]
  },
  {
    category: "Deep Learning",
    description: "Neural networks for text and vision.",
    items: [
      { name: "PyTorch", icon: "pytorch/pytorch-original", level: "learning" },
      { name: "TensorFlow", icon: "tensorflow/tensorflow-original", level: "learning" }
    ]
  },
  {
    category: "Mathematics",
    description: "The ground truth behind every model.",
    items: [
      { name: "Linear Algebra", level: "core" },
      { name: "Calculus", level: "core" },
      { name: "Probability", level: "core" },
      { name: "Statistics", level: "core" },
      { name: "Pure Mathematics", level: "learning" }
    ]
  },
  {
    category: "Backend & Deployment",
    description: "Serving models where people can use them.",
    items: [
      { name: "FastAPI", icon: "fastapi/fastapi-original", level: "core" },
      { name: "SQL", icon: "postgresql/postgresql-original", level: "core" },
      { name: "Docker", icon: "docker/docker-original", level: "learning" },
      { name: "Gradio", level: "core" },
      { name: "Hugging Face", level: "core" }
    ]
  },
  {
    category: "Tools",
    description: "Day-to-day workflow.",
    items: [
      { name: "Git", icon: "git/git-original", level: "core" },
      { name: "GitHub", icon: "github/github-original", level: "core" },
      { name: "Linux / WSL", icon: "linux/linux-plain", level: "core" },
      { name: "Jupyter", icon: "jupyter/jupyter-original", level: "core" },
      { name: "English", level: "core" }
    ]
  }
];
