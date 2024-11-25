"use client"

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
// import { useTitle } from "@/hooks/useTitle";

const WallTitle = () => {
  const [title, setTitle]  = useState("TEST WALL NAME");
  const [tempTitle, setTempTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isFaded, setIsFaded] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tempTitle.trim() === "") {
        setTempTitle(title);
      } else {
        setTitle(tempTitle.trim());
      }
      setIsEditing(false);
      setIsHovered(false); // Reset hover state
    } else if (e.key === "Escape") {
      setTempTitle(title);
      setIsEditing(false);
      setIsHovered(false); // Reset hover state
    }
  };

  const handleBlur = () => {
    if (tempTitle.trim() === "") {
      setTempTitle(title);
    } else {
      setTitle(tempTitle.trim());
    }
    setIsEditing(false);
    setIsHovered(false); // Reset hover state
    setShowTooltip(false); // Hide tooltip on blur
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 120) {
      setTempTitle(newValue);
      if (newValue.length >= 110) {
        setShowTooltip(true);
        setTooltipMessage(`Character limit: ${newValue.length}/120`);
      } else {
        setShowTooltip(false);
      }
    }
  };

  const handleFocus = () => {
    if (tempTitle.length >= 110) {
      setShowTooltip(true); // Show tooltip on focus if character count is 110 or more
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFaded(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Set document title dynamically *** 
  useEffect(() => {
    document.title = `${title} - TidyRecall`;
  }, [title]);

  return (
    <div className={`flex relative px-3 transition-opacity duration-300 ${isFaded ? 'opacity-0' : 'opacity-100'}`}>
      {isEditing ? (
        <div className="relative w-full">
          <Input
            type="text"
            value={tempTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            autoFocus
            className="dark:text-zinc-300 w-full flex-grow min-h-[45px] py-1 px-[2px] !text-[26px] !leading-[35px] font-bold focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-zinc-700 overflow-hidden text-ellipsis whitespace-nowrap"
          />
          {showTooltip && (
            <div className="absolute top-full right-0 m-1 mr-0 z-[1001] overflow-hidden rounded-md border bg-white dark:bg-zinc-700 px-1.5 pb-0.5 pt-[0.1rem] text-[15px] text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
              {tooltipMessage}
            </div>
          )}
        </div>
      ) : (
        <h1
          className={`text-zinc-600 w-full flex-grow min-h-[45px] py-1 px-[2px] border rounded-md text-[26px] leading-[35px] font-bold cursor-default overflow-hidden ${
            isHovered ? "border-zinc-300 dark:border-zinc-900" : "border-zinc-50 dark:border-zinc-950"
          }`}
          style={{ whiteSpace: "normal", wordBreak: "break-word" }}
        >
          <span
            onClick={() => {
              setTempTitle(title);
              setIsEditing(true);
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="pointer-events-auto cursor-text"
          >
            {title}
          </span>
        </h1>
      )}
    </div>
  );
};

export default WallTitle;