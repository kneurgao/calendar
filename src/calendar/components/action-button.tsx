import { IconButton, Tooltip, Zoom } from '@mui/material';
import React, { ReactNode } from 'react';

const ActionButton: React.FC<{
  label: string;
  title: string;
  onClick: () => void;
  children: ReactNode;
}> = ({ label, title, onClick, children }) => {
  return (
    <Tooltip TransitionComponent={Zoom} title={title}>
      <IconButton aria-label={label} onClick={onClick}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default ActionButton;
