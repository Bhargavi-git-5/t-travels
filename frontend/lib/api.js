const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Small fetch wrapper so every call handles JSON, errors, and the
// auth token the same way instead of repeating this logic everywhere.
async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  // Auth
  signup: (payload) => request("/auth/signup", { method: "POST", body: payload }),
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  me: (token) => request("/auth/me", { token }),

  // Vehicles
  getVehicles: (query = "") => request(`/vehicles${query}`),
  getVehicle: (id) => request(`/vehicles/${id}`),
  createVehicle: (payload, token) =>
    request("/vehicles", { method: "POST", body: payload, token }),
  updateVehicle: (id, payload, token) =>
    request(`/vehicles/${id}`, { method: "PATCH", body: payload, token }),
  getMyVehicles: (token) => request("/vehicles/driver/mine", { token }),

  // Bookings
  createBooking: (payload, token) =>
    request("/bookings", { method: "POST", body: payload, token }),
  getMyBookings: (token) => request("/bookings/my", { token }),
  getDriverBookings: (token) => request("/bookings/driver", { token }),
  getBooking: (id, token) => request(`/bookings/${id}`, { token }),
  updateBookingStatus: (id, status, token) =>
    request(`/bookings/${id}/status`, { method: "PATCH", body: { status }, token }),

  // Notifications
  getNotifications: (token) => request("/notifications", { token }),
  markNotificationRead: (id, token) =>
    request(`/notifications/${id}/read`, { method: "PATCH", token }),
};
