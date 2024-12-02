"use client";

/**
 * This is a test component
 * @param {{
 *  texto: string 
 * }} props - The text to display
 */
export default function Test({ texto }) {
  return (
    <>
      <h1>{texto}</h1>
    </>
  );
}