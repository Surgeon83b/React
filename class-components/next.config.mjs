/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Отключаем оптимизацию изображений для экспорта
  },
  // output: 'export', // Раскомментируйте, если делаете статический экспорт
}

export default nextConfig