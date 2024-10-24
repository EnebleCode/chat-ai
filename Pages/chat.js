import { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!userInput) return;

    setMessages([...messages, { role: 'Usuario', content: userInput }]);

    try {
      const response = await axios.post('http://localhost:8000/api/generate-text', {
        prompt: userInput,
      });
      const aiMessage = response.data.choices[0].message.content;
      setMessages([...messages, { role: 'Usuario', content: userInput }, { role: 'IA', content: aiMessage }]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    } finally {
      setUserInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Chat con IA</h1>
      <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role}:</strong> {message.content}
          </div>
        ))}
      </div>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Escribe tu mensaje aquí..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}
