// api.js
const API_URL = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api`;


//USER ENDPOINTS
// Register a new user POST /users/register
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }
  return await response.json();
};

// Log in a user POST /users/login
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return await response.json();
};

// Fetch user details GET /users/me
export const fetchUserDetails = async (token) => {
  const response = await fetch(`${API_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Cannot fetch user details");
  }
  return await response.json();
};

// BOOKS ENDPOINTS

// Fetch all books GET /books
export const fetchAllBooks = async () => {
  const response = await fetch(`${API_URL}/books`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error fetching books");
  }
  const data = await response.json();
  return data.books;
};

// Fetch a single book by ID GET /books/:bookId
export const fetchSingleBook = async (id) => {
  const response = await fetch(`${API_URL}/books/${id}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Error fetching book with ID: ${id}`);
  }
  const data = await response.json();
  return data.book;
};


// Update book availability PATCH /books/:bookId
export const updateBookAvailability = async (id, available, token) => {
  const response = await fetch(`${API_URL}/books/${id}`, { 
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ available }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update book availability");
  }
  return await response.json();
};

// RESERVATIONS ENDPOINTS

// GET reservations missing!

// Delete reservation (return book) DELETE /reservations/:reservationId
export const deleteReservation = async (reservationId, token) => {
    const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete reservation");
    }
    return await response.json();
  };