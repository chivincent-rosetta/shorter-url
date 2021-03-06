import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles, createStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import copy from 'clipboard-copy';
import '../css/App.css';

const useStyles = makeStyles(() => 
    createStyles({
        shortenInput: {
            width: '75%',
            height: '56px',
        },
        shortenButton: {
            width: '25%',
            height: '56px',
        }
    })
)

function Shorten() {
    const classes = useStyles();

    const [isShorted, setIsShorted] = useState(false);
    const [url, setUrl] = useState('');

    function handleShorternInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setIsShorted(false);
        setUrl(event.target.value);
    }
        
    async function handleShortenClick() {
        try {
            const response = await axios.post('/api/', {url});

            setUrl(response.data.data.shorted_url);
            setIsShorted(true);
        } catch (error) {
            const notificationMessage = error.response
                ? error.response.data?.message ?? '未預期的服務錯誤，請稍候再試'
                : error.message ?? '未預期的系統錯誤，請檢查網路連線並稍候再試';

            alert(notificationMessage);
        }
    }

    function handleCopyClick() {
        copy(url);
    }

    async function handleEnterPressed(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.nativeEvent.keyCode === 13 && !isShorted) { // Enter pressed
            await handleShortenClick();
        }
    }

    return (
        <Box className="m-b-md">
            <TextField 
                className={classes.shortenInput}
                variant="outlined"
                placeholder="Shorten your link"
                onChange={handleShorternInputChange}
                onKeyPress={handleEnterPressed}
                value={url}
            />
            <Button 
                className={classes.shortenButton}
                variant="contained"
                color="primary"
                onClick={isShorted ? handleCopyClick : handleShortenClick}
            >{ isShorted ? 'Copy!' : 'Shorten'}</Button>
        </Box>
    );
}

export default function App() {
    return (
        <React.Fragment>
            <CssBaseline />
            <div className="flex-center position-ref full-height">
                <div className="content">
                    <h1 className="title">Shorter URL</h1>
                    <Shorten />
                </div>
            </div>
        </React.Fragment>
    );
}