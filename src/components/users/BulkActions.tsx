
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, FileText, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BulkActionsProps {
  selectedStudents: string[];
  availableLearningPaths: any[];
  availableAssessments: any[];
  onAssignLearningPath: (learningPathId: string) => void;
  onUnassignLearningPath: (learningPathId: string) => void;
  onAssignAssessment: (assessmentCode: string) => void;
  onUnassignAssessment: (assessmentCode: string) => void;
  onClearSelection: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedStudents,
  availableLearningPaths,
  availableAssessments,
  onAssignLearningPath,
  onUnassignLearningPath,
  onAssignAssessment,
  onUnassignAssessment,
  onClearSelection
}) => {
  if (selectedStudents.length === 0) return null;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-blue-600" />
          Bulk Actions - {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={onClearSelection}>
            Clear Selection
          </Button>
        </div>

        {/* Learning Paths Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <h4 className="font-medium">Learning Paths</h4>
          </div>
          {availableLearningPaths.length > 0 ? (
            <div className="grid gap-2 max-h-40 overflow-y-auto">
              {availableLearningPaths.map((path) => (
                <div key={path.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <span className="font-medium text-sm">{path.title}</span>
                    <span className="text-xs text-gray-500 ml-2">({path.difficulty})</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAssignLearningPath(path.id)}
                      className="text-xs"
                    >
                      Assign
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUnassignLearningPath(path.id)}
                      className="text-xs"
                    >
                      Unassign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No learning paths available</p>
          )}
        </div>

        {/* Assessments Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-green-600" />
            <h4 className="font-medium">Assessments</h4>
          </div>
          {availableAssessments.length > 0 ? (
            <div className="grid gap-2 max-h-40 overflow-y-auto">
              {availableAssessments.map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <span className="font-medium text-sm">{assessment.name}</span>
                    <span className="text-xs text-gray-500 ml-2">(Code: {assessment.code})</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAssignAssessment(assessment.code)}
                      className="text-xs"
                    >
                      Assign
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUnassignAssessment(assessment.code)}
                      className="text-xs"
                    >
                      Unassign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No assessments available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
