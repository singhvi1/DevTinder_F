import { useEffect, useState } from "react";
// import { useLocation, useParams, useSearchParams } from "react-router"
import { useParams } from "react-router"
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
    const { targetUserId } = useParams();
    // const location = useLocation()
    // const user = location.state?.user;
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const firstName = user?.firstName;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {
        if (!userId) return;
        const socket = createSocketConnection();

        socket.emit("joinChat", { userId, targetUserId, firstName });
        console.log(userId + " " + targetUserId)

        socket.on("messageReceived",({firstName, text})=>{
            // console.log(firstName + " : " + text)
            setMessages((messages)=>[...messages, {firstName,text}])
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])


    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", { 
            firstName, 
            userId, 
            targetUserId, 
            text: newMessage 
        })
        setNewMessage("")
        // console.log(firstName, userId, targetUserId, " message" + newMessage);
    }
    return (
        <div className="w-2/4 mx-auto border border-gray-600 m-5 h-[70vh]">

            <div className='flex items-center gap-4 border-b-2 border-gray-400 p-5  justify-center'>
                <img
                    src={user?.photoUrl}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="h-12 w-12 rounded-full object-cover border border-gray-400  my-4"
                />
                <h1 className="font-bold text-2xl">Chat with {user?.firstName}</h1>
            </div>

            <div className="flex-1 overflow-y-scroll p-5 h-2/3 space-y-3">
                {/**here we will show all message */}
                {messages.map((message, index) => {
                    return (

                        <div className="" key={index}>
                            <div className="chat chat-start">
                                <div className="chat-header">
                                    {message?.firstName}
                                    <time className="text-xs opacity-50">2 hours ago</time>
                                </div>
                                <div className="chat-bubble">{message.text}</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex border-t border-gray-600 p-3">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-400 rounded text-white"
                    value={newMessage}
                    onChange={(e) => { setNewMessage(e.target.value) }}
                />
                <button onClick={sendMessage} className="btn btn-primary ml-3">Send</button>
            </div>
        </div>
    )
}

export default Chat
