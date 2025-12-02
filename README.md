# StrangeLog

A crowdsourced platform for documenting, exploring, and validating paranormal and UAP (Unidentified Anomalous Phenomena) encounters across the globe.

URL: [https://www.strangelog.vercel.app/](https://www.www.strangelog.vercel.app/)

## Overview

StrangeLog is an interactive mapping platform that enables users to report and explore unexplained phenomena—from UFO/UAP sightings to entity encounters, abductions, and other paranormal events. Each encounter is geolocated, categorized, and enriched with media evidence, creating a comprehensive database of strange occurrences worldwide.

## Tech Stack

### Frontend

- **Next.js 15.5** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### Mapping & Visualization

- **Leaflet** - Interactive maps
- **React-Leaflet** - React bindings for Leaflet
- **Supercluster** - Fast marker clustering algorithm

### Backend & Database

- **Prisma** - Type-safe ORM
- **PostgreSQL** - Relational database (via Neon)
- **NextAuth** - Authentication solution

### State Management & Utils

- **Zustand** - Lightweight state management
- **date-fns** - Date formatting utilities
- **Cloudinary** - Media hosting and optimization

## Project Structure

```
strangelog/
├── app/
│   ├── api/              # API routes (encounters, auth)
│   ├── auth/             # Authentication pages
│   ├── create/           # Encounter creation page
│   ├── encounters/       # Encounter listing & detail pages
│   ├── hooks/            # Custom React hooks (useSupercluster)
│   ├── lib/              # Utilities, actions, data fetching
│   ├── types/            # TypeScript type definitions
│   └── ui/               # UI components
│       ├── dashboard/    # Main dashboard
│       ├── encounters/   # Encounter cards & lists
│       ├── map/          # Map components & markers
│       └── navbar/       # Navigation
├── components/ui/        # Reusable shadcn components
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.ts           # Database seeding
│   └── migrations/       # Database migrations
├── public/               # Static assets
└── stores/               # Zustand stores
```

### Key Features

- **Interactive Map**: Explore encounters on a Leaflet-powered map with intelligent clustering
- **Geolocation**: Pin encounters to precise locations with coordinate-based filtering
- **Media Upload**: Attach photos and videos via Cloudinary integration
- **26 Encounter Categories**: From UAP sightings to close encounters and paranormal activity
- **User Authentication**: Secure sign-in with NextAuth
- **Community Features**: Comments, reactions, and confidence voting
- **Advanced Filtering**: Filter by category, map bounds, and evidence types
- **Responsive Design**: Optimized for desktop, tablet, and mobile

## Key Features Explained

### Interactive Map with Clustering

The map uses Supercluster to efficiently render thousands of encounters. Markers cluster automatically based on zoom level, and clicking a cluster expands to show individual encounters.

### Dynamic Filtering

- **By Map Bounds**: Only encounters within the current viewport are fetched
- **By Category**: Filter encounters using the side menu
- **Real-time Updates**: Data refreshes as you pan/zoom the map

### Encounter Creation

Users can create detailed encounter reports with:

- Interactive map for precise location selection
- Multiple category selection
- Photo/video uploads (up to 10 images)
- Evidence tags (Radar, Multi-sensor, Physical trace, etc.)
- Rich text descriptions

### Community Validation

- **Confidence Voting**: Users rate encounter credibility
- **Comments**: Discuss encounters with the community
- **Reactions**: Express support or skepticism

## Database Schema

Key models:

- **User**: Authentication and profile data
- **Encounter**: Core encounter data (location, category, media)
- **Comment**: User comments on encounters
- **Reaction**: Like/dislike functionality
- **Confidence**: Community credibility ratings
- **SavedEncounter**: User bookmarks

## Encounter Categories

### UAP/UFO Sightings

- Luminous Orbs, Discs, Triangles, Cylinders, Spheres
- Trans-medium Craft (Air/Water)
- Formations & Swarms

### Close Encounters (CE Classification)

- **CE-1**: Visual sighting within 500 feet
- **CE-2**: Physical effects on environment
- **CE-3**: Visible entities
- **CE-4**: Abduction experiences
- **CE-5**: Initiated human contact
- **CE-6**: Injury or death
- **CE-7**: Long-term contact/hybrid creation

### Paranormal Phenomena

- Entity Encounters
- Poltergeist Activity
- Portal/Dimensional Events
- Missing Time
- Psychic Effects
- Cattle Mutilation
- Men in Black
- EM Interference
- Radiation Effects
- Weather Disturbances

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or use [Neon](https://neon.tech))
- Cloudinary account for media hosting
- npm/yarn/pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/benjamingarciap/strangelog.git
   cd strangelog
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host:5432/strangelog"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # Cloudinary (for image uploads)
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed  # Optional: populate with sample data
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (database GUI)
```

### Database Commands

```bash
npx prisma generate           # Generate Prisma Client
npx prisma migrate dev        # Create and apply migrations
npx prisma migrate reset      # Reset database
npx prisma db seed            # Seed database with sample data
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Map tiles by [Stadia Maps](https://stadiamaps.com/)
- Icons by [Lucide](https://lucide.dev/)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)

## Contact

Benjamin Garcia - [@benjamingarciap](https://github.com/benjamingarciap)

Project Link: [https://github.com/benjamingarciap/strangelog](https://github.com/benjamingarciap/strangelog)

---

**Note**: This platform is for documentation and discussion purposes. All encounters are user-submitted and should be evaluated critically.
