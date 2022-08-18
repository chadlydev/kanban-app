import theme from 'styled-theming';
import styled from 'styled-components/macro';
import { Root, Content, Portal } from '@radix-ui/react-dialog';
import { BREAKPOINTS } from '../../../constants';
import { closeMenu } from '../../ui';
import { useDispatch } from 'react-redux';

export const backgroundColor = theme('colorMode', {
    light: 'var(--color-white)',
    dark: 'var(--color-gray-100)',
});

export const backgroundColorMobile = theme('colorMode', {
    light: 'var(--color-white)',
    dark: 'var(--color-gray-200)',
});

const StyledContent = styled(Content)`
    position: absolute;
    background-color: ${p =>
        p.variant === 'tasks' ? backgroundColor : backgroundColorMobile};
    top: ${p => (p.variant === 'tasks' ? '40px' : '52px')};
    right: ${p => (p.variant === 'tasks' ? '-12px' : '-8px')};
    width: 192px;
    height: 94px;
    border-radius: var(--radii-lg);
    padding-inline: var(--space-sm);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    justify-content: center;
    cursor: auto;

    &:focus {
        outline: none;
    }

    @media screen and ${BREAKPOINTS.tablet} {
        background-color: ${backgroundColor};
        right: ${p => (p.variant === 'tasks' ? '-89px' : '0')};
    }
`;

export const MenuWrapper = ({ children, id, ...props }) => {
    const dispatch = useDispatch();
    const container = document.getElementById(id);

    return (
        <Root defaultOpen={true}>
            <Portal container={container}>
                <StyledContent
                    onInteractOutside={() => dispatch(closeMenu())}
                    onEscapeKeyDown={() => dispatch(closeMenu())}
                    onOpenAutoFocus={event => event.preventDefault()}
                    {...props}
                >
                    {children}
                </StyledContent>
            </Portal>
        </Root>
    );
};