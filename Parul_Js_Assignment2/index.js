function FormValidation() {
  //function to validate the details entered
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let mobile = document.getElementById("mobile").value;

  name = name.trim();
  email = email.trim();
  mobile = mobile.trim();
  // validate name
  if (name === "") {
    alert("name is required");
    return false;
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    alert("Name should contain only spaces and letters!");
    return false;
  }
  //validate email
  if (email === "") {
    alert("Email is required");
    return false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Please enter a valid email!");
    return false;
  }
  //validate phone number
  if (mobile !== "" && !/^\d{10}$/.test(mobile)) {
    alert("Mobile number should be a 10-digit number!");
    return false;
  }

  return true;
}

function displayEmployeeData() {
  //function to display data on the table
  const employeeTableBody = document.getElementById("emp-table");
  employeeTableBody.innerHTML = "";

  let employees = [];
  if (localStorage.getItem("employeeData")) {
    employees = JSON.parse(localStorage.getItem("employeeData"));
  }

  employees.map((employee) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.mobile}</td>
      `;
    employeeTableBody.appendChild(row);
  });
}

function saveEmployee() {
  // function to store/save data
  if (!FormValidation()) {
    return;
  }
  console.log("validation done");
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var mobile = document.getElementById("mobile").value;
  let newEmployee = {
    name,
    email,
    mobile,
  };
  let employees = [];
  if (localStorage.getItem("employeeData")) {
    employees = JSON.parse(localStorage.getItem("employeeData"));
  }

  const findEmp = employees.find(
    (item) => JSON.stringify(item) === JSON.stringify(newEmployee)
  );

  if (findEmp) {
    alert("Data entered already exist!");
  } else {
    employees.push(newEmployee);

    localStorage.setItem("employeeData", JSON.stringify(employees));
  }

  displayEmployeeData();
  document.getElementById("name").reset();
  document.getElementById("email").reset();
  document.getElementById("mobile").reset();
}
