import type {
    Experience,
    Project,
    SkillGroup,
    Publication,
    Award,
    Certification,
  } from "@/types";

export const NAME = "Arabinda Behera";
export const TAGLINE = "Software Engineer · Particle Physicist · AI Practitioner";
export const LOCATION = "Pleasanton, CA";
export const EMAIL = "arabindabehera295@gmail.com";
export const LINKEDIN = "https://www.linkedin.com/in/arabinda-behera";
export const GOOGLE_SCHOLAR = "https://scholar.google.com/citations?hl=en&user=o-wsejEAAAAJ";
export const ORCID = "https://orcid.org/0000-0002-7739-295X";
export const INSPIRE_HEP = "https://inspirehep.net/authors/1403410";
export const GITHUB = "https://github.com/arabinda-b/my-portfolio";

export const BIO = `I operate at the rare intersection of fundamental scientific research and large-scale production engineering. With a Ph.D. from Stony Brook University and research conducted at CERN (ATLAS Collaboration) and Brookhaven National Laboratory (STAR Collaboration), I bring rigorous scientific thinking to every engineering problem. I have authored 20+ peer-reviewed publications — including four in Nature — spanning Physical Review Letters, Physical Review C, JHEP, Physics Letters B, Nature Physics, and Science Advances, cited several hundred times internationally, and named co-author on landmark discoveries including top quark entanglement, the detailed Higgs boson interaction map, and global Λ-hyperon polarization.

Today I design and deliver cloud-native full-stack applications and AI-powered systems at Oracle — spanning distributed microservices, generative AI agents, retrieval-augmented systems, and modern web platforms. I apply statistical modeling, high-performance computing, Monte Carlo simulation, deep learning, and distributed-systems expertise to problems that few practitioners worldwide can address with equivalent depth.`;

