import { Link, useMatch } from 'react-router-dom';
// MUI
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import React, { useState } from 'react';
import { NavItemInfo } from './NavData';
import NavItemMenu from './NavItemMenu';

interface NavItemProps {
    info: NavItemInfo;
}

export function NavItem(props: NavItemProps) {
    const { title, href, basePath, children } = props.info;

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        console.log('handlePopoverOpen', event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    }

    let selected = false;
    if (basePath) {
        const match = useMatch({
            path: basePath,
            end: false,
            caseSensitive: false,
        });
        selected = match ? true : false;
    }

    return (
        <ButtonBase
            sx={{
                flexGrow: 1,
                padding: 2
            }}
            component={Link}
            to={href!}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
        >
            <Stack
                width="100%"
                direction="row"
                p={1}
                borderLeft={0}
                borderColor="border"
                alignItems="center"
                alignContent="center"
                justifyContent="center"
                spacing={0.5}
                title={title}
            >
                <Typography
                    pt={0.2}
                    fontSize={20}
                    color={selected ? 'green' : 'black'}
                    sx={{
                        '&:hover': {
                            color: 'orange',
                        }
                    }}
                >
                    {title}
                </Typography>
            </Stack>
            {children && children.length > 0 &&
                <NavItemMenu open={open}
                    anchorEl={anchorEl!}
                    items={children} />}

        </ButtonBase>
    );
}