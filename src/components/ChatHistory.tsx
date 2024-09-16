interface ChatHistoryProps {
    chats: { text: string; isUser: boolean }[][];
    onChatSelect: (chatIndex: number) => void;
    onStartNewChat: () => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({
    chats,
    onChatSelect,
    onStartNewChat,
}) => {
    return (
        <div className="flex flex-col h-full bg-gray-700 p-4">
            <h2 className="text-lg font-semibold text-center mb-4">
                Chat History
            </h2>
            <button
                onClick={onStartNewChat}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none mb-4"
            >
                Start New Chat
            </button>
            <ul className="flex-1 overflow-y-auto mb-4">
                {chats.map((_, index) => (
                    <li key={index}>
                        <button
                            onClick={() => onChatSelect(index)}
                            className="w-full text-left py-2 px-4 hover:bg-gray-600 rounded-sm focus:outline-none"
                        >
                            Chat {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatHistory;
