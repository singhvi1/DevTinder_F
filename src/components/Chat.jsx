
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router"
import { createSocketConnection } from "../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addConnection } from "../utils/store/connectionSlice";

const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector((store) => store.user);
    const userId = user?._id;
    const firstName = user?.firstName;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const targetUser = useSelector((store) => store.connection);
    const dispatch = useDispatch();
    const bottomRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!userId) return;
        const socket = createSocketConnection();
        socketRef.current = socket;

        socket.emit("joinChat", { userId, targetUserId, firstName });
        // console.log(userId + " " + targetUserId)

        socket.on("messageReceived", ({ firstName, text }) => {
            // console.log(firstName + " : " + text)
            setMessages((messages) => [...messages, { firstName, text, isTime: new Date().toLocaleString() }])
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId])

    const sendMessage = () => {
        if (!socketRef.current || !newMessage.trim()) {
            setNewMessage("")
            return;
        }
        socketRef.current.emit("sendMessage", {
            firstName,
            userId,
            targetUserId,
            text: newMessage
        })
        setNewMessage("")
        // console.log(firstName, userId, targetUserId, " message" + newMessage);
    }

    const fetchChatMessages = async () => {
        const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, { withCredentials: true, })
        // console.log(chat.data)
        const chatMessages = (chat?.data?.messages || []).map((msg) => {
            const { senderId, text, updatedAt } = msg
            const isTime = new Date(updatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
            // console.log(isTime)


            return {
                firstName: senderId.firstName,
                text,
                isTime,
            }
        })
        setMessages(chatMessages)
    }
    useEffect(() => {
        if (targetUserId) {
            fetchChatMessages()
        }
    }, [targetUserId])

    const findTargetUser = async () => {
        try {
            if (!targetUser && targetUserId) {
                const res = await axios.get(`${BASE_URL}/chat/connection/${targetUserId}`, { withCredentials: true })
                dispatch(addConnection(res.data.data))
                // console.log("target user lost")
                // console.log(res.data.data)

            }
        } catch (err) {
            alert(err.message)
            console.error(err);
        }
    }
    useEffect(() => {
        findTargetUser()
    }, [targetUserId])

    //bottom message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="sm:w-1/2 w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col overflow-hidden">

            <div className='flex items-center sm:gap-4 gap-2 border-b-2 border-gray-400 p-5  justify-center'>
                <img
                    src={targetUser?.photoUrl}
                    alt={`${targetUser?.firstName} ${targetUser?.lastName}`}
                    className="sm:h-14 sm:w-14 h-8 w-8 rounded-full object-cover border border-gray-400  my-4"
                />
                <h1 className="font-bold text-xs  sm:text-2xl lg:text-4xl">Chat with {" "}
                    {targetUser?.firstName}</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-5  space-y-3">
                {/**here we will show all message */}
                {messages.map((message, index) => {
                    return (

                        <div className="" key={index}>
                            <div className={"chat " + (message?.firstName === firstName ? "chat-end" : "chat-start")}>
                                <div className="chat-header">
                                    {message?.firstName}
                                    <time className="text-xs opacity-50">{message.isTime}</time>
                                </div>
                                <div className="chat-bubble">{message.text}</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                        </div>
                    )
                })}
                <div ref={bottomRef} />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 border-t border-gray-600 p-2 sm:p-3">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 w-full h-12 px-2 sm:p-3 border border-gray-400 rounded-lg text-white"
                    value={newMessage}
                    onChange={(e) => { setNewMessage(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage()
                        }
                    }}
                />
                <button onClick={sendMessage} className="btn btn-primary  w-full sm:w-auto  h-6 sm:h-12 px-4">Send</button>
            </div>
        </div>
    )
}

export default Chat
