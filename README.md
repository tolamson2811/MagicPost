# About our team

1. Nguyễn Đức Thiện - 21020407
2. Tô Lâm Sơn - 21020788
3. Tạ Khánh Phương - 21020784

Phân chia công việc: 3 thành viên làm việc như nhau

# About the project

This is a project developing a delivery management system called Magic Post. Magic Post is a company operating in the delivery services sector, with transaction points covering the entire country. Each transaction point is responsible for a specific region. In addition to these transaction points, the company also has multiple warehouses where goods are consolidated. Each transaction point collaborates with a corresponding warehouse, and conversely, a warehouse works with multiple transaction points.

Senders, who have items to dispatch, bring their goods to a transaction point (usually the nearest one) for shipment. The items are then transported to the warehouse associated with the sender's transaction point and subsequently forwarded to the warehouse linked to the recipient's transaction point. At the recipient's transaction point, delivery personnel will ensure the items reach the recipient's hands.

# Build with

In this project, the following technologies were utilized:

- Front-end:

  - Vue.js
  - Tailwind CSS

- Back-end:
  - Node.js
  - Express.js
  - MySQL

# Installation Guide

This guide will help you set up the development environment for the Magic Post project. Make sure you have Node.js and MySQL installed before getting started.

## Step 1: Install Node.js

If you haven't installed Node.js, download and install it from the [official Node.js website](https://nodejs.org/).

## Step 2: Install MySQL

Download and install MySQL from the [official MySQL website](https://www.mysql.com/).

## Step 3: Clone the Project

```bash
git clone https://github.com/tolamson2811/MagicPost
cd magic-post
```

## Step 4: Install Dependencies

```bash
* Install dependencies for the back-end
cd app
npm install

* Return to the root directory
cd ..

* Install dependencies for the front-end
cd view
npm install
```

## Step 5: Configure Enviroment

Copy the .env.example file and rename it to .env.
Open the .env file and adjust the configuration settings, especially the MySQL connection configuration.

## Step 6: Run the project

```bash
* Run the back-end
cd app
npm start

* Open a new terminal window
* Run the front-end
cd view
npm run dev
```

Congratulations! You have successfully installed the Magic Post project. For more details on usage and contribution, refer to the "Usage" and "Contribution" sections in the README.
