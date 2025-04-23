
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Navigation, MapPin, Compass } from "lucide-react";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header id="header" className="bg-white border-b p-4 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Navigation className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TourGuide</span>
          </div>
          <div className="flex items-center gap-4">
            <Button id="create-tour" variant="default" size="sm">
              Create Tour
            </Button>
            <Button id="settings" variant="ghost" size="sm">
              <Compass className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 font-mono">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card id="main-card" className="shadow-md">
              <CardHeader>
                <CardTitle>Tour Dashboard</CardTitle>
                <CardDescription>Manage your guided tours</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active" className="w-full">
                  <TabsList id="tabs-list" className="w-full mb-4">
                    <TabsTrigger value="active" className="flex-1">Active Tours</TabsTrigger>
                    <TabsTrigger value="draft" className="flex-1">Drafts</TabsTrigger>
                    <TabsTrigger value="archived" className="flex-1">Archived</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active">
                    <div id="search-tours" className="mb-4">
                      <Input placeholder="Search tours..." />
                    </div>
                    
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
                          <div>
                            <div className="font-medium">Product Tour {i}</div>
                            <div className="text-sm text-muted-foreground">4 steps • Last edited 2 days ago</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                            <span className="ml-1">Preview</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="draft">
                    <div className="text-center p-8 text-muted-foreground">
                      <p>No draft tours found</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="archived">
                    <div className="text-center p-8 text-muted-foreground">
                      <p>No archived tours found</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card id="stats-card" className="shadow-md">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Tour performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                    <div className="font-bold text-2xl">76%</div>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Average Steps Viewed</div>
                    <div className="font-bold text-2xl">3.5</div>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Skip Rate</div>
                    <div className="font-bold text-2xl">23%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card id="help-card" className="mt-6 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to create effective guided tours for your users.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
