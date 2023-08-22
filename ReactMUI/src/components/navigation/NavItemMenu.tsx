import { Box, Popper, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { NavItemInfo } from "./NavData";

interface NavItemMenuProps {
    open: boolean;
    anchorEl: HTMLElement;
    items: NavItemInfo[];
}

export default NavItemMenu;
function NavItemMenu(props: NavItemMenuProps) {
    const { open, anchorEl, items } = props;

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            disablePortal
            sx={{
                zIndex: 9999,
                bgcolor: 'white',
                border: '1px solid #ccc',
            }}
        >
            <Stack direction="column" spacing={0}>
                {items.map((item) => {
                    return (
                        <Box sx={{
                            paddingX: 3,
                            paddingY: 1,
                            '&:hover': {
                                bgcolor: '#eee',
                                color: 'orange'
                            },
                            color: 'black'

                        }} >
                            <Link
                                to={item.href}
                                style={{
                                    color: "inherit",
                                    textDecoration: 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <Typography variant="body1">
                                    {item.title}
                                </Typography>
                            </Link>
                        </Box>);
                })}
            </Stack>
        </Popper>
    )
}

