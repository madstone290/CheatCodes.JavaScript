export interface NavItemInfo {
    title: string;
    href: string;
    basePath?: string;
    children?: NavItemInfo[];
}

export const NAV_ITEM_LIST: NavItemInfo[] = [
    {
        title: 'HOME',
        href: '/',
        basePath: '/',
    },
    {
        title: '3RD PARTY',
        href: '/third-party/full-calendar',
        basePath: '/third-party',
        children: [
            {
                title: 'FULL CALENDAR',
                href: '/third-party/full-calendar',
            }
        ]
    },
]
