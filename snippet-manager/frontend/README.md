
# 🎨 Snippet Manager Frontend

A modern, responsive, and visually stunning React application featuring a custom glassmorphism design system.

## ✨ Highlights

*   **Glassmorphism UI**: Built from scratch using Vanilla CSS for maximum performance and flexibility.
*   **TypeScript**: Type-safe development for a robust and maintainable codebase.
*   **Vite**: Lightning-fast build tool and development server.
*   **Responsive Design**: Optimized for everything from mobile devices to large desktop monitors.

## 🛠️ Tech Stack

*   **Library**: [React 18](https://reactjs.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: Vanilla CSS (Custom Glassmorphism System)
*   **Icons**: [Lucide React](https://lucide.dev/) (Planned)

## 🚀 Getting Started

### Local Development

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create a `.env` file based on `sample.env`:
    ```env
    VITE_API_URL=http://localhost:8000
    ```

3.  **Start Development Server**:
    ```bash
    npm run dev
    ```

4.  **Build for Production**:
    ```bash
    npm run build
    ```

## 🏗️ Design System

This project uses a custom-built **Glassmorphism Design System** defined in the CSS variables. Key principles include:

*   **Translucency**: `rgba` backgrounds with `backdrop-filter: blur()`.
*   **Vibrant Gradients**: Deep blues, purples, and pinks for a premium feel.
*   **Micro-animations**: Subtle hover transitions and scaling effects.
*   **Typography**: Clean, modern sans-serif fonts for high readability.

## 📁 Project Structure

*   `src/components/`: Reusable UI components (Buttons, Inputs, Cards).
*   `src/pages/`: Main application views (Dashboard, Login, Register).
*   `src/api/`: API client and service definitions.
*   `src/styles/`: Global styles and design system tokens.
*   `src/types/`: Shared TypeScript interfaces and types.