export const EXPERIENCES: Experience[] = [
    {
      company: "Oracle America, Inc.",
      role: "Software Engineer",
      period: "Feb 2022 – Present",
      location: "Redwood City, CA",
      bullets: [
        "Designed and developed cloud-native full-stack applications for Oracle Fusion Release Engineering platform, supporting large-scale software delivery workflows across Oracle's enterprise product suite.",
        "Built production microservices using Java and the Helidon framework, integrated with Oracle Autonomous Database and OCI cloud services to handle critical release pipeline operations.",
        "Implemented CI/CD pipelines and automated deployment workflows using Oracle Cloud Infrastructure (OCI), reducing manual release overhead and increasing deployment frequency.",
        "Designed and developed REST APIs with comprehensive unit and integration testing using JUnit and Mockito, ensuring high reliability and adherence to engineering standards.",
        "Built and deployed internal web applications using the Oracle APEX low-code platform and frontend applications using JavaScript, HTML, CSS, and Oracle JET.",
        "Designed and developed a CLI tool in Golang and OCI Cloud services to automate the export, import, authorization, and deployment of Oracle APEX applications, significantly reducing manual effort for developer teams.",
        "Designed and implemented a Retrieval Augmented Generation (RAG) system using Oracle Autonomous Vector Database, OCI services like Knowledge base and embedding models, enabling semantic search over developer logs and reducing debugging turnaround time.",
        "Developed an AI Chat Agent using Oracle Generative AI service backed by a structured knowledge base of technical documentation, improving developer self-service and reducing support load.",
      ],
    },
    {
      company: "Revize Software Systems",
      role: "Software Developer",
      period: "Aug 2021 – Feb 2022",
      location: "Troy, MI",
      bullets: [
        "Maintained and extended the Java-based Revize CMS platform serving government institutions — municipalities, public agencies, and local governments across the United States — implementing new features, resolving production bugs, and improving platform stability using Spring Boot, Hibernate, and PostgreSQL; collaborated via Git, JIRA, and Confluence in an Agile sprint workflow.",
        "Decomposed monolithic CMS modules into independently deployable Spring Boot microservices, improving platform scalability and reducing inter-component coupling; wrote comprehensive unit and integration tests using JUnit and Mockito to enforce reliability across service boundaries.",
        "Developed dynamic, client-facing frontend pages and UI components for government websites using PHP, JavaScript, HTML/CSS, and jQuery, delivering responsive layouts and interactive features directly consumed by thousands of public-sector end users.",
        "Architected and delivered a full-stack accident reporting SPA for police department use: React frontend, Spring Boot REST backend, MySQL database — deployed end-to-end on AWS with EC2 instances, Application Load Balancers, AWS WAF rules, and IAM security policies, replacing a manual paper-based workflow with a secure, cloud-hosted digital system.",
      ],
    },
    {
      company: "Resideo (Honeywell Home)",
      role: "Firmware Engineer Intern",
      period: "Jun 2021 – Aug 2021",
      location: "Melville, NY",
      bullets: [
        "Implemented Apple HomeKit Accessory Protocol (HAP) over IP for residential security systems (alarm panels, door locks, motion sensors), enabling Siri voice control and Apple Home compatibility; built server/client processes on embedded Linux using socket-based IPC and event-driven architecture for real-time device state synchronization between the HomeKit bridge daemon and security panel firmware.",
        "Designed and developed a cross-platform C++ SDK abstracting low-level hardware communication protocols for programmatic control of Resideo security panels and peripheral IoT devices, with TLS-based secure channels to the Resideo cloud backend ensuring Apple MFi certification compliance.",
        "Conducted functional and integration testing of HomeKit-paired security devices using Apple's HomeKit Accessory Simulator and hardware test rigs, validating protocol compliance and device state transitions across multiple firmware versions.",
      ],
    },
    {
      company: "SUNY at Stony Brook",
      role: "Research Assistant",
      period: "Jun 2016 – May 2021",
      location: "Stony Brook, NY",
      bullets: [
        "Performed large-scale data analysis of nuclear collision experiments for the ATLAS experiment at CERN and the STAR experiment at BNL, contributing to globally significant particle physics research.",
        "Designed and optimized High-Level Trigger (HLT) algorithms for electron and photon selection in the ATLAS experiment at the LHC, achieving trigger efficiencies exceeding 96% for pp collisions and 95% for heavy-ion collisions while adapting to a fourfold increase in peak LHC luminosity across the full Run 2 period (2015–2018).",
        "Developed the theoretical Glauber model framework and co-authored the first experimental measurement of longitudinal flow decorrelations in Xe+Xe collisions at √sNN = 5.44 TeV with the ATLAS detector — presented at four major international conferences including Quark Matter 2019, Hard Probes 2020, and Initial Stages 2021.",
        "Performed critical evaluation of the robustness of Principal Component Analysis (PCA) as applied to harmonic flow extraction in heavy-ion collisions, establishing fundamental methodological boundaries for QGP collective behavior measurements at RHIC and the LHC.",
        "Developed and validated novel deep generative models (VAEs and GANs) for fast photon shower simulation in the ATLAS electromagnetic calorimeter, achieving up to two orders of magnitude speedup over full GEANT4 simulation.",
        "Earned named authorship on four landmark results published in Nature: observation of quantum entanglement with top quarks (2024); ten-year map of Higgs boson interactions (2022); global spin alignment of ϕ and K∗0 mesons (2023); and global Λ-hyperon polarization — the most vortical fluid ever observed (2017).",
        "Published 20+ peer-reviewed papers — including four in Nature — across PRL, PRC, PRR, JHEP, PLB, Nature Physics, and Science Advances, cited hundreds of times internationally.",
      ],
    },
    {
      company: "SUNY at Stony Brook",
      role: "Teaching Assistant",
      period: "Aug 2015 – Jun 2016",
      location: "Stony Brook, NY",
      bullets: [
        "Assisted in undergraduate chemistry courses, conducted tutorial sessions, graded assignments, and proctored examinations for a class of 100+ students.",
      ],
    },
  ];


  export const PROJECTS: Project[] = [
    {
      title: "Job Scheduling & Monitoring Service",
      description:
        "Microservices platform for scheduling and monitoring jobs at enterprise scale. Integrated with OCI IAM, Compute, Object Storage, and Autonomous Database. Real-time monitoring via Apache Kafka and OCI Streaming.",
      tech: ["Java", "Spring Boot", "Apache Kafka", "OCI", "Autonomous Database"],
    },
    {
      title: "Developer Productivity CLI",
      description:
        "CLI tool in Golang for automating creation, export, import, authorization, and deployment of Oracle APEX applications. Significantly reduced manual testing and deployment effort for developer teams.",
      tech: ["Golang", "OCI", "Oracle APEX", "CLI"],
    },
    {
      title: "AI RAG Log Search System",
      description:
        "Semantic search system using vector embeddings over developer logs. Built on Oracle Autonomous Vector Database with similarity search, reducing debugging turnaround time significantly.",
      tech: ["RAG", "Oracle Vector DB", "OCI", "Embeddings", "Python"],
    },
    {
      title: "AI Facial Emotion Detection",
      description:
        "Deep neural network trained on face image datasets to identify key facial landmarks (eyes, nose, lips). Architecture includes Convolutional layers, Residual blocks, Max-pooling, and Dense layers with Adam optimization.",
      tech: ["Python", "TensorFlow", "Keras", "CNN", "Deep Learning"],
    },
  ];

  export const SKILL_GROUPS: SkillGroup[] = [
    {
      category: "Languages",
      skills: ["Java", "Python", "JavaScript", "TypeScript", "C++", "C", "Golang", "Shell", "HTML", "PL/SQL"],
    },
    {
      category: "Frameworks",
      skills: ["Spring Boot", "React", "Next.js", "Helidon", "Express", "FastAPI", "Flask"],
    },
    {
      category: "Cloud & DevOps",
      skills: ["OCI", "AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins"],
    },
    {
      category: "Databases",
      skills: ["Oracle DB", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Apache Hive"],
    },
    {
      category: "AI & Machine Learning",
      skills: ["TensorFlow", "Keras", "Scikit-Learn", "NumPy", "Pandas", "Matplotlib", "Seaborn", "LangChain", "LangGraph", "RAG", "OpenAI", "Gemini", "Claude Code"],
    },
    {
      category: "Tools",
      skills: ["Git", "Kafka", "JUnit", "Mockito", "JIRA", "Bitbucket", "Confluence", "Jupyter", "Linux"],
    },
  ];

  export const PUBLICATIONS: Publication[] = [
    {
      title: "Observation of quantum entanglement with top quarks at the ATLAS detector",
      journal: "Nature",
      year: 2024,
      url: "https://doi.org/10.1038/s41586-024-07824-z",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Deep Generative Models for Fast Photon Shower Simulation in ATLAS",
      journal: "Computing and Software for Big Science",
      year: 2024,
      url: "https://doi.org/10.1007/s41781-024-00119-0",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Pattern of global spin alignment of ϕ and K∗0 mesons in heavy-ion collisions",
      journal: "Nature",
      year: 2023,
      url: "https://doi.org/10.1038/s41586-022-05557-5",
      collaboration: "STAR Collaboration",
    },
    {
      title: "Correlations between flow and transverse momentum in Xe+Xe and Pb+Pb collisions at the LHC with the ATLAS detector",
      journal: "Physical Review C",
      year: 2023,
      url: "https://doi.org/10.1103/PhysRevC.107.054910",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Observation of electroweak production of two jets and a Z-boson pair",
      journal: "Nature Physics",
      year: 2023,
      url: "https://doi.org/10.1038/s41567-022-01613-5",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Tomography of ultrarelativistic nuclei with polarized photon-gluon collisions",
      journal: "Science Advances",
      year: 2023,
      url: "https://doi.org/10.1126/sciadv.abq3903",
      collaboration: "STAR Collaboration",
    },
    {
      title: "A detailed map of Higgs boson interactions by the ATLAS experiment ten years after the discovery",
      journal: "Nature",
      year: 2022,
      url: "https://doi.org/10.1038/s41586-022-04892-x",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Longitudinal flow decorrelations in Xe+Xe collisions at 5.44 TeV with the ATLAS detector",
      journal: "Physical Review Letters",
      year: 2021,
      url: "https://doi.org/10.1103/PhysRevLett.126.122301",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Non-flow effects in correlation between harmonic flow and transverse momentum in nuclear collisions",
      journal: "Physics Letters B",
      year: 2021,
      url: "https://doi.org/10.1016/j.physletb.2021.136702",
    },
    {
      title: "Test of the universality of τ and µ lepton couplings in W-boson decays with the ATLAS detector",
      journal: "Nature Physics",
      year: 2021,
      url: "https://doi.org/10.1038/s41567-021-01236-w",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Measurement of transverse flow and longitudinal flow decorrelations in 5.44 TeV Xe+Xe collisions with ATLAS",
      journal: "PoS (HardProbes2020)",
      year: 2021,
      url: "https://pos.sissa.it/392/117/",
    },
    {
      title: "Longitudinal eccentricity decorrelations in heavy ion collisions",
      journal: "Physical Review Research",
      year: 2020,
      url: "https://doi.org/10.1103/PhysRevResearch.2.023362",
    },
    {
      title: "Robustness of principal component analysis on harmonic flow in heavy-ion collisions",
      journal: "Physical Review C",
      year: 2020,
      url: "https://doi.org/10.1103/PhysRevC.102.024911",
    },
    {
      title: "Performance of electron and photon triggers in ATLAS during LHC Run 2",
      journal: "European Physical Journal C",
      year: 2020,
      url: "https://doi.org/10.1140/epjc/s10052-019-7500-2",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Measurement of the mass difference and the binding energy of the hypertriton and antihypertriton",
      journal: "Nature Physics",
      year: 2020,
      url: "https://doi.org/10.1038/s41567-020-0799-7",
      collaboration: "STAR Collaboration",
    },
    {
      title: "Fluctuations of anisotropic flow in Pb+Pb collisions at √sNN = 5.02 TeV with the ATLAS detector",
      journal: "JHEP",
      year: 2020,
      url: "https://doi.org/10.1007/JHEP01(2020)051",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Measurement of flow harmonics correlations with mean transverse momentum in Pb+Pb and p+Pb collisions at √sNN = 5.02 TeV with the ATLAS detector",
      journal: "European Physical Journal C",
      year: 2019,
      url: "https://doi.org/10.1140/epjc/s10052-019-7489-6",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Correlated long-range mixed-harmonic fluctuations measured in pp, p+Pb and low-multiplicity Pb+Pb collisions with the ATLAS detector",
      journal: "Physics Letters B",
      year: 2019,
      url: "https://doi.org/10.1016/j.physletb.2018.11.065",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Measurement of long-range azimuthal correlations in proton-proton and proton-lead collisions with ATLAS",
      journal: "Acta Physica Polonica B Proceedings Supplement",
      year: 2019,
      url: "https://indico.ifj.edu.pl/event/199/contributions/1123/",
    },
    {
      title: "Observation of Higgs boson production in association with a top quark pair at the LHC with the ATLAS detector",
      journal: "Physics Letters B",
      year: 2018,
      url: "https://doi.org/10.1016/j.physletb.2018.07.035",
      collaboration: "ATLAS Collaboration",
    },
    {
      title: "Global Λ hyperon polarization in nuclear collisions: evidence for the most vortical fluid",
      journal: "Nature",
      year: 2017,
      url: "https://doi.org/10.1038/nature23004",
      collaboration: "STAR Collaboration",
    },
    {
      title: "Bulk Properties of the Medium Produced in Relativistic Heavy-Ion Collisions from the Beam Energy Scan Program",
      journal: "Physical Review C",
      year: 2017,
      url: "https://doi.org/10.1103/PhysRevC.96.044904",
      collaboration: "STAR Collaboration",
    },
  ];

  export const AWARDS: Award[] = [
    {
      title: "Breakthrough Prize in Fundamental Physics",
      org: "ATLAS Collaboration, CERN",
      year: 2025,
      url: "https://breakthroughprize.org/",
    },
    {
      title: "Best Master's Thesis Award in Physics",
      org: "NISER",
      year: 2015,
    },
    {
      title: "INSPIRE Fellowship",
      org: "Government of India",
      year: 2010,
    },
    {
      title: "Chief Minister's Award for Academic Excellence",
      org: "Government of Odisha",
      year: 2010,
    },
  ];

  export const CERTIFICATIONS: Certification[] = [
    { title: "OCI Generative AI Professional", issuer: "Oracle" },
    { title: "OCI Solution Architect Associate", issuer: "Oracle" },
    { title: "Oracle Machine Learning using Autonomous Database Associate", issuer: "Oracle" },
    { title: "OCI Data Science Professional", issuer: "Oracle" },
    { title: "Deep Learning Specialization", issuer: "DeepLearning.AI / Coursera" },
    { title: "IBM Data Science Specialization", issuer: "IBM / Coursera" },
    { title: "Machine Learning Specialization", issuer: "Google Cloud / Coursera" },
    { title: "Modern Big Data Analysis with SQL Specialization", issuer: "Cloudera / Coursera" },
  ];

  export const EDUCATION = [
    {
      degree: "Ph.D. in Chemistry",
      school: "State University of New York at Stony Brook",
      location: "Stony Brook, USA",
      period: "Aug 2015 – May 2021",
      note: "Research at CERN (ATLAS) and Brookhaven National Laboratory (STAR)",
    },
    {
      degree: "Int. MSc in Physics",
      school: "National Institute of Science Education and Research (NISER)",
      location: "Bhubaneswar, India",
      period: "Aug 2010 – May 2015",
    },
  ];
