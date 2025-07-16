
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LearningPathAssignmentProps {
  studentId: string;
  studentName: string;
  assignedLearningPaths: string[];
  availableLearningPaths: any[];
  onAssign: (studentId: string, learningPathId: string) => void;
  onUnassign: (studentId: string, learningPathId: string) => void;
  isLoading: boolean;
}

export const LearningPathAssignment: React.FC<LearningPathAssignmentProps> = ({
  studentId,
  studentName,
  assignedLearningPaths,
  availableLearningPaths,
  onAssign,
  onUnassign,
  isLoading
}) => {
  const handleCheckboxChange = (learningPathId: string, isChecked: boolean) => {
    if (isChecked) {
      onAssign(studentId, learningPathId);
    } else {
      onUnassign(studentId, learningPathId);
    }
  };

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <BookOpen className="h-4 w-4" />
          Learning Paths for {studentName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {availableLearningPaths.map((path) => {
            const isAssigned = assignedLearningPaths.includes(path.id);
            return (
              <div key={path.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                <Checkbox
                  id={`${studentId}-${path.id}`}
                  checked={isAssigned}
                  onCheckedChange={(checked) => handleCheckboxChange(path.id, checked as boolean)}
                  disabled={isLoading}
                />
                <label
                  htmlFor={`${studentId}-${path.id}`}
                  className="flex-1 text-sm cursor-pointer"
                >
                  <div className="font-medium">{path.title}</div>
                  <div className="text-xs text-gray-500">{path.difficulty}</div>
                </label>
              </div>
            );
          })}
          {availableLearningPaths.length === 0 && (
            <div className="text-sm text-gray-500 text-center py-4">
              No learning paths available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
