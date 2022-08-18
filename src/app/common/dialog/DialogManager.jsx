import { useSelector } from 'react-redux';
import { ChangePasswordDialog, SignOutDialog } from '../../../features/auth';
import { CreateBoardDialog, UpdateBoardDialog } from '../../../features/boards';
import { CreateTaskDialog, TaskDialog } from '../../../features/tasks';
import { DeleteBoardDialog } from '../../../features/boards/';
import { DeleteTaskDialog } from '../../../features/tasks/DeleteTaskDialog';

export const DialogManager = () => {
    const dialogLookup = {
        signOut: SignOutDialog,
        updatePassword: ChangePasswordDialog,
        createBoard: CreateBoardDialog,
        updateBoard: UpdateBoardDialog,
        deleteBoard: DeleteBoardDialog,
        openTask: TaskDialog,
        createTask: CreateTaskDialog,
        deleteTask: DeleteTaskDialog,
    };
    const { dialogType, dialogProps } = useSelector(state => state.ui.dialog);
    let renderedDialog;
    if (dialogType) {
        const DialogComponent = dialogLookup[dialogType];
        renderedDialog = <DialogComponent {...dialogProps} />;
    }

    return <span>{renderedDialog}</span>;
};
