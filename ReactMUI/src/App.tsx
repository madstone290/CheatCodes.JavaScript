import { Typography } from '@mui/material';
import './App.css'
import Page1 from 'pages/Home'
import RootTheme from 'theme/RootTheme';
import { MyRouter } from 'routes/MyRouter';


function App() {
    return (
        <>
            <RootTheme>
                <MyRouter />
            </RootTheme>
        </>
    )
}

export default App;
