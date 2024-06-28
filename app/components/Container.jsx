import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={`${className} mx-auto max-w-[1200px]`}>{children}</div>
  );
}
