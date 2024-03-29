import { BREAKPOINTS, secondaryButtonBg } from '../../constants';
import styled from 'styled-components/macro';
import NavLinkPrimitive from '../../app/common/navLink';

//=====================
// STYLED COMPONENTS
export const NavLink = styled(NavLinkPrimitive)`
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover,
    &:focus {
        text-decoration: none;
    }

    svg {
        transition: all 0.3s ease-in-out;
    }

    &.nav-link {
        font-size: var(--font-md);
        color: var(--color-gray-600);
        font-weight: var(--font-bold);
        display: flex;
        align-items: center;
        gap: calc(var(--space-xs) * 1.5);
        height: var(--space-xl);
        border-radius: 0 var(--radii-round) var(--radii-round) 0;
        margin-inline-start: -24px;
        padding-inline-start: var(--space-md);

        &:focus {
            outline: none;
            box-shadow: 0 0 0 5px var(--color-purple-shadow);
            border-radius: 0 var(--radii-round) var(--radii-round) 0;
        }

        &:focus:not(:focus-visible) {
            outline: 0;
            box-shadow: none;
        }

        &--active {
            color: white;
            background-color: var(--color-purple-100);
            svg {
                fill: var(--color-white);
            }
        }

        &--inactive {
            &:hover {
                color: var(--color-purple-100);
                background-color: ${secondaryButtonBg};

                svg {
                    fill: var(--color-purple-100);
                }
            }
        }

        @media screen and ${BREAKPOINTS.tablet} {
            margin-inline-start: -32px;
            padding-inline-start: var(--space-lg);
        }
    }
`;
