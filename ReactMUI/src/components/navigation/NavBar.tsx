import { AppBar, Box, Container } from "@mui/material";
import NavItemList from "./NavItemList";


export default NavBar;
function NavBar() {
    const stickyHeader = true;
    const position = stickyHeader ? 'sticky' : 'static'

    return (
        <AppBar position={position} elevation={0}
            sx={{
                borderWidth: "1px 0px 1px 0px",
                borderStyle: "solid",
                borderColor: "#ccc",
            }}>
            <Box bgcolor={"white"}>
                <Container maxWidth="lg">
                    <NavItemList />
                </Container>
            </Box>
        </AppBar>
    );
}