/* ============================================================
   PROFILE — who you are, your links and your personal touches.
   Edit the text below; the design updates automatically.
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

PORTFOLIO.profile = {
  name: "Juan David Acevedo Neira",
  shortName: "Juan Acevedo",
  initials: "JA",
  role: "Machine Learning Engineer",
  level: "Junior",

  // Main phrase in the hero. Swap it for your favourite.
  tagline: "Exploring the universe, one model at a time",

  // Short line under your name.
  intro:
    "I build machine learning systems end to end: from pure math and raw data to trained models served through APIs and live demos.",

  location: "Colombia",
  timezone: "America/Bogota",
  availability: "Open to internships & junior ML roles",

  // Put a photo in docs/assets/img/ and write its path here, e.g. "assets/img/me.jpg".
  // While it is null, an astronaut-style avatar with your initials is shown.
  avatar: null,

  // About section. One string per paragraph.
  about: [
    "I'm a Data Science & Artificial Intelligence student focused on becoming a Machine Learning Engineer. I enjoy the full lifecycle of a model: understanding the problem, exploring and cleaning the data, choosing and tuning algorithms, and finally shipping something people can actually use.",
    "My foundation is mathematics. Linear algebra, calculus, probability and statistics are what make a model make sense to me, not just run. On top of that I work with Python, Scikit-learn, PyTorch, TensorFlow and FastAPI, and I deploy demos with Docker, Gradio and Hugging Face.",
    "I learn every day, build in public on GitHub, and I'm looking for a team where I can grow while turning data into real-world impact."
  ],

  // Little "off-orbit" cards in the About section: what you love outside the code.
  // icon: one of "moto", "farm", "galaxy", "sigma", "rocket", "brain", "code".
  interests: [
    {
      icon: "sigma",
      title: "Pure mathematics",
      text: "Proofs, structures and the elegance behind every algorithm."
    },
    {
      icon: "galaxy",
      title: "The universe",
      text: "The cosmos is the largest dataset there is, and the most humbling."
    },
    {
      icon: "moto",
      title: "Motorcycles",
      text: "Two wheels and an open road. Control comes from understanding the machine."
    },
    {
      icon: "farm",
      title: "Farms & countryside",
      text: "Good harvests, like good models, need patience and healthy soil (data)."
    }
  ],

  // Social / contact links. icon: "github", "linkedin", "mail", "huggingface", "x", "file".
  social: [
    { label: "GitHub", url: "https://github.com/JuanAcevedo08", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/juan-acevedo-ba0242339/", icon: "linkedin" },
    { label: "Hugging Face", url: "https://huggingface.co/JuanAcevedo", icon: "huggingface" }
    // { label: "Email", url: "mailto:you@example.com", icon: "mail" },
  ],

  // Optional: path or URL to your CV (PDF). Leave "" to hide the button.
  resume: ""
};
