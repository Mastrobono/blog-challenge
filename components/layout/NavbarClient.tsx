"use client";

import React from "react";
import Navbar from "./Navbar";
import ActionButton from "../ui/ActionButton";

/**
 * Client wrapper for Navbar
 * Handles the ActionButton click event since event handlers cannot be passed
 * from Server Components to Client Components
 */
export default function NavbarClient() {
  const handleNewPostClick = () => {
    console.log("New post clicked");
    // TODO: Open modal or navigate to new post page
  };

  return (
    <Navbar
      buttonClick={
        <ActionButton variant="dark" onClick={handleNewPostClick}>
          New post
        </ActionButton>
      }
    />
  );
}

