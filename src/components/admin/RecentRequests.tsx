
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BloodRequest } from "@/services/dbService";

interface RecentRequestsProps {
  requests: BloodRequest[];
}

const RecentRequests = ({ requests }: RecentRequestsProps) => {
  const recentRequests = requests?.slice(0, 3) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentRequests.length > 0 ? (
            recentRequests.map((request, i) => (
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
            ))
          ) : (
            <div className="text-center py-4 text-muted-foreground">No recent requests</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentRequests;
