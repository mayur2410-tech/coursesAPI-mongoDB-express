const express = require("express");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");

const app = express();
const port = 3500;

// MongoDB connection details
const uri = "mongodb://127.0.0.1:27017";
const dbName = "codinggita";

// Middleware
app.use(express.json());

let db, students;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    db = client.db(dbName);
    students = db.collection("courses");

    // Start server after successful DB connection
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if database connection fails
  }
}

// Initialize Database
initializeDatabase();

// Routes

// GET: List all students
app.get("/courses", async (req, res) => {
  try {
    const allCourses = await students.find().toArray();
    res.status(200).json(allCourses);
  } catch (err) {
    res.status(500).send("Error fetching courses: " + err.message);
  }
});
app.get("/courses/:courseName", async (req, res) => {
  try {
    const courseName = req.params.courseName;
    const allCourses = await students.find({ courseName }).toArray();
    res.status(200).json(allCourses);
  } catch (err) {
    res.status(500).send("Error fetching courses: " + err.message);
  }
});

// POST: Add a new student
app.post("/courses", async (req, res) => {
  try {
    // console.log("Request Object: ",req)
    // console.log("Request Body: ",req.body)
    const newCourses = req.body;
    const result = await students.insertMany(newCourses);
    res.status(201).send(`Course added with ID: ${result.insertedId}`);
  } catch (err) {
    res.status(500).send("Error adding course: " + err.message);
  }
});

// PUT: Update a student completely
app.put("/courses/:courseCode", async (req, res) => {
  try {
    const courseCode = req.params.courseCode;
    // console.log({courseCode});
    const updatedStudent = req.body;
    const result = await students.replaceOne({ courseCode }, updatedStudent);
    res.status(200).send(`${result.modifiedCount} document(s) updated`);
  } catch (err) {
    res.status(500).send("Error updating course: " + err.message);
  }
});

// PATCH: Partially update a student
app.patch("/courses/:courseCode", async (req, res) => {
  try {
    // console.log("Request Params: ",req.params)
    // console.log("Request Body: ",req.body)
    const courseCode = req.params.courseCode;

    const updates = req.body;
    const result = await students.updateOne({ courseCode }, { $set: updates });
    if (result.modifiedCount == 0) {
      res
        .status(404)
        .send("Course not found plz check rollnumber is exisit or not");
    } else {
      res.status(200).send(`${result.modifiedCount} document(s) updated`);
    }
  } catch (err) {
    res.status(500).send("Error partially updating student: " + err.message);
  }
});

// DELETE: Remove a student by rollnumber
app.delete("/courses/:courseCode", async (req, res) => {
  try {
    const courseCode = req.params.courseCode;
    const result = await students.deleteOne({ courseCode });
    res.status(200).send(`${result.deletedCount} document(s) deleted`);
  } catch (err) {
    res.status(500).send("Error deleting student: " + err.message);
  }
});

// courses by id

app.get("/id", async (req, res) => {
  try {
    const allCourses = await students.find().toArray();
    res.status(200).json(allCourses);
  } catch (err) {
    res.status(500).send("Error fetching courses: " + err.message);
  }
});

// find course bt specific id
app.get("/courses/id/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    // console.log({_id})

    const allCourses = await students
      .find({ _id: new ObjectId(_id) })
      .toArray();
    res.status(200).json(allCourses);
  } catch (err) {
    res.status(500).send("Error fetching courses: " + err.message);
  }
});

//
app.put("/courses/id/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    // console.log({_id:new ObjectId(_id )});
    const updatedStudent = req.body;
    const result = await students.replaceOne(
      { _id: new ObjectId(_id) },
      updatedStudent
    );
    res.status(200).send(`${result.modifiedCount} document(s) updated`);
  } catch (err) {
    res.status(500).send("Error updating course: " + err.message);
  }
});

app.patch("/courses/id/:_id", async (req, res) => {
  try {
    // console.log("Request Params: ",req.params)
    // console.log("Request Body: ",req.body)
    const _id = req.params._id;

    const updates = req.body;
    const result = await students.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updates }
    );
    if (result.modifiedCount == 0) {
      res
        .status(404)
        .send("Course not found plz check rollnumber is exisit or not");
    } else {
      res.status(200).send(`${result.modifiedCount} document(s) updated`);
    }
  } catch (err) {
    res.status(500).send("Error partially updating student: " + err.message);
  }
});

app.delete("/courses/delete/id/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const result = await students.deleteOne({ _id: new ObjectId(_id) });
    res.status(200).send(`${result.deletedCount} document(s) deleted`);
  } catch (err) {
    res.status(500).send("Error deleting student: " + err.message);
  }
});
