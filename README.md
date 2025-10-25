# swimmin' parade Official Website

This is the official website for the band "swimmin' parade". It is a static site built with [Astro](https://astro.build/) and [React](https://react.dev/).

## 🚀 Project Structure

The project follows the standard Astro project structure:

```text
/
├── public/
│   ├── images/
│   └── ...
├── src/
│   ├── components/
│   ├── data/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── package.json
└── README.md
```

-   **`public/`**: Static assets like images and fonts.
-   **`src/components/`**: Reusable UI components (Astro and React).
-   **`src/data/`**: Site data, such as member profiles and release information.
-   **`src/layouts/`**: Base layouts for pages.
-   **`src/pages/`**: Site pages.
-   **`src/styles/`**: Global styles and Tailwind CSS configuration.

## 🧞 Development Commands

All commands are run from the root of the project in a terminal:

| Command         | Action                                         |
| :-------------- | :--------------------------------------------- |
| `npm install`   | Installs dependencies                          |
| `npm ci`        | Installs dependencies in CI environments       |
| `npm run dev`   | Starts the local development server at `localhost:4321` |
| `npm run build` | Builds the production site to `./dist/`        |
| `npm run preview` | Previews the built site locally before deploying |
| `npm run astro check` | Runs type checking and validation |

## ✨ Image Optimization

All images in this project are optimized and converted to the WebP format to improve performance. For more details on how to add new images and run the conversion script, please refer to the `AGENTS.md` file.

## 🚀 Deployment

This is a static website. The `npm run build` command will generate a `dist/` directory containing the production-ready files. This directory can be deployed to any static hosting service, such as Vercel, Netlify, or GitHub Pages.