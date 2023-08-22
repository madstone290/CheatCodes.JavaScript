import { Stack } from '@mui/material';
import { NavItem } from './NavItem';
import { NAV_ITEM_LIST } from './NavData';


export default NavItemList;
function NavItemList() {
    const navMenuItems = NAV_ITEM_LIST.map((item) => {
        return <NavItem info={item} />;
    });
    return (
        <Stack width="100%" direction="row" component="nav" borderColor="border" flexWrap="wrap">
            {navMenuItems}
        </Stack>
    );
}
