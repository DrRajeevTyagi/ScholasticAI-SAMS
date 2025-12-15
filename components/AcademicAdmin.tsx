
import React, { useState } from 'react';
import { Building2, CalendarClock, Calendar, LayoutGrid } from 'lucide-react';
import ClassManagement from './ClassManagement';
import Curriculum from './Curriculum';
import ExamScheduler from './ExamScheduler';
import WorkloadManager from './WorkloadManager';

const AcademicAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classes' | 'curriculum' | 'workload' | 'exams'>('classes');

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Academic Console</h2>
        <p className="text-gray-500 mt-1">Central administration for school structure, curriculum, and schedules.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
                onClick={() => setActiveTab('classes')}
                className={`flex-1 min-w-[140px] py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 ${
                activeTab === 'classes' ? 'border-school-600 text-school-700 bg-school-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
                <Building2 size={18} /> Class Structure
            </button>
            <button
                onClick={() => setActiveTab('curriculum')}
                className={`flex-1 min-w-[140px] py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 ${
                activeTab === 'curriculum' ? 'border-school-600 text-school-700 bg-school-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
                <CalendarClock size={18} /> Curriculum
            </button>
            <button
                onClick={() => setActiveTab('workload')}
                className={`flex-1 min-w-[140px] py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 ${
                activeTab === 'workload' ? 'border-school-600 text-school-700 bg-school-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
                <LayoutGrid size={18} /> Teacher Workload
            </button>
            <button
                onClick={() => setActiveTab('exams')}
                className={`flex-1 min-w-[140px] py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors border-b-2 ${
                activeTab === 'exams' ? 'border-school-600 text-school-700 bg-school-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
                <Calendar size={18} /> Date Sheets
            </button>
        </div>

        <div className="p-6 bg-gray-50 min-h-[600px]">
            {activeTab === 'classes' && <ClassManagement />}
            {activeTab === 'curriculum' && <Curriculum />}
            {activeTab === 'workload' && <WorkloadManager />}
            {activeTab === 'exams' && <ExamScheduler />}
        </div>
      </div>
    </div>
  );
};

export default AcademicAdmin;
