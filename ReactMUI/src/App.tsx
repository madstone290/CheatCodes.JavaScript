import './App.css'
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
