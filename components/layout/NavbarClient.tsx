"use client";

import React from "react";
import Navbar from "./Navbar";
import ActionButton from "../ui/ActionButton";
import { useModal } from "@/contexts/ModalContext";

/**
 * Client wrapper for Navbar
 * Handles the ActionButton click event since event handlers cannot be passed
 * from Server Components to Client Components
 */
export default function NavbarClient() {
  const { openModal } = useModal();

  const handleNewPostClick = () => {
    openModal();
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

