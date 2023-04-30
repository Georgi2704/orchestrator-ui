import React, { FC } from 'react';
import { EuiButton, EuiSideNav, EuiSpacer } from '@elastic/eui';

export interface OrchestratorSidebarProps {
    routeTo: (route: string) => void;
}

export const OrchestratorSidebar: FC<OrchestratorSidebarProps> = ({
    routeTo,
}) => (
    <EuiSideNav
        mobileTitle="Nav Items"
        isOpenOnMobile={false}
        items={[
            {
                renderItem: () => (
                    <>
                        <EuiButton
                            onClick={(
                                e: React.MouseEvent<
                                    HTMLButtonElement | HTMLElement,
                                    MouseEvent
                                >,
                            ) => {
                                e.preventDefault();
                                routeTo('/new-process');
                            }}
                            iconType="plus"
                            fullWidth
                        >
                            New Process
                        </EuiButton>
                        <EuiSpacer size="m" />
                    </>
                ),
                name: 'Menu',
                id: 1,
                items: [
                    {
                        name: 'Start',
                        id: 2,
                        onClick: (e) => {
                            e.preventDefault();
                            routeTo('/');
                        },
                        href: '/',
                    },
                    {
                        name: 'Subscriptions table',
                        id: 3,
                        // TODO: NEXT router / EUI seem to cause unneeded re-renders. At least in dev mode,
                        onClick: (e) => {
                            e.preventDefault();
                            routeTo('/subscriptions-table');
                        },
                        href: '/subscriptions-table',
                    },
                    {
                        name: 'Subscriptions grid',
                        id: 4,
                        // TODO: NEXT router / EUI seem to cause unneeded re-renders. At least in dev mode,
                        onClick: (e) => {
                            e.preventDefault();
                            routeTo('/subscriptions-grid');
                        },
                        href: '/subscriptions-grid',
                    },
                ],
            },
        ]}
    />
);
