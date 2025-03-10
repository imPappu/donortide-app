
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import { useEventManagement } from "@/hooks/useEventManagement";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, BadgeDollarSign, Ticket, Users } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const { events, userRegistrations, registerForEvent, isLoading } = useEventManagement();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("upcoming");
  
  const currentDate = new Date();
  
  const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastEvents = events.filter(event => new Date(event.date) < currentDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const myEvents = userRegistrations
    .filter(reg => user && reg.userId === user.id)
    .map(reg => events.find(event => event.id === reg.eventId))
    .filter(Boolean)
    .sort((a, b) => new Date(a!.date).getTime() - new Date(b!.date).getTime());
  
  // For My Events tab
  const myUpcomingEvents = myEvents.filter(event => event && new Date(event.date) >= currentDate);
  const myPastEvents = myEvents.filter(event => event && new Date(event.date) < currentDate);
  
  const handleRegister = async (eventId: string, isPaid: boolean) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to register for events",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    try {
      if (isPaid) {
        // For paid events, we would normally redirect to a payment page
        // For this demo, we'll just show a toast and register the user directly
        toast({
          title: "Payment Required",
          description: "You will be redirected to payment page for this event",
        });
        
        // Simulate successful payment
        await new Promise(resolve => setTimeout(resolve, 1000));
        await registerForEvent(eventId, user!, true);
      } else {
        // For free events, register directly
        await registerForEvent(eventId, user!, true);
      }
    } catch (error) {
      // Error handled in hook
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar title="Events" />
      
      <div className="container max-w-4xl mx-auto px-4 py-6 flex-1 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Blood Donation Events</h1>
          <p className="text-muted-foreground">
            Join our upcoming events or check the ones you've registered for
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 max-w-md mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="my">My Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            <h2 className="text-lg font-medium">Upcoming Events</h2>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">No upcoming events</p>
                  <p className="text-sm text-muted-foreground">
                    Check back later for new events or explore past events
                  </p>
                </CardContent>
              </Card>
            ) : (
              upcomingEvents.map(event => {
                const isRegistered = userRegistrations.some(
                  reg => reg.eventId === event.id && user && reg.userId === user.id
                );
                
                return (
                  <EventCard 
                    key={event.id}
                    event={event}
                    isRegistered={isRegistered}
                    onRegister={() => handleRegister(event.id, event.isPaid)}
                  />
                );
              })
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            <h2 className="text-lg font-medium">Past Events</h2>
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : pastEvents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">No past events</p>
                  <p className="text-sm text-muted-foreground">
                    Check the upcoming events section for future events
                  </p>
                </CardContent>
              </Card>
            ) : (
              pastEvents.map(event => {
                const isRegistered = userRegistrations.some(
                  reg => reg.eventId === event.id && user && reg.userId === user.id
                );
                
                return (
                  <EventCard 
                    key={event.id}
                    event={event}
                    isRegistered={isRegistered}
                    isPast={true}
                  />
                );
              })
            )}
          </TabsContent>
          
          <TabsContent value="my" className="space-y-6">
            {!isAuthenticated ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Not logged in</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please log in to view your registered events
                  </p>
                  <Button onClick={() => navigate("/login")}>
                    Log In
                  </Button>
                </CardContent>
              </Card>
            ) : isLoading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : myEvents.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">No registered events</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    You haven't registered for any events yet
                  </p>
                  <Button onClick={() => setActiveTab("upcoming")}>
                    Browse Events
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {myUpcomingEvents.length > 0 && (
                  <>
                    <h2 className="text-lg font-medium">My Upcoming Events</h2>
                    {myUpcomingEvents.map(event => (
                      <EventCard 
                        key={event!.id}
                        event={event!}
                        isRegistered={true}
                      />
                    ))}
                  </>
                )}
                
                {myPastEvents.length > 0 && (
                  <>
                    <h2 className="text-lg font-medium mt-8">My Past Events</h2>
                    {myPastEvents.map(event => (
                      <EventCard 
                        key={event!.id}
                        event={event!}
                        isRegistered={true}
                        isPast={true}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface EventCardProps {
  event: any;
  isRegistered: boolean;
  isPast?: boolean;
  onRegister?: () => void;
}

const EventCard = ({ event, isRegistered, isPast = false, onRegister }: EventCardProps) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const isFullyBooked = event.registrations >= event.capacity;
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="md:flex">
        <div className="bg-primary/10 w-full md:w-32 h-32 md:h-auto flex-shrink-0 flex flex-col items-center justify-center p-4">
          <div className="text-lg font-semibold">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
          <div className="text-3xl font-bold">{new Date(event.date).getDate()}</div>
          <div className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
        </div>
        
        <CardContent className="p-6 flex-1">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <h3 className="text-lg font-bold">{event.title}</h3>
                {event.isPaid && (
                  <Badge variant="secondary" className="ml-2">
                    <BadgeDollarSign className="h-3 w-3 mr-1" />
                    Paid
                  </Badge>
                )}
                {isPast && (
                  <Badge variant="outline" className="ml-2">Past</Badge>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground">{event.description}</p>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formattedDate}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 items-end">
              <div className="text-sm">
                <div className="flex items-center justify-end">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="font-medium">
                    {event.registrations}/{event.capacity}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground text-right">registered</p>
              </div>
              
              {event.isPaid && (
                <div className="text-right">
                  <p className="font-semibold text-lg">
                    {event.price} {event.currency}
                  </p>
                </div>
              )}
              
              {!isPast && (
                isRegistered ? (
                  <Badge className="ml-auto">
                    <Ticket className="h-3 w-3 mr-1" />
                    Registered
                  </Badge>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={onRegister}
                    disabled={isFullyBooked}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    {isFullyBooked ? "Fully Booked" : event.isPaid ? "Buy Ticket" : "Register"}
                  </Button>
                )
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default Events;
