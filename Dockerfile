FROM node:20-alpine

WORKDIR /app

# Salin file package agar caching lebih optimal
COPY package*.json ./

# Install dependency (kalau belum ada akan error, kita handle via docker-compose run nanti)
RUN npm install || true

# Salin semua kode (kalau project sudah ada)
COPY . .

# Expose port dev Nuxt
EXPOSE 3000

# Default command: jalankan dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
