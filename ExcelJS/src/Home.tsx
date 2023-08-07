import { Stack } from "@mui/material"

const Home = () => {
    return (
        <Stack>
            <a href="/ReadCell">Read Cell</a>
            <a href="/WriteToFile">Write file</a>
            <a href="/ReadFile">Read file</a>
            <a href="/Columns">Columns</a>
            <a href="/Rows">Rows</a>
            <a href="/MergeCell">MergeCell</a>
            <a href="/Formula">Formula</a>
        </Stack>
    );
}
export default Home;