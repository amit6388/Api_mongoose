import React from "react";

const APIRequests = () => {
  // GET Request
  const getCourseList = () => {
    fetch(baseurl + "/api/course ", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setProduct(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ----------------------  POST Request  => USING FORM DATA------------------------------------
  // ----------------------  POST Request  => USING FORM DATA------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", img);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("level", level);
    formData.append("lessons", lessons);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("rating", rating);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    // Empty the value of fields
    setImg("");
    setTitle("");
    setDesc("");
    setLevel("");
    setLessons("");
    setDuration("");
    setPrice("");
    setRating();

    // Post Api For Posting Data
    fetch(baseurl + "/api/course", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        alert("Course Added Successfully");
        getCourseList();
        handleOpen();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ----------------------  POST Request  => USING NORMA OBJECT DATA------------------------------------
  const onSubmitClick = () => {
    // Empty the value of fields
    setName("");
    setEmail("");
    setAddress("");
    setContact("");
    setGender("");
    setDob("");
    setQualification("");
    setDegree("");
    setExp("");

    // Post Api For Posting Data
    fetch(baseurl + "/api/instructor", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.status === true && result.code === 200) {
          alert("Instructor Added Successfully");
          handleOpen();
          getInstructorList();
        } else {
          alert(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ----------------------  PUT REQUEST------------------------------------
  fetch(baseurl + "/api/course/" + courseTitle, {
    method: "PUT",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then(() => {
      alert("Course Updated Successfully");
      getCourseList();
      handleOpen();
    })
    .catch((err) => {
      console.log(err);
    });

  // ----------------------  DELETE Request------------------------------------
  function deleteData(id) {
    if (window.confirm("Are you sure You want to delete ?")) {
      fetch(baseurl + "/api/course/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json()) // or res.json()
        .then((res) => {
          alert("Deleted Successfully");
          getCourseList();
        });
    }
  }

  // ----------------------  LOGIN Request------------------------------------
  const onLoginPress = (e) => {
    e.preventDefault();
    const data = { email, password };

    fetch(baseurl + "/api/studentlogin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .then((result) => {
        //console.log(result);
        if (result.status === true && result.code === 200) {
          console.log(result.data);
          window.localStorage.setItem(
            "auth",
            JSON.stringify(result.data.contact)
          );
          updateAuth();
          navigate(
            "/student/dashboard"
            // , {
            //   state: {
            //     _id: result.data._id,
            //     name: result.data.name,
            //     email: result.data.email,
            //     contact: result.data.contact,
            //   },
            // }
          );
        } else {
          alert(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div>APIRequests</div>;
};

export default APIRequests;
