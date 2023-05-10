import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../infrastructure/store";
import { setLastCopied } from "../infrastructure/copyPaste/copyPasteReducer";

interface CopyToClipboardProps {
    text: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
    const dispatch = useDispatch();
    const lastCopied = useSelector((state: RootState) => state.copyPasteService.lastCopied);
    const isSameAsLastCopied = lastCopied == text;
    return (
        <div
            className="font-medium mr-4 text-green-700 cursor-pointer"
            onClick={() => {
                navigator.clipboard.writeText(text);
                dispatch(setLastCopied(text));
            }}>
            {isSameAsLastCopied ? (
                <>
                    <div>Copied</div>
                </>
            ) : (
                <>
                    <div>Copy</div>
                </>
            )}
        </div>
    );
};

export default CopyToClipboard; 