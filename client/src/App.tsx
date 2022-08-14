import { FunctionComponent, useState } from "react";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
   const [allMessages, setAllMessages] = useState<string[]>([]);

   const [message, setMessage] = useState("");

   socket.on("message", (value: string) => {
      setAllMessages([value, ...allMessages]);
   });
   return (
      <div>
         <ul>
            {allMessages.map(msg => {
               return <li key={crypto.randomUUID()}>{msg}</li>;
            })}
         </ul>
         <input
            type="text"
            placeholder="message"
            onChange={event => setMessage(event.target.value)}
            value={message}
         />
         <button
            type="button"
            onClick={() => {
               if (!message) {
                  return;
               }
               socket.emit("message", message);
               setMessage("");
            }}
         >
            Send
         </button>
      </div>
   );
};

export default App;
