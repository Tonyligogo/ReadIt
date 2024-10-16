import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/AuthContext";
import { useCreateSubreadit } from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CreateCommunity() {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user} = useUserContext();
  const { mutateAsync:createNewCommunity } = useCreateSubreadit();

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }
  useEffect(()=>{
    if(!formValues.name || !formValues.description){
      setDisabled(true);
    }else{
      setDisabled(false);
    }
  },[formValues])

  function combineWords(words) {
    if (typeof words === 'string') {
      words = words.split(' ');
    }
    return words.join('').toLowerCase();
  }
  const createCommunity = async (e) => {
    e.preventDefault();
    setLoading(true);
    const communityName = combineWords(formValues.name)
    setFormValues({ ...formValues, name : communityName});
    const data = {
      name: communityName,
      description: formValues.description,
      subCreator:user?.id
    }
    const newCommunity = await createNewCommunity(data);    
    if(!newCommunity?.$id){
      setLoading(false);
      return toast.error('Failed to create a new community',{id:'error'})
    }else{
      toast.success("Community created successfully", {
        id: "success",
      });
      setFormValues({ name: "", description: "",})
      setLoading(false);
    }
  };

  return (
    <div className="grid h-full place-items-center">
      <div className=" bg-secondary rounded-lg p-5 w-[80%] ">
        <h2>Create a community</h2>
        <p className="text-muted-foreground text-sm">*Community names must be <b>unique</b> & must not have spaces between words</p>
        <div>
          <form onSubmit={createCommunity}>
            <div className="my-4 relative">
              <span className="absolute grid place-items-center w-8 left-0 inset-y-0 ">r/</span>
              <Input
                type="text"
                name="name"
                required
                value={formValues.name}
                onChange={handleChange}
                 className="rounded-lg pl-6 bg-[#333d42]"
              />
            </div>
            <div className="my-4">
              <label htmlFor="description">Description</label>
              <Textarea
                name="description"
                required
                value={formValues.description}
                onChange={handleChange}
                 className="rounded-lg bg-[#333d42] border-none"
              />
            </div>
            <div className="flex justify-end gap-4">
            <Button type='button' onClick={()=>navigate(-1)} className="mt-4 rounded-lg bg-[#333d42] cursor-pointer hover:bg-btn">Cancel</Button>
            <Button  disabled={disabled || loading} className="mt-4 rounded-lg bg-[#333d42] cursor-pointer hover:bg-btn">{!loading ? 'Create Community': 'Creating...'}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCommunity;
