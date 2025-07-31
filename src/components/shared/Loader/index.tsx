import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import './styles.scss';

interface LoaderProps {
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = false }) => {
    return (
        <div className={fullScreen ? 'loader fullScreen' : 'loader'}>
            <CircularProgress size={'3rem'} />
        </div>
    );
};

export default Loader;