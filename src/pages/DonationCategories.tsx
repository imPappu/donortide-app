
import React, { useState } from "react";
import TopNavbar from "@/components/TopNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonationForm from "@/components/donation/DonationForm";
import { donationCategories } from "@/data/donationCategories";
import { Gift, HeartHandshake, Droplet, CircleDollarSign, ShoppingBag } from "lucide-react";

const DonationCategories = () => {
  const [activeTab, setActiveTab] = useState("monetary");
  
  const categories = [
    {
      id: "monetary",
      name: "Monetary Donation",
      description: "Support our operations with a financial contribution",
      icon: <CircleDollarSign className="h-6 w-6 text-green-600" />,
      color: "bg-green-50 dark:bg-green-900/20",
    },
    {
      id: "blood",
      name: "Blood Donation",
      description: "Schedule a blood donation appointment",
      icon: <Droplet className="h-6 w-6 text-red-600" />,
      color: "bg-red-50 dark:bg-red-900/20",
    },
    {
      id: "supplies",
      name: "Medical Supplies",
      description: "Donate essential medical supplies and equipment",
      icon: <ShoppingBag className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: "volunteer",
      name: "Volunteer Time",
      description: "Contribute your time and skills to our mission",
      icon: <HeartHandshake className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavbar title="Donate" />
      
      <main className="container max-w-4xl mx-auto px-4 py-6 flex-1 pb-20">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">How You Can Help</h1>
          <p className="text-muted-foreground">
            There are many ways to contribute to our mission. Choose an option below to get started.
          </p>
        </div>
        
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-6">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center justify-center">
                {category.icon}
                <span className="ml-2 hidden md:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="monetary" className="space-y-6">
            <DonationForm purpose="general support" initialAmount={25} showRecurringOption={true} />
          </TabsContent>
          
          <TabsContent value="blood" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Droplet className="h-12 w-12 text-red-600" />
                  <h2 className="text-xl font-semibold">Blood Donation</h2>
                  <p className="text-muted-foreground max-w-lg">
                    Your blood donation can save up to three lives. Schedule an appointment at one of our donation centers or mobile drives.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                    <a 
                      href="/requests"
                      className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-6 rounded-lg text-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      View Blood Requests
                    </a>
                    <a
                      href="/services"
                      className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-4 py-6 rounded-lg text-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      Find Donation Centers
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="supplies" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <ShoppingBag className="h-12 w-12 text-blue-600" />
                  <h2 className="text-xl font-semibold">Medical Supplies Donation</h2>
                  <p className="text-muted-foreground max-w-lg">
                    We accept donations of new, unopened medical supplies that help us serve more people in need.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                    <a
                      href="#supplies-needed"
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-6 rounded-lg text-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Supplies Needed
                    </a>
                    <a
                      href="#drop-off-locations"
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-6 rounded-lg text-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Drop-off Locations
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="volunteer" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <HeartHandshake className="h-12 w-12 text-purple-600" />
                  <h2 className="text-xl font-semibold">Volunteer Your Time</h2>
                  <p className="text-muted-foreground max-w-lg">
                    Join our team of dedicated volunteers who help with blood drives, community outreach, and administrative support.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                    <a
                      href="/volunteers"
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-6 rounded-lg text-center hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Volunteer Opportunities
                    </a>
                    <a
                      href="/volunteers/apply"
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-4 py-6 rounded-lg text-center hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      Apply to Volunteer
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DonationCategories;
