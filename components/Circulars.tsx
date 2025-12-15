
import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Trash2, Calendar, User } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';
import { Notice } from '../types';

const Circulars: React.FC = () => {
  const { notices, addNotice, deleteNotice, currentUser } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAudience, setFilterAudience] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Notice Form
  const [newNotice, setNewNotice] = useState({ title: '', content: '', audience: 'All' });

  const canCreate = currentUser?.role === 'Admin' || currentUser?.role === 'Teacher';

  const handleCreate = () => {
      if (!newNotice.title || !newNotice.content) return;
      
      const notice: Notice = {
          id: `n_${Date.now()}`,
          title: newNotice.title,
          content: newNotice.content,
          audience: newNotice.audience as any,
          date: new Date().toISOString().split('T')[0],
          postedBy: currentUser?.name || 'Admin'
      };
      
      addNotice(notice);
      setShowCreateModal(false);
      setNewNotice({ title: '', content: '', audience: 'All' });
  };

  // Filter Notices based on Role & Search
  const filteredNotices = notices.filter(n => {
      // Role Visibility Logic
      if (currentUser?.role === 'Student' && n.audience !== 'All' && n.audience !== 'Students') return false;
      
      // Search Logic
      const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter Dropdown
      const matchesFilter = filterAudience === 'All' || n.audience === filterAudience;

      return matchesSearch && matchesFilter;
  });

  const getAudienceColor = (audience: string) => {
      switch(audience) {
          case 'Students': return 'bg-blue-100 text-blue-700';
          case 'Staff': return 'bg-purple-100 text-purple-700';
          case 'Parents': return 'bg-orange-100 text-orange-700';
          default: return 'bg-green-100 text-green-700';
      }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
             <div className="p-3 bg-school-100 rounded-lg text-school-600">
                <FileText size={24} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Circulars & Notices</h2>
                <p className="text-gray-500">Official communications and school announcements.</p>
            </div>
        </div>
        {canCreate && (
            <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-school-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-school-700 flex items-center gap-2 shadow-sm"
            >
                <Plus size={18} /> New Circular
            </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                type="text"
                placeholder="Search circulars..."
                className="w-full bg-white text-gray-900 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-school-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select 
                className="bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-school-500"
                value={filterAudience}
                onChange={(e) => setFilterAudience(e.target.value)}
            >
                <option value="All">All Categories</option>
                <option value="Students">Students Only</option>
                <option value="Staff">Staff Only</option>
                <option value="Parents">Parents Only</option>
            </select>
          </div>
      </div>

      <div className="grid gap-4">
          {filteredNotices.length > 0 ? filteredNotices.map(notice => (
              <div key={notice.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
                  <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                           <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${getAudienceColor(notice.audience)}`}>
                               {notice.audience}
                           </span>
                           <span className="text-xs text-gray-400 flex items-center gap-1">
                               <Calendar size={12}/> {notice.date}
                           </span>
                      </div>
                      {canCreate && (
                          <button 
                            onClick={() => { if(confirm('Delete this notice?')) deleteNotice(notice.id)}}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                              <Trash2 size={16}/>
                          </button>
                      )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{notice.title}</h3>
                  <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">{notice.content}</p>
                  
                  {notice.postedBy && (
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                          <User size={12}/> Posted by {notice.postedBy}
                      </div>
                  )}
              </div>
          )) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <FileText size={48} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">No circulars found matching your criteria.</p>
              </div>
          )}
      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Plus size={20}/> Draft New Circular
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-school-500 outline-none"
                            placeholder="e.g. Winter Break Announcement"
                            value={newNotice.title}
                            onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Audience</label>
                        <select 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-school-500 outline-none"
                            value={newNotice.audience}
                            onChange={(e) => setNewNotice({...newNotice, audience: e.target.value})}
                        >
                            <option value="All">All (General Public)</option>
                            <option value="Students">Students Only</option>
                            <option value="Parents">Parents Only</option>
                            <option value="Staff">Staff Only</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Content</label>
                        <textarea 
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm h-32 focus:ring-2 focus:ring-school-500 outline-none"
                            placeholder="Type the notice content here..."
                            value={newNotice.content}
                            onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium hover:bg-gray-200">Cancel</button>
                    <button onClick={handleCreate} className="flex-1 px-4 py-2 bg-school-600 text-white rounded-lg font-bold hover:bg-school-700">Publish Notice</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Circulars;
