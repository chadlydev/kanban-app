import * as SwitchPrimitive from '@radix-ui/react-switch';
import styled from 'styled-components/macro';

//=====================
// STYLED COMPONENTS
const SwitchRoot = styled(SwitchPrimitive.Root)`
    all: unset;
    position: relative;
    width: 40px;
    height: 20px;
    background-color: var(--color-purple-100);
    border-radius: var(--radii-round);
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: var(--color-purple-200);
    }

    &:focus {
        box-shadow: 0 0 0 3px var(--color-purple-shadow);
    }

    &:focus:not(:focus-visible) {
        outline: 0;
        box-shadow: none;
    }
`;

const SwitchThumb = styled(SwitchPrimitive.Thumb)`
    all: unset;
    display: block;
    margin-left: 3px;
    height: 14px;
    width: 14px;
    background-color: var(--color-white);
    border-radius: var(--radii-round);
    transition: 0.4s;
    will-change: transform;

    &[data-state='checked'] {
        transform: translateX(20px);
    }
`;

//=====================
// COMPONENTS
const Switch = ({ checked, onChange }) => {
    return (
        <SwitchRoot checked={checked} onCheckedChange={onChange}>
            <SwitchThumb />
        </SwitchRoot>
    );
};

export default Switch;
