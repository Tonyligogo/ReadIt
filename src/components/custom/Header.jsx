import { Button } from "../ui/button";
import Logo from "../../assets/logo.svg";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateUserAccountMutation, useSignInAccount, useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

function Header() {
  const [formValues, setFormValues] = useState({username:'', email:'', password:''});
  const [loginValues, setLoginValues] = useState({email:'', password:''});
  const [loginRegister, setLoginRegister] = useState('login');
  const [disabled, setDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { checkAuthUser,user, isLoading:isUserLoading } = useUserContext()

  const { mutateAsync: createUserAccount, isPending:isCreatingUser } = useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending:isSigningIn } = useSignInAccount();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();


  useEffect(()=>{
    if(!formValues.username || !formValues.email || !formValues.password){
      setDisabled(true);
    }else{
      setDisabled(false);
    }
  },[formValues])

  useEffect(()=>{
    const fetchData = async () => {
      if (isSuccess) {
        await checkAuthUser();
      }
    };
  
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSuccess])

  useEffect(()=>{
    if(!loginValues.email || !loginValues.password){
      setDisabled(true);
    }else{
      setDisabled(false);
    }
  },[loginValues])

  const handleChange = (event)=>{
    setPasswordError(null);
    setFormValues({...formValues, [event.target.name]:event.target.value});
  };
  const handleLoginChange = (event)=>{
    setPasswordError(null);
    setLoginValues({...loginValues, [event.target.name]:event.target.value});
  };

  const passwordPattern = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
  
  const validatePassword = (password) => {
    if (!passwordPattern.test(password)) {
      setPasswordError('Password must be at least 8 characters long and contain both letters and numbers.');
      setDisabled(true);
      return false;
    } else {
      setPasswordError(null);
      setDisabled(false);
      return true;
    }
  };

  const handleSave = async(event)=>{
    event.preventDefault();
    if(!validatePassword(formValues.password)) return;
    const newUser = await createUserAccount(formValues);
    if(!newUser){
      return toast.error('Failed to create user',{id:'error'})
    }

    const session = await signInAccount({
      email: formValues.email,
      password: formValues.password,
    })
    if(!isSigningIn && !session){
      return toast.error('Failed to sign in.Please try again.',{id:'error2'})
    }
    const isLoggedIn = await checkAuthUser();
    if(!isUserLoading && isLoggedIn){
      setFormValues({username:'', email:'', password:''});
      return toast.success('User created successfully',{id:'success3'})
    }else{
      return toast.error('Failed to sign in. Please try again.',{id:'error3'})
    }
  };

  const handleLogin = async(event)=>{
    event.preventDefault();
    if(!validatePassword(loginValues.password)) return;
    
    const session = await signInAccount({
      email: loginValues.email,
      password: loginValues.password,
    })
    if(!isSigningIn && !session){
      return toast.error('Failed to log in.Please try again.',{id:'error2'})
    }
    const isLoggedIn = await checkAuthUser();
    if(!isUserLoading && isLoggedIn){
      toast.success('User logged in successfully',{id:'success3'})
      navigate('/home')
      return
    }else{
      return toast.error('Failed to log in. Please try again.',{id:'error3'})
    }
  };
  
  return (
    <>
      <div className=" max-h-70px grid grid-cols-[auto_minmax(auto,_600px)_auto] justify-between items-center gap-3  py-3 border-b border-gray-500 ">
        <Link to={"/"} className="flex gap-2 items-center">
          <img src={Logo} alt="Logo" />
          <h1 className="hidden md:block text-white font-bold text-[30px] ">
            readit
          </h1>
        </Link>
        <Input
          placeholder="Search"
          type="search"
          className="rounded-full text-primary"
        />
        {(!isUserLoading && user.username) &&
        <div className="flex gap-2 items-center">
        <img src={user?.imageUrl} alt="avatar" className="h-8 w-8 rounded-full cursor-pointer"/>
        <LogOut className="text-btn cursor-pointer" onClick={()=>signOut()}/>
        </div>}
        {!isUserLoading && !user.username &&
        <div>
        {loginRegister === 'login' 
        ?
         <Dialog>
          <DialogTrigger className=" bg-btn cursor-pointer whitespace-nowrap rounded-full py-2 px-5 text-sm font-medium ">Log in</DialogTrigger>
          <DialogContent className='py-10 px-20 bg-primary '>
            <DialogHeader>
              <DialogTitle className='text-lg'>Log in to Readit</DialogTitle>
              <DialogDescription>
                Log in with your Readit account to access your favorite posts.
              </DialogDescription>
            </DialogHeader>
              <Input type='email' value={loginValues.email} className="rounded-full bg-[#333d42] border-none" autoComplete='off' placeholder='Email' onChange={handleLoginChange} name="email"/>
              <div>
                <span className="flex justify-end ">{showPassword ? <Eye onClick={()=>setShowPassword(false)} size={20}/> : <EyeOff onClick={()=>setShowPassword(true)} size={20}/>}</span>
              <Input type={showPassword ? 'text':'password'} value={loginValues.password} className="rounded-full  bg-[#333d42] border-none " autoComplete='off' placeholder='Pasword' onChange={handleLoginChange} name="password"/>
              </div>
              {passwordError && <p className="text-btn text-sm">{passwordError}</p>}
              <p>New to Readit? 
                <span onClick={()=>setLoginRegister('register')} className="text-btn mx-1 cursor-pointer">Register</span>
              </p>
              <Button id="submitBtn" disabled={disabled || isUserLoading} className="mt-4 rounded-full bg-[#333d42] cursor-pointer hover:bg-btn" onClick={handleLogin}>
                {isUserLoading ? <Loader2 className=" animate-spin "/> : 'Log in'}
              </Button>
          </DialogContent>
        </Dialog>
        : <Dialog>
          <DialogTrigger className=" bg-btn cursor-pointer whitespace-nowrap rounded-full py-2 px-5 text-sm font-medium ">Log in</DialogTrigger>
          <DialogContent className='py-10 px-20 bg-primary '>
            <DialogHeader>
              <DialogTitle className='text-lg'>Sign up to Readit</DialogTitle>
              <DialogDescription>
                Create a new Readit account.
              </DialogDescription>
            </DialogHeader>
              <Input type='text' value={formValues.username} className="rounded-full bg-[#333d42] border-none" autoComplete='off' placeholder='Username' onChange={handleChange} name="username"/>
              <Input type='email' value={formValues.email} className="rounded-full bg-[#333d42] border-none" autoComplete='off' placeholder='Email' onChange={handleChange} name="email"/>
              <div>
                <span className="flex justify-end ">{showPassword ? <Eye onClick={()=>setShowPassword(false)} size={20}/> : <EyeOff onClick={()=>setShowPassword(true)} size={20}/>}</span>
              <Input type={showPassword ? 'text':'password'} value={formValues.password} className="rounded-full  bg-[#333d42] border-none " autoComplete='off' placeholder='Pasword' onChange={handleChange} name="password"/>
              </div>
              {passwordError && <p className="text-btn text-sm">{passwordError}</p>}
              <p>Already have an account? 
                <span onClick={()=>setLoginRegister('login')} className="text-btn mx-1 cursor-pointer">Log in</span>
              </p>
              <Button id="submitBtn" disabled={disabled || isCreatingUser} className="mt-4 rounded-full bg-[#333d42] cursor-pointer hover:bg-btn" onClick={handleSave}>
                {isCreatingUser ? (`${<Loader2 className=" animate-spin "/>} Creating account...`) : 'Create account'}
              </Button>
          </DialogContent>
        </Dialog>}
        </div>}
        
      </div>
    </>
  );
}

export default Header;
