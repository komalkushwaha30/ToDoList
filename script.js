// 1. Get the elements
const body = document.querySelector("body");
const taskList = document.querySelector("#task-list");
const add = document.querySelector("#button");
const search = document.querySelector("#search");
const reset = document.querySelector("#reset");

// 2. Apply event listener to the button
add.addEventListener("click", function (event) {
  // Prevent the form from submitting the traditional way
  event.preventDefault();

  const cardWrapper = document.createElement("div");
  cardWrapper.className = "col-9"; // Responsive grid columns

  // 3. Create a new card for each task
  const card = document.createElement("div");
  card.id = "card";
  card.className = "d-flex justify-content-between align-items-center"; // Flexbox for card layout
  card.style.backgroundColor = "white";
  card.style.borderRadius = "10px";
  card.style.padding = "10px";
  card.style.margin = "10px ";
  card.style.boxShadow = "0px 0px 5px rgba(0,0,0,0.2)";
  card.style.minWidth = "80px"; // Optional: to keep cards a uniform height
  card.style.display = "flex"; // Make the card align items in a row
  card.style.alignItems = "center"; // Center the checkbox and label vertically
  card.style.justifyContent = "space-between"; // Get space between the icon and text

  // 4. Create the checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.marginRight = "10px"; // Add some spacing between the checkbox and the label

  // 5. Add a label with the task text from the search input
  const label = document.createElement("label");
  const searchValue = search.value.trim(); // Get and trim the input value

  // Check if the input is empty
  if (searchValue === "") {
    alert("Please enter a task!");
    return;
  }

  label.textContent = searchValue;

  // Create an input field for editing (initially hidden)
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.style.display = "none"; // Hidden by default

  // creating div for storing the checkbox and icon
  const div1 = document.createElement("div");
  // creating div two to store the icon
  const div2 = document.createElement("div");

  // 6. Add the trash icon (Bootstrap trash icon for delete)
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-trash"; // Bootstrap trash icon
  icon.style.cursor = "pointer"; // Make the icon clickable
  icon.style.fontSize = "1.5rem"; // Adjust icon size
  icon.style.marginLeft = "auto"; // Push the icon to the right

  // 7. Add the edit icon (Bootstrap pen icon for editing)
  const icon2 = document.createElement("i");
  icon2.className = "fa-solid fa-pen-to-square";
  icon2.style.cursor = "pointer";
  icon2.style.fontSize = "1.5rem";
  icon2.style.marginLeft = "auto";
  icon2.style.marginRight = "7px";

  // 7. Append the checkbox, label, and edit input to the card
  div1.appendChild(checkbox);
  div1.appendChild(label);
  div1.appendChild(editInput);
  card.appendChild(div1);
  card.appendChild(div2);
  div2.appendChild(icon2);
  div2.appendChild(icon);

  // Append the card to the task list
  cardWrapper.appendChild(card);
  taskList.appendChild(cardWrapper);

  // Clear the search input
  search.value = "";

  console.log("Task added:", searchValue);

  // Hover effect on trash icon
  icon.addEventListener("mouseover", function () {
    icon.style.color = "rgb(211, 125, 125)";
    icon.style.transform = "scale(1.2)";
  });

  // Reset icon color on mouse out
  icon.addEventListener("mouseout", function () {
    icon.style.color = ""; // Reset the color
    icon.style.transform = ""; // Reset the scale
  });

  // Delete the card
  icon.addEventListener("click", function () {
    card.remove();
  });

  // Hover effect on edit icon
  icon2.addEventListener("mouseover", function () {
    icon2.style.color = "blue";
    icon2.style.transform = "scale(1.2)";
  });

  // Reset edit icon color on mouse out
  icon2.addEventListener("mouseout", function () {
    icon2.style.color = ""; // Reset the color
    icon2.style.transform = ""; // Reset the scale
  });

  // Handle checkbox change
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      console.log("Checkbox is checked");
      card.style.backgroundColor = "rgba(181, 236, 181, 0.498)";
      label.style.textDecoration = "line-through";
    } else {
      console.log("Checkbox is unchecked");
      card.style.backgroundColor = "white";
      label.style.textDecoration = "";
    }
  });

  // Handle reset button click (remove all tasks)
  reset.addEventListener("click", function () {
    taskList.innerHTML = ''; // Clears all tasks
  });

  // Edit functionality
  icon2.addEventListener("click", function () {
    // Switch between label and input field for editing
    if (editInput.style.display === "none") {
      // Show input field and hide label
      editInput.value = label.textContent; // Pre-fill with current task
      editInput.style.display = "inline";
      label.style.display = "none";
      editInput.focus(); // Automatically focus the input field

      // When the user presses "Enter", save the edited task
      editInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          // Save the edited task
          const editedValue = editInput.value.trim();
          if (editedValue !== "") {
            label.textContent = editedValue; // Update the label with new task
          }
          // Hide input field and show label again
          editInput.style.display = "none";
          label.style.display = "inline";
        }
      });

      // Handle focus out (blur event) to save the changes
      editInput.addEventListener("blur", function () {
        const editedValue = editInput.value.trim();
        if (editedValue !== "") {
          label.textContent = editedValue;
        }
        editInput.style.display = "none";
        label.style.display = "inline";
      });
    }
  });
});
