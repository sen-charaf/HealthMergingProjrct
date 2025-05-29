'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmergencyCase } from "@/lib/types";
import { emergencyCases } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Clock, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

// Sort cases by severity and arrival time
const sortCases = (cases: EmergencyCase[]) => {
  return [...cases].sort((a, b) => {
    const severityOrder = { critical: 0, severe: 1, moderate: 2, minor: 3 };
    if (severityOrder[a.severity] !== severityOrder[b.severity]) {
      return severityOrder[a.severity] - severityOrder[b.severity];
    }
    return new Date(a.arrivalTime).getTime() - new Date(b.arrivalTime).getTime();
  });
};

// Filter cases that are waiting
const getWaitingCases = () => {
  return sortCases(emergencyCases.filter(c => c.status === 'waiting'));
};

export function PriorityQueue() {
  const [queue, setQueue] = useState<EmergencyCase[]>(getWaitingCases());

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "severe":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "minor":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "";
    }
  };

  // Handle drag end
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(queue);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setQueue(items);
  };

  // Manually change priority
  const changePriority = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === queue.length - 1)
    ) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newQueue = [...queue];
    const temp = newQueue[index];
    newQueue[index] = newQueue[newIndex];
    newQueue[newIndex] = temp;
    
    setQueue(newQueue);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
          Emergency Priority Queue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Patients are prioritized based on severity and arrival time. Drag and drop to manually adjust priority.
        </p>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="emergency-queue">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {queue.length > 0 ? (
                  queue.map((emergencyCase, index) => (
                    <Draggable 
                      key={emergencyCase.id} 
                      draggableId={emergencyCase.id} 
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                            flex items-center justify-between p-3 border rounded-md 
                            ${emergencyCase.severity === 'critical' ? 'border-red-200 bg-red-50 dark:border-red-800/30 dark:bg-red-900/10' : 'bg-card'}
                          `}
                        >
                          <div className="flex items-center">
                            <div className="text-lg font-medium w-6 mr-3 text-center">{index + 1}</div>
                            <div>
                              <div className="font-medium">{emergencyCase.patientName}</div>
                              <div className="text-sm text-muted-foreground mt-0.5">{emergencyCase.condition}</div>
                              <div className="flex items-center mt-1">
                                <Badge className={getSeverityColor(emergencyCase.severity)}>
                                  {emergencyCase.severity}
                                </Badge>
                                <span className="text-xs text-muted-foreground ml-2 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formatDistanceToNow(new Date(emergencyCase.arrivalTime), { addSuffix: true })}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="flex flex-col mr-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-2"
                                onClick={() => changePriority(index, 'up')}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-2"
                                onClick={() => changePriority(index, 'down')}
                                disabled={index === queue.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                            </div>
                            <Button>Start Treatment</Button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    No patients in the waiting queue
                  </div>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  );
}