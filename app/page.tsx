"use client";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";

export default function Home() {
  const messages = useQuery(api.functions.getMessages);
  const createMessage = useMutation(api.functions.createMessage);
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void createMessage({ sender: "You", content: input });
    setInput("");
  };

  return (
    <>
      <div>
        {messages?.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}</strong>: {message.content}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            id="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}
