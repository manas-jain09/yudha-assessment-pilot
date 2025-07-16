
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AssessmentAssignmentProps {
  studentId: string;
  studentName: string;
  assignedAssessments: string[];
  availableAssessments: any[];
  onAssign: (studentId: string, assessmentCode: string) => void;
  onUnassign: (studentId: string, assessmentCode: string) => void;
  isLoading: boolean;
}

export const AssessmentAssignment: React.FC<AssessmentAssignmentProps> = ({
  studentId,
  studentName,
  assignedAssessments,
  availableAssessments,
  onAssign,
  onUnassign,
  isLoading
}) => {
  const handleCheckboxChange = (assessmentCode: string, isChecked: boolean) => {
    if (isChecked) {
      onAssign(studentId, assessmentCode);
    } else {
      onUnassign(studentId, assessmentCode);
    }
  };

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4" />
          Assessments for {studentName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {availableAssessments.map((assessment) => {
            const isAssigned = assignedAssessments.includes(assessment.code);
            return (
              <div key={assessment.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                <Checkbox
                  id={`${studentId}-${assessment.code}`}
                  checked={isAssigned}
                  onCheckedChange={(checked) => handleCheckboxChange(assessment.code, checked as boolean)}
                  disabled={isLoading}
                />
                <label
                  htmlFor={`${studentId}-${assessment.code}`}
                  className="flex-1 text-sm cursor-pointer"
                >
                  <div className="font-medium">{assessment.name}</div>
                  <div className="text-xs text-gray-500">Code: {assessment.code}</div>
                </label>
              </div>
            );
          })}
          {availableAssessments.length === 0 && (
            <div className="text-sm text-gray-500 text-center py-4">
              No assessments available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
