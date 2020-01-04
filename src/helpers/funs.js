import React from "react";
import { toast } from "react-toastify";

export function setSession(email) {
  localStorage.setItem("email", email);
  localStorage.setItem("isLoggedIn", true);
}

export function destroySession() {
  localStorage.removeItem("email");
  localStorage.removeItem("isLoggedIn");
}

export function syncCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function destroyCart() {
  localStorage.removeItem("cart");
}

export function ts(msg = "Success") {
  toast.success(<span>{msg}</span>);
}

export function te(msg = "Something went wrong!") {
  toast.error(<span>{msg}</span>);
}
