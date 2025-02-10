import { TextField, Box, Button } from '@mui/material';
import Grid from '@mui/material/Grid2'

const Form = (props) => {
    const handleSubmit = props.handleSubmit;
    const username = props.username;
    const setUsername = props.setUsername;
    const title = props.title;
    const setTitle = props.setTitle;
    const content = props.content
    const setContent = props.setContent;

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} size={12} width={800} mt={2}>
                <Grid item size={4}>
                    <TextField 
                        fullWidth
                        id="username" 
                        label="Username" 
                        variant="outlined" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Grid>
                <Grid item size={6}>
                    <TextField 
                        fullWidth
                        id="title" 
                        label="Title" 
                        variant="outlined" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Grid>
                <Grid item size={2}>
                    <Button size={'large'} variant='outlined' type='submit'>Send</Button>
                </Grid>
                <Grid item size={12}>
                    <TextField
                        fullWidth
                        id="content"
                        label="Content"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Grid>
            </Grid>
        </form>
    );
}
 
export default Form;
