document.addEventListener('DOMContentLoaded', () => {
    fetchData();
  });
  
  function fetchData() {
    fetch('http://localhost:8080/api/tutorials/')
      .then(response => response.json())
      .then(data => {
        const table = document.getElementById('outputTable');
        data.forEach(item => {
          const row = table.insertRow(-1);
          row.insertCell(0).textContent = item.Name;
          row.insertCell(1).textContent = item.Email;
          row.insertCell(2).textContent = item.DeptName;
          row.insertCell(3).textContent = item.Branch;
          row.insertCell(4).textContent = item.DOB;
          // Create a div for buttons
        const buttonDiv = document.createElement('div');

        // Add "Edit" button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editData(item.id)); // Assuming item.id is the unique identifier
        buttonDiv.appendChild(editButton);

        // Add "Delete" button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteData(item.id)); // Assuming item.id is the unique identifier
        buttonDiv.appendChild(deleteButton);

        // Append the div with buttons to the cell
        row.insertCell(5).appendChild(buttonDiv);
      });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
// Function to open the modal
function openModal() {
    document.getElementById('myModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


document.querySelector("#addUser").addEventListener("click", addData)

async function addData(event) {
    // Get input values 
    event.preventDefault();
    let name =
        document.getElementById("nameInput").value;
    let email =
        document.getElementById("emailInput").value;
    let dept =
        document.getElementById("deptInput").value;
    let branch =
        document.getElementById("branchInput").value;
    let DOB =
        document.getElementById("DOB").value;
    // Get the table and insert a new row at the end 
    let table = document.getElementById("outputTable");
    
    
    var form = {
        "Name": name,
        "Email": email,
        "DeptName": dept,
        "Branch": branch,
        "DOB": DOB
    }

    $.ajax({
        url: "http://localhost:8080/api/tutorials/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(form),
        success: function(response) {
            // Handle the success response here
            console.log(response);
        },
        error: function(error) {
            // Handle the error here
            console.error(error);
        }
    });
    


    // Clear input fields 
    clearInputs();
    closeModal();

}

function deleteData(id) {
    // Make an AJAX DELETE request
    $.ajax({
        url: `http://localhost:8080/api/tutorials/${id}`, // Assuming your delete endpoint accepts DELETE requests and includes the ID in the URL
        type: "DELETE",
        success: function(response) {
            // Handle the success response here
            console.log(response);
            
            
        },
        error: function(error) {
            // Handle the error here
            console.error(error);
        }
    });
    // Add your logic for handling the "Delete" button click
    console.log('Delete button clicked for ID:', id);
  }

  function editData(id) { 
  // Get the parent row of the clicked button 
  let row = event.target.closest('tr');

  // Get the cells within the row 
  let nameCell = row.cells[0];
  let emailCell = row.cells[1];
  let deptCell = row.cells[2];
  let branchCell = row.cells[3];
  let DOBCell = row.cells[4];

  // Prompt the user to enter updated values 
  let nameInput = prompt("Enter the updated name:", nameCell.innerHTML);
  let emailInput = prompt("Enter the updated email:", emailCell.innerHTML);
  let deptInput = prompt("Enter the updated dept:", deptCell.innerHTML);
  let branchInput = prompt("Enter the updated branch:", branchCell.innerHTML);
  let DOBInput = prompt("Enter the updated DOB:", DOBCell.innerHTML);

  // Check if the user clicked Cancel in any prompt
  if (nameInput === null || emailInput === null || deptInput === null || branchInput === null || DOBInput === null) {
      return; // Do nothing if the user clicked Cancel
  }

  // Update the cell contents with the new values 
  nameCell.innerHTML = nameInput;
  emailCell.innerHTML = emailInput;
  deptCell.innerHTML = deptInput;
  branchCell.innerHTML = branchInput;
  DOBCell.innerHTML = DOBInput;

  var detail = {
    "Name": nameInput,
    "Email": emailInput,
    "DeptName": deptInput,
    "Branch": branchInput,
    "DOB": DOBInput
}
  
  // Make an AJAX PUT request to update the data on the server
  $.ajax({
    url: `http://localhost:8080/api/tutorials/${id}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(detail),
    success: function(response) {
        // Handle the success response here
        console.log(response);
    },
    error: function(error) {
        // Handle the error here
        console.error(error);
    }
});

  // Add your logic for handling the "Edit" button click
  console.log('Edit button clicked for ID:', id);
}

function clearInputs() {

    // Clear input fields 
    document.getElementById("nameInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("deptInput").value = "";
    document.getElementById("branchInput").value = "";
    document.getElementById("DOB").value = "";
}   