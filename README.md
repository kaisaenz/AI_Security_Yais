# AI Security Yais - Centinela Platform

![Centinela Architecture](docs/architecture.png) **(Placeholder for architecture diagram)*

Centinela is an advanced, geopolitical dashboard and cyber-intelligence platform designed to monitor AI risks, threats, and regulatory frameworks across Latin America and globally.

## 🚀 Core Features

1. **Passive OSINT (Open Source Intelligence)**
   - Continuous monitoring of public data streams.
   - Threat intelligence aggregation specifically tailored for AI vulnerabilities.
   
2. **Threat Landscape Analysis**
   - Active tracking of malicious actors and newly discovered vulnerabilities in popular AI models.
   
3. **AI Governance Observatory (LATAM)**
   - **Interactive Geopolitics Map**: Built with React-Leaflet, providing a dark-mode, slippy map interface covering Latin America.
   - **Policy Nodes**: Geographic tracking of AI legislation, data privacy, and algorithmic transparency frameworks in 9 countries (Brasil, Chile, Argentina, Colombia, Perú, México, Uruguay, Costa Rica, Ecuador).
   - **Regional News Radar**: Real-time plotting of technology and regulatory news events directly on the geographic map via pulsating UI markers.
   - For more details on the architecture of this module, read: [docs/AI_Governance_Observatory.md](docs/AI_Governance_Observatory.md).

4. **Chaos Laboratory**
   - Secure sandbox environments to run and test AI exploits safely.
   
5. **Resilience & Reporting**
   - Automated report generation on infrastructure integrity and AI compliance.

## 🛠️ Technology Stack
- **Frontend**: Next.js (React), Tailwind CSS, Shadcn UI
- **Mapping Engine**: Leaflet, React-Leaflet
- **Styling**: Vanilla CSS extensions, custom dynamic SVG markers
- **Icons**: Lucide React

## 📦 Installation & Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/kaisaenz/AI_Security_Yais.git
   cd AI_Security_Yais/web/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Access the platform at [http://localhost:3000](http://localhost:3000)

## 📄 Documentation

For full documentation and detailed references regarding the specific modules, please refer to the files in the `docs/` folder, as well as `YAIs.md` for foundational concepts.
