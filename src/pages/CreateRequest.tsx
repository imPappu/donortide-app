
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RequestForm } from "@/components/blood-request/RequestForm";
import { DonorForm } from "@/components/blood-request/DonorForm";
import TopNavbar from "@/components/TopNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { DropletIcon, Heart } from "lucide-react";

const CreateRequest = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <TopNavbar title="Create Request" showBackButton={true} />
      
      <div className="container max-w-md mx-auto px-4 py-6 animate-fade-in">
        <Card className="border-none shadow-md mb-6 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
          <CardContent className="p-6">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-center mb-2">Create Request</h1>
            <p className="text-center text-muted-foreground text-sm mb-6">
              Fill out the form to request blood or register as a donor
            </p>
            
            <Tabs defaultValue="request" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-6">
                <TabsTrigger 
                  value="request" 
                  className="rounded-md data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  <DropletIcon className="h-4 w-4 mr-2" />
                  Request Blood
                </TabsTrigger>
                <TabsTrigger 
                  value="donate" 
                  className="rounded-md data-[state=active]:bg-red-500 data-[state=active]:text-white"
                >
                  <Heart className="h-4 w-4 mr-2" />
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
