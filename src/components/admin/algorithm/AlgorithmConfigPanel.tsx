
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from '@/hooks/use-toast';
import { getAlgorithmParams, updateAlgorithmParams } from '@/services/algorithmService';
import { MatchingAlgorithmParams } from '@/types/algorithmTypes';
import { AlertTriangle, Save, RefreshCw, Info } from 'lucide-react';

const AlgorithmConfigPanel = () => {
  const { toast } = useToast();
  const [params, setParams] = useState<MatchingAlgorithmParams>({
    rusWeight: 1.5,
    drsWeight: 1.2,
    distanceWeight: 0.8,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  useEffect(() => {
    loadAlgorithmParams();
  }, []);

  const loadAlgorithmParams = async () => {
    setIsLoading(true);
    try {
      const data = await getAlgorithmParams();
      setParams(data);
    } catch (error) {
      console.error("Error loading algorithm parameters:", error);
      toast({
        title: "Error",
        description: "Failed to load algorithm parameters. Using default values.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateAlgorithmParams(params);
      toast({
        title: "Success",
        description: "Algorithm parameters saved successfully.",
      });
    } catch (error) {
      console.error("Error saving algorithm parameters:", error);
      toast({
        title: "Error",
        description: "Failed to save algorithm parameters.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const applyPreset = (preset: 'balanced' | 'urgency' | 'donor' | 'proximity') => {
    switch (preset) {
      case 'balanced':
        setParams({ rusWeight: 1.5, drsWeight: 1.2, distanceWeight: 0.8 });
        break;
      case 'urgency':
        setParams({ rusWeight: 2.0, drsWeight: 1.0, distanceWeight: 0.5 });
        break;
      case 'donor':
        setParams({ rusWeight: 1.0, drsWeight: 2.0, distanceWeight: 0.5 });
        break;
      case 'proximity':
        setParams({ rusWeight: 1.0, drsWeight: 1.0, distanceWeight: 1.5 });
        break;
    }
    setShowPresets(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Matching Algorithm Configuration</span>
          <Button variant="outline" size="sm" onClick={() => loadAlgorithmParams()} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-blue-50 text-blue-800 rounded-md flex items-start">
          <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium">About the Matching Algorithm</p>
            <p>The formula used is: Match Score = (w₁ × RUS) + (w₂ × DRS) – (w₃ × Distance Factor)</p>
            <p>Adjust the weights below to fine-tune how the algorithm prioritizes different factors.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="rus-weight">Request Urgency Score (RUS) Weight</Label>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{params.rusWeight.toFixed(1)}</span>
            </div>
            <Slider
              id="rus-weight"
              min={0.1}
              max={3.0}
              step={0.1}
              value={[params.rusWeight]}
              onValueChange={([value]) => setParams({ ...params, rusWeight: value })}
            />
            <p className="text-sm text-muted-foreground">Higher values prioritize urgent requests over donor readiness</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="drs-weight">Donor Readiness Score (DRS) Weight</Label>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{params.drsWeight.toFixed(1)}</span>
            </div>
            <Slider
              id="drs-weight"
              min={0.1}
              max={3.0}
              step={0.1}
              value={[params.drsWeight]}
              onValueChange={([value]) => setParams({ ...params, drsWeight: value })}
            />
            <p className="text-sm text-muted-foreground">Higher values prioritize experienced donors</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="distance-weight">Distance Weight</Label>
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{params.distanceWeight.toFixed(1)}</span>
            </div>
            <Slider
              id="distance-weight"
              min={0.1}
              max={3.0}
              step={0.1}
              value={[params.distanceWeight]}
              onValueChange={([value]) => setParams({ ...params, distanceWeight: value })}
            />
            <p className="text-sm text-muted-foreground">Higher values prioritize donors who are closer to the request location</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <Button onClick={() => setShowPresets(!showPresets)}>
            {showPresets ? 'Hide Presets' : 'Show Presets'}
          </Button>
          
          {showPresets && (
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => applyPreset('balanced')}>Balanced</Button>
              <Button variant="outline" onClick={() => applyPreset('urgency')}>Urgency Focused</Button>
              <Button variant="outline" onClick={() => applyPreset('donor')}>Donor Focused</Button>
              <Button variant="outline" onClick={() => applyPreset('proximity')}>Proximity Focused</Button>
            </div>
          )}
          
          <div className="p-3 bg-yellow-50 text-yellow-800 rounded-md flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              Changes to algorithm weights will affect all future matches. Monitor the system after changes to ensure optimal performance.
            </p>
          </div>
          
          <Button 
            className="mt-2" 
            onClick={handleSave} 
            disabled={isSaving}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmConfigPanel;
