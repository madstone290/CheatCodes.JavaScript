import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReadFile from 'pages/ReadFile';
import Columns from 'pages/Columns';
import Formula from 'pages/Formula';
import MergeCell from 'pages/MergeCell';
import Rows from 'pages/Rows';
import MainLayout from 'layouts/MainLayout';
import Home from 'Home';
import ReadCell from 'pages/ReadCell';
import WriteFile from 'pages/WriteFile';

function App() {
    return (
        <>
            <MainLayout>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/ReadCell" element={<ReadCell />} />
                        <Route path="/WriteFile" element={<WriteFile />} />
                        <Route path="/ReadFile" element={<ReadFile />} />
                        <Route path="/Columns" element={<Columns />} />
                        <Route path="/Rows" element={<Rows />} />
                        <Route path="/MergeCell" element={<MergeCell />} />
                        <Route path="/Formula" element={<Formula />} />
                    </Routes>
                </BrowserRouter>
            </MainLayout>

        </>
    )
}

export default App
