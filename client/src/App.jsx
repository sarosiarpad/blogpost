import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Form from './components/form';
import Post from './components/Post';
import Grid from '@mui/material/Grid2';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => setPosts(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/posts', { username, title, content })
      .then(response => setPosts([response.data, ...posts]))
      .catch(err => console.log(err));
    
      setUsername('');
      setTitle('');
      setContent('');
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/posts/${id}`)
      .then(() => setPosts(posts.filter(post => post.id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid container spacing={2} sx={{alignItems:"center",}} direction={'column'}>
        <Form 
          handleSubmit={handleSubmit} 
          username={username}
          setUsername={setUsername}
          title={title} 
          setTitle={setTitle}
          content={content} 
          setContent={setContent}/>

        {posts.map((post) => (
          <Post 
            key={post.id} 
            id={post.id} 
            username={post.username} 
            title={post.title} 
            content={post.content} 
            created_at={post.created_at}
            handleDelete={handleDelete} />
        ))}
      </Grid>
    </ThemeProvider>
  );
}

export default App
