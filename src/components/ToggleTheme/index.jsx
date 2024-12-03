import React, { useState } from "react";

const ToggleTheme = () => {
  const themeInStorage = localStorage.getItem("theme");
  const [selectedTheme, setSelectedTheme] = useState(themeInStorage ?? "");

  const handleToggle = () => {
    if (selectedTheme !== "") {
      setSelectedTheme("");
      document.body.classList.remove("dark");
      localStorage.removeItem("theme");
    } else {
      setSelectedTheme("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div
      className="bg-secondary rounded cursor-pointer p-2 text-primary"
      onClick={handleToggle}
    >
      Toggle Theme
    </div>
  );
};

export default ToggleTheme;
