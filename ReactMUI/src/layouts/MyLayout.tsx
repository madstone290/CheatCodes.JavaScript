import { Container, Link, Stack } from "@mui/material";
import NavBar from "components/navigation/NavBar";
import { Outlet } from "react-router-dom";

export default MyLayout;
function MyLayout() {

    return (
        <>
            <NavBar />
            <Container>
                <Outlet />
            </Container>
        </>
    )
}