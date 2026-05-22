# 🖥️ Liprerie - Next.js Frontend Client

This is the Next.js frontend client for the **Liprerie** platform. It provides a state-of-the-art interactive interface for book sharing and library management.

Collaborators:
* [HoodieYlya13](https://github.com/HoodieYlya13) (Core Frontend & Integrations)
* [Akaby](https://github.com/Akaby) (Client Routing & State)
* [Algebrino](https://github.com/Algebrino) (Design & Multi-language)

---

## 🚀 Key Features

- **Next.js 16 App Router**: Standard high-performance modular routing structure.
- **TailwindCSS 4**: Highly optimized layout styles with modern transitions.
- **WebAuthn Support**: Secure key-based login and biometrics with `@simplewebauthn/browser`.
- **framer-motion**: Premium smooth animations and interactive user transitions.
- **next-intl**: Complete native localization and multi-language support.
- **sonner**: Beautiful glassmorphic adaptive toast notifications.

---

## 🛠️ Configuration & Setup

### Environment Variables
The application connects to the Spring Boot backend using the following variables (configured in `utils/config/`):

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `BACKEND_URL` | `http://localhost:8080` | Backend API Server (Server-side) |
| `NEXT_PUBLIC_BACKEND_URL` | `http://localhost:8080` | Backend API Server (Browser-side) |
| `NEXT_PUBLIC_TESTING_MODE`| `true` | Enables helper mocks and tests |
| `NEXT_PUBLIC_APP_NAME`    | `Liprerie` | Visual app label |

---

## ⚡ Development Workflow

### Local Development
To run the frontend dev server standalone:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the client.

### Production Build
To create an optimized production build of the Next.js app:
```bash
npm run build
npm run start
```

### Linting
To check and fix code format styling errors:
```bash
npm run lint
```

---

## 🐳 Docker Deployment
A production-ready multi-stage `Dockerfile` is included in this directory. To build and test it locally:
```bash
docker build -t poly-livre-frontend .
docker run -p 3000:3000 poly-livre-frontend
```

---

*Part of the Liprerie Fullstack Infrastructure Suite.*
