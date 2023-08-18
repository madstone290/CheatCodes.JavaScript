import { Typography } from '@mui/material';
import './App.css'
import Page1 from 'pages/Page1'
import RootTheme from 'theme/RootTheme';


function App() {
    return (
        <>
            <RootTheme>
                <Page1 />
                <Typography variant='sm'>sm font</Typography>
                <Typography variant='md'>md font</Typography>
            </RootTheme>
        </>
    )
}

export default App;
