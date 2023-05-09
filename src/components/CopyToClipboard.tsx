import { useState } from "react";

interface CopyToClipboardProps {
    text: string;
} 

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({text}) => {

    const [copied, setCopied] = useState("copy");
    return (
        <div
            className="font-medium mr-4 text-green-700 cursor-pointer"
            onClick={() => {
                navigator.clipboard.writeText(text);
                setCopied("copied");
            }}>
            {copied}
        </div>
    );
};

export default CopyToClipboard; 