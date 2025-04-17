# ใช้ Node.js เวอร์ชัน 23 ที่รองรับ Express และ GraphQL
FROM node:23-slim
# กำหนดโฟลเดอร์ทำงานใน Container
WORKDIR /app
# คัดลอก package.json และ package-lock.json ก่อน
COPY package*.json ./
# ติดตั้ง Dependencies รวมถึง nodemon
RUN npm install
# คัดลอกโค้ดทั้งหมดไปยัง Container
COPY . .
# กำหนดพอร์ตที่ Container จะฟัง (GraphQL ใช้ Port 4000)
EXPOSE 4000
# ใช้ nodemon ในการรันเซิร์ฟเวอร์
CMD ["npm", "start"]
