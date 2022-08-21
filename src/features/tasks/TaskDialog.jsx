import { DialogWrapper } from '../../app/common/dialog';
import { Label } from '../../app/common/form';
import styled from 'styled-components/macro';
import { OpenMenuButton } from '../../app/common/menu';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { openMenu } from '../../app/ui';
import { secondaryBg, textColor } from '../../constants';
import {
    columnsSelectors,
    subtasksSelectors,
    toggleSubtask,
    updateTaskColumn,
} from '../boards/boardsSlice';
import { ReactComponent as Down } from '../../assets/icon-arrow-down.svg';

const StyledCheckbox = styled.input`
    &[type='checkbox'] {
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: var(--radii-xs);
        flex-shrink: 0;
        background-color: ${p =>
            p.checked ? 'var(--color-purple-100)' : secondaryBg};
        border: ${p =>
            !p.checked
                ? `1px var(--color-gray-400) solid`
                : `1px solid transparent`};

        &:focus {
            outline: none;
            box-shadow: 0 0 0 2px var(--color-purple-shadow);
        }

        &:focus:not(:focus-visible) {
            box-shadow: none;
        }
    }
`;

const StyledSelect = styled.select`
    border: 1px solid
        ${p =>
            p.error ? 'var(--color-destructive-100)' : 'var(--color-gray-400)'};
    color: ${textColor};
    background: none;
    font-weight: var(--font-medium);
    border-radius: var(--radii-sm);
    font-size: var(--font-sm);
    height: 40px;
    width: 100%;
    padding-inline: var(--space-sm);
    line-height: var(--line-height-md);
    appearance: none;
    overflow: visible;
    cursor: pointer;

    &:focus {
        border-color: ${p =>
            p.error
                ? 'var(--color-destructive-100)'
                : 'var(--color-purple-100)'};
        outline: none;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-lg);
`;

export const TaskDialog = ({ task }) => {
    const dispatch = useDispatch();
    const portalId = nanoid();
    const allSubtasks = useSelector(subtasksSelectors.selectAll);
    const subtasks = allSubtasks.filter(subtask =>
        task.subtaskIds.includes(subtask.id)
    );
    const completedSubtasks = subtasks.filter(subtask => subtask.completed);
    const currentBoard = useSelector(state => state.boards.selectedBoard);
    const allColumns = useSelector(columnsSelectors.selectAll);
    const currentColumns = allColumns.filter(column =>
        currentBoard.columnIds.includes(column.id)
    );

    return (
        <DialogWrapper>
            <TitleWrapper>
                <h2>{task.title}</h2>
                <OpenMenuButton
                    onClick={() =>
                        dispatch(
                            openMenu({
                                menuType: 'taskMenu',
                                menuProps: {
                                    variant: 'tasks',
                                    portalId: portalId,
                                    task,
                                },
                            })
                        )
                    }
                    portalId={portalId}
                />
            </TitleWrapper>
            <p>{task.description}</p>
            <Label variant='input'>
                {`Subtasks (${completedSubtasks.length} of
                ${task.subtaskIds.length})`}
                {subtasks.map((subtask, index) => (
                    <Label
                        key={index}
                        variant='checkbox'
                        htmlFor={subtask.id}
                        checked={subtask.completed}
                    >
                        <StyledCheckbox
                            type='checkbox'
                            id={subtask.id}
                            checked={subtask.completed}
                            onChange={() => dispatch(toggleSubtask(subtask.id))}
                        />
                        {subtask.completed && (
                            <svg
                                aria-hidden='true'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='-3 -4.5 16 16'
                            >
                                <path
                                    stroke='var(--color-white)'
                                    strokeWidth='2'
                                    fill='none'
                                    d='m1.276 3.066 2.756 2.756 5-5'
                                />
                            </svg>
                        )}

                        {subtask.title}
                    </Label>
                ))}
            </Label>
            <Label variant='select'>
                Column
                <StyledSelect
                    onChange={e => {
                        dispatch(
                            updateTaskColumn({
                                id: task.id,
                                prevColumnId: task.columnId,
                                currColumnId: e.target.value,
                            })
                        );
                    }}
                >
                    {currentColumns.map((option, index) => (
                        <option
                            value={option.id}
                            key={index}
                            selected={task.columnId === option.id}
                        >
                            {option.title}
                        </option>
                    ))}
                </StyledSelect>
                <Down />
            </Label>
        </DialogWrapper>
    );
};
