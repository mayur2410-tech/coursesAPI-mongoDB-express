# Courses API

This repository contains the code for the **Courses API** that allows you to manage courses using `courseCode` or `course_id`. It supports common operations like retrieving, adding, updating, and deleting courses.

## Features
- **GET**: Retrieve all courses or specific course details using `courseCode` or `course_id`.
- **POST**: Add a new course.
- **PUT**: Update the entire course details.
- **PATCH**: Update specific course details.
- **DELETE**: Remove a course from the system.

## API Documentation
You can find the detailed API documentation [here](https://documenter.getpostman.com/view/39216846/2sAYJAfdN4).

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mayur2410-tech/coursesAPI-mongoDB-express
   ```
 2. **Install dependencies: Navigate to the project directory and install the necessary dependencies:**
    ```bash
    cd your-repository-name
    npm install
    ```
3. **Run the server: Start the server locally:**
    ```bash
    npm start
    ```
    The server will run on http://localhost:4000 for courses with courseCode and http://localhost:3500 for courses with course_id.

    

    ## Acknowledgements

    - Thanks to the creators of **MongoDB** and **Express** for making development easier.
    - Inspired by many open-source contributors in the tech community.
