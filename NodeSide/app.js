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
          console.log("inside else");
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
            console.log("real", decryptedData);
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
          exists:"True",
        });
      } else {
        console.log(err.message);
        res.send({
          exists: "False",
        })
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
        console.log(result.rows)
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
    let selectQuery = `select * from student_details`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        console.log(result.rows)
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

// api for students name from student_details table
// app.get("/studentName", (req, res) => {
//   try {
//     let selectQuery = `select * from student_details`;
//     pool.query(selectQuery, (err, result) => {
//       if (!err) {
//         console.log(result.rows)
//         res.send(result.rows);
//       } else {
//         console.log(err.message);
//       }
//     });
//     pool.end;
//   } catch (error) {
//     console.log(error);
//   }
// });

// api for students subjects from Subjects table
app.get("/studentSubjects", (req, res) => {
  try {
    let selectQuery = `select * from subjects`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        console.log(result.rows)
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

// app.post("/getName", (req, res) => {
//   const user = req.body;
//   console.log(req.body);
//   let selectQuery = `select firstname from student_details where id = ${user.id}`;
//   try {
//     pool.query(selectQuery, (err, result) => {
//       if (!err) {
//         console.log(result.rows[0].firstname)
//         res.send(result.rows[0].firstname);
//       } else {
//         console.log(err.message);
//       }
//     });
//     pool.end;
//   } catch (error) {
//     console.log(error);
//   }
// });


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
      }else {
        console.log(err.message);
        res.send({
          exists: "False",
        })
      }
    });
    pool.end;
  } catch (error) {
    console.log(error);
  }
});



app.get("/viewList", (req, res) => {
  try {
    let selectQuery = `select student_details.id, firstname, lastname, 
                        yearofjoin, course_name, dob, address, bloodgroup, total from student_details 
                        inner join total_score on total_score.student_id = student_details.id`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        console.log(result.rows)
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

app.post("/viewUser", (req, res) => {
  try {
    let selectQuery = `select student_details.id, firstname, subject1, marks1, subject2, marks2, subject3, marks3, total from
    student_details inner join total_score on total_score.student_id = student_details.id where student_details.id='${req.body.id}'`;
    pool.query(selectQuery, (err, result) => {
      if (!err) {
        console.log(result.rows);
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

// delete history expense
app.post("/delete", (req, res) => {
  console.log(req.body.id);
  let deleteQuery = `delete from student_details where id='${req.body.id}'`;
  let deleteQuery1 = `delete from total_score where student_id='${req.body.id}'`;
  pool.query(deleteQuery, (err, result) => {
    console.log("Student record deleted successfully");
  });
  pool.query(deleteQuery1, (err1, result1) => {
    console.log("Score record deleted successfully");
  })


});










































app.listen(9000, (req, res) => {
  console.log("Server is running on the port 9000");
});
