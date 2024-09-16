import React, { useState, useEffect } from "react";

interface BubbleMessageProps {
    message: string;
    isUser: boolean;
    profilePicture?: string;
}

const BubbleMessage: React.FC<BubbleMessageProps> = ({
    message,
    isUser,
    profilePicture,
}) => {
    const [displayedMessage, setDisplayedMessage] = useState("");

    useEffect(() => {
        if (!isUser) {
            let index = 0;
            const typingEffectInterval = setInterval(() => {
                if (index <= message.length) {
                    setDisplayedMessage(message.substring(0, index));
                    index++;
                } else {
                    clearInterval(typingEffectInterval);
                }
            }, 30);

            return () => clearInterval(typingEffectInterval);
        } else {
            setDisplayedMessage(message);
        }
    }, [message, isUser]);

    const messageAlignment = isUser ? "justify-end" : "justify-start";

    return (
        <div className={`flex ${messageAlignment} mb-4`}>
            {!isUser && profilePicture && (
                <img
                    src={profilePicture}
                    alt={isUser ? "User" : "AI"}
                    className="w-8 h-8 rounded-full mr-2"
                />
            )}
            <div className={`flex flex-col items-${isUser ? "end" : "start"}`}>
                <div
                    className={`${
                        isUser
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    } max-w-md px-4 py-2 rounded-2xl shadow-md`}
                >
                    {displayedMessage}
                </div>
            </div>
            {isUser && profilePicture && (
                <img
                    src={profilePicture}
                    alt={isUser ? "User" : "AI"}
                    className="w-8 h-8 rounded-full ml-2"
                />
            )}
        </div>
    );
};

export default BubbleMessage;
