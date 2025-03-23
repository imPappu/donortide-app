
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Megaphone, Image as ImageIcon, CalendarIcon } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  goal: z.string().min(1, { message: 'Goal is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
  image: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const CreateCampaign = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      goal: '',
      endDate: '',
      image: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    // In a real app, we would submit to the server here
    console.log('Campaign form submitted:', values);
    
    toast({
      title: "Campaign created",
      description: "Your campaign has been created successfully",
    });
    
    setTimeout(() => {
      navigate('/campaigns');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Create Campaign" showBackButton />
      
      <div className="container mx-auto px-4 py-6 pb-20 max-w-3xl">
        <div className="flex items-center space-x-2 mb-6">
          <Megaphone className="h-6 w-6 text-orange-500" />
          <h1 className="text-2xl font-bold">Create New Campaign</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Blood Drive" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your campaign and its goals..." 
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Goal</FormLabel>
                        <FormControl>
                          <Input placeholder="500 donors or 1000 units" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              type="date"
                              placeholder="Select end date" 
                              {...field} 
                            />
                          </FormControl>
                          <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Image URL</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <ImageIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/campaigns')}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Campaign</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
};

export default CreateCampaign;
