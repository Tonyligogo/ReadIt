/* eslint-disable react/prop-types */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../custom/FileUploader"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    title: z.string().min(5, {
      message: "Title must be at least 5 characters long.",
    }),
    file:z.custom(),
    tags: z.string(),
    content: z.string().max(2200,{message:"You have reached the maximum number of characters."})
  })


function CreatePostForm({post, params, action}) {
    const { mutateAsync: createPost, isPending:isLoadingCreate  }=useCreatePost()
    const { mutateAsync: updatePost, isPending:isLoadingUpdate }=useUpdatePost()
    const navigate = useNavigate();
    const {user} = useUserContext();
        const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: post ? post?.title : "",
          content: post ? post?.content : "",
          file: [],
          tags: post ? post?.tags.join(',') : "",
        },
      })
     
      async function onSubmit(e,values) {
        e.preventDefault();
        if(post && action ==='update'){
          const updatedPost = updatePost({
            ...values,
            postId: post.$id,
            imageUrl: post.imageUrl,
            imageId: post.imageId
          })
          if(!updatedPost){
            toast.error('Failed to update post',{id:'error'})
          }
          return navigate(`/post/${post.$id}`,{replace:true})
        }
        const newPost = await createPost({
            ...values,
            user:user?.id,
            subreadit:params.communityId
        })

        if(!newPost){
            throw Error
        }else{
            toast.success('Post created successfully',{id:'success'})
            navigate('/home',{replace:true})
        }
      }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Title</FormLabel>
              <FormControl>
                <Input className="bg-[#333d42] border-none focus-visible:ring-1 focus-visible:ring-offset-1" placeholder="Something awesome" {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                fieldChange={field.onChange}
                mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Description</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea" placeholder="Something awesome happened..." {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Add Tags(separated by comma &quot;,&quot;)</FormLabel>
              <FormControl>
                <Input className="bg-[#333d42] border-none focus-visible:ring-1 focus-visible:ring-offset-1" placeholder="Art, Funny, Technology" {...field} />
              </FormControl>
              <FormMessage className='text-red-600'/>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4 items-center">
        <Button type="button">Cancel</Button>
        <Button disabled={isLoadingCreate || isLoadingUpdate} type="submit">
          {action === 'update'? isLoadingUpdate? 'Updating ...' : 'Update Post' : isLoadingCreate? 'Creating...' : 'Create Post'}
        </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreatePostForm