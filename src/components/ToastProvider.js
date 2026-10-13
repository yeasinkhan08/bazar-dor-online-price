"use client";

import { Toaster } from "react-hot-toast";

// Draws the toast messages. Placed once in the layout.
export default function ToastProvider() {
  return <Toaster position="top-center" toastOptions={{ duration: 3500 }} />;
}
