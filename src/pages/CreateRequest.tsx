
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestForm } from "@/components/blood-request/RequestForm";
import { DonorForm } from "@/components/blood-request/DonorForm";
import TopNavbar from "@/components/TopNavbar";
import { Card, CardContent } from "@/components/ui/card";

const CreateRequest = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <TopNavbar title="Create Request" />
      
      <div className="container max-w-md mx-auto px-4 py-6 animate-fade-in">
        <Card className="border-none shadow-sm mb-6">
          <CardContent className="p-4">
            <h1 className="text-2xl font-bold text-center mb-2">Create Request</h1>
            <p className="text-center text-muted-foreground text-sm mb-4">
              Fill out the form to request blood or register as a donor
            </p>
            
            <Tabs defaultValue="request" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="request" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Request Blood
                </TabsTrigger>
                <TabsTrigger value="donate" className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Donate Blood
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="request" className="mt-0">
                <RequestForm />
              </TabsContent>
              
              <TabsContent value="donate" className="mt-0">
                <DonorForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateRequest;
