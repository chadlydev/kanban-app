import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { useDispatch } from 'react-redux';
import { openDialog } from '../../app/ui';

const NewItemBg = theme('colorMode', {
    light: 'hsl(219 64% 96%)',
    dark: 'hsl(235 15% 16%)',
});

const Wrapper = styled.section`
    width: 280px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: var(--space-sm);
`;

const NewTask = styled.div`
    width: 280px;
    display: flex;
    flex-shrink: 0;
    border-radius: var(--radii-md);
    justify-content: center;
    align-items: center;
    background-color: ${NewItemBg};
    min-height: 89.75px;
    cursor: pointer;

    &:hover {
        h1 {
            color: var(--color-purple-100);
            transition: all 0.3s ease-in-out;
        }
    }

    h1 {
        color: var(--color-gray-600);
        transition: all 0.3s ease-in-out;
    }
`;

export const Column = ({ columnId, children }) => {
    const dispatch = useDispatch();

    return (
        <Wrapper>
            {children}
            <NewTask
                onClick={() =>
                    dispatch(
                        openDialog({
                            dialogType: 'addTask',
                            dialogProps: { columnId },
                        })
                    )
                }
            >
                <h1>+ New Task</h1>
            </NewTask>
        </Wrapper>
    );
};
