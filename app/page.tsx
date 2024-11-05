"use client";
import { api } from "@/convex/_generated/api";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import {
  useQuery,
  useMutation,
  Authenticated,
  Unauthenticated,
} from "convex/react";
import { useState } from "react";

/*interface Message {
  sender: string;
  content: string;
}*/

export default function Home() {
  /*const [messages, setMessages] = useState<Message[]>([
    { sender: "Alice", content: "Hello, world!" },
    { sender: "Bob", content: "Hi, Alice!" },
  ]);*/
  const messages = useQuery(api.functions.getMessages);
  const createMessage = useMutation(api.functions.createMessage);
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //setMessages([...messages, { sender: "You", content: input }]);
    void createMessage({ sender: "You", content: input });
    setInput("");
  };

  return (
    <>
      <Authenticated>
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
        <SignOutButton />
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal">Sign in</SignInButton>
      </Unauthenticated>
    </>
  );
}
