import { Card, CardContent, Typography, Divider, Button, Collapse } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';

const Post = ({ id, username, title, content, created_at, handleDelete }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(prev => !prev);
    }

    const formattedDate = new Date(created_at).toLocaleString("hu-HU", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return ( 
        <Grid item xs={12} width={800}>
            <Card variant="outlined">
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item size={{xs:8}}>
                            <Typography variant="h5">{username}: {title}</Typography>
                        </Grid>
                        <Grid item size={{xs:4}} sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Typography variant="caption">{formattedDate}</Typography>
                        </Grid>
                        <Grid item size={{xs:12}}>
                            <Divider />
                        </Grid>
                        <Grid item size={{xs:12}}>
                            <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                                {expanded ? content : content.slice(0, 100)}
                            </Typography>
                            {content.length > 100 && (
                                <Button size="small" variant="outlined" onClick={handleExpand}>
                                    {expanded ? "Show less" : "Show more"}
                                </Button>
                            )}
                        </Grid>
                        <Grid item xs={2}>
                            <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(id)}>Delete</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Post;
