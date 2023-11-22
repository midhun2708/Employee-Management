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
    // Confirm with the user before deleting
    let confirmed = window.confirm("Are you sure you want to delete this item?");

    if (!confirmed) {
        console.log('Deletion canceled.');
        return; // Do nothing if the user cancels the deletion
    }
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

  function openEditModal() {
    // Show the overlay and edit modal
    document.getElementById('editOverlay').style.display = 'block';
    document.getElementById('editModal').style.display = 'block';
  }

  function closeEditModal() {
    // Hide the overlay and edit modal
    document.getElementById('editOverlay').style.display = 'none';
    document.getElementById('editModal').style.display = 'none';
  }

  function editData(id) { 
    // Fetch data for the specific item using the id
   fetch(`http://localhost:8080/api/tutorials/${id}`)
     .then(response => response.json())
     .then(data => {
       // Populate the edit modal with the fetched data
       document.getElementById('editNameInput').value = data.Name;
       document.getElementById('editEmailInput').value = data.Email;
       document.getElementById('editDeptInput').value = data.DeptName;
       document.getElementById('editBranchInput').value = data.Branch;
       document.getElementById('editDOB').value = data.DOB;
       
       // Add a new click event listener on the "Save Changes" button
       document.getElementById('saveChanges').addEventListener('click', () => updateData(id));
 
       // Open the edit modal
       openEditModal();
     })
     .catch(error => console.error('Error fetching data:', error));
   console.log('Edit button clicked for ID:', id);
   } 
   
   function updateData(id) {
     // Get the updated values from the edit modal
     const updatedData = {
       Name: document.getElementById('editNameInput').value,
       Email: document.getElementById('editEmailInput').value,
       DeptName: document.getElementById('editDeptInput').value,
       Branch: document.getElementById('editBranchInput').value,
       DOB: document.getElementById('editDOB').value
     };
   
     // Make a PUT request to update the data
     fetch(`http://localhost:8080/api/tutorials/${id}`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(updatedData)
     })
       .then(response => response.json())
       .then(data => {
         console.log('Updated data:', data);
 
         // You can optionally close the edit modal here
         closeEditModal();
         // Reload the data to refresh the table
         fetchData();
       })
       .catch(error => console.error('Error updating data:', error));
   }
 function clearInputs() {
 
     // Clear input fields 
     document.getElementById("nameInput").value = "";
     document.getElementById("emailInput").value = "";
     document.getElementById("deptInput").value = "";
     document.getElementById("branchInput").value = "";
     document.getElementById("DOB").value = "";
 }   