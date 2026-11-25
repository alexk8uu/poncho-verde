import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // la página carga el kit de la skill (public/assets) como archivos planos; nada de eso pasa por el bundler
  poweredByHeader: false,
};

export default nextConfig;
