"use Client "
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/@/components/ui/input'
import { Budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { DialogClose, DialogFooter } from '@/@/components/ui/dialog'

function CreateBudget() {
 const [emojiIcon,setEmojiIcon]=useState('__');
 const [OpenEmojiPicker,setOpenEmojiPicker]=useState(false);
 const [name,setName]=useState();
 const[amount,setAmount]=useState();

 const{user}=useUser();

 const onCreateBudget=async()=>{
  const result =await db.insert(Budgets)
  .value({
    name:name,
    amount:amount,
    createdBy:user?.primaryEmailAddress?.emailAddress,
    icon:emojiIcon
  
  }).returning({inserted:Budgets.id})
  if(result){
    toast('New Budget created!')
  }
 }
  return (
    <div>
      
      <Dialog>
  <DialogTrigger asChild>
  <div className='bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md'>
        <h2 className='text-3xl'>+</h2>
        <h2>create new Budget</h2>
      </div>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new Budget</DialogTitle>
      <DialogDescription>
        <div className='mt-5'>
          <Button variant="outline" 
          size="lg"
          className="text-lg"
          onClick={()=>setOpenEmojiPicker(!setOpenEmojiPicker)}
          >{emojiIcon}</Button>
            <div className='abs'>
              <EmojiPicker
              open={setOpenEmojiPicker}
              onEmojiClick={(e)=>{
                setEmojiIcon(e.emoji)
              setOpenEmojiPicker(false)
              }}
              />
              </div>
              <div>
                <h2 className='text-black font-medium my-1'>budget name</h2>
                <Input placeholder="e.g.Home Decor"
                onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div>
                <h2 className='text-black font-medium my-1'>budget amount</h2>
                <Input placeholder="e.g.5000$"
                type ="number"
                onChange={(e)=>setAmount(e.target.value)}/>
              </div>
             
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button 
              diabled={!name && amount}
              onClick={()=>onCreateBudget()}
              className="mt-5 w-full">create Budget</Button>
          </DialogClose>
        </DialogFooter>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default CreateBudget
