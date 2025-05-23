# E-Commerce

A complete and fast e-commerce website that includes all the features of a store website, including an admin panel, advanced product filters, a discount system, a shopping cart, an order management dashboard, and more. This website backend developed with drf and frontend with nextjs.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)

## Introduction
In this project, using modern technologies **(nextjs)**, i have tried to improve **SEO** and increase speed by optimizing **queries** and using **Celery** for time-consuming tasks.

## Features
- **SSR**: SSR strategy is used to improve SEO and speed.
- **JWT Authentication**: Authenticate users with JWT to improve security.
- **Rate Limit**: Apply ratelimit to prevent abuse.
- **Multiple processing**: Time-consuming tasks, such as sending emails to users, are processed in the background by celery.

## Architecture
1. **Nginx**\
    It works as the main application and processes requests and sends them to services
2. **Users Service**\
    handling users authentication with JWT standard and users account management.
3. **Porducts Service**\
    handling products management and products inventory.
4. **Orders Service**\
    handling users order.

## Installation
To set up this project, follow these steps:

1. **Clone the repository:**
   ```sh
   https://github.com/YasinKar/E-Commerce.git
   cd E-Commerce
   ```

2. **Edit .env file**\
  Edit .env file necessary configurations

4. **Run with Docker Compose in Production Mode**
   ```sh
   docker-compose -f docker-compose.prod.yml up --build
   ```

