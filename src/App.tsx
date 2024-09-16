import React, { useState } from "react";
import Chat from "./components/Chat";
import ChatHistory from "./components/ChatHistory";

const App: React.FC = () => {
    const [chats, setChats] = useState<{ text: string; isUser: boolean }[][]>(
        []
    );
    const [currentChatIndex, setCurrentChatIndex] = useState<number | null>(
        null
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleChatSelect = (chatIndex: number) => {
        setCurrentChatIndex(chatIndex);
        setIsSidebarOpen(false); // Close sidebar on chat selection
    };

    const handleStartNewChat = () => {
        if (currentChatIndex !== null) {
            // Save the current chat to the history
            setChats((prevChats) => {
                const newChats = [...prevChats];
                newChats[currentChatIndex] = chats[currentChatIndex];
                return newChats;
            });
        }
        setChats((prevChats) => [...prevChats, []]);
        setCurrentChatIndex(chats.length);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-800">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white overflow-y-auto transition-transform duration-300 ease-in-out transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:relative md:block md:w-auto md:flex-shrink-0`}
            >
                <ChatHistory
                    chats={chats}
                    onChatSelect={handleChatSelect}
                    onStartNewChat={handleStartNewChat}
                />
            </div>
            {/* Main content area */}
            <div className="flex-1 overflow-hidden">
                {/* Mobile toggle button */}
                <button
                    className="md:hidden fixed z-10 left-4 p-2 text-white bg-blue-500 rounded"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                    onClick={toggleSidebar}
                >
                    <div
                        style={{
                            width: "0",
                            height: "0",
                            borderTop: "10px solid transparent",
                            borderBottom: "10px solid transparent",
                            borderLeft: isSidebarOpen
                                ? "10px solid white"
                                : "none",
                            borderRight: isSidebarOpen
                                ? "none"
                                : "10px solid white",
                        }}
                    ></div>
                </button>
                {/* Overlay for mobile */}
                <div onClick={toggleSidebar}></div>
                {currentChatIndex !== null && (
                    <Chat
                        messages={chats[currentChatIndex]}
                        onSendMessage={(message) => {
                            // Update the current chat with the new message
                            setChats((prevChats) => {
                                const newChats = [...prevChats];
                                newChats[currentChatIndex] = [
                                    ...newChats[currentChatIndex],
                                    message,
                                ];
                                return newChats;
                            });
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
