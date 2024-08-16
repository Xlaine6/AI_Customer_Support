'use client'

import { Box, Button, Stack, TextField } from '@mui/material'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true)

    try {
      // Add user message to the chat
      setMessages(prevMessages => [...prevMessages, { role: 'user', content: message.trim() }])
      setMessage('')

      // Here you would typically make an API call to get the assistant's response
      // For now, we'll just simulate a response after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Add assistant response to the chat
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: "This is a simulated response." }])
    } catch (error) {
      console.error('Error sending message:', error)
      // Optionally, add an error message to the chat
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', padding: 2 }}>
      <Stack spacing={2} sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: 2 }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <Box sx={{ background: msg.role === 'user' ? 'primary.main' : 'grey.200', padding: 1, borderRadius: 1 }}>
              {msg.content}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Stack>
      <Stack direction={'row'} spacing={2}>
        <TextField
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <Button 
          variant="contained" 
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Stack>
    </Box>
  )
}