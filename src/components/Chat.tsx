import React, { useState, useRef, useEffect } from "react";
import BubbleMessage from "./BubbleMessage";
import "../index.css";

interface ChatProps {
    messages: { text: string; isUser: boolean }[];
    onSendMessage: (message: { text: string; isUser: boolean }) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [isAIResponding, setIsAIResponding] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isAIResponding && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAIResponding]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === "") return;
        onSendMessage({ text: inputValue, isUser: true });
        setInputValue("");
        setIsAIResponding(true);
        handleAIResponse(inputValue);
    };

    const handleAIResponse = (userInput: string) => {
        const mockResponse = `AI Response to "${userInput}"`;
        setTimeout(() => {
            onSendMessage({ text: mockResponse, isUser: false });
            setIsAIResponding(false);
        }, 2000);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-800 chat-container">
            <div className="flex-1 overflow-auto p-4">
                {messages.map((message, index) => (
                    <BubbleMessage
                        key={index}
                        message={message.text}
                        isUser={message.isUser}
                        profilePicture={
                            message.isUser ? "/user.jpg" : "/ai.png"
                        }
                    />
                ))}
            </div>
            <div className="flex items-center p-4">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    disabled={isAIResponding}
                    className="flex-1 appearance-none border rounded py-2 px-3 mr-2 focus:outline-none bg-gray-600 text-white"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
                    disabled={isAIResponding}
                >
                    {isAIResponding ? "Wait..." : "Send"}
                </button>
            </div>
        </div>
    );
};

export default Chat;
