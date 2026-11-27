/* ============================================================
   PROJECTS — shown as "missions".
   To add a project, copy one { ... } block, paste it at the TOP of
   the list (newest first) and edit it. Fields:
   - title, category (used by the filter buttons), year (optional)
   - featured: true  -> bigger card
   - summary: one or two sentences
   - highlights: short bullet points (optional)
   - metric: { value, label } the number you're proud of (optional)
   - stack: technologies used
   - links: { repo, demo, article } (any can be left out)
   ============================================================ */
window.PORTFOLIO = window.PORTFOLIO || {};

PORTFOLIO.projects = [
  {
    title: "Airbnb NYC Price Prediction",
    category: "Machine Learning",
    featured: true,
    summary:
      "End-to-end regression project on the Kaggle Airbnb NYC dataset, from data cleaning and outlier handling to a containerized API serving the best model in the cloud.",
    highlights: [
      "Explored, cleaned and transformed the data, with careful outlier handling",
      "Compared linear and ensemble models, then tuned the best ones",
      "Served the model with FastAPI, containerized it with Docker and deployed it on Koyeb"
    ],
    metric: { value: "+5 pts", label: "R² above the dataset average" },
    stack: ["Python", "OOP", "Scikit-learn", "Ensembles", "FastAPI", "Docker", "Koyeb"],
    links: {
      repo: "https://github.com/JuanAcevedo08/Airbnb-Repository"
    }
  },
  {
    title: "News Topic Classifier",
    category: "Deep Learning",
    summary:
      "English news classifier built with PyTorch and TorchText, trained with custom training and validation loops and published as an interactive demo.",
    highlights: [
      "Text processing pipeline with TorchText",
      "Custom training / validation functions",
      "Generalizes well on unseen articles"
    ],
    metric: { value: "~80%", label: "accuracy" },
    stack: ["Python", "PyTorch", "TorchText", "NLP", "Gradio", "Hugging Face"],
    links: {
      repo: "https://github.com/JuanAcevedo08/DeepLearning/blob/main/PyTorchProjects/Clasificador_texto.ipynb",
      demo: "https://huggingface.co/spaces/JuanAcevedo/classifier-news"
    }
  },
  {
    title: "Will the Customer Buy?",
    category: "Machine Learning",
    summary:
      "Full classification pipeline that predicts purchase intent, comparing several algorithms with proper preprocessing, class balancing and validation.",
    highlights: [
      "Benchmarked Random Forest, KNN, Logistic Regression, SVM and Decision Trees",
      "Handled class imbalance with imbalanced-learn",
      "Final pipeline exported with Joblib and served with Gradio"
    ],
    stack: ["Python", "Scikit-learn", "Imbalanced-learn", "Joblib", "Gradio", "Hugging Face"],
    links: {
      repo: "https://github.com/JuanAcevedo08/Machine-Learning-Solutions/tree/main/compra_o_no",
      demo: "https://huggingface.co/spaces/JuanAcevedo/shopper"
    }
  },
  {
    title: "Customer Segmentation",
    category: "Unsupervised Learning",
    summary:
      "Behaviour-based customer segmentation using clustering and PCA, which revealed two clearly distinct customer groups.",
    highlights: [
      "Compared several clustering algorithms",
      "Dimensionality reduction with PCA",
      "Interactive demo to assign new customers to a segment"
    ],
    metric: { value: "2", label: "customer segments found" },
    stack: ["Python", "Scikit-learn", "SciPy", "PCA", "Clustering", "Gradio"],
    links: {
      repo: "https://github.com/JuanAcevedo08/Machine-Learning-Solutions/tree/main/segmentacion_grupo_clustering",
      demo: "https://huggingface.co/spaces/JuanAcevedo/Find_clinet"
    }
  },
  {
    title: "Coffee Quality Grader",
    category: "Machine Learning",
    summary:
      "Decision Tree model that predicts coffee quality from global features. Trained on a small Kaggle dataset, built as a learning demo.",
    stack: ["Python", "Scikit-learn", "Decision Trees", "SciPy", "Gradio"],
    links: {
      repo: "https://github.com/JuanAcevedo08/Machine-Learning-Solutions/tree/main/Clasificacion_calidad_caf%C3%A9",
      demo: "https://huggingface.co/spaces/JuanAcevedo/coffee-quality-classifier"
    }
  }
];
