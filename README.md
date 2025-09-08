# 🛸 ALIENTEKA - UFO Digital Encyclopedia

> *The truth is out there. We're here to find it.*

**ALIENTEKA** is the ultimate digital encyclopedia for UFO phenomena, extraterrestrial research, and ufology. A comprehensive platform that combines Wikipedia-style articles with interactive sighting maps, community contributions, and cutting-edge alien-themed design.

## ✨ Features

### 🌌 Core Functionality
- **📚 Comprehensive Encyclopedia**: Thousands of research articles on UFO cases, theories, and scientific studies
- **🗺️ Interactive Sightings Map**: Real-time map with UFO sightings, filtering, and clustering
- **👥 Community Contributions**: User-generated content with moderation system
- **🔍 Advanced Search**: Full-text search with smart filters and categorization
- **📱 Responsive Design**: Mobile-first approach with PWA capabilities

### 🎨 Alien Theme Design
- **Color Palette**: Alienware-inspired green (#00FF00), black (#000000), and neon accents
- **Custom Animations**: UFO loaders, matrix rain effects, glow animations
- **Typography**: Sci-fi fonts (Orbitron, Exo 2) for an authentic feel
- **Interactive Elements**: Neon borders, pulse effects, and hover animations

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom alien theme
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Maps**: React-Leaflet with custom UFO markers
- **Editor**: Tiptap for rich article editing
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for evidence files
- **API**: Next.js API Routes

### Development Tools
- **Deployment**: Vercel + Supabase
- **Code Quality**: ESLint, Prettier, Husky
- **Version Control**: Git with conventional commits

## 🗂️ Project Structure

```
alienteka/
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Navigation
│   │   ├── ui/              # Base UI components (Button, Card, Input)
│   │   ├── alien-theme/     # Themed components (Loaders, Effects)
│   │   ├── maps/            # Map components and markers
│   │   ├── articles/        # Article viewer and editor
│   │   ├── search/          # Search functionality
│   │   └── auth/            # Authentication components
│   ├── app/                 # Next.js app router
│   ├── lib/                 # Utilities and configurations
│   ├── types/               # TypeScript definitions
│   ├── stores/              # Zustand state management
│   └── hooks/               # Custom React hooks
├── prisma/                  # Database schema and migrations
├── public/                  # Static assets
└── docs/                    # Project documentation
```

## 🗃️ Database Schema

### Core Entities
- **Users**: Contributors, researchers, moderators, admins
- **Articles**: Encyclopedia entries with rich content
- **Categories**: Hierarchical organization system
- **Sightings**: UFO sighting reports with geolocation
- **Evidence**: Multimedia files linked to sightings
- **Comments**: Community discussions and feedback

### Data Types
- **Sighting Types**: LIGHTS, CRAFT, HUMANOID, TRIANGLE, DISK, CIGAR, SPHERE
- **User Roles**: READER, CONTRIBUTOR, MODERATOR, ADMIN
- **Article Status**: DRAFT, PENDING, PUBLISHED, REJECTED, ARCHIVED

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/alienteka.git
   cd alienteka
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Database setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
DATABASE_URL=your_database_url
```

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--alien-primary: #00FF00;      /* Green lime */
--alien-secondary: #003300;    /* Dark green */
--alien-accent: #39FF14;       /* Neon green */
--alien-cyan: #00FFFF;         /* Cyan accent */
--alien-dark: #000000;         /* Deep black */
--alien-gray: #1a1a1a;         /* Dark gray */
--alien-light: #90EE90;        /* Light green */
```

### Typography
- **Headers**: Orbitron (sci-fi aesthetic)
- **Body**: Inter (readability)
- **Accents**: Exo 2 (modern tech feel)

### Components
- **Buttons**: Glow effects, neon variants
- **Cards**: Alien-themed borders and shadows
- **Loaders**: UFO spinning animations
- **Effects**: Matrix rain, pulse glow, neon borders

## 📱 Features Roadmap

### Phase 1: Foundation (MVP) ✅
- [x] Project setup and structure
- [x] Alien-themed UI components
- [x] Basic navigation and layout
- [x] Database schema design
- [x] Authentication system setup

### Phase 2: Core Features (In Progress)
- [ ] Article creation and editing system
- [ ] Interactive map with sightings
- [ ] User registration and profiles
- [ ] Basic search functionality
- [ ] Comment system

### Phase 3: Advanced Features
- [ ] Advanced map features (clustering, filters)
- [ ] Moderation dashboard
- [ ] Evidence upload system
- [ ] Advanced search with filters
- [ ] Mobile app (PWA)

### Phase 4: Polish & Scale
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Analytics dashboard
- [ ] API for developers
- [ ] Multi-language support

## 🤝 Contributing

We welcome contributions from fellow truth-seekers! Here's how to get involved:

### For Developers
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### For Researchers
- Submit well-researched articles
- Report UFO sightings with evidence
- Help moderate and verify content
- Contribute to scientific discussions

### Content Guidelines
- Fact-based research only
- Cite reliable sources
- Maintain objective tone
- Include relevant evidence
- Respect privacy of witnesses

## 📊 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema to database
npx prisma studio    # Open Prisma Studio

# Utilities
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
```

## 🔒 Security & Privacy

- **Data Protection**: All user data encrypted
- **Content Moderation**: Multi-level review system
- **Privacy**: Witness anonymity protected
- **Security**: Regular security audits
- **GDPR Compliance**: Full data portability

## 📚 Documentation

- [Setup Guide](./docs/setup.md)
- [Contributing Guidelines](./docs/contributing.md)
- [API Documentation](./docs/api.md)
- [Design System](./docs/design.md)
- [Database Schema](./docs/database.md)

## 🌍 Community

- **Discord**: Join our research community
- **Reddit**: r/ALIENTEKA for discussions
- **Twitter**: @ALIENTEKA for updates
- **YouTube**: Video documentaries and analysis

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- UFO research community worldwide
- Open source contributors
- Witness testimonies and researchers
- Scientific institutions studying UAP phenomena

---

<div align="center">

**🛸 The truth is out there. Help us find it. 🛸**

Made with 💚 by the ALIENTEKA team

[Website](https://alienteka.com) • [Documentation](./docs) • [Community](https://discord.gg/alienteka) • [Report Bug](https://github.com/yourusername/alienteka/issues)

</div>

## Quick: cómo subir este proyecto a GitHub

1. Asegúrate de que `.gitignore` incluye `.env*`, `.next`, `node_modules`.
2. Inicializa git y haz commit:

```powershell
git init
git add .
git commit -m "Initial commit — ALIENTEKA"
git branch -M main
```

3. Crea el repo en GitHub y añade el remoto (o usa `gh repo create`). Por ejemplo:

```powershell
git remote add origin https://github.com/tuUsuario/alienteka.git
git push -u origin main
```

4. Si subiste `.env.local` por error, elimínalo del repo y rota las claves:

```powershell
git rm --cached .env.local
git commit -m "remove .env.local from repo"
git push
```

Si quieres que haga el push desde aquí, dime si quieres que use `gh` (si está instalado) o si me das la URL del repo remoto.
