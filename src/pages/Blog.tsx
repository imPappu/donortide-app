
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, BookOpen, ArrowRight, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  author: string;
  date: string;
  readTime: string;
  category: string;
  content?: string;
}

const Blog = () => {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [showNewsDialog, setShowNewsDialog] = useState(false);
  const [showBlogDialog, setShowBlogDialog] = useState(false);

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
              source: { name: "Health News Today" },
              content: "The American Red Cross has released new guidelines for blood donation eligibility, making it easier for more people to donate. The updated guidelines reduce deferral periods for certain conditions and medications, potentially increasing the donor pool significantly. Health officials hope this change will help address the chronic blood shortage faced by hospitals nationwide. Experts emphasize that these changes were made after careful scientific review and do not compromise safety standards for either donors or recipients."
            },
            {
              title: "Research Shows Benefits of Regular Blood Donation",
              description: "New research indicates that regular blood donation may have health benefits for donors.",
              url: "#",
              urlToImage: "https://placehold.co/600x400/red/white?text=Research",
              publishedAt: "2023-05-10T14:15:00Z",
              source: { name: "Medical Journal" },
              content: "A recent study published in the Medical Journal reveals that regular blood donation may provide significant health benefits for donors. The research, involving over 5,000 participants over a five-year period, found that regular donors had lower rates of cardiovascular issues and improved iron metabolism. Scientists believe the regular renewal of blood cells might contribute to these positive effects. However, researchers caution that more studies are needed to fully understand the mechanisms behind these benefits and that donation should primarily be viewed as an altruistic act rather than a health strategy."
            },
            {
              title: "Blood Supplies Critically Low Nationwide",
              description: "Blood banks across the country report critically low supplies of all blood types.",
              url: "#",
              urlToImage: "https://placehold.co/600x400/red/white?text=Blood+Supply",
              publishedAt: "2023-05-05T09:45:00Z",
              source: { name: "National Health Network" },
              content: "Blood banks across the country are reporting critically low supplies of all blood types, with particular shortages in O-negative, the universal donor type. The National Health Network describes the situation as 'unprecedented' and attributes the shortage to a combination of factors including the pandemic's lingering effects on donation events, seasonal declines, and increased demand from hospitals resuming elective surgeries. Emergency rooms and trauma centers are particularly affected, with some hospitals forced to delay non-emergency procedures. Health officials are making urgent appeals for all eligible donors to schedule appointments as soon as possible."
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
          content: "Blood donation is one of the most significant contributions that a person can make towards society. It is not just about the medical benefits but also the psychological and emotional fulfillment that comes from knowing you have helped save a life.\n\nEvery two seconds, someone in the United States needs blood, and more than 41,000 blood donations are needed every day. A single car accident victim can require as many as 100 units of blood. Despite these startling statistics, less than 10% of eligible people donate blood annually.\n\nDonating blood regularly has been associated with numerous health benefits. It reduces the risk of heart attacks and liver ailments as donating blood helps in reducing the iron stores in the body, thereby reducing the viscosity of blood. This results in a smoother blood flow and less damage to arteries.\n\nThe process of blood donation is simple, quick, and safe. The actual blood donation typically takes less than 10-12 minutes, though the entire process, from registration to post-donation refreshments, takes about an hour. After donation, the body replaces the fluid lost within 24 hours, and the red blood cells within four to six weeks.\n\nBefore donating blood, make sure to get enough sleep, drink plenty of fluids, and consume iron-rich foods. After donation, drink plenty of fluids, avoid strenuous physical exertion, and don't smoke for at least two hours.\n\nRemember, by donating blood, you're not only helping others but also investing in your own health. Regular blood donation is a win-win for both donors and recipients.",
          author: "Dr. Sarah Johnson",
          date: "2023-05-01T10:00:00Z",
          readTime: "5 min read",
          category: "Education"
        },
        {
          id: 2,
          title: "Common Myths About Blood Donation",
          excerpt: "Debunking common misconceptions that prevent people from donating blood.",
          content: "Despite the critical need for blood donations worldwide, many people avoid donating due to misconceptions and myths. Let's debunk some of the most common myths about blood donation.\n\nMyth 1: Blood donation is painful\nReality: While you might feel a quick pinch when the needle is inserted, most donors report little to no discomfort during the donation process. The slight discomfort is far outweighed by the knowledge that you're helping to save lives.\n\nMyth 2: I'm too old to donate blood\nReality: There is no upper age limit for blood donation as long as you are in good health. Many blood centers allow people to donate well into their 70s and beyond with physician approval.\n\nMyth 3: I can't donate if I have a common cold\nReality: If you have a mild cold without fever, you may still be eligible to donate. However, if you have a fever or feel unwell, it's best to wait until you've fully recovered.\n\nMyth 4: Donating blood leads to weakness\nReality: After donating blood, your body replaces the fluid within 24 hours. The red blood cells are replaced within 4-6 weeks. Most people can resume their normal activities immediately after donating, though it's advisable to avoid strenuous physical activity for 24 hours.\n\nMyth 5: I can get infections or diseases from donating blood\nReality: This is impossible. All equipment used during blood donation is sterile and disposed of after a single use. There is absolutely no risk of contracting any infection or disease from the donation process.\n\nMyth 6: I'm on medication, so I can't donate\nReality: Many medications do not disqualify you from donating blood. It depends on what condition is being treated and what specific medications you are taking. Always check with the blood center.\n\nMyth 7: I don't have the common blood type, so my donation isn't needed\nReality: All blood types are needed. While O-negative blood is always in high demand because it's the universal donor type, each type of blood serves a critical purpose in different situations.\n\nIt's important to get accurate information about blood donation. By understanding the facts and dismissing the myths, more people might be encouraged to donate blood and help save lives.",
          author: "Michael Chen, RN",
          date: "2023-04-25T14:30:00Z",
          readTime: "8 min read",
          category: "Myths & Facts"
        },
        {
          id: 3,
          title: "How Blood Donations Are Processed",
          excerpt: "What happens to your blood after you donate it? Learn about the journey.",
          content: "Have you ever wondered what happens to your blood after you donate it? The journey from your arm to a patient in need is fascinating and involves multiple steps to ensure safety and effectiveness.\n\nStep 1: Registration and Screening\nBefore you even donate, you go through a screening process that includes a health questionnaire and mini-physical exam. This ensures that it's safe for you to donate and that your blood is safe for recipients.\n\nStep 2: The Donation\nDuring the actual donation, about one pint (approximately 450-500 ml) of blood is drawn from your arm into sterile equipment. The process usually takes about 10 minutes, though the entire visit may take an hour.\n\nStep 3: Processing and Testing\nAfter collection, your blood is labeled and sent to a processing center. There, it's processed into different components: red blood cells, plasma, and sometimes platelets. Each of these components can help different types of patients.\n\nStep 4: Comprehensive Testing\nEvery unit of blood undergoes rigorous testing for blood type and Rh factor, as well as screening for infectious diseases such as HIV, hepatitis B and C, and syphilis. Only blood that passes all these tests moves on to the next stage.\n\nStep 5: Storage\nThe separated components are stored according to their specific requirements. Red blood cells are refrigerated and have a shelf life of about 42 days. Plasma can be frozen and stored for up to one year, while platelets must be stored at room temperature and used within five days.\n\nStep 6: Distribution\nWhen a hospital or medical facility needs blood, they contact the blood bank with their requirements. The appropriate blood products are then delivered to the hospital's blood bank.\n\nStep 7: Transfusion\nFinally, before a patient receives blood, there's a careful process of cross-matching to ensure compatibility between the donor's blood and the recipient's blood. This prevents potentially dangerous transfusion reactions.\n\nThe entire process from donation to transfusion is carefully controlled and monitored to ensure the highest levels of safety and efficacy. Every step involves trained professionals and adheres to strict protocols.\n\nBy understanding this process, donors can appreciate just how valuable their contribution is and the extensive measures taken to ensure their gift saves lives safely and effectively.",
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

  const handleOpenBlogPost = (post: BlogPost) => {
    setSelectedPost(post);
    setShowBlogDialog(true);
  };

  const handleOpenNewsArticle = (article: NewsArticle) => {
    setSelectedNews(article);
    setShowNewsDialog(true);
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
                    <Button variant="outline" size="sm" onClick={() => handleOpenNewsArticle(article)}>
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
                    onClick={() => handleOpenBlogPost(post)}
                  >
                    Read more <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Blog Post Dialog */}
      <Dialog open={showBlogDialog} onOpenChange={setShowBlogDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedPost.title}</DialogTitle>
                <DialogDescription className="flex justify-between items-center pt-2">
                  <span className="text-muted-foreground">{selectedPost.author}</span>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {formatDate(selectedPost.date)} • {selectedPost.readTime}
                  </span>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="text-xs font-medium text-primary inline-block px-2 py-1 rounded-full bg-primary/10">
                  {selectedPost.category}
                </div>
                <div className="text-sm whitespace-pre-line">
                  {selectedPost.content}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* News Article Dialog */}
      <Dialog open={showNewsDialog} onOpenChange={setShowNewsDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedNews.title}</DialogTitle>
                <DialogDescription className="flex justify-between items-center pt-2">
                  <span className="text-muted-foreground">{selectedNews.source.name}</span>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {formatDate(selectedNews.publishedAt)}
                  </span>
                </DialogDescription>
              </DialogHeader>
              {selectedNews.urlToImage && (
                <div className="rounded-md overflow-hidden">
                  <img 
                    src={selectedNews.urlToImage} 
                    alt={selectedNews.title} 
                    className="w-full h-auto"
                  />
                </div>
              )}
              <div className="mt-4">
                <p className="text-sm mb-4">{selectedNews.description}</p>
                <div className="text-sm whitespace-pre-line">
                  {selectedNews.content}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                {selectedNews.url && selectedNews.url !== "#" && (
                  <Button asChild variant="outline" size="sm">
                    <a href={selectedNews.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      View original <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blog;
