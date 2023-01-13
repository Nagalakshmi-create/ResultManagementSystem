const express = require("express");
var cors = require("cors");
const crypto = require("crypto");
var key = "abcdefghijklmnopqrstuvwx";
var encrypt = crypto.createCipheriv("des-ede3", key, "");
const bodyParser = require("body-parser");
var { Client } = require("pg");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const pool = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "admin",
  database: "StudentDatabase",
});
pool.connect();

// Sending user details to the signup table
app.post("/signup", (req, res) => {
  const user = req.body;
  const password = user.password;
  var encrypt = crypto.createCipheriv("des-ede3", key, "");
  var theCipher = encrypt.update(password, "utf8", "base64");
  theCipher += encrypt.final("base64");
  console.log(theCipher);
  let selectQuery = `select count(email) from signup where email='${user.email}'`;
  try {
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        if (result.rows[0].count == 0) {
          let insertQuery = `insert into signup(name, email, password)
                              values('${user.name}', '${user.email}', '${theCipher}') `;
          pool.query(insertQuery, (err, result1) => {
            if (!err) {
              res.send("Insertion was successful");
            } else {
              console.log(err.message);
            }
          });
        } else {
          res.send({
            exists: "True",
          });
        }
      } else {
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

//validating the user email and password
app.post("/login", (req, res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  try {
    let searchQuery = `Select count(email) from signup where email = '${email}'`;
    pool.query(searchQuery, (err, result) => {
      if (!err) {
        if (result.rows[0].count == 1) {
          let passQuery = `Select id,password, role from signup where email = '${email}'`;
          pool.query(passQuery, (err, result1) => {
            let passdb = result1.rows[0].password;
            var decrypt = crypto.createDecipheriv("des-ede3", key, "");
            var s = decrypt.update(passdb, "base64", "utf8");
            var decryptedData = s + decrypt.final("utf8");
            // console.log("real", decryptedData);
            if (decryptedData == password) {
              res.send({
                sucess: "True",
                password: result1.rows[0].password,
                role: result1.rows[0].role,
              });
            } else {
              res.send({
                sucess: "False",
              });
            }
          });
        }else{
          res.send({
            mail: "False",
          });
        }
      } else {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//sending student details to the student_details table
app.post("/addstudent", (req, res) => {
  const user = req.body;
  console.log(req.body);
  let insertQuery = `insert into student_details(firstname, lastname, yearOfjoin, DOB, course_name, Address, BloodGroup)
                       values('${user.fname}', '${user.lname}', '${user.YOJ}', '${user.DOB}', '${user.course}', '${user.Address}', '${user.BloodGroup}')`;
  try {
    pool.query(insertQuery, (err, result) => {
      if (!err) {
        console.log("Insertion was successful");
        res.send({
          exists: "True",
        });
      } else {
        console.log(err.message);
        res.send({
          exists: "False",
        });
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

//api for coursesNames from courses table
app.get("/courses", (req, res) => {
  try {
    let selectQuery = `select * from courses`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        // console.log(result.rows);
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

// api for student-id from student_details table
app.get("/studentId", (req, res) => {
  try {
    let selectQuery = `select * from student_details where deleted_student='False'`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        // console.log(result.rows);
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

// api for students subjects from Subjects table
app.get("/studentSubjects", (req, res) => {
  try {
    let selectQuery = `select * from subjects`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        // console.log(result.rows);
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

//api to store the student score details in database
app.post("/addScore", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into total_score (student_id, subject1, marks1, subject2, marks2, subject3, marks3, total)
                      values('${user.studentId}', '${user.studentSubject1}', '${user.s1}', '${user.studentSubject2}', '${user.s2}', '${user.studentSubject3}', '${user.s3}', '${user.totalMarks}')`;
  try {
    pool.query(insertQuery, (err, result) => {
      if (!err) {
        console.log("Insertion success!!!");
        res.send({
          exists: "True",
        });
      } else {
        console.log(err.message);
        res.send({
          exists: "False",
        });
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

//api to view the all the student details and total score
app.get("/viewList", (req, res) => {
  try {
    let selectQuery = `select student_details.id, firstname, lastname, 
    yearofjoin, course_name, dob, address, bloodgroup, total from student_details 
    inner join total_score on total_score.student_id = student_details.id  
    where student_details.deleted_student='False'
    order by firstname, lastname, yearofjoin, total `;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        // console.log(result.rows);
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

//api in user side to view the particular student marks
app.post("/viewUser", (req, res) => {
  try {
    let selectQuery = `select student_details.id, firstname, subject1, marks1, subject2, marks2, subject3, marks3, total from
    student_details inner join total_score on total_score.student_id = student_details.id where student_details.id='${req.body.id}'`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        // console.log(result.rows);
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

// api on admin side to delete the student details and score
app.post("/delete", (req, res) => {
  // console.log(req.body.id);
  let deleteQuery = `UPDATE student_details SET deleted_student = 'True' where id='${req.body.id}'`;
  let deleteQuery1 = `UPDATE total_score SET deleted_total = 'True' where student_id='${req.body.id}'`
  // let deleteQuery1 = `delete from total_score where student_id='${req.body.id}'`;
  pool.query(deleteQuery, (err, result) => {
    console.log("Student record deleted successfully");
  });
  pool.query(deleteQuery1, (err1, result1) => {
    console.log("Score record deleted successfully");
  });
});

// API to search books by its name or author name.

app.post("/search", (req, res) => {
  var expression = req.body.text;
  if (expression != "") {
    expression = "%" + expression.toUpperCase() + "%";
    // console.log(expression)
    let searchBooks = `select student_details.id, firstname, lastname, 
    yearOfjoin, course_name, dob, address, bloodgroup, total from student_details 
    inner join total_score on total_score.student_id = student_details.id 
    where course_name like '${expression}' or yearOfjoin like '${expression}'`;

    pool.query(searchBooks, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err);
      }
    });
  } else {
    let searchBooks1 = `select student_details.id, firstname, lastname, 
    yearofjoin, course_name, dob, address, bloodgroup, total from student_details 
    inner join total_score on total_score.student_id = student_details.id`;

    pool.query(searchBooks1, (err, result1) => {
      if (!err) {
        res.send(result1.rows);
      } else {
        console.log(err);
      }
    });
  }
});


//To view EEE toppers
app.get("/toplistEEE", (req, res) => {
  try {
    let selectQuery = `select student_details.id, firstname, lastname, 
                        course_name, total from student_details 
                        inner join total_score on total_score.student_id = student_details.id 
                        where course_name='EEE' order by total DESC limit 3`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});

//To view CSE toppers
app.get("/toplistCSE", (req, res) => {
  try {
    let selectQuery = `select student_details.id, firstname, lastname, 
    course_name, total from student_details 
    inner join total_score on total_score.student_id = student_details.id 
    where course_name='CSE' order by total DESC limit 3`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});


//To view IT toppers
app.get("/toplistIT", (req, res) => {
  try {
    let selectQuery = `select student_details.id, firstname, lastname, 
    course_name, total from student_details 
    inner join total_score on total_score.student_id = student_details.id 
    where course_name='IT' order by total DESC limit 3`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});


app.listen(9000, (req, res) => {
  console.log("Server is running on the port 9000");
});
