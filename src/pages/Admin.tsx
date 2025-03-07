
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BarChart, 
  DropletIcon, 
  Settings, 
  FileText, 
  Bell, 
  Globe,
  AlertTriangle,
  CreditCard,
  Table,
  Edit,
  Trash2,
  Plus,
  Eye,
  Image,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  getDashboardStats, 
  getBloodRequests, 
  getBlogPosts, 
  getBanners,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  createBanner,
  updateBanner,
  deleteBanner,
  sendNotification,
  getAppSettings,
  BlogPost,
  Banner,
  Notification,
  BloodRequest
} from "@/services/dbService";
import BlogPostForm from "@/components/admin/BlogPostForm";
import BannerForm from "@/components/admin/BannerForm";
import AppSettingsForm from "@/components/admin/AppSettingsForm";
import PaymentGatewaySettings from "@/components/admin/PaymentGatewaySettings";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonations: 0,
    totalRequests: 0,
    totalLocations: 0,
    recentRequests: []
  });
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [adminPath, setAdminPath] = useState("admin");
  
  // State for forms
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [showBannerForm, setShowBannerForm] = useState(false);
  
  // State for notifications
  const [notification, setNotification] = useState<Partial<Notification>>({
    title: '',
    message: '',
    targetType: 'all'
  });

  // Check for admin authentication
  useEffect(() => {
    const checkAdminAuth = () => {
      const adminToken = localStorage.getItem("admin_token");
      if (!adminToken) {
        toast({
          title: "Authentication required",
          description: "Please login to access the admin dashboard",
          variant: "destructive",
        });
        navigate(`/${adminPath}`);
        return false;
      }
      
      // Parse token and check if it's expired
      try {
        const tokenData = JSON.parse(adminToken);
        const now = new Date().getTime();
        const expiryTime = tokenData.timestamp + tokenData.expiresIn;
        
        if (now > expiryTime) {
          localStorage.removeItem("admin_token");
          toast({
            title: "Session expired",
            description: "Your session has expired. Please login again",
            variant: "destructive",
          });
          navigate(`/${adminPath}`);
          return false;
        }
      } catch (error) {
        localStorage.removeItem("admin_token");
        navigate(`/${adminPath}`);
        return false;
      }
      
      return true;
    };

    const fetchAdminPath = async () => {
      try {
        const settings = await getAppSettings();
        const adminPathSetting = settings.find(s => s.settingKey === 'admin_url_path');
        if (adminPathSetting && adminPathSetting.settingValue) {
          setAdminPath(adminPathSetting.settingValue);
        }
      } catch (error) {
        console.error("Error fetching admin path:", error);
      }
    };

    fetchAdminPath();
    const isAuthenticated = checkAdminAuth();
    
    if (isAuthenticated) {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const dashboardData = await getDashboardStats();
      setStats({
        totalUsers: dashboardData.totalUsers || 0,
        totalDonations: dashboardData.totalDonations || 0,
        totalRequests: dashboardData.totalRequests || 0,
        totalLocations: dashboardData.totalLocations || 0,
        recentRequests: dashboardData.recentRequests || []
      });
      
      // Fetch blood requests
      const requestsData = await getBloodRequests();
      setRequests(requestsData);
      
      // Fetch blog posts
      const blogData = await getBlogPosts();
      setBlogPosts(blogData);
      
      // Fetch banners
      const bannerData = await getBanners();
      setBanners(bannerData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast({
        title: "Error",
        description: "Failed to load admin dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate(`/${adminPath}`);
  };

  // Blog post handlers
  const handleAddBlogPost = () => {
    setEditingBlogPost(null);
    setShowBlogForm(true);
  };

  const handleEditBlogPost = (post: BlogPost) => {
    setEditingBlogPost(post);
    setShowBlogForm(true);
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteBlogPost(id);
        setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        toast({
          title: "Success",
          description: "Blog post deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting blog post:', error);
        toast({
          title: "Error",
          description: "Failed to delete blog post",
          variant: "destructive",
        });
      }
    }
  };

  const handleBlogSubmit = async (data: BlogPost) => {
    try {
      if (editingBlogPost?.id) {
        const updated = await updateBlogPost(editingBlogPost.id, data);
        if (updated) {
          setBlogPosts(prevPosts => 
            prevPosts.map(post => post.id === editingBlogPost.id ? updated : post)
          );
          toast({
            title: "Success",
            description: "Blog post updated successfully",
          });
        }
      } else {
        const newPost = await createBlogPost(data);
        if (newPost) {
          setBlogPosts(prevPosts => [newPost, ...prevPosts]);
          toast({
            title: "Success",
            description: "Blog post created successfully",
          });
        }
      }
      setShowBlogForm(false);
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    }
  };

  // Banner handlers
  const handleAddBanner = () => {
    setEditingBanner(null);
    setShowBannerForm(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setShowBannerForm(true);
  };

  const handleDeleteBanner = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await deleteBanner(id);
        setBanners(prevBanners => prevBanners.filter(banner => banner.id !== id));
        toast({
          title: "Success",
          description: "Banner deleted successfully",
        });
      } catch (error) {
        console.error('Error deleting banner:', error);
        toast({
          title: "Error",
          description: "Failed to delete banner",
          variant: "destructive",
        });
      }
    }
  };

  const handleBannerSubmit = async (data: Banner) => {
    try {
      if (editingBanner?.id) {
        const updated = await updateBanner(editingBanner.id, data);
        if (updated) {
          setBanners(prevBanners => 
            prevBanners.map(banner => banner.id === editingBanner.id ? updated : banner)
          );
          toast({
            title: "Success",
            description: "Banner updated successfully",
          });
        }
      } else {
        const newBanner = await createBanner(data);
        if (newBanner) {
          setBanners(prevBanners => [newBanner, ...prevBanners]);
          toast({
            title: "Success",
            description: "Banner created successfully",
          });
        }
      }
      setShowBannerForm(false);
    } catch (error) {
      console.error('Error saving banner:', error);
      toast({
        title: "Error",
        description: "Failed to save banner",
        variant: "destructive",
      });
    }
  };

  // Notification handlers
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNotification(prev => ({ ...prev, [name]: value }));
  };

  const handleSendNotification = async () => {
    if (!notification.title || !notification.message) {
      toast({
        title: "Error",
        description: "Please provide both title and message for the notification",
        variant: "destructive",
      });
      return;
    }

    try {
      await sendNotification(notification as Notification);
      setNotification({
        title: '',
        message: '',
        targetType: 'all'
      });
      toast({
        title: "Success",
        description: "Notification sent successfully",
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-xl">Loading admin dashboard...</h2>
        </div>
      </div>
    );
  }

  const recentRequests = requests.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
          <Button size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Send Alert
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-green-600">+12%</span>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <DropletIcon className="h-5 w-5 text-red-500" />
              <span className="text-sm text-green-600">+8.5%</span>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold">{stats.totalDonations}</h3>
              <p className="text-sm text-muted-foreground">Donations</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <Bell className="h-5 w-5 text-orange-500" />
              <span className="text-sm text-green-600">+5.2%</span>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold">{stats.totalRequests}</h3>
              <p className="text-sm text-muted-foreground">Requests</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <Globe className="h-5 w-5 text-green-500" />
              <span className="text-sm text-green-600">+2</span>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-bold">{stats.totalLocations}</h3>
              <p className="text-sm text-muted-foreground">Locations</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blog">Blog Management</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="app-settings">App Settings</TabsTrigger>
          <TabsTrigger value="payments">Payment Gateways</TabsTrigger>
          <TabsTrigger value="push">Push Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                          <span className="text-red-600 font-bold text-xs">{request.bloodType}</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">{request.patientName}</h4>
                          <p className="text-xs text-muted-foreground">{request.hospital}, {request.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          request.urgency === 'Urgent' ? 'bg-red-100 text-red-800' :
                          request.urgency === 'High' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {request.urgency}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(request.createdAt || '').toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input 
                      name="title"
                      value={notification.title}
                      onChange={handleNotificationChange}
                      placeholder="Notification title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea 
                      name="message"
                      value={notification.message}
                      onChange={handleNotificationChange}
                      placeholder="Notification message"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetType">Target Audience</Label>
                    <select 
                      name="targetType"
                      value={notification.targetType}
                      onChange={handleNotificationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Users</option>
                      <option value="donors">All Donors</option>
                      <option value="specific_users">Specific Blood Types</option>
                    </select>
                  </div>
                  <Button onClick={handleSendNotification} className="w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Push Notification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="blog">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Blog Management</CardTitle>
              <Button onClick={handleAddBlogPost}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Post
              </Button>
            </CardHeader>
            <CardContent>
              {showBlogForm ? (
                <BlogPostForm 
                  initialData={editingBlogPost || undefined}
                  onSubmit={handleBlogSubmit}
                  onCancel={() => setShowBlogForm(false)}
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2 text-left">Title</th>
                        <th className="py-2 text-left">Author</th>
                        <th className="py-2 text-left">Category</th>
                        <th className="py-2 text-left">Status</th>
                        <th className="py-2 text-left">Date</th>
                        <th className="py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="border-b">
                          <td className="py-2">{post.title}</td>
                          <td className="py-2">{post.author}</td>
                          <td className="py-2">{post.category || '-'}</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                          </td>
                          <td className="py-2">{new Date(post.publishedAt || post.createdAt || '').toLocaleDateString()}</td>
                          <td className="py-2 text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditBlogPost(post)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteBlogPost(post.id!)}>
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="banners">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Banner Management</CardTitle>
              <Button onClick={handleAddBanner}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Banner
              </Button>
            </CardHeader>
            <CardContent>
              {showBannerForm ? (
                <BannerForm 
                  initialData={editingBanner || undefined}
                  onSubmit={handleBannerSubmit}
                  onCancel={() => setShowBannerForm(false)}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {banners.map((banner) => (
                    <Card key={banner.id} className="overflow-hidden">
                      <div className="relative h-40">
                        <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-white" onClick={() => handleEditBanner(banner)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0 bg-white" onClick={() => handleDeleteBanner(banner.id!)}>
                            <Trash2 className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                        {!banner.active && (
                          <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Inactive
                          </div>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium">{banner.title}</h3>
                        <p className="text-xs text-muted-foreground">Order: {banner.displayOrder}</p>
                        {banner.linkUrl && (
                          <p className="text-xs truncate text-blue-500">{banner.linkUrl}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="app-settings">
          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <AppSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <PaymentGatewaySettings />
        </TabsContent>
        
        <TabsContent value="push">
          <Card>
            <CardHeader>
              <CardTitle>Push Notification Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Send New Notification</h3>
                  <div className="space-y-2">
                    <Label htmlFor="push-title">Title</Label>
                    <Input 
                      id="push-title"
                      name="title"
                      value={notification.title}
                      onChange={handleNotificationChange}
                      placeholder="Notification title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="push-message">Message</Label>
                    <textarea 
                      id="push-message"
                      name="message"
                      value={notification.message}
                      onChange={handleNotificationChange}
                      placeholder="Notification message"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="push-target">Target Audience</Label>
                    <select 
                      id="push-target"
                      name="targetType"
                      value={notification.targetType}
                      onChange={handleNotificationChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Users</option>
                      <option value="donors">All Donors</option>
                      <option value="specific_users">Specific Blood Types</option>
                    </select>
                  </div>
                  
                  {notification.targetType === 'specific_users' && (
                    <div className="space-y-2">
                      <Label htmlFor="blood-types">Blood Types</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                          <label key={type} className="flex items-center space-x-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button onClick={handleSendNotification} className="w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    Send Push Notification
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4">Notification History</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Urgent Blood Required</h4>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Sent</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">We need urgent O- blood donations at City Hospital</p>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Target: All Donors</span>
                        <span>Sent: 2 hours ago</span>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between">
                        <h4 className="font-medium">New Donation Drive</h4>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Sent</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Join our donation drive this weekend at Memorial Park</p>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Target: All Users</span>
                        <span>Sent: 1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
