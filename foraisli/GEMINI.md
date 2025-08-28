# GEMINI.md

## Project Overview

This is a modern web application for managing corporate benefits. It provides a personalized experience for employees and a powerful set of tools for HR managers. The application is built with React, TypeScript, and Vite, and it uses Tailwind CSS for styling.

The project has a role-based access control system with two roles: "employee" and "hr". Each role has a dedicated interface with specific features.

**Key Technologies:**

*   **Frontend:** React 18, TypeScript, Vite
*   **Styling:** Tailwind CSS, shadcn/ui
*   **Routing:** React Router
*   **State Management:** React Context
*   **Linting:** ESLint

## Building and Running

### Development

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:8084`.

### Production

To build the application for production, run:

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

To preview the production build locally, run:

```bash
npm run preview
```

### Linting

To check the code for any linting errors, run:

```bash
npm run lint
```

## Development Conventions

*   The project uses TypeScript for static typing.
*   The code is formatted according to the rules defined in the `.eslintrc.js` file.
*   The project uses `shadcn/ui` for UI components, which are located in the `src/components/ui` directory.
*   Custom components are located in the `src/components` directory.
*   Pages are located in the `src/pages` directory.
*   The application uses React Context for state management. The `AuthContext` in `src/contexts/AuthContext.tsx` is used for managing user authentication and authorization.
*   The project uses path aliases. The `@` alias points to the `src` directory.
