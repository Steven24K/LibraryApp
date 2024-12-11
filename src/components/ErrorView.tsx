
import React = require("react");

type ErrorViewProps = {
    errorMessage?: string;
    onRetry: () => void;
};

export const ErrorView: React.FC<ErrorViewProps> = ({ errorMessage, onRetry }) => (
    <div className="error">
        <p>{errorMessage || "Something went wrong..."}</p>
        <p>
            <button onClick={onRetry}>Retry</button>
        </p>
    </div>
);