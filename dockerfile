FROM node:18 AS builder

WORKDIR /coding-challenge

COPY frontend/package*.json backend/package*.json ./

RUN npm install

WORKDIR /coding-challenge

COPY backend ./

COPY frontend ./