import React, { Children, useEffect } from 'react'
import SideNav from './_components/SideNav'

import DashboardHeader from './_components/DashboardHeader'
import db from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { User } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'

function Dashboardlayout({Children}) {

  const {User} =useUser();
  const router =useRouter();
  useEffect(()=>{
   User&&checkUserBudget();
  },[User]
)
  const checkUserBudget=async()=>{
    const result =await db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy,User?.primaryEmailADDRESS?.EMAILAddress))

    console.log(result);
    if(result?.length==0){
      router.replace('/dashboard/budgets');
    }
  }

  return (
    <div>
        <div className='fixed md:w-64 hidden md:block '>
            <SideNav/>
        </div>
        <div className='md:ml-64 '>
            <DashboardHeader/>
        {Children}
        </div>
     
    </div>
  )
}

export default Dashboardlayout
