import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);

    // Hàm gửi tin nhắn đến backend và nhận phản hồi
    const sendMessage = async () => {
        if (!message) return;

        setLoading(true); // Bắt đầu quá trình xử lý
        setResponses([...responses, { from: 'user', text: message }]);

        try {
            const res = await axios.post('http://localhost:8080/api/ai-reply', { message });
            const aiReply = res.data.reply;

            // Thêm phản hồi của AI vào danh sách tin nhắn
            setResponses([...responses, { from: 'user', text: message }, { from: 'ai', text: aiReply }]);
        } catch (err) {
            console.error(err);
            setResponses([...responses, { from: 'user', text: message }, { from: 'ai', text: 'Có lỗi xảy ra!' }]);
        }

        setMessage('');
        setLoading(false);
    };

    return (
        <div>
            <h2>Trò chuyện với AI</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '300px', marginBottom: '10px' }}>
                {responses.map((response, index) => (
                    <div key={index} style={{ textAlign: response.from === 'user' ? 'right' : 'left' }}>
                        <p><strong>{response.from === 'user' ? 'Bạn: ' : 'Bot: '}</strong>{response.text}</p>
                    </div>
                ))}
                {loading && <p>Đang phản hồi...</p>}
            </div>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập câu hỏi của bạn..."
                style={{ width: '100%', height: '60px' }}
            />
            <button onClick={sendMessage} disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
                Gửi
            </button>
        </div>
    );
};

export default ChatBot;
