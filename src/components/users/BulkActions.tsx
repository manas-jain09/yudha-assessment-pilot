
import React from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BookOpen, FileText, ChevronDown, Users } from "lucide-react";

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
    <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-700">
          {selectedStudents.length} student{selectedStudents.length > 1 ? 's' : ''} selected
        </span>
      </div>

      <div className="flex gap-2">
        {/* Learning Paths Assign */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-1" />
              Assign Learning Path
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availableLearningPaths.map((path) => (
              <DropdownMenuItem
                key={path.id}
                onClick={() => onAssignLearningPath(path.id)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{path.title}</span>
                  <span className="text-xs text-gray-500">{path.difficulty}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Learning Paths Unassign */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-1" />
              Unassign Learning Path
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availableLearningPaths.map((path) => (
              <DropdownMenuItem
                key={path.id}
                onClick={() => onUnassignLearningPath(path.id)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{path.title}</span>
                  <span className="text-xs text-gray-500">{path.difficulty}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Assessments Assign */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Assign Assessment
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availableAssessments.map((assessment) => (
              <DropdownMenuItem
                key={assessment.id}
                onClick={() => onAssignAssessment(assessment.code)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{assessment.name}</span>
                  <span className="text-xs text-gray-500">Code: {assessment.code}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Assessments Unassign */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Unassign Assessment
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availableAssessments.map((assessment) => (
              <DropdownMenuItem
                key={assessment.id}
                onClick={() => onUnassignAssessment(assessment.code)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{assessment.name}</span>
                  <span className="text-xs text-gray-500">Code: {assessment.code}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          Clear Selection
        </Button>
      </div>
    </div>
  );
};
