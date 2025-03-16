
import React from "react";
import TopNavbar from "@/components/TopNavbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Briefcase, Award, Users, HeartHandshake, CheckCheck, Calendar, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PageHeader from "@/components/common/PageHeader";

// Mock data for partner companies
const partnerCompanies = [
  {
    name: "Acme Corporation",
    logo: "https://placehold.co/200x80/e3f2fd/1e3a8a?text=Acme+Corp",
    description: "Strategic partner supporting our mobile donation drives.",
  },
  {
    name: "TechGiant Inc.",
    logo: "https://placehold.co/200x80/f3e5f5/4a148c?text=TechGiant",
    description: "Providing technology solutions for donor matching.",
  },
  {
    name: "Global Health Partners",
    logo: "https://placehold.co/200x80/e8f5e9/1b5e20?text=GlobalHealth",
    description: "Supporting our international blood donation programs.",
  },
  {
    name: "Metro Insurance Group",
    logo: "https://placehold.co/200x80/fff3e0/e65100?text=MetroIns",
    description: "Sponsoring community health initiatives and campaigns.",
  },
];

// Corporate sponsorship tiers
const sponsorshipTiers = [
  {
    name: "Bronze Partner",
    monthlyCost: "1,000",
    benefits: [
      "Logo on our website",
      "Recognition in monthly newsletter",
      "Participation in annual donor event"
    ]
  },
  {
    name: "Silver Partner",
    monthlyCost: "2,500",
    benefits: [
      "All Bronze benefits",
      "On-site blood drives at your location",
      "Co-branded donation materials",
      "Quarterly impact reports"
    ]
  },
  {
    name: "Gold Partner",
    monthlyCost: "5,000",
    benefits: [
      "All Silver benefits",
      "Featured sponsor status at major events",
      "Priority scheduling for blood drives",
      "Custom donor recruitment campaigns",
      "Press release announcements"
    ]
  },
  {
    name: "Platinum Partner",
    monthlyCost: "10,000",
    benefits: [
      "All Gold benefits",
      "Named sponsorship of a mobile donation vehicle",
      "Executive involvement in strategic planning",
      "Custom impact reports and research",
      "VIP access to all organization events"
    ]
  }
];

// Upcoming corporate events
const corporateEvents = [
  {
    title: "Corporate Blood Drive Summit",
    date: "June 15, 2023",
    location: "Grand Conference Center",
    description: "Network with other corporate partners and learn about hosting effective blood drives."
  },
  {
    title: "Executive Donor Breakfast",
    date: "July 28, 2023",
    location: "Metropolitan Hotel",
    description: "A special breakfast for our corporate partners to learn about our upcoming initiatives."
  }
];

const CorporateGiving = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavbar title="Corporate Giving" />
      
      <div className="container max-w-6xl mx-auto px-4 py-6 flex-1 pb-20">
        <PageHeader 
          title="Corporate Giving Programs" 
          description="Partner with us to make a difference in our community"
          icon={<Building2 className="h-5 w-5 text-primary" />}
        />
        
        {/* Hero section */}
        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <div className="md:flex">
            <div className="md:w-3/5 p-6">
              <h2 className="text-2xl font-bold mb-3">Become a Corporate Partner</h2>
              <p className="mb-4">
                Join our network of corporate partners who are helping save lives through 
                blood donation, financial support, and community engagement.
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-start">
                  <CheckCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <p>Host blood drives at your workplace</p>
                </div>
                <div className="flex items-start">
                  <CheckCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <p>Provide financial support for critical programs</p>
                </div>
                <div className="flex items-start">
                  <CheckCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <p>Engage your employees in life-saving volunteer work</p>
                </div>
                <div className="flex items-start">
                  <CheckCheck className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <p>Demonstrate your company's commitment to social responsibility</p>
                </div>
              </div>
              <Button size="lg" className="mr-2">
                Partner With Us
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Call
              </Button>
            </div>
            <div className="md:w-2/5 bg-gray-100">
              <img 
                src="https://placehold.co/800x600/e3f2fd/1e3a8a?text=Corporate+Partnership" 
                alt="Corporate Partnership" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
        
        {/* Sponsorship tiers */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Award className="h-5 w-5 mr-2 text-primary" />
            Partnership Tiers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sponsorshipTiers.map((tier, index) => (
              <Card key={index} className={index === 2 ? "border-primary" : ""}>
                {index === 2 && (
                  <div className="bg-primary text-primary-foreground py-1 px-4 text-center text-xs font-medium">
                    POPULAR CHOICE
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>
                    <span className="text-xl font-bold">${tier.monthlyCost}</span> per month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <CheckCheck className="h-4 w-4 text-primary mr-2 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={index === 2 ? "default" : "outline"}>
                    Select {tier.name}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Our corporate partners */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-primary" />
            Our Corporate Partners
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partnerCompanies.map((company, index) => (
              <Card key={index} className="flex items-center p-4">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="w-24 h-auto mr-4"
                />
                <div>
                  <h3 className="font-medium">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">{company.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Corporate events and blood drives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Upcoming Corporate Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {corporateEvents.map((event, index) => (
                  <div key={index} className="pb-4">
                    <h3 className="font-medium">{event.title}</h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      <p>{event.date} • {event.location}</p>
                    </div>
                    <p className="text-sm">{event.description}</p>
                    {index < corporateEvents.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Events</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Host a Corporate Blood Drive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Hosting a blood drive at your workplace is a powerful way to engage employees and make a direct impact on your community.
              </p>
              <div className="space-y-3 mb-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                    <CheckCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Customized Planning</h4>
                    <p className="text-sm text-muted-foreground">We'll work with your team to plan everything</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                    <CheckCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mobile Collection Units</h4>
                    <p className="text-sm text-muted-foreground">Our mobile units come to your location</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                    <CheckCheck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Employee Engagement</h4>
                    <p className="text-sm text-muted-foreground">Build team spirit while saving lives</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule a Blood Drive</Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Contact section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <HeartHandshake className="h-5 w-5 mr-2 text-primary" />
              Get Started with Corporate Giving
            </CardTitle>
            <CardDescription>
              Our team is ready to discuss partnership opportunities that align with your company's values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-4">
              <div className="text-center max-w-md">
                <Mail className="h-10 w-10 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-medium mb-2">Contact Our Corporate Team</h3>
                <p className="mb-4 text-muted-foreground">
                  Reach out to discuss how your company can partner with us to make a difference.
                </p>
                <Button size="lg">
                  Contact Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CorporateGiving;
