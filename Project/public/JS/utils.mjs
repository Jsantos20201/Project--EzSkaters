// Get item from local storage by key
export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  
  // Set item in local storage
  export function setInLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  
  // Remove item from local storage
  export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
  
  // Clear all items from local storage
  export function clearLocalStorage() {
    localStorage.clear();
  }

  // Function to store user registration data
export function registerUser(username, password) {
  // Fetch existing users or initialize an empty array
  const users = JSON.parse(localStorage.getItem("users")) || [];
  
  // Add new user to the array
  users.push({ username, password });
  
  // Update the users data in localStorage
  localStorage.setItem("users", JSON.stringify(users));
}

// Function to check user credentials and login
export function loginUser(username, password) {
  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  
  // Check if the user exists and credentials match
  const loggedInUser = users.find(user => user.username === username && user.password === password);
  
  if (loggedInUser) {
    // Store logged-in user information
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    return true; // Successful login
  } else {
    return false; // Login failed
  }
}

// Function to check if a user is logged in
export function isLoggedIn() {
  return localStorage.getItem("loggedInUser") !== null;
}

// Function to retrieve logged-in user information
export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}

