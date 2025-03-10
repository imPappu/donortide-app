
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestForm } from "@/components/blood-request/RequestForm";
import { DonorForm } from "@/components/blood-request/DonorForm";

const CreateRequest = () => {
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Create Request</h1>
      </div>

      <Tabs defaultValue="request" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="request" className="flex-1">Request Blood</TabsTrigger>
          <TabsTrigger value="donate" className="flex-1">Donate Blood</TabsTrigger>
        </TabsList>
        
        <TabsContent value="request">
          <RequestForm />
        </TabsContent>
        
        <TabsContent value="donate">
          <DonorForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateRequest;
