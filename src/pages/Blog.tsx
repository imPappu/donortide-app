
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string; // Adding content property here
  author: string;
  date: string;
  readTime: string;
  category: string;
}

const Blog = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // This would be replaced with actual API call in production
    // For demonstration, we're using mock data
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        // Mock data - in production, use:
        // const response = await fetch(`https://newsapi.org/v2/top-headlines?category=health&apiKey=${API_KEY}`);
        // const data = await response.json();
        // setNewsArticles(data.articles);
        
        // Mock health news data
        setTimeout(() => {
          const mockNews = [
            {
              title: "New Blood Donation Guidelines Released",
              description: "The American Red Cross has released new guidelines for blood donation eligibility.",
              url: "#",
              urlToImage: "https://placehold.co/600x400/red/white?text=Blood+Donation",
              publishedAt: "2023-05-15T10:30:00Z",
              source: { name: "Health News Today" }
            },
            {
              title: "Research Shows Benefits of Regular Blood Donation",
              description: "New research indicates that regular blood donation may have health benefits for donors.",
              url: "#",
              urlToImage: "https://placehold.co/600x400/red/white?text=Research",
              publishedAt: "2023-05-10T14:15:00Z",
              source: { name: "Medical Journal" }
            },
            {
              title: "Blood Supplies Critically Low Nationwide",
              description: "Blood banks across the country report critically low supplies of all blood types.",
              url: "#",
              urlToImage: "https://placehold.co/600x400/red/white?text=Blood+Supply",
              publishedAt: "2023-05-05T09:45:00Z",
              source: { name: "National Health Network" }
            }
          ];
          setNewsArticles(mockNews);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching news:", error);
        toast({
          title: "Error",
          description: "Failed to load health news. Please try again later.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    const fetchBlogPosts = async () => {
      // This would be replaced with actual API call in production
      const mockBlogPosts = [
        {
          id: 1,
          title: "The Importance of Blood Donation",
          excerpt: "Why donating blood regularly can save lives and improve your health.",
          content: "Blood donation is a critical lifeline for many people facing health issues. When you donate blood, you're giving someone another chance at life. Your donation can help accident victims, surgery patients, and those battling cancer. Regular blood donation not only helps others but may provide health benefits for the donor as well. Studies suggest that regular blood donors have lower risks of certain cardiovascular diseases. The process of giving blood stimulates the production of new blood cells, which can help maintain good health.\n\nDonating blood is quick, easy, and relatively painless. The entire process usually takes less than an hour, with the actual blood draw only taking about 8-10 minutes. Before donating, medical professionals check your temperature, blood pressure, pulse, and hemoglobin levels to ensure you're healthy enough to donate. They also ask about your medical history to ensure the safety of both you and potential recipients.\n\nDespite the critical need for blood, many blood banks face shortages. Only about 3% of eligible people donate blood regularly. If more eligible donors gave blood just once a year, many blood shortages could be prevented. Consider becoming a regular donor and encourage your friends and family to do the same. Together, we can ensure that blood is available whenever and wherever it's needed.",
          author: "Dr. Sarah Johnson",
          date: "2023-05-01T10:00:00Z",
          readTime: "5 min read",
          category: "Education"
        },
        {
          id: 2,
          title: "Common Myths About Blood Donation",
          excerpt: "Debunking common misconceptions that prevent people from donating blood.",
          content: "Many people are hesitant to donate blood due to common misconceptions. Let's debunk some of these myths to encourage more donations.\n\nMyth 1: Donating blood is painful.\nReality: While you might feel a brief pinch when the needle is inserted, most donors report little to no discomfort during donation. The process is designed to be as comfortable as possible.\n\nMyth 2: I don't have enough blood to donate.\nReality: The average adult has about 10 pints of blood, and a standard donation is only about 1 pint. Your body replaces this volume within 24 hours and regenerates red blood cells within a few weeks.\n\nMyth 3: I'll get sick after donating blood.\nReality: Donating blood is safe for healthy individuals. Staff ensure you're well hydrated and provide a snack afterward to help maintain your blood sugar levels.\n\nMyth 4: I can't donate because I'm taking medication.\nReality: Many medications don't disqualify you from donating. Always check with the donation center, as each medication is evaluated individually.\n\nMyth 5: I don't have a common blood type, so my blood isn't needed.\nReality: All blood types are needed! Some rare types are particularly valuable for certain patients.\n\nMyth 6: I can't donate because I have tattoos.\nReality: In most areas, you can donate blood shortly after getting a tattoo if it was done in a regulated facility.\n\nUnderstanding the facts about blood donation can help more people feel comfortable becoming donors, ultimately saving more lives.",
          author: "Michael Chen, RN",
          date: "2023-04-25T14:30:00Z",
          readTime: "8 min read",
          category: "Myths & Facts"
        },
        {
          id: 3,
          title: "How Blood Donations Are Processed",
          excerpt: "What happens to your blood after you donate it? Learn about the journey.",
          content: "Have you ever wondered what happens to your blood after you donate it? The journey of donated blood is fascinating and involves several crucial steps to ensure safety and maximize its benefits.\n\nStep 1: Collection\nWhen you donate blood, it's collected in sterile bags containing anticoagulants to prevent clotting. Along with the main donation, small samples are collected for testing.\n\nStep 2: Testing\nEach donation undergoes rigorous testing for blood type (A, B, AB, or O, and Rh factor) and screening for infectious diseases including HIV, hepatitis B and C, syphilis, and others depending on regional risks.\n\nStep 3: Processing\nWhole blood is typically separated into components: red blood cells, plasma, and platelets. This allows multiple patients to benefit from a single donation, each receiving exactly what they need.\n\nStep 4: Storage\nEach component requires specific storage conditions:\n- Red blood cells can be stored for up to 42 days at refrigerated temperatures\n- Plasma can be frozen and stored for up to a year\n- Platelets must be stored at room temperature under agitation and can only last about 5 days\n\nStep 5: Distribution\nBlood products are distributed to hospitals as needed, with careful attention to maintaining proper conditions during transport.\n\nStep 6: Transfusion\nFinally, the blood components reach patients in need. Before transfusion, additional compatibility tests ensure the donation is safe for the specific recipient.\n\nThis complex process ensures that your generous donation safely reaches the patients who need it most, potentially saving up to three lives from a single donation.",
          author: "Laura Smith, Lab Technician",
          date: "2023-04-15T09:15:00Z",
          readTime: "6 min read",
          category: "Behind the Scenes"
        }
      ];
      setBlogPosts(mockBlogPosts);
    };

    fetchNews();
    fetchBlogPosts();
  }, [toast]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openArticleDialog = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const openBlogPostDialog = (post: BlogPost) => {
    setSelectedBlogPost(post);
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Health & Resources</h1>
      </div>

      <Tabs defaultValue="news" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="news" className="flex-1">Health News</TabsTrigger>
          <TabsTrigger value="blog" className="flex-1">Blood Donation Blog</TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="mt-4">
          {isLoading ? (
            // Loading skeleton
            Array(3).fill(0).map((_, i) => (
              <Card key={i} className="mb-4">
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-40 w-full mb-2" />
                  <div className="flex justify-between items-center mt-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            newsArticles.map((article, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{article.description}</p>
                  {article.urlToImage && (
                    <div className="mb-3 rounded-md overflow-hidden">
                      <img 
                        src={article.urlToImage} 
                        alt={article.title} 
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {formatDate(article.publishedAt)}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => openArticleDialog(article)}>
                      <span className="flex items-center">
                        Read more <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="blog" className="mt-4">
          {blogPosts.map((post, index) => (
            <Card key={index} className="mb-4">
              <CardContent className="p-4">
                <div className="text-xs font-medium text-primary mb-1">{post.category}</div>
                <h3 className="font-medium text-lg mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">{post.author}</span>
                    <div className="flex items-center text-muted-foreground">
                      <CalendarIcon className="h-3 w-3 mr-1" />
                      {formatDate(post.date)} • {post.readTime}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center"
                    onClick={() => openBlogPostDialog(post)}
                  >
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Article Detail Dialog */}
      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          {selectedArticle && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="h-3 w-3 mr-1" />
                {formatDate(selectedArticle.publishedAt)} • {selectedArticle.source.name}
              </div>
              
              {selectedArticle.urlToImage && (
                <div className="rounded-md overflow-hidden">
                  <img 
                    src={selectedArticle.urlToImage} 
                    alt={selectedArticle.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              <p className="text-sm leading-relaxed">{selectedArticle.description}</p>
              
              {/* Since we don't have a full content for news articles in our mock data, 
                  we'll display the description as the main content */}
              <p className="text-sm leading-relaxed">
                This is a mock article. In a real application, the full article content would be displayed here.
                The content would typically include more detailed information about "{selectedArticle.title}".
              </p>
              
              {selectedArticle.url !== "#" && (
                <div className="pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      Read original article <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Blog Post Detail Dialog */}
      <Dialog open={!!selectedBlogPost} onOpenChange={(open) => !open && setSelectedBlogPost(null)}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedBlogPost?.title}</DialogTitle>
          </DialogHeader>
          {selectedBlogPost && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground flex flex-col">
                <span>{selectedBlogPost.author}</span>
                <div className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  {formatDate(selectedBlogPost.date)} • {selectedBlogPost.readTime}
                </div>
              </div>
              
              <div className="prose prose-sm">
                {selectedBlogPost.content ? (
                  selectedBlogPost.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 text-sm leading-relaxed">{paragraph}</p>
                  ))
                ) : (
                  <p className="text-sm leading-relaxed">{selectedBlogPost.excerpt}</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;

