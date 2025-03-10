
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

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

const Blog = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
          author: "Dr. Sarah Johnson",
          date: "2023-05-01T10:00:00Z",
          readTime: "5 min read",
          category: "Education"
        },
        {
          id: 2,
          title: "Common Myths About Blood Donation",
          excerpt: "Debunking common misconceptions that prevent people from donating blood.",
          author: "Michael Chen, RN",
          date: "2023-04-25T14:30:00Z",
          readTime: "8 min read",
          category: "Myths & Facts"
        },
        {
          id: 3,
          title: "How Blood Donations Are Processed",
          excerpt: "What happens to your blood after you donate it? Learn about the journey.",
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
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
                    <Button variant="outline" size="sm" asChild>
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Read <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
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
                  <Button variant="ghost" size="sm" className="flex items-center">
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Blog;
