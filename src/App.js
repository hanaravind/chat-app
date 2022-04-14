import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'
import { ChannelContainer, ChannelListContainer, Auth } from './components/index'
import { useState } from 'react';

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const apiKey = 'mwrwfae9x2vk'

const cookies = new Cookies()

const client = StreamChat.getInstance(apiKey)

const authToken = cookies.get('token')

if(authToken) {
  console.log('inside authtoken')
  client.connectUser({
    username: cookies.get('username'),
    id: cookies.get('userId'),
    fullName: cookies.get('fullName'),
    phoneNumber: cookies.get('phoneNumber'),
    avatarUrl: cookies.get('avatarUrl'),
    hashedPassword: cookies.get('hashedPassword')
  }, authToken)
}

function App() {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  if(!authToken) return <Auth />

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="theme light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App;
