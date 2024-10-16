/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useSendComment } from "@/lib/react-query/queriesAndMutations";

function Comment({cancel, postId, userId}) {
    const [comment, setComment]= useState('');
    const [isCommentValid, setIsCommentValid]= useState(true);
    const [timeoutId, setTimeoutId] = useState(null);
    const { mutateAsync: sendComment }=useSendComment();

    function isValidComment(comment) {
        const trimmedComment = comment.trim();
        if (trimmedComment.length < 2) {
          return false;
        }
        const punctuationRegex = /^[.,!?;:]*$/;
        if (punctuationRegex.test(trimmedComment)) {
          return false;
        }
        return true;
      }
    const handleSend = async(e) => {
        e.preventDefault();
        if (!isValidComment(comment)){
            setIsCommentValid(false);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            const id = setTimeout(() => {
                setIsCommentValid(true);
            }, 3000);
            setTimeoutId(id);
            return;
        }
        const newPost = await sendComment({
            user:userId,
            post:postId,
            content:comment
        })

        if(!newPost){
            throw Error
        }else{
            toast.success('Comment sent',{id:'success'})
        }          
    }

    // Cleanup function to clear the timeout when the component unmounts
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);
  return (
    <div>
        <Textarea placeholder="Write a comment..." className="bg-[#0e1113] border-none mt-4" onChange={(e)=>setComment(e.target.value)}/>
        {!isCommentValid && <p className="text-red-500 text-xs">Your comment must be at least 2 characters long and not contain punctuation only.</p>}  {/* if comment is not valid */}  {/* if comment is valid */}  {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}   {/* if comment is valid */}
        <div className="mt-2 flex justify-end gap-4">
            <Button variant="outline" className="bg-[#0e1113]" onClick={cancel}>Cancel</Button>
            <Button variant="outline" onClick={handleSend} className="bg-[#0e1113] hover:bg-btn hover:border-btn hover:text-white ">Send</Button>
        </div>
    </div>
  )
}

export default Comment