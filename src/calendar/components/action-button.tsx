import React, { ReactNode } from 'react';

import { IconButton, Tooltip, Zoom } from '@mui/material';

const ActionButton: React.FC<{
  label?: string;
  title: string;
  onClick: () => void;
  children: ReactNode;
}> = ({ label, title, onClick, children }) => {
  return (
    <Tooltip TransitionComponent={Zoom} title={title}>
      <IconButton aria-label={label || title} onClick={onClick}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default ActionButton;
