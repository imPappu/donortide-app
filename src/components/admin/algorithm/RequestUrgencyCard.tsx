
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateRequestUrgencyScore } from '@/services/algorithmService';
import { AlertTriangle, Calculator } from 'lucide-react';

const RequestUrgencyCard = () => {
  const [params, setParams] = useState({
    urgency: 'Standard' as 'Standard' | 'High' | 'Urgent',
    createdAt: new Date().toISOString(),
    tags: '',
    bloodType: 'O+',
  });
  
  const [rusScore, setRusScore] = useState<number | null>(null);
  const [hoursAgo, setHoursAgo] = useState(0);

  const handleChange = (field: string, value: string) => {
    setParams({ ...params, [field]: value });
  };

  const handleTimeChange = (hours: number) => {
    setHoursAgo(hours);
    const date = new Date();
    date.setHours(date.getHours() - hours);
    setParams({ ...params, createdAt: date.toISOString() });
  };

  const calculateScore = () => {
    const tags = params.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const score = calculateRequestUrgencyScore({
      ...params,
      tags
    });
    setRusScore(score);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
          Request Urgency Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="urgency">Urgency Level</Label>
          <Select 
            value={params.urgency} 
            onValueChange={(value) => handleChange('urgency', value as 'Standard' | 'High' | 'Urgent')}
          >
            <SelectTrigger id="urgency">
              <SelectValue placeholder="Select urgency level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="blood-type">Blood Type</Label>
          <Select 
            value={params.bloodType} 
            onValueChange={(value) => handleChange('bloodType', value)}
          >
            <SelectTrigger id="blood-type">
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="O-">O-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time-elapsed">Time Since Request</Label>
          <div className="grid grid-cols-3 gap-2">
            <Button type="button" variant={hoursAgo === 1 ? "default" : "outline"} onClick={() => handleTimeChange(1)}>1 Hour</Button>
            <Button type="button" variant={hoursAgo === 6 ? "default" : "outline"} onClick={() => handleTimeChange(6)}>6 Hours</Button>
            <Button type="button" variant={hoursAgo === 24 ? "default" : "outline"} onClick={() => handleTimeChange(24)}>1 Day</Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            placeholder="emergency, surgery, critical"
            value={params.tags}
            onChange={(e) => handleChange('tags', e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Priority tags: emergency, surgery, urgent, critical, accident
          </p>
        </div>

        <Button onClick={calculateScore} className="w-full">
          <Calculator className="h-4 w-4 mr-2" />
          Calculate RUS
        </Button>

        {rusScore !== null && (
          <div className={`p-4 rounded-md ${
            rusScore >= 70 ? 'bg-red-50 text-red-800' : 
            rusScore >= 40 ? 'bg-amber-50 text-amber-800' : 
            'bg-green-50 text-green-800'
          }`}>
            <div className="text-center">
              <div className="text-2xl font-bold">{rusScore}</div>
              <div className="font-medium">Request Urgency Score</div>
              <div className="text-sm mt-1">
                {rusScore >= 70 ? 'Critical Urgency' : 
                 rusScore >= 40 ? 'Moderate Urgency' : 
                 'Standard Priority'}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestUrgencyCard;
